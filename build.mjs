// Builds the static site into dist/. No dependencies: run `node build.mjs`.
import { mkdir, readFile, writeFile, rm, cp } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { layout, site } from './src/layout.mjs';
import { home, guides, checklists, checklistIndex, maidHub, placePage, maidPages, staticPages, notFound } from './src/pages.mjs';

const out = 'dist';
// BASE_PATH serves the site from a sub-folder, e.g. "/maid" on username.github.io/maid/.
// Leave it empty once the site is on its own domain.
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const withBase = (html) =>
  base
    ? html
        .replace('<html lang="en">', `<html lang="en" data-base="${base}">`)
        .replace(/(href|action|src)="\/(?!\/)/g, `$1="${base}/`)
    : html;
const data = JSON.parse(await readFile('src/data/places.json', 'utf8'));

const pages = [
  home(data),
  ...guides,
  checklistIndex,
  ...checklists,
  maidHub(data),
  ...maidPages,
  ...data.places.map(placePage),
  ...staticPages,
];

await rm(out, { recursive: true, force: true });
for (const page of [...pages, notFound]) {
  const file = page.path.endsWith('.html') ? join(out, page.path) : join(out, page.path, 'index.html');
  await mkdir(dirname(file), { recursive: true });
  await writeFile(file, withBase(layout(page)));
}

await cp('src/styles.css', join(out, 'styles.css'));
await cp('public', out, { recursive: true });

const urls = pages.filter((p) => p.path !== '/thanks/').map((p) => `<url><loc>${site.url}${p.path}</loc></url>`).join('\n');
await writeFile(join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);

const indexable = process.env.SITE_INDEXABLE === 'true';
await writeFile(join(out, 'robots.txt'), indexable ? `User-agent: *\nAllow: /\nSitemap: ${site.url}/sitemap.xml\n` : 'User-agent: *\nDisallow: /\n');

console.log(`Built ${pages.length + 1} pages into ${out}/ (base path "${base || '/'}", search indexing ${indexable ? 'on' : 'off'})`);
