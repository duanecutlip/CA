/**
 * Google Apps Script — paste into Extensions > Apps Script in the Google Sheet
 * Deploy as Web App: Execute as Me, Anyone can access
 * Copy the deployment URL → add as GOOGLE_SHEETS_WEBHOOK_URL in Cloudflare Pages env vars
 */

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const tabName = data.tab || new Date().getFullYear().toString();
    const row = data.row;

    if (!row || !Array.isArray(row)) {
      throw new Error('Missing or invalid row data');
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(tabName);

    if (!sheet) {
      // Create the new year tab and copy header from previous year
      sheet = ss.insertSheet(tabName);
      const sheets = ss.getSheets()
        .filter(s => /^\d{4}$/.test(s.getName()))
        .sort((a, b) => parseInt(b.getName()) - parseInt(a.getName()));
      if (sheets.length > 1) {
        const prev = sheets[1]; // second in list = previous year
        const headerRange = prev.getRange(1, 1, 1, prev.getLastColumn());
        sheet.getRange(1, 1, 1, headerRange.getNumColumns())
          .setValues(headerRange.getValues());
      }
    }

    // Append after last data row (skip header at row 1)
    const lastRow = Math.max(sheet.getLastRow(), 1);
    sheet.getRange(lastRow + 1, 1, 1, row.length).setValues([row]);

    return ContentService
      .createTextOutput(JSON.stringify({ success: true, tab: tabName, row: lastRow + 1 }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run manually in Apps Script editor to verify
function testWebhook() {
  const testData = {
    tab: new Date().getFullYear().toString(),
    row: ['TEST FH','GW','John','Doe','123 Main St','Raleigh','NC','27601',
          '01/15/2026','(919) 555-1234','68','S','O','T','R','2','mid','N',
          5000,15000,0.12,600,'Test entry',3]
  };
  const e = { postData: { contents: JSON.stringify(testData) } };
  const result = doPost(e);
  Logger.log(result.getContent());
}
