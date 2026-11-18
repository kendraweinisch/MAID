# Monthly accuracy check

Run on the 1st of every month (a scheduled Claude session does this
automatically and opens a pull request). A person reviews and merges.

## 1. Build and mechanical checks

```bash
npm test                 # build and internal checks
npm run links            # every external source link
npm run a11y             # WCAG 2.2 audit (see README for setup)
```

- Fix every BROKEN link: find the new address of the same source, or a
  better source for the same fact. Never delete a fact's only source
  without replacing it or removing the fact.
- BLOCKED links usually mean the site refuses automated checks. Confirm a
  few by search; list any you could not confirm in the pull request.

## 2. Laws (src/data/places.json and the medical aid in dying pages)

For every place, check for changes since the last scan: new laws, laws
taking effect, court rulings, repeals, residency changes, and bills that
passed or failed. Also check the "researching" list for countries that
have legalized. When a place is confirmed unchanged or updated, set its
`verified` date to today.

Watch especially: France (law expected to take effect in 2027), Uruguay
(rollout), Delaware (effective date), England and Wales, Scotland, Jersey
and the Isle of Man, US state bills, and any new US states.

## 3. Figures and rules that change

| Page | What to re-check |
|---|---|
| What it costs | CareScout cost of care (new survey usually each spring), NFDA funeral medians and cremation rate, KFF and Dartmouth data years, Medicare hospice cost-sharing |
| Wills, trusts and the paperwork | Federal estate tax threshold (IRS), state estate and inheritance tax lists (Tax Foundation), Canada (Ontario estate administration tax, provincial rule changes), UK (inheritance tax threshold, pensions from April 2027, lasting power of attorney fee), Australia (super death benefit tax, state rule changes) |
| Property abroad | Mexico Will Month, EU succession rules, Canada and UK points |
| Every choice for the body | States allowing human composting and water cremation, EPA and UK burial-at-sea rules |
| Going to Switzerland | Approximate fees |
| Finding help | Directory links still live |
| Advance directives by state (`src/data/advance-directives.json`) | Every official form link and CaringInfo link still live; new state forms (several states, such as Utah in 2026, are moving to the Uniform Health-Care Decisions Act). Update `verified` |

## 4. Cost database reports

1. In Netlify, open Forms → cost-report and download the submissions as CSV.
2. Delete any rows that shouldn't be published: spam, jokes, personal names,
   medical details, or amounts that are clearly wrong.
3. Run `node scripts/import-costs.mjs path/to/export.csv`. It skips rows
   already imported and lists rows it rejected, and why.
4. Check the diff of `src/data/cost-reports.json`, then build and commit.

The table shows a median for a kind of care once it has 3 US-dollar reports.

## 4b. Spanish pages

The Spanish pages in `src/es.mjs` translate the English pages listed in
`ES_PAIRS` (`src/layout.mjs`). If one of those English pages changed this
month, make the same change in Spanish. Spanish translations are marked as
pending native-speaker review until a reviewer has read them.

## 5. Printables

If any printable's text changed, regenerate the PDFs and thumbnails:
`npm run build && node scripts/make-printables.cjs && python3 scripts/make-binder.py` (the last step rebuilds the all-in-one binder; it needs the pypdf package), and commit them.

## 6. Rules for any change

- No invented facts. Every new or changed fact needs a source on the page.
- Prefer official sources (governments, regulators, statutes), then
  established organizations, then reputable news.
- Keep the voice: plain, international, nonjudgmental, honest.
- Update `src/data/review.json` `lastScan` to the date of the check, and a
  guide's `reviewed` date only when its text changed.

## 7. Pull request

Title: `Monthly accuracy check: <Month YYYY>`. In the description, list
what changed (with sources), what was confirmed unchanged, blocked links
that need a person to look, and anything uncertain.
