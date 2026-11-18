// Generates a downloadable PDF and a thumbnail image for every printable,
// straight from the site's own pages, so they always match the website.
//
// Run after changing any printable (needs Playwright, not a site dependency):
//   npm run build && node scripts/make-printables.cjs
// Writes public/printables/<slug>.pdf, public/thumbs/<slug>.png and
// src/data/printables-meta.json (page counts and sizes), then commit them.
const { chromium } = require('playwright');
const { createServer } = require('http');
const { readFile, writeFile, mkdir, stat } = require('fs/promises');
const { join, extname } = require('path');

const ROOT = 'dist';
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.js': 'text/javascript' };

(async () => {
  const slugs = (await readFile('src/data/printables.txt', 'utf8')).split('\n').map((s) => s.trim()).filter(Boolean);
  const server = createServer(async (req, res) => {
    let f = join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); res.setHeader('Content-Type', types[extname(f)] || 'application/octet-stream'); res.end(await readFile(f)); }
    catch { res.statusCode = 404; res.end(); }
  }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  await mkdir('public/printables', { recursive: true });
  await mkdir('public/thumbs', { recursive: true });

  const browser = await chromium.launch();
  const meta = {};
  for (const slug of slugs) {
    const url = `${base}/checklists/${slug}/`;
    // PDF (tagged, so screen readers can read it)
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle' });
    await page.emulateMedia({ media: 'print' });
    const title = await page.title();
    const pdf = await page.pdf({ format: 'Letter', margin: { top: '0.6in', bottom: '0.6in', left: '0.7in', right: '0.7in' }, tagged: true, outline: true, printBackground: true });
    await writeFile(`public/printables/${slug}.pdf`, pdf);
    const pages = (pdf.toString('latin1').match(/\/Type\s*\/Page[^s]/g) || []).length;
    // Thumbnail of the first printed page
    const thumb = await browser.newPage({ viewport: { width: 816, height: 1056 }, deviceScaleFactor: 0.45 });
    await thumb.goto(url, { waitUntil: 'networkidle' });
    await thumb.emulateMedia({ media: 'print' });
    await thumb.addStyleTag({ content: 'body{background:#fff !important} .section{padding:56px 64px !important}' });
    await thumb.screenshot({ path: `public/thumbs/${slug}.png`, clip: { x: 0, y: 0, width: 816, height: 1056 } });
    meta[slug] = { pages, kb: Math.max(1, Math.round(pdf.length / 1024)), title };
    console.log(`${slug}: ${pages} page(s), ${meta[slug].kb} KB`);
    await page.close(); await thumb.close();
  }
  await writeFile('src/data/printables-meta.json', JSON.stringify(meta, null, 2) + '\n');
  await browser.close();
  server.close();
})();
