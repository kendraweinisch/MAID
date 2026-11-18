import { readFileSync } from 'node:fs';

// Date of the last whole-site accuracy check (updated monthly).
const review = JSON.parse(readFileSync(new URL('./data/review.json', import.meta.url), 'utf8'));

export const site = {
  name: 'End of Life Atlas',
  tagline: 'Every part of the end of life, explained',
  url: 'https://eolatlas.com',
  lastVerified: '2026-11-17',
  lastScan: review.lastScan,
};

export const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

export const fmtDate = (iso) =>
  iso
    ? new Date(iso + 'T12:00:00Z').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' })
    : 'Not yet verified';

const SEARCH_ICON = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>';

const nav = [
  ['/plan-ahead/', 'Plan ahead'],
  ['/serious-illness/', 'Serious illness'],
  ['/last-weeks/', 'The last weeks'],
  ['/after-a-death/', 'After a death'],
  ['/grief/', 'Grief'],
  ['/medical-aid-in-dying/', 'Medical aid in dying'],
  ['/what-it-costs/', 'Costs'],
];

// Structured data (schema.org) so search engines understand each page.
function jsonLd(page, fullTitle) {
  const url = site.url + page.path;
  const org = { '@type': 'Organization', name: site.name, url: site.url };
  const items = [];
  if (page.path === '/') {
    items.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, description: page.description, inLanguage: 'en', publisher: org });
  } else {
    const parts = page.path.split('/').filter(Boolean);
    const crumbs = [{ name: site.name, item: site.url + '/' }];
    let acc = '';
    parts.forEach((seg, i) => {
      acc += '/' + seg;
      const last = i === parts.length - 1;
      crumbs.push({ name: last ? page.title : (SECTION_NAMES[acc + '/'] || seg.replace(/-/g, ' ')), item: site.url + acc + '/' });
    });
    items.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.name, item: c.item })) });
    if (page.article) items.push({ '@context': 'https://schema.org', '@type': 'Article', headline: page.title, description: page.description, url, inLanguage: 'en', dateModified: page.article.modified, author: org, publisher: org });
  }
  if (page.faq && page.faq.length) items.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: page.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) });
  return items.map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, '\\u003c')}</script>`).join('\n');
}

const SECTION_NAMES = {
  '/plan-ahead/': 'Plan ahead',
  '/serious-illness/': 'Serious illness',
  '/last-weeks/': 'The last weeks',
  '/after-a-death/': 'After a death',
  '/grief/': 'Grief',
  '/medical-aid-in-dying/': 'Medical aid in dying',
  '/medical-aid-in-dying/places/': 'Where it is legal',
  '/plan-ahead/advance-directives/': 'Advance directives by state',
  '/checklists/': 'Printables',
};

export function layout(page) {
  const { path, title, description, body, crisis = false, seoTitle } = page;
  const fullTitle = path === '/' ? `${site.name}: ${site.tagline}` : `${seoTitle || title} | ${site.name}`;
  const links = nav
    .map(([href, label]) => `<a href="${href}"${path.startsWith(href) ? ' aria-current="page"' : ''}>${label}</a>`)
    .join('\n');
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${site.url}${path}">
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${site.url}${path}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:type" content="website">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&amp;family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&amp;display=swap">
<link rel="stylesheet" href="/styles.css">
${process.env.GOATCOUNTER_CODE ? `<script data-goatcounter="https://${process.env.GOATCOUNTER_CODE}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>` : ''}
${jsonLd(page, fullTitle)}
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
${crisis ? '<div class="crisis" role="note">If you are thinking about suicide or are in crisis, call or text <strong>988</strong> in the US, or <a href="https://findahelpline.com">find a helpline in your country</a>. You are not alone.</div>\n' : ''}<header class="site-header">
<div class="wrap header-top">
<a class="brand" href="/">${site.name} <span>${site.tagline}</span></a>
<form class="site-search" role="search" action="/ask/" method="get">
<label class="sr-only" for="site-search-q">Search the site</label>
<input id="site-search-q" name="q" type="search" placeholder="Search the site" autocomplete="off">
<button class="btn" type="submit">${SEARCH_ICON}<span>Search</span></button>
</form>
</div>
<div class="nav-band">
<nav class="wrap nav" aria-label="Main">
${links}
</nav>
</div>
</header>
<main id="main">
${body}
</main>
<footer class="site-footer">
<div class="wrap">
<div class="footer-grid">
<div>
<div class="footer-brand">${site.name}</div>
<p>Information, not medical or legal advice. Talk to your doctor and a lawyer about your own situation.</p>
</div>
<div>
<h2>About</h2>
<ul>
<li><a href="/about/#funding">How we're funded</a></li>
<li><a href="/about/#editorial">Editorial and review policy</a></li>
<li><a href="/about/#reviewers">Our reviewers</a></li>
<li><a href="/finding-help/">Finding help near you</a></li>
<li><a href="/what-it-costs/">What it costs</a></li>
<li><a href="/privacy/">Privacy</a></li>
<li><a href="/accessibility/">Accessibility</a></li>
<li><a href="/suggestions/">Send a suggestion</a></li>
</ul>
</div>
<div>
<h2>Start here</h2>
<ul>
<li><a href="/for-myself/">Planning for myself</a></li>
<li><a href="/for-someone-i-love/">Planning for someone I love</a></li>
<li><a href="/ask/">Ask a question</a></li>
</ul>
<h2 style="margin-top:24px">Printables</h2>
<ul>
<li><a href="/checklists/plan-ahead/">Plan-ahead worksheet</a></li>
<li><a href="/checklists/questions-for-the-doctor/">Questions for the doctor</a></li>
<li><a href="/checklists/after-a-death/">After a death: first 24 hours</a></li>
<li><a href="/checklists/binder/">The whole binder (PDF)</a></li>
<li><a href="/checklists/">All printables</a></li>
</ul>
</div>
<div>
<h2>In crisis?</h2>
<p>If you are thinking about suicide, call or text 988 in the US. Elsewhere: <a href="https://findahelpline.com">findahelpline.com</a></p>
</div>
</div>
<p class="legal">© 2026 ${site.name} · eolatlas.com · Information, not medical or legal advice. · Whole site last checked for accuracy and broken links: ${fmtDate(site.lastScan)} (<a href="/about/#editorial">how</a>)</p>
</div>
</footer>
</body>
</html>
`;
}
