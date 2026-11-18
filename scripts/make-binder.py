"""Joins the binder's cover and contents with every printable into one PDF.

Run after make-printables.cjs (needs the pypdf package):
  npm run build && node scripts/make-printables.cjs && python3 scripts/make-binder.py
Writes public/printables/binder.pdf and adds its size to printables-meta.json.
"""
import json
from pypdf import PdfReader, PdfWriter

FRONT_PAGES = 2  # must match BINDER_FRONT_PAGES in src/printables.mjs
slugs = [s.strip() for s in open('src/data/printables.txt') if s.strip()]
meta = json.load(open('src/data/printables-meta.json'))

front = PdfReader('dist/binder-front.pdf')
if len(front.pages) != FRONT_PAGES:
    raise SystemExit(f'Cover and contents are {len(front.pages)} pages, expected {FRONT_PAGES}: the contents page numbers would be wrong.')

out = PdfWriter()
out.append(front, outline_item='Cover and contents')
for slug in slugs:
    out.append(PdfReader(f'public/printables/{slug}.pdf'), outline_item=meta[slug]['title'].split(' | ')[0])
out.add_metadata({'/Title': 'The End of Life Atlas binder', '/Author': 'End of Life Atlas (eolatlas.com)'})
out.compress_identical_objects()
with open('public/printables/binder.pdf', 'wb') as f:
    out.write(f)

import os
pages = len(PdfReader('public/printables/binder.pdf').pages)
meta['binder'] = {'pages': pages, 'kb': round(os.path.getsize('public/printables/binder.pdf') / 1024), 'title': 'The End of Life Atlas binder | End of Life Atlas'}
json.dump(meta, open('src/data/printables-meta.json', 'w'), indent=2)
open('src/data/printables-meta.json', 'a').write('\n')
print(f"binder: {pages} pages, {meta['binder']['kb']} KB")
