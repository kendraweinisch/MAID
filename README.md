# End of Life Atlas (eolatlas.org)

A plain, trustworthy guide to every part of the end of life: planning ahead,
serious illness, the last weeks, after a death, and grief. Medical aid in dying
is one section within it. Positioning: `docs/positioning.md`.

## Run it

Needs Node 20 or later. There are no dependencies to install.

```bash
npm test        # build into dist/ and check every page
npm run serve   # preview at http://localhost:8080
```

## How it's built

- `src/pages.mjs`: all page content. Stage guides use the `guide()` helper
  (sections, sources, related links); printable checklists use `checklist()`.
- `src/data/places.json`: medical aid in dying, by state and country. **Edit those facts here.** Only
  checked facts go in `summary`, `since` and `nonResidents`; anything unchecked
  says "To be verified". Set `verified` to the date a reviewer last checked it.
- `src/layout.mjs`: header, navigation, footer, and the crisis bar (shown on aid-in-dying and grief pages; the footer crisis line is on every page).
- `public/images/atlas-map.svg`: the home-page map, drawn by `scripts/make-map.py`
  (edit the script and re-run `python3 scripts/make-map.py` to change it).
- `src/journeys.mjs`: the two step-by-step journeys (for myself, for someone I love).
- `public/printables/*.pdf`, `public/thumbs/*.png`: made by `scripts/make-printables.cjs`
  from the printable pages. After changing a printable, run
  `npm run build && node scripts/make-printables.cjs && python3 scripts/make-binder.py` and commit the results.
- `src/styles.css`: all styles. `public/`: files copied as-is (favicon, `_redirects` for old addresses).
- `build.mjs`: writes the static site to `dist/`, plus `sitemap.xml` and `robots.txt`.
- `scripts/check.mjs`: fails the build if any page lacks the crisis line, a
  title or a description, or has a broken internal link.

## Monthly accuracy check

On the 1st of each month a scheduled check follows `docs/monthly-review.md`:
it runs `npm run links` (every external source), re-checks laws and key
figures, updates `src/data/review.json` (the "last checked" date shown on
the site), and opens a pull request for review.

## Accessibility (WCAG 2.2 AA / Section 508)

`npm run a11y` audits every built page with axe-core against the WCAG 2.0, 2.1
and 2.2 A/AA rules, at 1280px and 320px wide, and checks keyboard focus is
visible and no hidden control can be reached by keyboard. Playwright and
axe-core are not site dependencies, so install them first:

```bash
npm i --no-save playwright axe-core && npx playwright install chromium
npm run build && npm run a11y
```

Run it before merging changes. Rules to keep: real headings and labels, the
focus outline in `styles.css`, `lang="es"` (or other) on foreign words, and no
information carried by color alone. The public statement is `/accessibility/`.

## Deploy on GitHub Pages (current host, free for this public repo)

`.github/workflows/pages.yml` builds, checks and publishes the site every time
`main` changes. The first time:

1. In the repo: **Settings > Pages > Build and deployment > Source: GitHub Actions**.
2. Re-run the latest "Deploy to GitHub Pages" workflow (**Actions** tab), or merge any change.
3. The site appears at https://eolatlas.org (the old https://kendraweinisch.github.io/MAID/ address forwards there).

Settings live in **Settings > Secrets and variables > Actions > Variables**:

| Variable | Default | What it does |
|---|---|---|
| `BASE_PATH` | `/` | Sub-folder the site is served from. Only needed if the site moves back under a sub-folder, such as `/MAID`. |
| `SITE_PUBLIC_URL` | `https://eolatlas.org` | The site's public address (used after a suggestion is sent). |
| `FORMS_ACCESS_KEY` | the site's Web3Forms key | Web3Forms access key for the suggestions form (public by design). To change where suggestions go, get a new key at web3forms.com and set this variable. |
| `GOATCOUNTER_CODE` | `eolatlas` | GoatCounter analytics code. |
| `SITE_INDEXABLE` | `false` | Set to `true` at launch so search engines can index the site. |

### eolatlas.org (connected November 2026)

The domain is registered at Namecheap. To set it up again:

1. Buy the domain.
2. **Settings > Pages > Custom domain**: enter `eolatlas.org`, then tick **Enforce HTTPS** once it's offered.
3. At your domain registrar, add the DNS records GitHub shows (four `A` records for the bare domain, and a `CNAME` for `www` pointing to `kendraweinisch.github.io`).
4. Re-run the workflow. `BASE_PATH` and `SITE_PUBLIC_URL` already default to the domain.

### Netlify (the previous host)

`netlify.toml` still works if you ever move back. Netlify Forms are no longer
used. To stop Netlify building on every merge, remove the site in Netlify or
unlink its repository.

## Before launch

- [ ] Register eolatlas.org (and eolatlas.com, if you want it, to redirect)
- [ ] Appoint and name a physician and an attorney reviewer (`/about/#reviewers`)
- [ ] Verify the per-place details (waiting periods, clinicians, costs, insurance)
- [ ] Add sources for Belgium and Spain; confirm Delaware's effective date
- [x] Suggestions form: Web3Forms key added (in `.github/workflows/pages.yml`)
- [ ] Analytics: confirm the GoatCounter account for `eolatlas` (or set `GOATCOUNTER_CODE`)
- [ ] Lawyer review of the whole site, especially the Switzerland and property-abroad pages
- [ ] Turn on search indexing

## Other files

- `docs/`: name shortlist and competitor notes
- `mockups/landing-page/`: the original design mockup

## Spanish

Every page has a Spanish version under `/es/`, built from `src/es*.mjs`. Each one is
paired with its English page in `ES_PAIRS` (`src/layout.mjs`), which drives
the hreflang tags and the English/Español switch in the header. The Ask
assistant uses `search-index-es.json` on Spanish pages. Translations are
flagged as pending review by a native speaker.

## Advance directives by state

`src/data/advance-directives.json` lists, for each state and DC, the official
form or the law that sets it out, plus a free CaringInfo form. Pages are built
by `src/advance-directives.mjs`.

## The binder

`/checklists/binder/` and `public/printables/binder.pdf`: every printable in
one PDF, and the Spanish binder at `/es/imprimibles/carpeta/` (`carpeta.pdf`). Rebuild with `node scripts/make-printables.cjs && python3 scripts/make-binder.py && python3 scripts/make-binder.py --lang es`.

## The app (installable, works offline)

The site is an installable web app. `public/manifest.webmanifest` and
`public/manifest-es.webmanifest` describe it; `public/app.js` registers the
service worker and shows "Install the app" buttons where browsers offer it;
`build.mjs` writes `dist/sw.js` on every build, with the pages saved for
offline use (`PRECACHE`). Keep `PRECACHE` and the lists in
`src/app-pages.mjs` in step. Icons are made by `scripts/make-logo-images.cjs`.
