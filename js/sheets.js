/**
 * Lightweight Google Sheets loader.
 * Uses the public CSV export endpoint — no API key required.
 * The sheet must be published: File → Share → Publish to web → CSV.
 */

function loadSheetCSV(spreadsheetId, callback) {
  var url = "https://docs.google.com/spreadsheets/d/" + spreadsheetId + "/export?format=csv&gid=0";
  fetch(url)
    .then(function (res) {
      if (!res.ok) throw new Error("HTTP " + res.status);
      return res.text();
    })
    .then(function (text) {
      callback(null, parseCSV(text));
    })
    .catch(function (err) {
      console.error("loadSheetCSV:", err);
      callback(err, null);
    });
}

function parseCSV(text) {
  var rows = [];
  var row = [];
  var cell = "";
  var inQuote = false;

  for (var i = 0; i < text.length; i++) {
    var ch = text[i];
    if (ch === '"') {
      if (inQuote && text[i + 1] === '"') {
        cell += '"';
        i++;
      } else {
        inQuote = !inQuote;
      }
    } else if (ch === "," && !inQuote) {
      row.push(cell.trim());
      cell = "";
    } else if (ch === "\n" && !inQuote) {
      row.push(cell.trim());
      if (row.length > 0) rows.push(row);
      row = [];
      cell = "";
    } else if (ch === "\r") {
      // skip carriage return
    } else {
      cell += ch;
    }
  }
  if (cell || row.length) {
    row.push(cell.trim());
    rows.push(row);
  }
  return rows;
}

/** Build a <select> filter from unique values in a column. */
function buildTypeFilter(selectId, rows, colIndex) {
  var select = document.getElementById(selectId);
  if (!select) return;
  var seen = {};
  var types = [];
  rows.forEach(function (r) {
    var v = (r[colIndex] || "").trim();
    if (v && !seen[v]) { seen[v] = true; types.push(v); }
  });
  types.sort();
  types.forEach(function (t) {
    var opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    select.appendChild(opt);
  });
}

/** Safely escape a string for insertion into HTML. */
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
