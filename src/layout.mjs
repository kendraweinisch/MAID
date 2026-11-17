export const site = {
  name: 'End of Life Atlas',
  tagline: 'End-of-life choices, explained',
  url: 'https://eolatlas.com',
  lastVerified: '2026-11-17',
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

const nav = [
  ['/places/', 'Places'],
  ['/timeline/', 'Timeline'],
  ['/going-abroad/', 'Going abroad'],
  ['/families/', 'For families'],
  ['/plan-ahead/', 'Plan ahead'],
  ['/professionals/', 'For professionals'],
];

export function layout({ path, title, description, body }) {
  const fullTitle = path === '/' ? `${site.name}: ${site.tagline}` : `${title} | ${site.name}`;
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&amp;family=Newsreader:opsz,wght@6..72,400;6..72,500&amp;display=swap">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
<div class="crisis" role="note">If you are thinking about suicide or are in crisis, call or text <strong>988</strong> in the US, or <a href="https://findahelpline.com">find a helpline in your country</a>. You are not alone.</div>
<header class="site-header">
<div class="wrap">
<a class="brand" href="/">${site.name} <span>${site.tagline}</span></a>
<nav class="nav" aria-label="Main">
${links}
<a class="btn" href="/navigation/">Talk to a navigator</a>
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
<li><a href="/privacy/">Privacy</a></li>
</ul>
</div>
<div>
<h2>Guides</h2>
<ul>
<li><a href="/places/">Where it's legal</a></li>
<li><a href="/timeline/">How long it takes</a></li>
<li><a href="/alerts/">Law-change alerts</a></li>
</ul>
</div>
<div>
<h2>In crisis?</h2>
<p>US: call or text 988. Elsewhere: <a href="https://findahelpline.com">findahelpline.com</a></p>
</div>
</div>
<p class="legal">© 2026 ${site.name} · eolatlas.com · We cover legal processes only.</p>
</div>
</footer>
</body>
</html>
`;
}
