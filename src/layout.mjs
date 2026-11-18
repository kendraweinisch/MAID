export const site = {
  name: 'End of Life Atlas',
  tagline: 'Every part of the end of life, explained',
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
  ['/plan-ahead/', 'Plan ahead'],
  ['/serious-illness/', 'Serious illness'],
  ['/last-weeks/', 'The last weeks'],
  ['/after-a-death/', 'After a death'],
  ['/grief/', 'Grief'],
  ['/medical-aid-in-dying/', 'Medical aid in dying'],
];

export function layout({ path, title, description, body, crisis = false }) {
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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&amp;family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&amp;display=swap">
<link rel="stylesheet" href="/styles.css">
</head>
<body>
<a class="skip-link" href="#main">Skip to main content</a>
${crisis ? '<div class="crisis" role="note">If you are thinking about suicide or are in crisis, call or text <strong>988</strong> in the US, or <a href="https://findahelpline.com">find a helpline in your country</a>. You are not alone.</div>\n' : ''}<header class="site-header">
<div class="wrap">
<a class="brand" href="/">${site.name} <span>${site.tagline}</span></a>
<nav class="nav" aria-label="Main">
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
<li><a href="/privacy/">Privacy</a></li>
<li><a href="/accessibility/">Accessibility</a></li>
</ul>
</div>
<div>
<h2>Printables</h2>
<ul>
<li><a href="/checklists/plan-ahead/">Plan-ahead worksheet</a></li>
<li><a href="/checklists/questions-for-the-doctor/">Questions for the doctor</a></li>
<li><a href="/checklists/after-a-death/">After a death: first 24 hours</a></li>
<li><a href="/checklists/">All printables</a></li>
</ul>
</div>
<div>
<h2>In crisis?</h2>
<p>If you are thinking about suicide, call or text 988 in the US. Elsewhere: <a href="https://findahelpline.com">findahelpline.com</a></p>
</div>
</div>
<p class="legal">© 2026 ${site.name} · eolatlas.com · Information, not medical or legal advice.</p>
</div>
</footer>
</body>
</html>
`;
}
