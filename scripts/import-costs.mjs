// Adds reviewed cost reports to src/data/cost-reports.json.
//
// 1. In Netlify: Forms → cost-report → download the submissions as CSV.
// 2. Delete any rows you don't want published (spam, jokes, names, medical details).
// 3. Run:  node scripts/import-costs.mjs path/to/cost-report.csv
// 4. Check the diff, then build, commit and merge as usual.
//
// Rows already imported are skipped, so the same export can be used again.
import { readFileSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { CARE, COVERAGE, CURRENCIES } from '../src/cost-database.mjs';

const file = process.argv[2];
if (!file) {
  console.error('Usage: node scripts/import-costs.mjs <netlify-export.csv>');
  process.exit(1);
}

// A small CSV parser (quoted fields, commas and newlines inside quotes).
function parseCsv(text) {
  const rows = [];
  let row = [], field = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (c === '"') q = false;
      else field += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(field); field = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field); rows.push(row); row = []; field = '';
    } else field += c;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim()));
}

const clean = (s, max) => String(s || '').replace(/[<>]/g, '').replace(/\s+/g, ' ').trim().slice(0, max);
const num = (s) => {
  const n = Number(String(s || '').replace(/[^0-9.]/g, ''));
  return String(s || '').trim() === '' || !Number.isFinite(n) ? null : Math.round(n);
};

const [header, ...lines] = parseCsv(readFileSync(file, 'utf8'));
const col = Object.fromEntries(header.map((h, i) => [h.trim().toLowerCase(), i]));
const get = (r, k) => (col[k] === undefined ? '' : r[col[k]]);

const path = new URL('../src/data/cost-reports.json', import.meta.url);
const data = JSON.parse(readFileSync(path, 'utf8'));
const have = new Set(data.reports.map((r) => r.id));
const thisYear = new Date().getUTCFullYear();
let added = 0;
const rejected = [];

for (const r of lines) {
  if (get(r, 'company')) { rejected.push('honeypot filled (spam)'); continue; }
  const rep = {
    provider: clean(get(r, 'provider'), 120),
    city: clean(get(r, 'city'), 80),
    region: clean(get(r, 'region'), 80),
    country: clean(get(r, 'country'), 60),
    care: clean(get(r, 'care'), 30),
    year: num(get(r, 'year')),
    paid: num(get(r, 'paid')),
    billed: num(get(r, 'billed')),
    currency: clean(get(r, 'currency'), 3).toUpperCase() || 'USD',
    coverage: clean(get(r, 'coverage'), 30),
  };
  const problems = [];
  for (const k of ['provider', 'city', 'region', 'country']) if (!rep[k]) problems.push(`no ${k}`);
  if (!CARE[rep.care]) problems.push(`unknown care "${rep.care}"`);
  if (!COVERAGE[rep.coverage]) problems.push(`unknown coverage "${rep.coverage}"`);
  if (!CURRENCIES.includes(rep.currency)) problems.push(`unknown currency "${rep.currency}"`);
  if (!rep.year || rep.year < thisYear - 15 || rep.year > thisYear) problems.push(`year ${rep.year}`);
  if (rep.paid === null) problems.push('no amount paid');
  if (rep.billed !== null && rep.paid !== null && rep.billed < rep.paid) problems.push('billed is less than paid');
  if (problems.length) { rejected.push(`${rep.provider || '(no provider)'}: ${problems.join(', ')}`); continue; }
  rep.id = createHash('sha256').update(JSON.stringify(rep) + get(r, 'created_at')).digest('hex').slice(0, 12);
  if (have.has(rep.id)) continue;
  have.add(rep.id);
  data.reports.push(rep);
  added++;
  if (rep.paid > 250000) console.log(`Check this large amount: ${rep.provider}, ${rep.paid} ${rep.currency}`);
}

data.updated = new Date().toISOString().slice(0, 10);
writeFileSync(path, JSON.stringify(data, null, 2) + '\n');
console.log(`Added ${added} report(s). ${data.reports.length} in total.`);
if (rejected.length) console.log(`Not added (${rejected.length}):\n  ${rejected.join('\n  ')}`);
