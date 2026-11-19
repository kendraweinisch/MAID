import { readFileSync } from 'node:fs';

// Date of the last whole-site accuracy check (updated monthly).
const review = JSON.parse(readFileSync(new URL('./data/review.json', import.meta.url), 'utf8'));

export const site = {
  name: 'End of Life Atlas',
  tagline: 'Every part of the end of life, explained',
  url: 'https://eolatlas.org',
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

export const fmtDateEs = (iso) =>
  iso ? new Date(iso + 'T12:00:00Z').toLocaleDateString('es-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' }) : 'sin verificar';

// The logo mark: a globe (the atlas) with the sun on the horizon. Decorative here,
// because the link text names the site.
const LOGO_MARK = '<svg class="logo-mark" aria-hidden="true" focusable="false" viewBox="0 0 48 48"><circle cx="24" cy="24" r="21" fill="none" stroke="currentColor" stroke-width="2.5"/><path d="M15.5 27a8.5 8.5 0 0 1 17 0z" fill="var(--accent)"/><path d="M24 12.5v3M14.5 16.5l2 2M33.5 16.5l-2 2" stroke="var(--accent)" stroke-width="2.2" stroke-linecap="round"/><path d="M4 27h40" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/><path d="M8.5 33.5Q24 37 39.5 33.5M14 39.5Q24 42 34 39.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

const SEARCH_ICON = '<svg aria-hidden="true" focusable="false" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5L21 21"/></svg>';

// English pages that have a Spanish version (used for hreflang and the language switch).
export const ES_PAIRS = {
  '/': '/es/',
  '/for-myself/': '/es/para-mi/',
  '/for-someone-i-love/': '/es/para-un-ser-querido/',
  '/plan-ahead/': '/es/planificar/',
  '/plan-ahead/advance-directives/': '/es/directivas-anticipadas/',
  '/serious-illness/hospice-vs-palliative-care/': '/es/cuidados-paliativos-y-hospicio/',
  '/last-weeks/signs-death-is-near/': '/es/senales-de-que-la-muerte-esta-cerca/',
  '/after-a-death/': '/es/despues-de-una-muerte/',
  '/checklists/after-a-death/': '/es/primeras-24-horas/',
  '/grief/': '/es/duelo/',
  '/ask/': '/es/preguntar/',
};
const EN_PAIRS = Object.fromEntries(Object.entries(ES_PAIRS).map(([en, es]) => [es, en]));

const navEs = [
  ['/es/planificar/', 'Planificar'],
  ['/es/directivas-anticipadas/', 'Directivas anticipadas'],
  ['/es/cuidados-paliativos-y-hospicio/', 'Paliativos y hospicio'],
  ['/es/senales-de-que-la-muerte-esta-cerca/', 'Los últimos días'],
  ['/es/despues-de-una-muerte/', 'Después de una muerte'],
  ['/es/duelo/', 'Duelo'],
];

const nav = [
  ['/plan-ahead/', 'Plan ahead'],
  ['/serious-illness/', 'Serious illness'],
  ['/last-weeks/', 'The last weeks'],
  ['/after-a-death/', 'After a death'],
  ['/grief/', 'Grief'],
  ['/medical-aid-in-dying/', 'Medical aid in dying'],
  ['/what-it-costs/database/', 'Cost database'],
];

// Structured data (schema.org) so search engines understand each page.
function jsonLd(page, fullTitle) {
  const url = site.url + page.path;
  const org = { '@type': 'Organization', name: site.name, url: site.url, logo: site.url + '/logo.png' };
  const items = [];
  if (page.path === '/') {
    items.push({ '@context': 'https://schema.org', '@type': 'WebSite', name: site.name, url: site.url, description: page.description, inLanguage: page.path.startsWith('/es/') ? 'es' : 'en', publisher: org });
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
    if (page.article) items.push({ '@context': 'https://schema.org', '@type': 'Article', headline: page.title, description: page.description, url, inLanguage: page.path.startsWith('/es/') ? 'es' : 'en', dateModified: page.article.modified, author: org, publisher: org });
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
  '/what-it-costs/': 'What it costs',
  '/checklists/': 'Printables',
  '/es/': 'Español',
};

const EN_UI = {
  tagline: site.tagline,
  skip: 'Skip to main content',
  search: 'Search the site',
  searchBtn: 'Search',
  searchAction: '/ask/',
  navLabel: 'Main',
  crisis: 'If you are thinking about suicide or are in crisis, call or text <strong>988</strong> in the US, or <a href="https://findahelpline.com">find a helpline in your country</a>. You are not alone.',
};
const ES_UI = {
  tagline: 'El final de la vida, explicado',
  skip: 'Ir al contenido principal',
  search: 'Buscar en el sitio',
  searchBtn: 'Buscar',
  searchAction: '/es/preguntar/',
  navLabel: 'Principal',
  crisis: 'Si está pensando en el suicidio o está en crisis, llame o envíe un mensaje de texto al <strong>988</strong> en EE. UU. (hay atención en español), o <a href="https://findahelpline.com">busque una línea de ayuda en su país</a>. No está solo.',
};

const ES_FOOTER = `<footer class="site-footer">
<div class="wrap">
<div class="footer-grid">
<div>
<div class="footer-brand">${site.name}</div>
<p>Información, no consejo médico ni legal. Hable con su médico y con un abogado sobre su situación.</p>
<p class="small">Traducción al español pendiente de revisión por un hablante nativo. Si ve un error, <a href="/suggestions/">díganos</a>.</p>
</div>
<div>
<h2>Empiece aquí</h2>
<ul>
<li><a href="/es/para-mi/">Planifico para mí</a></li>
<li><a href="/es/para-un-ser-querido/">Planifico para un ser querido</a></li>
<li><a href="/es/preguntar/">Haga una pregunta</a></li>
<li><a href="/es/primeras-24-horas/">Después de una muerte: las primeras 24 horas</a></li>
</ul>
</div>
<div>
<h2>En inglés</h2>
<ul>
<li><a href="/" lang="en">Full site in English</a></li>
<li><a href="/medical-aid-in-dying/" lang="en">Medical aid in dying</a></li>
<li><a href="/checklists/" lang="en">Printables</a></li>
<li><a href="/about/" lang="en">About</a></li>
</ul>
</div>
<div>
<h2>¿En crisis?</h2>
<p>Si está pensando en el suicidio, llame o envíe un mensaje de texto al 988 en EE. UU. (hay atención en español). En otros países: <a href="https://findahelpline.com">findahelpline.com</a></p>
</div>
</div>
<p class="legal">© 2026 ${site.name} · eolatlas.org · Información imparcial, no consejo médico ni legal. · Revisión de todo el sitio: ${fmtDateEs(site.lastScan)}</p>
</div>
</footer>`;

export function layout(page) {
  const { path, title, description, body, crisis = false, seoTitle } = page;
  const es = path.startsWith('/es/');
  const t = es ? ES_UI : EN_UI;
  const fullTitle = path === '/' ? `${site.name}: ${site.tagline}` : path === '/es/' ? `${site.name}: ${ES_UI.tagline}` : `${seoTitle || title} | ${site.name}`;
  const enPath = es ? EN_PAIRS[path] : path;
  const esPath = es ? path : ES_PAIRS[path];
  const alternates = enPath && esPath
    ? `<link rel="alternate" hreflang="en" href="${site.url}${enPath}">\n<link rel="alternate" hreflang="es" href="${site.url}${esPath}">\n<link rel="alternate" hreflang="x-default" href="${site.url}${enPath}">`
    : '';
  const langSwitch = es
    ? `<a class="lang-switch" href="${enPath || '/'}" hreflang="en" lang="en">English</a>`
    : `<a class="lang-switch" href="${esPath || '/es/'}" hreflang="es" lang="es">Español</a>`;
  const links = (es ? navEs : nav)
    .map(([href, label]) => `<a href="${href}"${path.startsWith(href) ? ' aria-current="page"' : ''}>${label}</a>`)
    .join('\n');
  return `<!doctype html>
<html lang="${es ? 'es' : 'en'}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${site.url}${path}">
${alternates}
<meta property="og:title" content="${esc(fullTitle)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${site.url}${path}">
<meta property="og:site_name" content="${site.name}">
<meta property="og:type" content="website">
<meta property="og:image" content="${site.url}/og-image.png">
<meta property="og:image:alt" content="End of Life Atlas logo: a globe with the sun on the horizon">
<meta name="twitter:card" content="summary_large_image">
<meta property="og:locale" content="${es ? 'es_US' : 'en_US'}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&amp;family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&amp;display=swap">
<link rel="stylesheet" href="/styles.css">
${process.env.GOATCOUNTER_CODE ? `<script data-goatcounter="https://${process.env.GOATCOUNTER_CODE}.goatcounter.com/count" async src="https://gc.zgo.at/count.js"></script>` : ''}
${jsonLd(page, fullTitle)}
</head>
<body>
<a class="skip-link" href="#main">${t.skip}</a>
${crisis ? `<div class="crisis" role="note">${t.crisis}</div>\n` : ''}<header class="site-header">
<div class="wrap header-top">
<a class="brand" href="${es ? '/es/' : '/'}">${LOGO_MARK}<span class="brand-text"><span class="brand-name">${site.name}</span> <span class="brand-tag">${t.tagline}</span></span></a>
<div class="header-tools">
<form class="site-search" role="search" action="${t.searchAction}" method="get">
<label class="sr-only" for="site-search-q">${t.search}</label>
<input id="site-search-q" name="q" type="search" placeholder="${t.search}" autocomplete="off">
<button class="btn" type="submit">${SEARCH_ICON}<span>${t.searchBtn}</span></button>
</form>
${langSwitch}
</div>
</div>
<div class="nav-band">
<nav class="wrap nav" aria-label="${t.navLabel}">
${links}
</nav>
</div>
</header>
<main id="main">
${body}
</main>
${es ? ES_FOOTER : `<footer class="site-footer">
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
<p class="legal">© 2026 ${site.name} · eolatlas.org · Unbiased information, not medical or legal advice. · Whole site last checked for accuracy and broken links: ${fmtDate(site.lastScan)} (<a href="/about/#editorial">how</a>)</p>
</div>
</footer>`}
</body>
</html>
`;
}
