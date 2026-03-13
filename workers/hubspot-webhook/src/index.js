/**
 * HubSpot → Google Sheets Webhook (Standalone Cloudflare Worker)
 * Route: duanecutlip.com/api/hubspot-webhook
 *
 * Triggered by HubSpot when a deal stage changes to Closed Won.
 * Fetches full deal + contact data, maps to spreadsheet columns A-X,
 * then calls the Google Apps Script web app to append the row.
 *
 * Secrets (set via wrangler secret put):
 *   HUBSPOT_TOKEN            — HubSpot Private App token
 *   GOOGLE_SHEETS_WEBHOOK_URL — Google Apps Script web app URL
 */

export default {
  async fetch(request, env) {
    if (request.method === 'GET') {
      return new Response('HubSpot webhook endpoint is active.', { status: 200 });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405 });
    }

    let events;
    try { events = await request.json(); } catch { return new Response('Bad JSON', { status: 400 }); }

    if (!Array.isArray(events)) events = [events];

    const closedWonEvents = events.filter(e =>
      e.subscriptionType === 'deal.propertyChange' &&
      e.propertyName === 'dealstage' &&
      isClosedWon(e.propertyValue)
    );

    if (closedWonEvents.length === 0) {
      return new Response('OK - no closed won events', { status: 200 });
    }

    const results = await Promise.allSettled(
      closedWonEvents.map(e => processDeal(e.objectId, env))
    );

    const errors = results.filter(r => r.status === 'rejected').map(r => r.reason?.message);
    if (errors.length > 0) console.error('Webhook errors:', errors);

    return new Response(JSON.stringify({ processed: closedWonEvents.length, errors }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};

async function processDeal(dealId, env) {
  const hs = env.HUBSPOT_TOKEN;

  const dealRes = await fetch(
    `https://api.hubapi.com/crm/v3/objects/deals/${dealId}?properties=` +
    'amount,closedate,dealstage,description,hs_deal_description,' +
    'insurance_carrier,calls_to_close,face_value,' +
    'price_tier,plan_type,product_type,policy_delivered_date,funeral_home',
    { headers: { Authorization: `Bearer ${hs}` } }
  );
  if (!dealRes.ok) throw new Error(`Get deal ${dealId}: ${dealRes.status}`);
  const deal = await dealRes.json();
  const dp = deal.properties || {};

  const assocRes = await fetch(
    `https://api.hubapi.com/crm/v3/objects/deals/${dealId}/associations/contacts`,
    { headers: { Authorization: `Bearer ${hs}` } }
  );
  const assocData = assocRes.ok ? await assocRes.json() : { results: [] };
  const contactId = assocData.results?.[0]?.id;

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

  const closeDate = dp.closedate ? new Date(parseInt(dp.closedate)) : new Date();
  const month = closeDate.getUTCMonth() + 1;
  const contAmount = parseFloat(dp.amount || 0);
  const rateDecimal = gwCommissionRate(parseInt(cp.age || 0), dp.product_type || '');
  const commDollars = Math.round(contAmount * rateDecimal * 100) / 100;

  const row = [
    dp.funeral_home || cp.funeral_home || '',
    dp.insurance_carrier || cp.insurance_carrier || '',
    cp.firstname || '',
    cp.lastname || '',
    cp.address || '',
    cp.city || '',
    cp.state || '',
    cp.zip || '',
    formatSheetDate(cp.first_contact_date),
    cp.phone || '',
    cp.age || '',
    mapPayment(dp.payment_type || cp.payment_type),
    mapOwner(cp.owner_insured_rel),
    mapPlanType(dp.plan_type || cp.plan_type),
    mapSource(cp.lead_source_detail),
    dp.calls_to_close || '',
    mapPriceTier(dp.price_tier),
    dp.policy_delivered_date ? 'Y' : 'N',
    contAmount || '',
    parseFloat(dp.face_value || 0) || '',
    rateDecimal || '',
    commDollars || '',
    dp.description || dp.hs_deal_description || '',
    month,
  ];

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

function isClosedWon(v) {
  if (!v) return false;
  const s = v.toLowerCase();
  return s === 'closedwon' || s.includes('won') || s === 'closed_won';
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
// Great Western commission rate lookup — age + product type → decimal rate
function gwCommissionRate(age, productType) {
  const pt = (productType || '').toLowerCase();
  const col = pt.includes('voyage') ? 1 : pt.includes('single') ? 0 : 2; // default Course

  // [Single, Voyage, Course]
  const brackets = [
    [35,  0.162, 0.213, 0.213],
    [45,  0.169, 0.228, 0.238],
    [50,  0.181, 0.239, 0.272],
    [55,  0.201, 0.264, 0.322],
    [60,  0.230, 0.299, 0.382],
    [65,  0.192, 0.262, 0.362],
    [70,  0.166, 0.227, 0.304],
    [75,  0.157, 0.209, 0.267],
    [80,  0.120, 0.163, 0.209],
    [87,  0.052, 0.071, 0.102],
    [100, 0.010, 0,     0    ],
  ];

  for (const [maxAge, s, v, c] of brackets) {
    if (age <= maxAge) return [s, v, c][col];
  }
  return 0.010; // fallback for age > 100
}

function formatSheetDate(val) {
  if (!val) return '';
  const ts = parseInt(val);
  if (!isNaN(ts) && ts > 1000000000000) {
    return new Date(ts).toLocaleDateString('en-US', { timeZone: 'UTC' });
  }
  if (/^\d{4}-\d{2}-\d{2}$/.test(val)) {
    const [y, m, d] = val.split('-');
    return `${m}/${d}/${y}`;
  }
  return val;
}
