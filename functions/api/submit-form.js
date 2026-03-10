import { PDFDocument } from 'pdf-lib';

/**
 * Cloudflare Pages Function — POST /api/submit-form
 * Fills the biographic PDF template and emails it via Resend.
 *
 * Env vars to set in Cloudflare Pages > Settings > Environment Variables:
 *   RESEND_API_KEY  — get from resend.com (free, ~2 min setup)
 *   TO_EMAIL        — defaults to duanecutlip@gmail.com
 *   FROM_EMAIL      — defaults to "Preneed Intake <onboarding@resend.dev>"
 *                     Once cutlipassociates.com is on Cloudflare DNS, change to:
 *                     "Preneed Form <forms@cutlipassociates.com>"
 */

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function onRequestOptions() {
  return new Response(null, { status: 204, headers: CORS });
}

export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const data = await request.json();

    // 1. Load blank PDF template via the Pages ASSETS binding
    const templateUrl = new URL('/forms/biographic-template.pdf', request.url);
    const pdfResponse = env.ASSETS
      ? await env.ASSETS.fetch(new Request(templateUrl))
      : await fetch(templateUrl.toString());
    if (!pdfResponse.ok) throw new Error('Could not load PDF template');
    const pdfBytes = await pdfResponse.arrayBuffer();

    // 2. Fill fields
    const pdfDoc = await PDFDocument.load(pdfBytes);
    const form = pdfDoc.getForm();

    const setText = (name, value) => {
      if (!value) return;
      try { form.getTextField(name).setText(String(value)); } catch (_) {}
    };
    const checkField = (name) => {
      try { form.getCheckBox(name).check(); } catch (_) {}
    };

    setText('Full Name',      data.fullName);
    setText('Date of Birth',  data.dob);
    setText('Address',        data.address);
    setText('City',           data.city);
    setText('State',          data.state);
    setText('Zip',            data.zip);
    setText('County',         data.county);
    setText('Phone',          data.phone);
    setText('cell',           data.cell);
    setText('Email Address',  data.email);
    setText('Marital Status', data.maritalStatus);
    setText('Occupation',     data.occupation);
    setText('Veteran',        data.military === 'yes' ? 'Yes' : data.military === 'no' ? 'No' : '');
    setText("Father's Name",  data.fatherName);
    setText("Mother's Name",  data.motherName);
    setText('Spouse',         data.spouseName);
    if (data.children) setText('Sons', data.children);
    setText('Church',         data.church);
    setText('Minister',       data.minister);
    setText('Cemetery',       data.cemetery);
    setText('NOTESRow0',      data.notes);
    setText('Ins Co',         'Great Western Insurance Co (Wellabe), Des Moines, IA');

    if (data.disposition === 'burial')     checkField('Disp Burial');
    if (data.disposition === 'cremation')  checkField('Disp Cremation');
    if (data.disposition === 'entombment') checkField('Disp Entomb');

    if (data.fillingFor === 'other') {
      setText('Informant',          data.pocName);
      setText('Informant Relation', data.pocRelation);
      setText('Telephone',          data.pocPhone);
      setText('Email Address 0',    data.pocEmail);
      setText('Informant Address',  data.pocAddress);
    }

    // 3. Serialize filled PDF to base64
    const filled = await pdfDoc.save();
    const b64 = btoa(Array.from(new Uint8Array(filled)).map(b => String.fromCharCode(b)).join(''));
    const fname = `preneed-${(data.fullName || 'intake').replace(/[^a-zA-Z0-9]/g, '-')}-${new Date().toISOString().slice(0,10)}.pdf`;

    // 4. Build HTML email
    const row = (label, val) => val
      ? `<tr><td style="padding:3px 12px 3px 0;font-weight:600;white-space:nowrap;vertical-align:top">${label}:</td><td style="padding:3px 0">${val}</td></tr>`
      : '';
    const pocRow = data.fillingFor === 'other'
      ? `<tr style="background:#f5f0eb"><td colspan="2" style="padding:8px"><strong>Point of Contact:</strong> ${data.pocName||''} (${data.pocRelation||''}) &mdash; ${data.pocPhone||''} / ${data.pocEmail||''}</td></tr>`
      : '';
    const html = `<div style="font-family:Georgia,serif;max-width:600px;color:#2d2d2d">
<h2 style="color:#1a5c52;border-bottom:2px solid #1a5c52;padding-bottom:8px">New Preneed Inquiry: ${data.fullName||'(no name)'}</h2>
<table style="border-collapse:collapse;width:100%">
${pocRow}
${row('Name', data.fullName)}${row('Date of Birth', data.dob)}${row('Phone', data.phone)}${row('Cell', data.cell)}
${row('Email', data.email)}${row('Address', [data.address,data.city,data.state,data.zip].filter(Boolean).join(', '))}
${row('County', data.county)}${row('Marital Status', data.maritalStatus)}${row('Occupation', data.occupation)}
${row('Military', data.military==='yes'?'Yes':data.military==='no'?'No':'')}${row('Disposition', data.disposition)}
${row('Cemetery', data.cemetery)}${row("Father's Name", data.fatherName)}${row("Mother's Name", data.motherName)}
${row('Spouse', data.spouseName)}${row('Children', data.children)}${row('Church', data.church)}
${row('Minister', data.minister)}${row('Notes', data.notes)}
</table>
<p style="margin-top:16px;padding:12px;background:#f5f0eb;border-radius:6px;font-size:13px;color:#555">Pre-filled PDF attached. Open in Adobe Acrobat to complete remaining fields at the appointment.</p>
</div>`;

    // 5. Send via Resend
    const apiKey    = env.RESEND_API_KEY;
    const toEmail   = env.TO_EMAIL    || 'duanecutlip@gmail.com';
    const fromEmail = env.FROM_EMAIL  || 'Preneed Intake <onboarding@resend.dev>';
    let emailSent   = false;

    if (apiKey) {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from: fromEmail, to: [toEmail],
          subject: `New Preneed Inquiry: ${data.fullName || 'Unknown'}`,
          html,
          attachments: [{ filename: fname, content: b64 }],
        }),
      });
      if (!res.ok) console.error('[submit-form] Resend error:', await res.text());
      else emailSent = true;
    } else {
      console.warn('[submit-form] RESEND_API_KEY not set — email not sent. See PR notes for setup.');
    }

    return new Response(
      JSON.stringify({ success: true, emailSent }),
      { status: 200, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );

  } catch (err) {
    console.error('[submit-form]', err);
    return new Response(
      JSON.stringify({ success: false, error: String(err) }),
      { status: 500, headers: { ...CORS, 'Content-Type': 'application/json' } }
    );
  }
}
