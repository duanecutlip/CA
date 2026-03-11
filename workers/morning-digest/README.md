# Morning Digest Worker

Cloudflare Worker that runs at 7am daily, queries HubSpot for contacts
with `next_follow_up_date` = today, and emails Duane a digest with
Approve / Skip / Edit buttons for each contact.

## How It Works

1. **Cron fires at 7am** (12:00 UTC / 11:00 UTC during daylight saving)
2. Queries HubSpot contacts where `next_follow_up_date` = today
3. Sends a digest email via Resend to `duanecutlip@gmail.com`
4. Each contact card has three action links:
   - **Approve** — logs a note on the contact, sets next follow-up +7 days
   - **Skip** — pushes next follow-up date out +3 days
   - **Edit** — redirects to the HubSpot contact record

## Setup

### 1. Install Wrangler (if not already installed)
```bash
npm install -g wrangler
wrangler login
```

### 2. Add secrets
```bash
cd workers/morning-digest
wrangler secret put HUBSPOT_TOKEN
# Paste your HubSpot Private App token when prompted

wrangler secret put RESEND_API_KEY
# Paste your Resend API key when prompted
```

### 3. (Optional) Update WORKER_BASE_URL in wrangler.toml
After first deploy, Cloudflare will give you a workers.dev URL.
Update `WORKER_BASE_URL` in `wrangler.toml` to match.

### 4. Deploy
```bash
wrangler deploy
```

### 5. Test manually
Trigger the digest without waiting for 7am:
```bash
wrangler dev
# In another terminal:
curl "http://localhost:8787/__scheduled?cron=0+12+*+*+*"
```

## HubSpot Setup

The worker reads the custom contact property `next_follow_up_date`.
Set this date on any contact to include them in the next morning digest.

To set a follow-up date on a contact:
- Open the contact in HubSpot
- Find "Next Follow-up Date" under the Preneed Information property group
- Set the date

## Daylight Saving Time Note

The cron in `wrangler.toml` is set to `0 12 * * *` (12:00 UTC = 7:00 AM EST).
During EDT (mid-March through early November), change this to `0 11 * * *`
to keep the 7:00 AM local time, then redeploy.

## Environment Variables

| Variable | Where to Set | Value |
|---|---|---|
| `HUBSPOT_TOKEN` | `wrangler secret put` | HubSpot Private App token |
| `RESEND_API_KEY` | `wrangler secret put` | Resend API key |
| `TO_EMAIL` | `wrangler.toml` [vars] | duanecutlip@gmail.com |
| `FROM_EMAIL` | `wrangler.toml` [vars] | digest@duanecutlip.com |
| `HUBSPOT_PORTAL_ID` | `wrangler.toml` [vars] | 1250503 |
| `WORKER_BASE_URL` | `wrangler.toml` [vars] | Your workers.dev URL after deploy |
