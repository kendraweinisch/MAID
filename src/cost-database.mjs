// The cost database: what people actually paid for end-of-life care and
// funerals, reported anonymously. Reports come in through a Netlify form,
// are checked by a person, and are added to src/data/cost-reports.json
// with scripts/import-costs.mjs. Nobody can comment on the page.
import { readFileSync } from 'node:fs';
import { esc, fmtDate } from './layout.mjs';
import { icons } from './icons.mjs';
import { linkCards } from './ui.mjs';

const data = JSON.parse(readFileSync(new URL('./data/cost-reports.json', import.meta.url), 'utf8'));
export const DB = '/what-it-costs/database';
const onNetlify = process.env.NETLIFY === 'true';

// Kinds of care people can report. Keys are stored in the data file.
export const CARE = {
  hospital: 'Hospital stay',
  icu: 'Intensive care (ICU)',
  hospice: 'Hospice care',
  palliative: 'Palliative care',
  'care-home': 'Nursing home or care home',
  'home-care': 'Paid care at home',
  'funeral-burial': 'Funeral with burial',
  'funeral-cremation': 'Funeral with cremation',
  'direct-cremation': 'Direct cremation',
  'burial-other': 'Other burial or body choice',
  maid: 'Medical aid in dying',
  other: 'Other end-of-life care',
};
export const COVERAGE = {
  medicare: 'Medicare',
  'medicare-advantage': 'Medicare Advantage',
  medicaid: 'Medicaid',
  private: 'Private insurance',
  public: 'Public health system (outside the US)',
  none: 'No insurance',
  unknown: "Don't know",
};
export const CURRENCIES = ['USD', 'CAD', 'GBP', 'EUR', 'AUD', 'MXN', 'NZD', 'CHF'];
const YEARS = Array.from({ length: 12 }, (_, i) => 2026 - i);

const money = (n, cur) =>
  n === null || n === undefined || n === ''
    ? '<span class="muted">Not given</span>'
    : new Intl.NumberFormat('en-US', { style: 'currency', currency: cur, maximumFractionDigits: 0 }).format(n);

const median = (nums) => {
  const a = [...nums].sort((x, y) => x - y);
  const m = Math.floor(a.length / 2);
  return a.length % 2 ? a[m] : (a[m - 1] + a[m]) / 2;
};

// Medians are shown only for a kind of care with at least 3 US-dollar reports.
function summaryCards(reports) {
  const usd = reports.filter((r) => r.currency === 'USD');
  const cards = Object.entries(CARE)
    .map(([key, label]) => {
      const list = usd.filter((r) => r.care === key).map((r) => r.paid);
      return list.length >= 3 ? `<div class="glance-card"><strong>${money(median(list), 'USD')}</strong><span>${esc(label)}: median paid out of pocket, ${list.length} US reports</span></div>` : '';
    })
    .filter(Boolean);
  return cards.length ? `<div class="glance">${cards.join('')}</div>` : '';
}

function table(reports) {
  if (!reports.length) {
    return `<div class="notice db-empty"><p style="margin:0"><strong>No reports published yet.</strong> The table fills in as people share what they paid. <a href="#report">Be one of the first</a>.</p></div>`;
  }
  const rows = reports
    .slice()
    .sort((a, b) => b.year - a.year || a.provider.localeCompare(b.provider))
    .map(
      (r) => `<tr data-care="${esc(r.care)}" data-text="${esc(`${r.provider} ${r.city} ${r.region} ${r.country}`.toLowerCase())}">
<td>${esc(r.provider)}</td><td>${esc(r.city)}, ${esc(r.region)}, ${esc(r.country)}</td><td>${esc(CARE[r.care] || r.care)}</td><td>${r.year}</td>
<td class="num">${money(r.paid, r.currency)}</td><td class="num">${money(r.billed, r.currency)}</td><td>${esc(COVERAGE[r.coverage] || r.coverage)}</td></tr>`
    )
    .join('\n');
  return `<form class="db-filter no-print" role="search" aria-label="Filter the cost table" onsubmit="return false">
<div class="field"><label for="db-care">Kind of care</label><select id="db-care"><option value="">All kinds</option>${Object.entries(CARE)
    .map(([k, v]) => `<option value="${k}">${esc(v)}</option>`)
    .join('')}</select></div>
<div class="field"><label for="db-place">Provider or place</label><input id="db-place" type="search" autocomplete="off" placeholder="e.g. Ohio, or a hospital name"></div>
</form>
<p class="small muted" id="db-count" aria-live="polite">${reports.length} ${reports.length === 1 ? 'report' : 'reports'}</p>
<div class="table-box" tabindex="0" role="region" aria-label="Reported end-of-life costs">
<table class="db-table">
<caption class="sr-only">Reported end-of-life costs</caption>
<thead><tr><th scope="col">Hospital or provider</th><th scope="col">Location</th><th scope="col">Kind of care</th><th scope="col">Year</th><th scope="col" class="num">Paid out of pocket</th><th scope="col" class="num">Total billed</th><th scope="col">Coverage</th></tr></thead>
<tbody>
${rows}
</tbody></table></div>
<script src="/cost-database.js" defer></script>`;
}

const select = (id, name, options, { required = true, first = 'Choose one' } = {}) =>
  `<select id="${id}" name="${name}"${required ? ' required' : ''}><option value="">${first}</option>${options.map(([v, l]) => `<option value="${v}">${esc(l)}</option>`).join('')}</select>`;

const form = () =>
  onNetlify
    ? `<form class="form db-form" name="cost-report" method="POST" action="${DB}/thanks/" data-netlify="true" netlify-honeypot="company">
<input type="hidden" name="form-name" value="cost-report">
<p hidden><label>Leave this empty <input name="company" tabindex="-1" autocomplete="off"></label></p>
<fieldset><legend>Where</legend>
<div class="field field-wide"><label for="c-provider">Hospital or provider name (required)</label><input id="c-provider" name="provider" type="text" required maxlength="120" autocomplete="off"></div>
<div class="field"><label for="c-city">City or town (required)</label><input id="c-city" name="city" type="text" required maxlength="80" autocomplete="off"></div>
<div class="field"><label for="c-region">State, province or region (required)</label><input id="c-region" name="region" type="text" required maxlength="80" autocomplete="off"></div>
<div class="field"><label for="c-country">Country (required)</label><input id="c-country" name="country" type="text" required maxlength="60" value="United States" autocomplete="off"></div>
</fieldset>
<fieldset><legend>What and when</legend>
<div class="field"><label for="c-care">Kind of care (required)</label>${select('c-care', 'care', Object.entries(CARE))}</div>
<div class="field"><label for="c-year">Year (required)</label>${select('c-year', 'year', YEARS.map((y) => [y, y]))}</div>
<div class="field"><label for="c-coverage">Coverage (required)</label>${select('c-coverage', 'coverage', Object.entries(COVERAGE))}</div>
</fieldset>
<fieldset><legend>The cost</legend>
<div class="field"><label for="c-paid">Paid out of pocket (required)</label><input id="c-paid" name="paid" type="number" min="0" max="10000000" step="1" inputmode="numeric" required></div>
<div class="field"><label for="c-billed">Total billed before insurance (optional)</label><input id="c-billed" name="billed" type="number" min="0" max="100000000" step="1" inputmode="numeric"></div>
<div class="field"><label for="c-currency">Currency</label>${select('c-currency', 'currency', CURRENCIES.map((c) => [c, c]), { first: 'Choose' }).replace('<option value="USD">', '<option value="USD" selected>')}</div>
</fieldset>
<p class="field-wide check-line"><input id="c-ok" name="confirm" type="checkbox" value="yes" required> <label for="c-ok">I understand this report is anonymous and may be published in the table, and I haven't included anyone's name or medical details. (required)</label></p>
<button class="btn" type="submit">Send my report</button>
</form>`
    : `<div class="notice"><strong>Note:</strong> the report form works on the live site.</div>`;

const dbPage = {
  path: `${DB}/`,
  title: 'Cost database: what people actually paid',
  seoTitle: 'End-of-life cost database: what people paid for hospitals, hospice and funerals',
  description: 'An open table of what people actually paid for end-of-life care and funerals, by hospital or provider and location. Reported anonymously, checked before publishing.',
  body: `
<section class="page-hero">
<div class="wrap prose">
<div class="hero-icon">${icons.costs}</div>
<p class="eyebrow">Cost database</p>
<h1>What people actually paid</h1>
<p class="lead" style="margin-top:20px">Prices for dying are hard to find. This table collects what families really paid, at named hospitals, hospices and funeral homes, so the next family knows what to expect.</p>
<p class="small muted" style="margin:0">${data.reports.length} published ${data.reports.length === 1 ? 'report' : 'reports'} · Last updated ${fmtDate(data.updated)} · Anonymous, and checked by a person before publishing</p>
</div>
</section>
<section class="section">
<div class="wrap">
${summaryCards(data.reports)}
${table(data.reports)}
<p class="small muted" style="margin-top:16px">Each row is one family's report, not a price list or a quote. Costs depend on insurance, length of care and what was included. Reports are checked for obvious errors, but we can't verify bills. For national figures with sources, see <a href="/what-it-costs/">what it costs</a>.</p>
</div>
<div class="wrap prose" style="margin-top:56px">
<h2 id="report">Add what you paid</h2>
<p>Anonymous: we don't ask for your name or email. The hospital or provider and its location are required, so the table is useful to others. Please use whole numbers and your own best estimate.</p>
${form()}
<h2 id="how">How this works</h2>
<ul class="point-grid">
<li><strong>Anonymous.</strong> No names, no emails, no accounts.</li>
<li><strong>Checked first.</strong> A person reviews each report before it appears, usually within a month.</li>
<li><strong>No comments.</strong> The table holds numbers only, so it stays clean and respectful.</li>
<li><strong>Open.</strong> Anyone can read and use the table, free.</li>
</ul>
<p class="small muted">Spot a report that looks wrong, or want one removed? <a href="/suggestions/">Tell us</a>. See <a href="/privacy/">privacy</a> for how reports are stored.</p>
<h2 id="related">Related</h2>
${linkCards([
    ['/what-it-costs/', 'What it costs', 'National figures for care and funerals, with sources.', 'costs'],
    ['/after-a-death/#rights', 'Your rights with funeral homes', 'Itemized prices, and what you can refuse.', 'afterdeath'],
  ])}
</div>
</section>`,
};

const thanks = {
  path: `${DB}/thanks/`,
  title: 'Thank you for your report',
  description: 'Your cost report was sent.',
  body: `
<section class="section"><div class="wrap prose">
<h1>Thank you</h1>
<p class="lead" style="margin:20px 0">Your report was sent. After a quick check, it will be added to the table, usually within a month. It helps the next family know what to expect.</p>
<p><a href="${DB}/">Back to the cost database</a></p>
</div></section>`,
};

export const costPages = [dbPage, thanks];
