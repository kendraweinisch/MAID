// Renders the logo PNGs from public/logo-mark.svg (needs Playwright):
//   node scripts/make-logo-images.cjs
// Writes public/logo.png (512px), public/icon-192.png, public/icon-512.png,
// public/icon-maskable-512.png (app icons), public/apple-touch-icon.png (180px) and
// public/og-image.png (1200x630, the picture shown when a page is shared).
const { chromium } = require('playwright');
const { readFileSync } = require('fs');

const mark = readFileSync('public/logo-mark.svg', 'utf8');
const fonts = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=Source+Serif+4:opsz,wght@8..60,600&display=swap">';
const page = (w, h, inner) => `<!doctype html><html><head>${fonts}<style>html,body{margin:0;width:${w}px;height:${h}px;background:#F5F0E6;overflow:hidden}</style></head><body>${inner}</body></html>`;

(async () => {
  const browser = await chromium.launch();
  const shot = async (w, h, html, path) => {
    const p = await browser.newPage({ viewport: { width: w, height: h } });
    await p.setContent(html, { waitUntil: 'networkidle' });
    await p.evaluate(() => document.fonts.ready);
    await p.screenshot({ path });
    await p.close();
  };
  await shot(512, 512, page(512, 512, `<div style="padding:56px">${mark}</div>`), 'public/logo.png');
  // App icons (installable web app). The maskable one keeps the mark inside the safe zone.
  await shot(192, 192, page(192, 192, `<div style="padding:20px">${mark}</div>`), 'public/icon-192.png');
  await shot(512, 512, page(512, 512, `<div style="padding:52px">${mark}</div>`), 'public/icon-512.png');
  await shot(512, 512, page(512, 512, `<div style="padding:112px">${mark}</div>`), 'public/icon-maskable-512.png');
  await shot(180, 180, page(180, 180, `<div style="padding:22px">${mark}</div>`), 'public/apple-touch-icon.png');
  await shot(1200, 630, page(1200, 630, `<div style="display:flex;align-items:center;gap:56px;height:100%;padding:0 96px;box-sizing:border-box;border-bottom:14px solid #3A6690">
<div style="width:260px;flex:none">${mark}</div>
<div><div style="font:600 84px/1.02 'Source Serif 4',serif;color:#1E2328;letter-spacing:-0.02em">End of Life Atlas</div>
<div style="font:400 26px/1.4 'IBM Plex Mono',monospace;color:#5C5A55;letter-spacing:0.06em;text-transform:uppercase;margin-top:22px">Every part of the end of life, explained</div>
<div style="font:400 30px/1.4 'IBM Plex Mono',monospace;color:#2F5D8A;margin-top:30px">eolatlas.org</div></div></div>`), 'public/og-image.png');
  await browser.close();
  console.log('Wrote the logo, app icons, apple-touch-icon and og-image');
})();
