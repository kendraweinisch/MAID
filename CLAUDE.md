# End of Life Atlas: working rules

Read this before changing the site. The README explains how the site is built.

## Always make English and Spanish together

Every new page, section, printable or other piece of reader-facing material
is made in English **and** Spanish in the same change. Never add English-only
material.

- New English page: add its Spanish page in `src/es.mjs`, pair them in
  `ES_PAIRS` (`src/layout.mjs`), and link the Spanish page from the Spanish
  pages that match where the English one is linked.
- New printable: add the Spanish printable too, and its PDF via the `OTHER`
  list in `scripts/make-printables.cjs`.
- Changed English text: make the same change to its Spanish pair.
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
