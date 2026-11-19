# End of Life Atlas: working rules

Read this before changing the site. The README explains how the site is built.

## Always make English and Spanish together

Every new page, section, printable or other piece of reader-facing material
is made in English **and** Spanish in the same change. Never add English-only
material.

- Every English page has a Spanish page. Spanish pages live in `src/es*.mjs`
  (`es.mjs` core guides, `es-batch2/3a/3b.mjs` guides, `es-maid.mjs`,
  `es-print.mjs` printables and binder, `es-static.mjs` help, about and state
  pages). Pair each new page with `pair(en, es)` from `src/layout.mjs`, and
  link it from the Spanish pages that match where the English one is linked.
- New printable: add the Spanish printable in `src/es-print.mjs` (it is
  picked up for PDFs automatically) and add it to `ES_BINDER`. Rebuild both
  binders: `python3 scripts/make-binder.py` and `python3 scripts/make-binder.py --lang es`.
- Changed English text: make the same change to its Spanish pair.
- Data with reader-facing text (such as `src/data/places.json`) keeps the
  Spanish wording beside the English, under `es`. Update both together.
- Spanish search: add Spanish synonyms in `public/assistant.js` when you add
  English ones.
- Use "usted", keep the same facts and sources, link to a company's or
  government's Spanish page where one exists, and mark English-only links
  "(en inglés)". Spanish pages carry the "pending native-speaker review" note.

## Facts

- No invented facts. Every new fact needs a source, linked on the sentence it
  supports (`INLINE` in `src/pages.mjs`) and in the page's sources.
- Verify every outside link before adding it.

## Design

- Bordered or filled boxes are for things you can click. Information uses
  type, thin rules, dots and color.
- Run `npm test` and the accessibility audit (`npm run a11y`) before
  publishing.

## Publishing

- The site is hosted on GitHub Pages and publishes automatically when `main`
  changes. The user asks for a pull request and a merge after each change.
