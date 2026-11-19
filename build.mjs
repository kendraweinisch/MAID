// Builds the static site into dist/. No dependencies: run `node build.mjs`.
import { mkdir, readFile, writeFile, rm, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { layout, site } from './src/layout.mjs';
import { home, guides, checklists, maidHub, placePage, maidPages, staticPages, notFound } from './src/pages.mjs';
import { printables, printablesIndex, binderPage } from './src/printables.mjs';
import { buildSearchIndex } from './src/search-index.mjs';
import { journeys } from './src/journeys.mjs';
import { adPages } from './src/advance-directives.mjs';
import { esPages } from './src/es.mjs';
import { esMaidPages } from './src/es-maid.mjs';
import { esBatch2 } from './src/es-batch2.mjs';
import { esBatch3a } from './src/es-batch3a.mjs';
import { esBatch3b } from './src/es-batch3b.mjs';
import { esPrintPages, ES_PRINTABLES, ES_BINDER } from './src/es-print.mjs';
import { esStaticPages } from './src/es-static.mjs';
import { costPages } from './src/cost-database.mjs';

const out = 'dist';
// BASE_PATH serves the site from a sub-folder, e.g. "/maid" on username.github.io/maid/.
// Leave it empty once the site is on its own domain.
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const withBase = (html) =>
  base
    ? html
        .replace(/<html lang="(en|es)">/, `<html lang="$1" data-base="${base}">`)
        .replace(/(href|action|src)="\/(?!\/)/g, `$1="${base}/`)
    : html;
const data = JSON.parse(await readFile('src/data/places.json', 'utf8'));

const pages = [
  home(data),
  ...journeys,
  ...guides,
  ...adPages,
  ...costPages,
  printablesIndex({ planAhead: checklists[0], doctor: checklists[1], afterDeath: checklists[2] }),
  ...checklists,
  ...printables,
  binderPage(),
  maidHub(data),
  ...maidPages,
  ...data.places.map(placePage),
  ...staticPages,
  ...esPages,
  ...esMaidPages,
  ...esBatch2,
  ...esBatch3a,
  ...esBatch3b,
  ...esPrintPages,
  ...esStaticPages,
];

await rm(out, { recursive: true, force: true });
for (const page of [...pages, notFound]) {
  const file = page.path.endsWith('.html') ? join(out, page.path) : join(out, page.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, withBase(layout(page)));
}

await cp('src/styles.css', join(out, 'styles.css'));

// Knowledge base for the Ask assistant: the site's own text, by section.
const isEs = (p) => p.path.startsWith('/es/');
await writeFile(join(out, 'search-index.json'), JSON.stringify(buildSearchIndex(pages.filter((p) => !isEs(p)), (p) => p.body)));
await writeFile(join(out, 'search-index-es.json'), JSON.stringify(buildSearchIndex(pages.filter(isEs), (p) => p.body)));
await cp('public', out, { recursive: true });
// Lists for the PDF scripts: Spanish printables, and the Spanish binder's order.
await writeFile(join(out, 'es-printables.json'), JSON.stringify(ES_PRINTABLES.map(({ slug, path }) => ({ slug, path }))));
await writeFile(join(out, 'es-binder.json'), JSON.stringify(ES_BINDER.flatMap(([, l]) => l.map(([slug]) => slug))));

const urls = pages.filter((p) => p.path !== '/thanks/').map((p) => `<url><loc>${site.url}${p.path}</loc></url>`).join('\n');
await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

const indexable = process.env.SITE_INDEXABLE === 'true';
await writeFile(join(out, 'robots.txt'), indexable ? `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');

console.log(`Built ${pages.length + 1} pages into ${out}/ (base path "${base || '/'}", search indexing ${indexable ? 'on' : 'off'})`);
