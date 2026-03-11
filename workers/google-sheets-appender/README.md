# HubSpot → Google Sheets Webhook

When a deal moves to **Closed Won** in HubSpot, this system automatically
appends a row to the current year tab in the Google Sheet — matching the
exact column order (A through X) of your existing spreadsheet.

## Architecture

```
HubSpot Deal → Closed Won
        ↓
HubSpot Webhook (POST)
        ↓
Cloudflare Pages Function: /api/hubspot-webhook
        ↓  (fetches deal + contact data from HubSpot API)
Google Apps Script Web App
        ↓
Google Sheet: current year tab, next empty row
```

## Setup

### Step 1: Deploy the Google Apps Script

1. Open your Google Sheet:
   https://docs.google.com/spreadsheets/d/1RN_KPlNJ3W9O12ahueAH7FRy8gl20ZutoNWdox9rk8k

2. Click **Extensions → Apps Script**

3. Delete any existing code in the editor

4. Open `appscript.js` from this folder and paste ALL of it into the editor

5. Click **Save** (disk icon), name the project "HubSpot Webhook"

6. Click **Deploy → New deployment**
   - Type: **Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
   - Click **Deploy**

7. Copy the **Web app URL** (looks like: https://script.google.com/macros/s/XXXX/exec)

8. In Cloudflare Pages → duanecutlip.com → Settings → Environment Variables:
   Add: `GOOGLE_SHEETS_WEBHOOK_URL` = (paste the URL)

9. Test it: In the Apps Script editor, run the `testWebhook()` function.
   Check your Google Sheet for a TEST row.

### Step 2: Configure HubSpot Webhook

1. In HubSpot: **Settings → Integrations → Private Apps**
2. Open (or create) the **Morning Digest & Webhook** Private App
3. Click the **Webhooks** tab
4. Set Target URL: `https://duanecutlip.com/api/hubspot-webhook`
5. Click **Add subscription**:
   - Object: **Deal**
   - Event: **Property value changed**
   - Property: **Deal Stage**
6. Save
7. Copy the **Webhook secret** shown on this page
8. In Cloudflare Pages env vars, add: `HUBSPOT_WEBHOOK_SECRET` = (paste secret)

### Step 3: Add Cloudflare env vars (if not already done)

In Cloudflare Pages → duanecutlip.com → Settings → Environment Variables:

| Variable | Value |
|---|---|
| `HUBSPOT_TOKEN` | Your HubSpot Private App token |
| `GOOGLE_SHEETS_WEBHOOK_URL` | Apps Script web app URL |
| `HUBSPOT_WEBHOOK_SECRET` | Webhook secret from HubSpot |

### Step 4: Test end-to-end

1. Create a test contact + deal in HubSpot
2. Move the deal to **Closed Won**
3. Wait ~30 seconds
4. Check your Google Sheet for a new row in the current year tab
5. Check Cloudflare Pages Function logs for any errors

## Column Mapping

| Sheet Col | Field | Source |
|---|---|---|
| A | FH (Funeral Home) | Deal or Contact: funeral_home |
| B | INS (Insurance Carrier) | Deal or Contact: insurance_carrier |
| C | FName | Contact: firstname |
| D | LName | Contact: lastname |
| E | Addr | Contact: address |
| F | City | Contact: city |
| G | ST | Contact: state |
| H | ZIP | Contact: zip |
| I | ISSUE (First Contact) | Contact: first_contact_date → MM/DD/YYYY |
| J | PHONE | Contact: phone |
| K | AGE | Contact: age |
| L | PAY | Payment Type → S or M |
| M | O/M | Owner Insured Rel → O or M |
| N | TYPE | Plan Type → T or C |
| O | SRC | Lead Source Detail → W/R/S/L/A/D |
| P | C2C | Deal: calls_to_close |
| Q | 4-12 | Price Tier → X/mid/4 |
| R | PD | Policy Delivered Date → Y or N |
| S | CONT | Deal: amount (contract/premium) |
| T | FACE | Deal: face_value |
| U | RATE | Commission Rate → decimal (0.12) |
| V | COMM | Calculated: CONT x RATE |
| W | NOTES | Deal: description |
| X | MO | Month from Close Date (1-12) |
