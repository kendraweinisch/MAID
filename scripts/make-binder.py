"""Joins the binder's cover and contents with every printable into one PDF.

Run after make-printables.cjs (needs the pypdf package):
  npm run build && node scripts/make-printables.cjs && python3 scripts/make-binder.py
Writes public/printables/binder.pdf and adds its size to printables-meta.json.
"""
import json
from pypdf import PdfReader, PdfWriter

import sys
FRONT_PAGES = 2  # must match BINDER_FRONT_PAGES in src/printables.mjs (and FRONT in src/es-print.mjs)
SPANISH = '--lang' in sys.argv and sys.argv[sys.argv.index('--lang') + 1] == 'es'
if SPANISH:
    slugs = json.load(open('dist/es-binder.json'))
    FRONT_PDF, OUT, KEY, TITLE, FRONT_LABEL = 'dist/binder-front-es.pdf', 'public/printables/carpeta.pdf', 'carpeta', 'La carpeta de End of Life Atlas', 'Portada e índice'
else:
    slugs = [s.strip() for s in open('src/data/printables.txt') if s.strip()]
    FRONT_PDF, OUT, KEY, TITLE, FRONT_LABEL = 'dist/binder-front.pdf', 'public/printables/binder.pdf', 'binder', 'The End of Life Atlas binder', 'Cover and contents'
meta = json.load(open('src/data/printables-meta.json'))

front = PdfReader(FRONT_PDF)
if len(front.pages) != FRONT_PAGES:
    raise SystemExit(f'Cover and contents are {len(front.pages)} pages, expected {FRONT_PAGES}: the contents page numbers would be wrong.')

out = PdfWriter()
out.append(front, outline_item=FRONT_LABEL)
for slug in slugs:
    out.append(PdfReader(f'public/printables/{slug}.pdf'), outline_item=meta[slug]['title'].split(' | ')[0])
out.add_metadata({'/Title': TITLE, '/Author': 'End of Life Atlas (eolatlas.org)'})
out.compress_identical_objects()
with open(OUT, 'wb') as f:
    out.write(f)

import os
pages = len(PdfReader(OUT).pages)
meta[KEY] = {'pages': pages, 'kb': round(os.path.getsize(OUT) / 1024), 'title': TITLE + ' | End of Life Atlas'}
json.dump(meta, open('src/data/printables-meta.json', 'w'), indent=2)
open('src/data/printables-meta.json', 'a').write('\n')
print(f"{KEY}: {pages} pages, {meta[KEY]['kb']} KB")
