// Checks the built site: every page has the crisis line, a title and a description,
// no template leftovers, and every internal link points to a page that exists.
import { readdir, readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

const root = 'dist';
const base = (process.env.BASE_PATH || '').replace(/\/$/, '');
const files = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
}
await walk(root);

const exists = async (p) => stat(p).then(() => true, () => false);
const problems = [];
for (const f of files) {
  const html = await readFile(f, 'utf8');
  if (!html.includes('988') || !html.includes('findahelpline.com')) problems.push(`${f}: missing crisis line`);
  if (/medical-aid-in-dying|grief/.test(f) && !html.includes('class="crisis"')) problems.push(`${f}: missing crisis bar`);
  if (!/<title>[^<]+<\/title>/.test(html)) problems.push(`${f}: missing title`);
  if (!/<meta name="description" content="[^"]+"/.test(html)) problems.push(`${f}: missing description`);
  if (/undefined|\[object Object\]|NaN/.test(html)) problems.push(`${f}: template leftover`);
  for (let [, href] of html.matchAll(/href="(\/[^"#?]*)/g)) {
    if (base) {
      if (!href.startsWith(base + '/')) { problems.push(`${f}: link missing base path ${href}`); continue; }
      href = href.slice(base.length);
    }
    const target = href.endsWith('/') ? join(root, href, 'index.html') : join(root, href);
    if (!(await exists(target))) problems.push(`${f}: broken link ${href}`);
  }
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`Checked ${files.length} pages: OK`);
