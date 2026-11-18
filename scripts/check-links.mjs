// Checks every external link on the built site (dist/), so moved or broken
// sources are caught. Run after a build:  npm run build && npm run links
//
// 404 and 410 are reported as BROKEN (the exit code is 1). 401, 403, 405,
// 429 and timeouts usually mean the site blocks automated checks, so they are
// listed as BLOCKED for a person to open in a browser, not as failures.
import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const root = 'dist';
const files = [];
async function walk(dir) {
  for (const e of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) await walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
}
await walk(root);

const links = new Map(); // url -> first page it appears on
for (const f of files) {
  const html = await readFile(f, 'utf8');
  for (const [, url] of html.matchAll(/href="(https?:\/\/[^"]+)"/g)) {
    const u = url.replace(/&amp;/g, '&');
    if (/fonts\.(googleapis|gstatic)\.com|eolatlas\.com/.test(u)) continue;
    if (!links.has(u)) links.set(u, f.replace(/^dist/, '').replace(/index\.html$/, ''));
  }
}

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36';
async function check(url) {
  for (const method of ['HEAD', 'GET']) {
    try {
      const res = await fetch(url, { method, redirect: 'follow', headers: { 'User-Agent': UA }, signal: AbortSignal.timeout(20000) });
      if (method === 'HEAD' && [403, 405, 404, 501].includes(res.status)) continue; // some servers reject HEAD
      return res.status;
    } catch {
      if (method === 'GET') return 0;
    }
  }
  return 0;
}

const results = { ok: [], broken: [], blocked: [] };
const queue = [...links.keys()];
await Promise.all(
  Array.from({ length: 8 }, async () => {
    while (queue.length) {
      const url = queue.shift();
      const status = await check(url);
      const row = `${status || 'timeout'}  ${url}  (on ${links.get(url)})`;
      if (status >= 200 && status < 400) results.ok.push(row);
      else if ((status === 404 || status === 410) && (await check(new URL(url).origin + '/')) >= 400) results.blocked.push(row + '  [whole site refuses automated checks]');
      else if (status === 404 || status === 410) results.broken.push(row);
      else results.blocked.push(row);
    }
  })
);

console.log(`External links checked: ${links.size}. OK: ${results.ok.length}. Broken: ${results.broken.length}. Blocked or timed out: ${results.blocked.length}.`);
if (results.blocked.length) console.log('\nBLOCKED (open these in a browser to confirm):\n' + results.blocked.sort().join('\n'));
if (results.broken.length) {
  console.log('\nBROKEN:\n' + results.broken.sort().join('\n'));
  process.exit(1);
}
