/**
 * HubSpot → Google Sheets Webhook
 * Cloudflare Pages Function: POST /api/hubspot-webhook
 *
 * Triggered by HubSpot when a deal stage changes to Closed Won.
 * Fetches full deal + contact data, maps to spreadsheet columns A-X,
 * then calls the Google Apps Script web app to append the row.
 *
 * Env vars (Cloudflare Pages → Settings → Environment Variables):
 *   HUBSPOT_TOKEN            — HubSpot Private App token
 *   GOOGLE_SHEETS_WEBHOOK_URL — Google Apps Script web app URL
 *   HUBSPOT_WEBHOOK_SECRET   — (optional) HubSpot webhook secret for verification
 */

export async function onRequestPost({ request, env }) {
  // ── Signature verification (optional but recommended) ─────────────────
  const secret = env.HUBSPOT_WEBHOOK_SECRET;
  if (secret) {
    const sig = request.headers.get('X-HubSpot-Signature-v3') || '';
    const rawBody = await request.text();
    const valid = await verifySignature(secret, rawBody, sig);
    if (!valid) {
      console.warn('HubSpot webhook: invalid signature');
      return new Response('Unauthorized', { status: 401 });
    }
    // Parse body from text since we already consumed the stream
    var events;
    try { events = JSON.parse(rawBody); } catch { return new Response('Bad JSON', { status: 400 }); }
  } else {
    var events;
    try { events = await request.json(); } catch { return new Response('Bad JSON', { status: 400 }); }
  }

  // HubSpot sends an array of subscription events
  if (!Array.isArray(events)) events = [events];

  // Filter for deal stage changed to Closed Won
  const closedWonEvents = events.filter(e =>
    e.subscriptionType === 'deal.propertyChange' &&
    e.propertyName === 'dealstage' &&
    isClosedWon(e.propertyValue)
  );

  if (closedWonEvents.length === 0) {
    return new Response('OK - no closed won events', { status: 200 });
  }

  // Process each closed won deal
  const results = await Promise.allSettled(
    closedWonEvents.map(e => processDeal(e.objectId, env))
  );

  const errors = results.filter(r => r.status === 'rejected').map(r => r.reason?.message);
  if (errors.length > 0) {
    console.error('Webhook errors:', errors);
  }

  return new Response(JSON.stringify({ processed: closedWonEvents.length, errors }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

// ── Deal processing ───────────────────────────────────────────────────────

async function processDeal(dealId, env) {
  const hs = env.HUBSPOT_TOKEN;

  // 1. Get deal properties
  const dealRes = await fetch(
    `https://api.hubapi.com/crm/v3/objects/deals/${dealId}?properties=` +
    'amount,closedate,dealstage,description,hs_deal_description,' +
    'insurance_carrier,calls_to_close,face_value,commission_rate,' +
    'price_tier,plan_type,payment_type,policy_delivered_date,funeral_home',
    { headers: { Authorization: `Bearer ${hs}` } }
  );
  if (!dealRes.ok) throw new Error(`Get deal ${dealId}: ${dealRes.status}`);
  const deal = await dealRes.json();
  const dp = deal.properties || {};

  // 2. Get associated contacts
  const assocRes = await fetch(
    `https://api.hubapi.com/crm/v3/objects/deals/${dealId}/associations/contacts`,
    { headers: { Authorization: `Bearer ${hs}` } }
  );
  const assocData = assocRes.ok ? await assocRes.json() : { results: [] };
  const contactId = assocData.results?.[0]?.id;

  // 3. Get contact properties
  let cp = {};
  if (contactId) {
    const contactRes = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}?properties=` +
      'firstname,lastname,address,city,state,zip,phone,' +
      'funeral_home,insurance_carrier,first_contact_date,age,' +
      'owner_insured_rel,lead_source_detail,plan_type,payment_type',
      { headers: { Authorization: `Bearer ${hs}` } }
    );
    if (contactRes.ok) {
      const c = await contactRes.json();
      cp = c.properties || {};
    }
  }

  // 4. Build the row (columns A-X)
  const closeDate = dp.closedate ? new Date(parseInt(dp.closedate)) : new Date();
  const month = closeDate.getUTCMonth() + 1; // 1-12

  const contAmount = parseFloat(dp.amount || 0);
  const ratePercent = parseFloat(dp.commission_rate || 0);
  const rateDecimal = ratePercent / 100;
  const commDollars = Math.round(contAmount * rateDecimal * 100) / 100;

  const row = [
    // A: FH — prefer deal-level, fall back to contact
    dp.funeral_home || cp.funeral_home || '',
    // B: INS
    dp.insurance_carrier || cp.insurance_carrier || '',
    // C: FName
    cp.firstname || '',
    // D: LName
    cp.lastname || '',
    // E: Addr
    cp.address || '',
    // F: City
    cp.city || '',
    // G: ST
    cp.state || '',
    // H: ZIP
    cp.zip || '',
    // I: ISSUE (First Contact Date) → MM/DD/YYYY
    formatSheetDate(cp.first_contact_date),
    // J: PHONE
    cp.phone || '',
    // K: AGE
    cp.age || '',
    // L: PAY (S=Single, M=Modal)
    mapPayment(dp.payment_type || cp.payment_type),
    // M: O/M (O=Owner/Self, M=Family Member)
    mapOwner(cp.owner_insured_rel),
    // N: TYPE (T=Traditional, C=Cremation)
    mapPlanType(dp.plan_type || cp.plan_type),
    // O: SRC
    mapSource(cp.lead_source_detail),
    // P: C2C (calls to close)
    dp.calls_to_close || '',
    // Q: 4-12 (price tier)
    mapPriceTier(dp.price_tier),
    // R: PD (policy delivered Y/N)
    dp.policy_delivered_date ? 'Y' : 'N',
    // S: CONT (contract/premium amount)
    contAmount || '',
    // T: FACE (face value)
    parseFloat(dp.face_value || 0) || '',
    // U: RATE (commission rate as decimal)
    rateDecimal || '',
    // V: COMM (commission dollars)
    commDollars || '',
    // W: NOTES
    dp.description || dp.hs_deal_description || '',
    // X: MO (month number)
    month,
  ];

  // 5. Send to Google Sheets via Apps Script
  const year = closeDate.getUTCFullYear().toString();
  const sheetsRes = await fetch(env.GOOGLE_SHEETS_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tab: year, row }),
  });

  if (!sheetsRes.ok) {
    const text = await sheetsRes.text();
    throw new Error(`Google Sheets append failed: ${sheetsRes.status} ${text}`);
  }

  const result = await sheetsRes.json();
  console.log(`Deal ${dealId} → Sheet row ${result.row} on tab ${year}`);
  return result;
}

// ── Field mappers ─────────────────────────────────────────────────────────

function isClosedWon(stageValue) {
  if (!stageValue) return false;
  const v = stageValue.toLowerCase();
  return v === 'closedwon' || v.includes('won') || v === 'closed_won';
}

function mapPayment(val) {
  if (!val) return '';
  const v = val.toLowerCase();
  if (v.includes('single')) return 'S';
  if (v.includes('modal') || v.includes('monthly')) return 'M';
  return val;
}

function mapOwner(val) {
  if (!val) return '';
  const v = val.toLowerCase();
  if (v.includes('self') || v.includes('owner')) return 'O';
  if (v.includes('family')) return 'M';
  return val;
}

function mapPlanType(val) {
  if (!val) return '';
  const v = val.toLowerCase();
  if (v.includes('trad')) return 'T';
  if (v.includes('crem')) return 'C';
  return val;
}

function mapSource(val) {
  if (!val) return '';
  const v = val.toLowerCase();
  if (v.includes('walk')) return 'W';
  if (v.includes('referral')) return 'R';
  if (v.includes('seminar')) return 'S';
  if (v.includes('landing') || v.includes('online')) return 'L';
  if (v.includes('aftercare')) return 'A';
  if (v.includes('direct') || v.includes('mail')) return 'D';
  return val;
}

function mapPriceTier(val) {
  if (!val) return '';
  const v = val.toLowerCase();
  if (v.includes('over') || v.includes('12k') || v.includes('12,')) return 'X';
  if (v.includes('4500') || v.includes('mid')) return 'mid';
  if (v.includes('under') || v.includes('4')) return '4';
  return val;
}

function formatSheetDate(val) {
  if (!val) return '';
  const ts = parseInt(val);
  if (!isNaN(ts) && ts > 1000000000000) {
    return new Date(ts).toLocaleDateString('en-US', { timeZone: 'UTC' });
  }
  // Already YYYY-MM-DD string
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
    const [y, m, d] = val.split('-');
    return `${m}/${d}/${y}`;
  }
  return val;
}

// ── HMAC signature verification ───────────────────────────────────────────

async function verifySignature(secret, payload, signature) {
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw', enc.encode(secret),
      { name: 'HMAC', hash: 'SHA-256' }, false, ['verify']
    );
    const sigBytes = hexToBytes(signature.replace('sha256=', ''));
    return await crypto.subtle.verify('HMAC', key, sigBytes, enc.encode(payload));
  } catch { return false; }
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < hex.length; i += 2) {
    bytes[i / 2] = parseInt(hex.slice(i, i + 2), 16);
  }
  return bytes;
}
