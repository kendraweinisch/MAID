# End of Life Atlas (eolatlas.com)

A neutral, current guide to medical aid in dying in the US and worldwide, with
paid navigation help alongside it.

## Run it

Needs Node 20 or later. There are no dependencies to install.

```bash
npm test        # build into dist/ and check every page
npm run serve   # preview at http://localhost:8080
```

## How it's built

- `src/data/places.json`: every state and country. **Edit facts here.** Only
  checked facts go in `summary`, `since` and `nonResidents`; anything unchecked
  says "To be verified". Set `verified` to the date a reviewer last checked it.
- `src/pages.mjs`: page content. `src/layout.mjs`: header, footer, crisis line.
- `src/styles.css`: all styles. `public/`: files copied as-is (favicon).
- `build.mjs`: writes the static site to `dist/`, plus `sitemap.xml` and `robots.txt`.
- `scripts/check.mjs`: fails the build if any page lacks the crisis line, a
  title or a description, or has a broken internal link.

## Deploy (Netlify)

`netlify.toml` is set up: build command `node build.mjs`, publish `dist`.
Forms (alerts, navigation interest, professionals) use Netlify Forms.
Search indexing is **off** until launch: set `SITE_INDEXABLE` to `"true"` in
`netlify.toml` when you're ready.

## Before launch

- [ ] Register eolatlas.com (and eolatlas.org to redirect)
- [ ] Appoint and name a physician and an attorney reviewer (`/about/#reviewers`)
- [ ] Verify the per-place details (waiting periods, clinicians, costs, insurance)
- [ ] Add sources for Belgium and Spain; confirm Delaware's effective date
- [ ] Set navigation prices (`[PRICE]` on `/navigation/`)
- [ ] Set up corrections@ and privacy@ email addresses
- [ ] Lawyer review of the whole site, especially `/going-abroad/` and `/navigation/`
- [ ] Turn on search indexing

## Other files

- `docs/`: name shortlist and competitor notes
- `mockups/landing-page/`: the original design mockup
