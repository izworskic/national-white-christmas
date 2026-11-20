# White Christmas: technology fit, evergreen cycle, and climate-data audit

**Owner:** `izworskic/national-white-christmas`, November 20, 2026.

## Technology Fit Review

**Visitor job:** Find the local chance of having at least 1 inch of snow on December 25, understand whether evidence is historical, observed, or forecast, and return nearer Christmas to make a trip decision. The observed defect is that the live API picks the next Christmas while page titles, generated guides and forecast controls still specify 2026.

| Candidate | Decision | Evidence and implications |
| --- | --- | --- |
| HTML / CSS | **Keep** | All 65 indexable routes retain crawlable text, links, canonicals, Person metadata and no-JS guidance |
| Browser JavaScript | **Keep and correct** | Existing lightweight forecast toggle and seasonal phase controls should use the next date automatically |
| Existing Node.js Vercel backend | **Keep** | Station history, CPC, snowpack and NWS already have a bounded-source integration and time budget; no new live service needed |
| Python | **Add for offline station QA only** | Standard-library audit distinguishes trace, missing years, station identity and observed 1991-2020 counts; never rewrites production estimates |
| Rust / WASM | **Reject for now** | Probability arithmetic is not a measured CPU bottleneck; upstream ACIS and NWS calls are a more plausible latency limit, unprofiled |
| Java | **Reject for now** | A new JVM service adds deployment/maintenance load without improving a demonstrated visitor decision |

**Cost and rollback:** No new Vercel function, Redis, framework, API endpoint, production Python dependency, client bundle or runtime service. Annual action invokes existing GitHub and Vercel Git integration. Remove the Vercel-build roll command, scheduled workflow and audit job to revert, leaving the original weather estimator unaffected. Actual field latency, CTR, Core Web Vitals and revenue are NOT MEASURED.

## Seasonal calendar

- The **upcoming Christmas** remains December 25 of the current UTC year through 23:59:59.999 on that day. At December 26 00:00 UTC it advances to the next year. The following December 26 advances again, including 2027 to 2028.
- `scripts/white-christmas-season-year.mjs` is the pure date and markup transform. `scripts/roll-white-christmas-season.mjs` applies it to every file listed in `public/white-christmas-route-manifest.json`, *after* the existing city generation, enhancement and intent passes. The original source templates can stay at the baseline year; generated publishing output is rolled on every Vercel build.
- Specific year mentions in title, description, open graph, JSON-LD names/FAQ text and visible guide copy change consistently. Preserve historical **1991-2020** figures, asset versions and real publication dates. For annual changes after 2026 the structured `dateModified` becomes the actual season change date, December 26 of the preceding year; it does not claim a fresh change on every cache rebuild.
- `public/assets/white-christmas-season.js` now computes the phase's year in the visitor's own calendar. The forecast's A/B toggle computes the next Christmas day via UTC rather than hardcoding a 2026 date. The API's existing dynamic Christmas target is unchanged.
- `.github/workflows/white-christmas-annual-rollover.yml` checks on December 26 with a January 2 safety retry, validates Node tests, and makes a state-file Git commit only if the stored year is behind the next Christmas. The Git push requests a production deployment through the existing Vercel Git integration. The action also supports manual dispatch. Github Actions permissions and branch rules must allow the bot to push. A successful local transform does not alone prove Vercel deployed, so check the production status after the first automated cycle.
- `data/current-white-christmas-season.json` is an **annual redeployment trigger**, not a climate fact or dynamic runtime input. All new deploys determine the proper year even if the trigger is late.

**Build:** `npm run vercel-build` generates all normal HTML and then rolls published route text.

**QA:** `npm test` covers the original static route contracts plus 2026/2027/2028 date-boundary and SEO-preview tests. `node scripts/roll-white-christmas-season.mjs --year=2028 --dry-run` audits output with no file changes. The browser workflow rolls the generated HTML before screenshots.

## Station audit

Run the independent Python script manually or from CI:

```bash
# Existing recorded Marquette claims (no network, no changes to the live site):
python3 scripts/white_christmas_climate_audit.py --claims data/white-christmas-claim-ledger.json

# Compare a known station using explicit ACIS station ID (network only when invoked):
python3 scripts/white_christmas_climate_audit.py \
  --station USW00014838 \
  --claims data/white-christmas-claim-ledger.json \
  --output /tmp/white-christmas-acis-report.json

# Test in offline deterministic mode:
python3 -m unittest discover -s tests/python -p 'test_*.py'
```

The audit requests **ACIS StnData `snwd` daily observations**, filters December 25 of 1991-2020, treats `T` as trace below one inch, `M`/missing as unavailable, requires at least 15 actual observations, and reports valid years, white years, missing/duplicate years and observed sample proportion. **Do not represent this fraction as NOAA's published Climate Normal**. NOAA NCEI normal methodology can differ from a direct observed count and published map cells are spatial interpolations.

Claims can be meaningfully compared to station samples only after confirming identical station identifiers, time periods and thresholds. A difference between a Marquette city listing and a nearby highland station does not establish which figure is wrong. The ledger intentionally has `station_id: null` pending identification.

Sources checked November 20, 2026:
- ACIS Web Services V2: https://docs.rcc-acis.org/acisws/
- NOAA/NCEI White Christmas and official map methodology: https://www.ncei.noaa.gov/news/white-christmas
- 85% in the existing Michigan Tools listing: https://chrisizworski.com/tools/
- About 96% in the map narrative: https://chrisizworski.com/white-christmas-probability-map/
- High-altitude reference in Michigan Christmas Escapes: https://chrisizworski.com/michigan-white-christmas-escapes/

**No probability changes in this PR.** A separate editorial/source reconciliation is required before the two Marquette claims are unified.

## Protected visitor experience

Same 65 routes, no new indexed pages, no API/model arithmetic changes, no map/photo/ad edits, no new site-server cost, and no canonical, Person identity or sitemap changes. The separately owned Michigan Christmas Escapes guide on the main repository is not modified here. Its title/year copy should be reviewed in the parent site's separate evergreen audit.

## Release evidence

Code and CI status belong to the PR. GitHub workflow success demonstrates unit/build acceptance; the seasonal scheduler's 2026-12-26 push and live-public 2027 rendering must be checked after that future date. Unobserved and incomplete behavior is NOT VERIFIED.
