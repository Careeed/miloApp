// MILO - ponte tra l'app e il Foglio Google (database condiviso)
const NOME_FOGLIO = 'Dati';

function foglio_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let s = ss.getSheetByName(NOME_FOGLIO);
  if (!s) { s = ss.insertSheet(NOME_FOGLIO); s.appendRow(['chiave', 'valore', 'aggiornato']); }
  return s;
}

function doGet() {
  const r = foglio_().getDataRange().getValues(), o = {};
  for (let i = 1; i < r.length; i++) o[r[i][0]] = r[i][1];
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const d = JSON.parse(e.postData.contents), s = foglio_();
    const r = s.getDataRange().getValues();
    let riga = -1;
    for (let i = 1; i < r.length; i++) if (r[i][0] === d.key) { riga = i + 1; break; }
    if (d.value === null) { if (riga > 0) s.deleteRow(riga); }
    else {
      const v = JSON.stringify(d.value);
      if (riga > 0) s.getRange(riga, 2, 1, 2).setValues([[v, new Date()]]);
      else s.appendRow([d.key, v, new Date()]);
    }
  } finally { lock.releaseLock(); }
  return ContentService.createTextOutput('ok');
}
