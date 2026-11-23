// The cost database: a guide to the public databases and tools where people
// can look up real health care and funeral costs, organized by what they
// want to find out. Every link was checked; descriptions say only what each
// source itself says it offers.
import { site, fmtDate } from './layout.mjs';
import { icons } from './icons.mjs';
import { linkCards, dirCard } from './ui.mjs';

export const DB = '/what-it-costs/database';
const CHECKED = '2026-11-19';

// [id, heading, icon, intro, steps (how to use them), cards: [url, name, region, what it is]]
const TASKS = [
  {
    id: 'estimate',
    h: 'Estimate a hospital or doctor bill',
    icon: 'costs',
    intro: 'No database can tell you exactly what you will pay: that depends on your insurance and what is done. These give a realistic range, and the hospital\'s own price list.',
    steps: ['Look up a typical price for the service in your area.', 'Find the hospital\'s own posted prices for the same service.', 'Ask the hospital and your insurer for a written estimate before planned care.'],
    cards: [
      ['https://www.fairhealthconsumer.org/', 'FAIR Health Consumer', 'US · free', 'Cost estimates for thousands of medical, dental and facility services, based on insurance and Medicare claims, by zip code.'],
      ['https://www.medicare.gov/procedure-price-lookup/', 'Medicare Procedure Price Lookup', 'US · Medicare', 'What Medicare pays and what you may owe for outpatient procedures, in hospital departments and surgical centers.'],
      ['https://www.cms.gov/priorities/key-initiatives/hospital-price-transparency', 'Hospital price transparency (CMS)', 'US · hospitals', 'Every US hospital must post its prices, including negotiated rates. Not all comply.'],
    ],
  },
  {
    id: 'compare-hospitals',
    h: 'Compare hospitals near the end of life',
    icon: 'illness',
    intro: 'Hospitals differ a lot in how much intensive care, how many hospital days and how much hospice their patients get in the last months of life.',
    steps: ['Find the hospitals near you in the Dartmouth Atlas.', 'Compare intensive-care days and hospice use in the last six months to two years of life.', 'Use it to ask the care team about their approach, not as today\'s prices.'],
    cards: [
      ['https://www.dartmouthatlas.org/', 'Dartmouth Atlas of Health Care', 'US · research', 'End-of-life care patterns and Medicare spending by hospital and region. Hospital data is from 2017.'],
      ['https://hcup-us.ahrq.gov/', 'HCUP (AHRQ)', 'US · government', 'Hospital stay, emergency department and outpatient data across US states, from the Agency for Healthcare Research and Quality.'],
      ['https://datatools.ahrq.gov/hcupnet/', 'HCUPnet', 'US · free', 'A free tool for HCUP statistics: hospital stays, charges and costs by condition, state and year.'],
      ['https://datatools.ahrq.gov/hcup-fast-stats/', 'HCUP Fast Stats', 'US · free', 'Quick, ready-made charts of national and state hospital use.'],
    ],
  },
  {
    id: 'hospice-care-homes',
    h: 'Choose a hospice or nursing home',
    icon: 'lastweeks',
    intro: 'For hospice and nursing homes, quality matters as much as price. Medicare publishes ratings for every certified provider.',
    steps: ['Search for hospices or nursing homes near the person.', 'Compare ratings and family survey results.', 'Call two or three and ask what is included and what costs extra.'],
    cards: [
      ['https://www.medicare.gov/care-compare/?providerType=Hospice', 'Care Compare: hospices', 'US · Medicare', 'Quality measures and family survey results for Medicare-certified hospices.'],
      ['https://www.medicare.gov/care-compare/?providerType=NursingHome', 'Care Compare: nursing homes', 'US · Medicare', 'Star ratings, inspections and staffing for nursing homes.'],
    ],
  },
  {
    id: 'long-term-care',
    h: 'Look up the cost of long-term care',
    icon: 'home',
    intro: 'Paid care at home, assisted living and nursing homes are often the largest costs families pay themselves.',
    steps: ['Ask two or three providers near the person for a written list of fees.', 'Check what Medicare, Medicaid or other programs cover where they live.', 'Ask the local Area Agency on Aging about help with costs.'],
    cards: [
      ['https://acl.gov/ltc/costs-and-who-pays/who-pays-long-term-care', 'Who pays for long-term care (ACL)', 'US · government', 'What Medicare, Medicaid, insurance and savings each pay for, from the Administration for Community Living.'],
      ['https://eldercare.acl.gov/', 'Eldercare Locator', 'US · government', 'Find your local Area Agency on Aging, for help finding care and paying for it.'],
    ],
  },
  {
    id: 'funerals',
    h: 'Compare funeral costs',
    icon: 'afterdeath',
    intro: 'There is no complete public database of funeral home prices. Calling around is still the best way, and in the US funeral homes must give prices by phone.',
    steps: ['Call two or three funeral homes and ask for their itemized prices.', 'Check whether a local consumer group has surveyed prices near you.', 'Compare with national figures.'],
    cards: [
      ['https://www.funerals.org/', 'Funeral Consumers Alliance', 'US · nonprofit', 'Consumer advice and local groups, some of which survey funeral prices.'],
      ['https://nfda.org/news/statistics', 'NFDA statistics', 'US · association', 'National median funeral prices and cremation rates from the funeral directors\' association.'],
      ['https://www.moneyhelper.org.uk/en/family-and-care/death-and-bereavement/how-much-does-a-funeral-cost', 'MoneyHelper: how much does a funeral cost?', 'UK · government-backed', 'Typical UK funeral costs, and where to get help paying, from the government-backed MoneyHelper service.'],
    ],
    after: 'Your rights when buying a funeral in the US: <a href="/after-a-death/#rights">the FTC Funeral Rule</a>.',
  },
  {
    id: 'help-with-a-bill',
    h: 'Get help with a bill',
    icon: 'help',
    intro: 'Hospital bills can often be reduced. Many hospitals forgive bills based on income, and surprise bills from out-of-network care are limited by law in the US.',
    steps: ['Ask for an itemized bill and check it line by line.', 'Ask the hospital about its financial assistance (charity care) policy.', 'If something looks wrong, get help.'],
    cards: [
      ['https://dollarfor.org/', 'Dollar For', 'US · nonprofit', 'Free help applying for hospital bill forgiveness based on income.'],
      ['https://www.cms.gov/medical-bill-rights', 'Your rights against surprise bills (CMS)', 'US · government', 'What the No Surprises Act protects you from, and how to dispute a bill.'],
      ['https://kffhealthnews.org/send-us-your-medical-bills/', 'KFF Health News: send us your bill', 'US · journalism', 'The Bill of the Month series investigates readers\' medical bills. It ran with NPR until 2024 and continues at KFF Health News.'],
    ],
  },
  {
    id: 'hospital-finances',
    h: 'Research hospital finances and costs',
    icon: 'scale',
    intro: 'For journalists, researchers and advocates: what hospitals report about their own costs, charges and profits.',
    steps: [],
    cards: [
      ['https://www.cms.gov/data-research/statistics-trends-and-reports/cost-reports', 'Medicare cost reports (HCRIS)', 'US · government', 'Annual cost reports filed by Medicare-certified hospitals, hospices, nursing homes and other providers.'],
      ['https://tool.nashp.org/', 'NASHP Hospital Cost Tool', 'US · free', 'Hospital costs, charges, profitability and revenue for thousands of US hospitals, from the National Academy for State Health Policy.'],
      ['https://data.cms.gov/', 'data.cms.gov', 'US · government', 'Medicare\'s public datasets, including provider and spending data.'],
      ['https://www.kff.org/medicare/medicare-spending-at-the-end-of-life/', 'KFF: Medicare spending at the end of life', 'US · analysis', 'How much Medicare spends in people\'s last year of life (2014 data).'],
    ],
  },
  {
    id: 'countries',
    h: 'Compare countries',
    icon: 'globe',
    intro: 'How much countries spend on health, and how much of it families pay themselves.',
    steps: [],
    cards: [
      ['https://apps.who.int/nha/database/', 'WHO Global Health Expenditure Database', 'Global', 'Comparable health spending for more than 190 countries and territories, including government, household and per-person spending.'],
      ['https://data.worldbank.org/indicator/SH.XPD.CHEX.GD.ZS', 'World Bank: health spending', 'Global', 'Current health spending as a share of each country\'s economy, over time.'],
      ['https://www.healthsystemtracker.org/', 'Peterson-KFF Health System Tracker', 'US and peers', 'How US health spending and costs compare with other wealthy countries.'],
      ['https://www.cihi.ca/en/national-health-expenditure-trends', 'CIHI: national health expenditure trends', 'Canada', 'Health spending by province and territory, with international comparisons.'],
    ],
  },
];

const total = TASKS.reduce((n, t) => n + t.cards.length, 0);

const taskNav = `<div class="cards cards-tight task-grid">${TASKS.map(
  (t) => `<a class="ocard" href="#${t.id}">${icons[t.icon] || ''}<strong>${t.h}</strong><span class="muted small">${t.cards.length} ${t.cards.length === 1 ? 'source' : 'sources'}</span></a>`
).join('')}</div>`;

const sections = TASKS.map(
  (t, i) => `<h2 id="${t.id}" class="num-h"><span class="h-num" aria-hidden="true">${String(i + 1).padStart(2, '0')}</span>${t.h}</h2>
<p>${t.intro}</p>
${t.steps.length ? `<ol class="mini-steps">${t.steps.map((s) => `<li>${s}</li>`).join('')}</ol>` : ''}
<div class="cards cards-tight" style="margin-top:18px">${t.cards.map((c) => dirCard(...c)).join('')}</div>
${t.after ? `<p class="small" style="margin-top:14px">${t.after}</p>` : ''}`
).join('\n');

const dbPage = {
  path: `${DB}/`,
  title: 'Cost database: where to look up real prices',
  seoTitle: 'Hospital, care and funeral cost databases: where to look',
  description: `${total} free public databases and tools for looking up hospital, hospice, long-term care and funeral costs, organized by what you want to find out.`,
  body: `
<section class="page-hero">
<div class="wrap guide-layout">
<div aria-hidden="true"></div>
<div class="prose">
<div class="hero-icon">${icons.costs}</div>
<p class="eyebrow">Cost database</p>
<h1>Where to look up real prices</h1>
<p class="lead" style="margin-top:20px">The prices of dying are scattered across government datasets, nonprofit tools and price lists most people never hear about. Here are the best ones, organized by what you want to find out.</p>
<p class="small muted" style="margin:0">${total} sources · Links checked ${fmtDate(CHECKED)} · Whole site checked ${fmtDate(site.lastScan)} · We have no ties to any of them</p>
</div>
</div>
</section>
<section class="section">
<div class="wrap guide-layout">
<nav class="toc card toc-wide-only" aria-label="On this page"><strong>What do you want to find out?</strong><ul>${TASKS.map((t) => `<li><a href="#${t.id}">${t.h}</a></li>`).join('')}</ul></nav>
<div class="prose guide-body">
<div class="glance">
<div class="glance-card"><strong>${total}</strong><span>Free databases and tools, all checked</span></div>
<div class="glance-card"><strong>Always</strong><span>Ask for a written, itemized estimate too: no database knows your bill</span></div>
<div class="glance-card"><strong>By phone</strong><span>US funeral homes must give you prices when you call</span></div>
</div>
${taskNav}
${sections}
<h2 id="related">Related</h2>
${linkCards([
    ['/what-it-costs/', 'What it costs', 'National figures for care, hospice and funerals, with sources.', 'costs'],
    ['/after-a-death/#rights', 'Your rights with funeral homes', 'Itemized prices, and what you can refuse.', 'afterdeath'],
    ['/suggestions/', 'Suggest a source', 'Know a good cost database we missed? Tell us.', 'talk'],
  ])}
<p class="small muted" style="margin-top:24px">Information, not financial or legal advice. We link to these sources because they are useful, not because we endorse every figure in them. Spot a broken link? <a href="/suggestions/">Tell us</a>.</p>
</div>
</div>
</section>`,
};

export const costPages = [dbPage];
export const COST_SOURCES = TASKS.flatMap((t) => t.cards.map((c) => c[0]));
