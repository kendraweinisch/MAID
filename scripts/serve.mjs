// Serves dist/ locally: `npm run serve`, then open http://localhost:8080
import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';

const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.txt': 'text/plain' };
const port = Number(process.env.PORT || 8080);
createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(new URL(req.url, 'http://x').pathname)).replace(/^(\.\.[/\\])+/, '');
  let file = join('dist', p);
  try { if ((await stat(file)).isDirectory()) file = join(file, 'index.html'); } catch { file = join('dist', '404.html'); res.statusCode = 404; }
  try {
    res.setHeader('Content-Type', types[extname(file)] || 'application/octet-stream');
    res.end(await readFile(file));
  } catch { res.statusCode = 500; res.end('Error'); }
}).listen(port, () => console.log(`http://localhost:${port}`));
