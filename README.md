# End of Life Atlas (eolatlas.com)

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
- `src/styles.css`: all styles. `public/`: files copied as-is (favicon, `_redirects` for old addresses).
- `build.mjs`: writes the static site to `dist/`, plus `sitemap.xml` and `robots.txt`.
- `scripts/check.mjs`: fails the build if any page lacks the crisis line, a
  title or a description, or has a broken internal link.

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

## Deploy on Netlify (current host)

Netlify builds from `netlify.toml` (build `node build.mjs`, publish `dist`) and
handles the sign-up forms itself; submissions appear under **Forms** in the
Netlify dashboard. Search indexing stays off until `SITE_INDEXABLE` is set to
`"true"` in `netlify.toml`.

## Deploy on GitHub Pages (alternative, free for this public repo)

`.github/workflows/pages.yml` builds, checks and publishes the site. It runs
only when started by hand while Netlify is the host.

1. Merge the site into `main`.
2. In the repo: **Settings > Pages > Build and deployment > Source: GitHub Actions**.
3. The site appears at https://kendraweinisch.github.io/maid/

Settings live in **Settings > Secrets and variables > Actions > Variables**:

| Variable | Default | What it does |
|---|---|---|
| `BASE_PATH` | `/maid` | Sub-folder the site is served from. Set to `/` once eolatlas.com is connected. |
| `FORM_ENDPOINT` | empty | URL of a form service (for example Formspree). Empty = forms say "opening soon". |
| `SITE_INDEXABLE` | `false` | Set to `true` at launch so search engines can index the site. |

### Connecting eolatlas.com

1. Buy the domain.
2. **Settings > Pages > Custom domain**: enter `eolatlas.com`, then tick **Enforce HTTPS** once it's offered.
3. At your domain registrar, add the DNS records GitHub shows (four `A` records for the bare domain, and a `CNAME` for `www` pointing to `kendraweinisch.github.io`).
4. Set the `BASE_PATH` variable to `/` and re-run the workflow.

## Before launch

- [ ] Register eolatlas.com (and eolatlas.org to redirect)
- [ ] Connect a form service and set `FORM_ENDPOINT`
- [ ] Appoint and name a physician and an attorney reviewer (`/about/#reviewers`)
- [ ] Verify the per-place details (waiting periods, clinicians, costs, insurance)
- [ ] Add sources for Belgium and Spain; confirm Delaware's effective date
- [ ] Set navigation prices (`[PRICE]` on `/navigation/`)
- [ ] Set up corrections@, privacy@ and accessibility@ email addresses
- [ ] Lawyer review of the whole site, especially `/going-abroad/` and `/navigation/`
- [ ] Turn on search indexing

## Other files

- `docs/`: name shortlist and competitor notes
- `mockups/landing-page/`: the original design mockup
