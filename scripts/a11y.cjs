// Accessibility audit: runs axe-core (WCAG 2.0, 2.1 and 2.2, levels A and AA)
// on every built page, at desktop width and at 320px (reflow, WCAG 1.4.10),
// plus checks axe can't do: sideways scrolling, keyboard reachability of
// hidden controls, and a visible focus indicator.
//
// Needs Playwright and axe-core, which are NOT site dependencies:
//   npm i --no-save playwright axe-core && npx playwright install chromium
//   npm run build && npm run a11y
const { chromium } = require('playwright');
const axeSource = require('fs').readFileSync(require.resolve('axe-core/axe.min.js'), 'utf8');
const { createServer } = require('http');
const { readFile, readdir, stat } = require('fs/promises');
const { join, extname } = require('path');

const ROOT = 'dist';
const TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22a', 'wcag22aa'];
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml' };

async function pages(dir, out = []) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await pages(p, out);
    else if (e.name === 'index.html') out.push('/' + p.slice(ROOT.length + 1).replace(/index\.html$/, ''));
  }
  return out;
}

(async () => {
  const server = createServer(async (req, res) => {
    let f = join(ROOT, decodeURIComponent(new URL(req.url, 'http://x').pathname));
    try { if ((await stat(f)).isDirectory()) f = join(f, 'index.html'); res.setHeader('Content-Type', types[extname(f)] || 'text/plain'); res.end(await readFile(f)); }
    catch { res.statusCode = 404; res.end(); }
  }).listen(0);
  const base = `http://localhost:${server.address().port}`;
  const browser = await chromium.launch();
  const problems = [];
  const list = await pages(ROOT);

  for (const width of [1280, 320]) {
    const page = await browser.newPage({ viewport: { width, height: 800 } });
    for (const path of list) {
      await page.goto(base + path, { waitUntil: 'load' });
      await page.addScriptTag({ content: axeSource });
      const result = await page.evaluate((tags) => window.axe.run(document, { runOnly: { type: 'tag', values: tags } }), TAGS);
      for (const v of result.violations) {
        problems.push(`${path} @${width}px  [${v.id}] ${v.help} (${v.nodes.length}): ${v.nodes.slice(0, 2).map((n) => n.target.join(' ')).join(' | ')}`);
      }
      const extra = await page.evaluate(() => {
        const out = [];
        if (document.documentElement.scrollWidth > window.innerWidth + 1) out.push(`sideways scroll (${document.documentElement.scrollWidth}px wide)`);
        for (const el of document.querySelectorAll('a[href], button, input:not([type="hidden"]), select, textarea')) {
          const r = el.getBoundingClientRect();
          const hidden = r.width === 0 || r.height === 0 || r.right < 0 || getComputedStyle(el).visibility === 'hidden';
          if (hidden && el.tabIndex >= 0 && !el.classList.contains('skip-link') && !el.closest('[hidden]')) out.push(`focusable but invisible: ${el.outerHTML.slice(0, 80)}`);
        }
        return out;
      });
      for (const e of extra) problems.push(`${path} @${width}px  ${e}`);
    }
    await page.close();
  }

  // Focus indicator: tab through the home page and confirm each stop shows an outline.
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(base + '/', { waitUntil: 'load' });
  for (let i = 0; i < 25; i++) {
    await page.keyboard.press('Tab');
    const f = await page.evaluate(() => {
      const el = document.activeElement; const s = getComputedStyle(el);
      return { tag: el.tagName, text: (el.textContent || el.name || '').trim().slice(0, 30), outline: s.outlineStyle !== 'none' && parseFloat(s.outlineWidth) >= 2 };
    });
    if (!f.outline) problems.push(`/ focus not visible on ${f.tag} "${f.text}"`);
  }

  await browser.close();
  server.close();
  if (problems.length) { console.error(problems.join('\n')); console.error(`\n${problems.length} problem(s)`); process.exit(1); }
  console.log(`Accessibility audit passed: ${list.length} pages at 1280px and 320px, WCAG 2.2 A/AA rules, focus visible.`);
})();
