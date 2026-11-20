# White Christmas Experience Investment | November 20, 2026

Mode: IMPLEMENT after REVIEW. The Experience Investment skill was read from the still-open source-only PR [#1780](https://github.com/izworskic/chrisizworski-com/pull/1780). This separate owning repository has not yet adopted that skill automatically.

## Visitor jobs and baseline

- **Calculator:** Answer "Will I wake up to at least an inch of snow where I live?" The existing location-first result, historical-vs-current comparison, confidence and trend are useful and retained.
- **Forecast:** Answer "Will snow fall on December 25, or simply be on the ground?" Preserve the location-first decision from the established test contract and its two-button distinction.
- **Historical atlas:** Show where Christmas snow cover has been common, with NOAA as the explicit historical source. The existing iframe was below a large scenic masthead, its fallback route was not visible, and lazy loading deferred the main visitor instrument.
- **City guides:** Help readers understand the snow pattern in a *specific* city before they move to an evolving current-year estimate. Existing 50 data-rich guides had generic entry composition.
- **Regional guides:** Give snow-belt context and immediate named-city handoffs, not a regional-average numerical forecast.

Authoritative owner: `izworskic/national-white-christmas`. Canonical public route families are unchanged. The Michigan White Christmas Escapes field guide at `/michigan-white-christmas-escapes/` is owned by `izworskic/chrisizworski-com` and was reviewed as a companion, not modified here.

Production/source and previous page state were inspected using the repository and public crawl on 2026-11-20. **Before and after browser screenshots were NOT CAPTURED.** Live interactive map tiles, mobile behavior and production deploy were NOT VERIFIED.

## Source evidence and editorial boundary

- NOAA Climate.gov, historical White Christmas map: https://www.climate.gov/news-features/understanding-climate/interactive-map-are-you-dreaming-white-christmas
- NOAA/NCEI explanation: https://www.ncei.noaa.gov/news/white-christmas
- NWS Northern Indiana, one-inch snow-depth definition: https://www.weather.gov/iwx/whitechristmas
- Comparative current data view: https://nationalstorms.com/white-christmas/

NOAA's 1991-2020 map is **historical climatology**, not a specific 2026 snowfall forecast. An inch on the ground differs from fresh snow falling on December 25. Location, winter snowpack and a dated weather forecast remain separate evidence categories.

**Unresolved source consistency:** The main site's Tools listing currently describes Marquette as 85%, while the companion field guide and national owner pages describe a roughly 96% 1991-2020 station-based result. Marquette city and NWS WFO/nearby highland station are not necessarily interchangeable, nor is a historical percent a current-year live model estimate. Do not silently normalize percentages until station IDs, sample periods, elevation and actual thresholds are reconciled. This PR does not change numerical weather inputs or source calculations.

## Three opportunities considered

1. Map load and first-task hierarchy. High visitor value, low modeling risk: move from a scenic brochure entry to a map-focused atlas and include an official-source escape hatch.
2. City-guide generic entry. High visitor value, low risk: surface each guide's already-authored first local factor before the technical explanation.
3. Forecast versus snow-cover confusion. High value, moderate risk: make the distinction plain while preserving the location-first handoff and existing tested toggle.

## Two credible alternative directions

**A. One large map with identical place cards across every page.** Phone entry: map pins and a generic "check location" button. Desktop: shared split map/card layout. Failure: list of city cards. Cost: medium and a new synchronization burden. Rejected: the Christmas forecast is a *time and evidence* question; historical probabilities do not belong in the same display state as a live current-year number. Unverified map-position selectors could imply false spatial precision.

**B. Different visual grammar for three jobs (chosen).** Historical map gets a compact atlas introduction, large NOAA map and a visible source/fallback. Forecast keeps city/ZIP first, then its reversible snowfall-versus-snow-cover question. City guides gain a city-specific snow-pattern reading using existing source-backed editorial data; region and city-directory layouts remain separate. Cost: small-to-medium, no new dependencies. Offline/no-JS path: all city guidance and links are HTML; historical atlas links to NOAA even if the embedded map fails; forecast wording/initial controls remain readable before enhancements.

Closest existing site comparisons: Michigan Snow Totals is a *reported-snowfall* instrument with magnitude comparisons, while Michigan Snow Depth is a *current snowpack* spatial instrument. White Christmas instead separates a long-term probability atlas from a current-year local model and from a guide to the physical persistence of Christmas snow. The distinct differences are decision/evidence, page composition and interaction role, not a new color skin.

## Implementation and protection

- `public/white-christmas-probability-map/index.html`: map-specific class, primary map anchor, eager iframe, official NOAA fallback and live-calculator handoff.
- `public/national-tools/white-christmas/forecast/index.html`: explicit snowfall-versus-ground-cover wording and scoped layout. Original city/ZIP-first ordering is preserved because it is an existing intentional regression rule.
- `scripts/generate-white-christmas-city-pages.mjs`: city-specific local snow pattern from the *existing first factor*, linked to the complete three-factor section; applies to all 50 generated city pages at existing build time.
- `scripts/enhance-white-christmas-network.mjs`: scoped directory/region layouts and explicit city-list anchor, no changed routes.
- `public/assets/white-christmas.css`: responsive styles scoped by route and role, map focus fallback and keyboard focus styling; no font, framework, image, API or build dependency.
- `tests/white-christmas-experience-investment-20261120.test.js`: coverage for map evidence/fallback, source-specific generated copy, city and forecast distinctiveness, network and keyboard/reduced motion safeguards.

Protected without edits: estimator API/model, current data sources, station numbers, URL ownership, canonical/Person metadata, ad injection, existing photographs/credits, sitemap/routes/manifest, forecast interaction code, location privacy. Existing code generations are reused, not new build steps.

## Verification and release stages

- Source changes on dedicated feature branch: IMPLEMENTED.
- Targeted Node suite and full `npm test`: **NOT VERIFIED** in current non-checkout environment. The full test also regenerates and validates all city/region HTML.
- Actual 360 / 390 / 768 / 1280 / 1440 browser scenes, NOAA embed and source-link behavior, keyboard, no-JS, network failure, slow assets, contrast and A -> B -> A question toggle: **NOT VERIFIED**.
- Before/after 390/1280 screenshots: **NOT CAPTURED**.
- Experience OS weighted score and distinctiveness release veto: **NOT MEASURED**. No score is inferred from structural tests.
- PR review / exact-head CI: pending.
- Merge, owner Vercel deployment, main-site integration and live-public smoke: **NOT DONE**.
- Organic clicks, CTR, engagement and revenue: **NOT MEASURED**.

**One next action:** Run `npm test` on the exact PR head and the real 390/1280px browser acceptance for atlas, city and forecast before approval; reconcile Marquette station provenance in a separate owner-and-shell evidence pass.
