/**
 * Morning Digest — Cloudflare Worker
 * Runs at 7am daily, queries HubSpot for contacts with follow-ups due today,
 * sends a digest email via Resend with Approve / Skip / Edit links.
 *
 * Secrets (set via `wrangler secret put`):
 *   HUBSPOT_TOKEN     — HubSpot Private App access token
 *   RESEND_API_KEY    — Resend API key
 *
 * Vars in wrangler.toml:
 *   TO_EMAIL          — duanecutlip@gmail.com
 *   FROM_EMAIL        — digest@duanecutlip.com
 *   HUBSPOT_PORTAL_ID — 1250503
 *   WORKER_BASE_URL   — https://morning-digest.duanecutlip.workers.dev
 */

export default {
  // Cron trigger: fires at 7am EST (12:00 UTC; use 11:00 UTC during EDT Mar-Nov)
  async scheduled(event, env, ctx) {
    ctx.waitUntil(runDigest(env));
  },

  // HTTP: handles approve / skip / edit link clicks
  async fetch(request, env) {
    const url = new URL(request.url);

    // Manual trigger for testing — remove after confirming digest works
    if (url.pathname === '/trigger') {
      await runDigest(env);
      return new Response('Digest triggered — check your email.', { status: 200 });
    }

    const parts = url.pathname.split('/').filter(Boolean);
    if (parts.length !== 2) return new Response('Not found', { status: 404 });

    const [action, contactId] = parts;
    if (action === 'approve') return handleApprove(contactId, env);
    if (action === 'skip')    return handleSkip(contactId, env);
    if (action === 'edit')    return Response.redirect(
      `https://app.hubspot.com/contacts/${env.HUBSPOT_PORTAL_ID}/contact/${contactId}`, 302
    );
    return new Response('Unknown action', { status: 400 });
  },
};

// ── Main digest logic ─────────────────────────────────────────────────────

async function runDigest(env) {
  const today = todayStr();
  let contacts = [];
  try {
    contacts = await getContactsDueToday(env, today);
  } catch (err) {
    await sendErrorEmail(env, 'HubSpot query failed', err.message);
    return;
  }

  if (contacts.length === 0) {
    await sendEmail(env, {
      subject: `\u2600\ufe0f Morning Digest \u2014 All clear for ${formatDateLong(today)}`,
      html: allClearHtml(today),
    });
    return;
  }

  await sendEmail(env, {
    subject: `\u2600\ufe0f Morning Digest \u2014 ${contacts.length} follow-up${contacts.length > 1 ? 's' : ''} for ${formatDateLong(today)}`,
    html: buildDigestHtml(contacts, env, today),
  });
}

// ── HubSpot: get contacts where next_follow_up_date = today ──────────────

async function getContactsDueToday(env, today) {
  const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/search', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${env.HUBSPOT_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      filterGroups: [{
        filters: [
          { propertyName: 'next_follow_up_date', operator: 'GTE', value: String(new Date(today + 'T00:00:00Z').getTime()) },
          { propertyName: 'next_follow_up_date', operator: 'LTE', value: String(new Date(today + 'T23:59:59Z').getTime()) },
        ]
      }],
      properties: ['firstname','lastname','phone','email','hs_lead_status','lifecyclestage',
                   'next_follow_up_date','plan_type','funeral_home','lead_source_detail','first_contact_date'],
      sorts: [{ propertyName: 'lastname', direction: 'ASCENDING' }],
      limit: 50,
    }),
  });
  if (!res.ok) throw new Error(`HubSpot search ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.results || [];
}

// ── Action handlers ───────────────────────────────────────────────────────

async function handleApprove(contactId, env) {
  const name = await getContactName(contactId, env);
  const nextDate = addDays(todayStr(), 7);
  try {
    await createNote(contactId, env, 'Follow-up completed via Morning Digest.');
    await updateContact(contactId, env, { next_follow_up_date: nextDate });
  } catch (err) {
    return htmlPage(`<h2 style="color:#c0392b">\u26a0\ufe0f Error</h2><p>Could not update ${escHtml(name)}: ${escHtml(err.message)}</p>`);
  }
  return htmlPage(`<h2 style="color:#27ae60">\u2705 Follow-up logged</h2>
    <p><strong>${escHtml(name)}</strong> marked complete.</p>
    <p>Next follow-up: <strong>${formatDateLong(nextDate)}</strong>.</p>`);
}

async function handleSkip(contactId, env) {
  const name = await getContactName(contactId, env);
  const nextDate = addDays(todayStr(), 3);
  try {
    await updateContact(contactId, env, { next_follow_up_date: nextDate });
  } catch (err) {
    return htmlPage(`<h2 style="color:#c0392b">\u26a0\ufe0f Error</h2><p>Could not update ${escHtml(name)}: ${escHtml(err.message)}</p>`);
  }
  return htmlPage(`<h2 style="color:#e67e22">\u23ed\ufe0f Skipped</h2>
    <p>Follow-up for <strong>${escHtml(name)}</strong> moved to <strong>${formatDateLong(nextDate)}</strong>.</p>`);
}

// ── HubSpot API helpers ───────────────────────────────────────────────────

async function getContactName(contactId, env) {
  try {
    const res = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}?properties=firstname,lastname`,
      { headers: { Authorization: `Bearer ${env.HUBSPOT_TOKEN}` } });
    const d = await res.json();
    const p = d.properties || {};
    return `${p.firstname || ''} ${p.lastname || ''}`.trim() || `Contact ${contactId}`;
  } catch { return `Contact ${contactId}`; }
}

async function updateContact(contactId, env, properties) {
  const res = await fetch(`https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${env.HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ properties }),
  });
  if (!res.ok) throw new Error(`PATCH contact ${res.status}: ${await res.text()}`);
}

async function createNote(contactId, env, body) {
  const res = await fetch('https://api.hubapi.com/crm/v3/objects/notes', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.HUBSPOT_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      properties: { hs_note_body: body, hs_timestamp: new Date().toISOString() },
      associations: [{ to: { id: contactId }, types: [{ associationCategory: 'HUBSPOT_DEFINED', associationTypeId: 202 }] }],
    }),
  });
  if (!res.ok) throw new Error(`Create note ${res.status}: ${await res.text()}`);
}

// ── Resend helper ─────────────────────────────────────────────────────────

async function sendEmail(env, { subject, html }) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: `Morning Digest <${env.FROM_EMAIL}>`, to: [env.TO_EMAIL], subject, html }),
  });
  if (!res.ok) console.error(`Resend error ${res.status}: ${await res.text()}`);
}

async function sendErrorEmail(env, title, detail) {
  await sendEmail(env, {
    subject: `\u26a0\ufe0f Morning Digest Error \u2014 ${title}`,
    html: `<h2 style="color:#c0392b">Morning Digest Error</h2><p><strong>${escHtml(title)}</strong></p><pre style="background:#f8f8f8;padding:12px">${escHtml(detail)}</pre>`,
  });
}

// ── Email HTML ────────────────────────────────────────────────────────────

function buildDigestHtml(contacts, env, today) {
  const cards = contacts.map(c => contactCard(c, env)).join('');
  return `<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background:#f4f4f4;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0" style="padding:24px 0">
<tr><td align="center"><table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%">
  <tr><td style="background:#1a1a2e;border-radius:8px 8px 0 0;padding:24px 32px">
    <p style="margin:0;color:#c9a84c;font-size:12px;letter-spacing:2px;text-transform:uppercase">Cutlip Associates</p>
    <h1 style="margin:8px 0 4px;color:#fff;font-size:22px">\u2600\ufe0f Morning Follow-up Digest</h1>
    <p style="margin:0;color:#8899aa;font-size:14px">${formatDateLong(today)} &mdash; ${contacts.length} contact${contacts.length > 1 ? 's' : ''} need${contacts.length === 1 ? 's' : ''} attention today</p>
  </td></tr>
  ${cards}
  <tr><td style="background:#2c2c3e;border-radius:0 0 8px 8px;padding:16px 32px">
    <p style="margin:0;color:#8899aa;font-size:11px;line-height:1.6">
      <strong style="color:#c9a84c">Approve</strong> = logs follow-up + sets next date in 7 days &nbsp;|&nbsp;
      <strong style="color:#c9a84c">Skip</strong> = pushes 3 days &nbsp;|&nbsp;
      <strong style="color:#c9a84c">Edit</strong> = opens HubSpot record<br>
      Morning Digest Worker &mdash; duanecutlip.com
    </p>
  </td></tr>
</table></td></tr></table></body></html>`;
}

function contactCard(contact, env) {
  const p = contact.properties || {};
  const id = contact.id;
  const name = `${p.firstname || ''} ${p.lastname || ''}`.trim() || 'Unknown';
  const phone = p.phone || '\u2014';
  const stage = p.hs_lead_status || p.lifecyclestage || 'Lead';
  const base = env.WORKER_BASE_URL;
  return `<tr><td style="background:#fff;border-bottom:1px solid #e8e8e8;padding:20px 32px">
    <h2 style="margin:0 0 4px;color:#1a1a2e;font-size:18px">${escHtml(name)}</h2>
    <p style="margin:0 0 8px;color:#555;font-size:14px">
      \ud83d\udcde ${escHtml(phone)} &nbsp;
      <span style="background:#e8f4fd;color:#1a6fa8;padding:2px 8px;border-radius:12px;font-size:12px">${escHtml(stage)}</span>
    </p>
    <p style="margin:0 0 14px;color:#777;font-size:13px">${escHtml(p.plan_type || '\u2014')} &nbsp;|&nbsp; ${escHtml(p.funeral_home || '\u2014')} &nbsp;|&nbsp; ${escHtml(p.lead_source_detail || '\u2014')}</p>
    <a href="${base}/approve/${id}" style="display:inline-block;background:#27ae60;color:#fff;text-decoration:none;padding:8px 16px;border-radius:5px;font-size:13px;margin-right:6px">\u2705 Approve &amp; Log</a>
    <a href="${base}/skip/${id}" style="display:inline-block;background:#e67e22;color:#fff;text-decoration:none;padding:8px 16px;border-radius:5px;font-size:13px;margin-right:6px">\u23ed\ufe0f Skip (+3 days)</a>
    <a href="${base}/edit/${id}" style="display:inline-block;background:#7f8c8d;color:#fff;text-decoration:none;padding:8px 16px;border-radius:5px;font-size:13px">\u270f\ufe0f Edit in HubSpot</a>
  </td></tr>`;
}

function allClearHtml(today) {
  return `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:600px;margin:40px auto;padding:0 20px;text-align:center">
    <div style="background:#1a1a2e;border-radius:8px;padding:24px 32px">
      <h1 style="color:#c9a84c;margin:0 0 8px">\u2600\ufe0f All Clear</h1>
      <p style="color:#fff;margin:0">${formatDateLong(today)} &mdash; No follow-ups scheduled today.</p>
    </div></body></html>`;
}

// ── Utilities ─────────────────────────────────────────────────────────────

function todayStr() { return new Date().toISOString().split('T')[0]; }

function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().split('T')[0];
}

function formatDateLong(dateStr) {
  return new Date(dateStr + 'T12:00:00Z').toLocaleDateString('en-US',
    { weekday: 'long', month: 'long', day: 'numeric', timeZone: 'UTC' });
}

function escHtml(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

function htmlPage(body) {
  return new Response(
    `<!DOCTYPE html><html><body style="font-family:Arial,sans-serif;max-width:500px;margin:60px auto;padding:0 20px;text-align:center">${body}<p style="color:#aaa;font-size:12px;margin-top:24px">You can close this tab.</p></body></html>`,
    { headers: { 'Content-Type': 'text/html' } }
  );
}
