# Christmas 2026 weather-intent CTR treatment

Release candidate: 2026-10-14, America/Detroit  
Canonical: https://chrisizworski.com/national-tools/white-christmas/forecast/

## Evidence (Google Search Console, chrisizworski.com, 2026-09-12 through 2026-10-11)
- Canonical page: 2,086 impressions; 2 clicks; 0.10% CTR; average position 5.49.
- "will it snow for christmas": 1,418 impressions, 0 clicks, position 4.17.
- "will it snow on christmas 2026": 106 impressions, 0 clicks, position 7.32.
- "is it going to snow on christmas 2026": 83 impressions, 1 click, position 8.86.

Caution: "Will It Snow for Christmas?" is also the exact title of a 1996 movie, so its high impressions cannot be assumed to represent weather-intent demand. Query rows are privacy-filtered, not additive to page impressions. Position mixes and SERP answer features affect CTR. Do not infer causal impact from seasonality.

## Ownership and visitor promise
- Forecast canonical: "Will it snow on Christmas 2026?" — explain that a dependable December 25 storm forecast is not available months out; open an actual city-specific snow outlook immediately.
- Calculator canonical /national-tools/white-christmas/: individual place probability of at least 1 inch **on the ground** on December 25, backed by local Christmas history, with snowpack and NWS evidence as they become valid.
- City and regional pages: distinct local context, not alternative canonicals for national forecast-intent queries.

## Scope
Update the forecast canonical's title, meta description, OG/X sharing metadata, heading into the estimator, first-screen and local-odds explanation. Update the existing deterministic postprocessing step to preserve these edits at build, and add assertions to the existing funnel tests. Do not modify any historical probability calculation, location parser, weather API, forecast window, city data, sitemap route, backend, ads, or user privacy.

## Quality and loss checks
- Search promise: title < 60 characters, description <= 158, geographic weather-intent and 2026 explicitly clear; do not compete with a film-information intent.
- Immediate action: visible U.S. city/ZIP form routes into the existing local calculator with the query preserved.
- Truth boundary: 1+ inch of snow **on ground** is not the same as snowfall on December 25; no 70-day Christmas Day weather prediction.
- No duplicated indexable pages; canonical stays unchanged and self-referencing.
- Identity: author `https://chrisizworski.com/#person`, user-recognizable Chris Izworski title.
- Continuity: CSS, JSON-LD FAQ, seasonal status, cities/regions, mobile and accessibility attributes preserved.
- Verification: `npm test`, `npm run vercel-build`, PR CI, and correct normal-URL HTML readback after READY production deployment.

## Evaluation
First diagnostic: a complete 7-day GSC Web query/page window after Google recrawls. Compare 28-day equivalent periods once fully reported, separating "on Christmas 2026", "in [city] Christmas 2026", and broad ambiguous "for Christmas" queries. Compare CTR, clicks, average position, exact title appearance where available and clickthrough to estimator, not just impressions. A CTR of 0.5-1.0% would be an early improvement from the 0.10% baseline, but is **not** a prediction or promise. Reversal trigger: factual inaccuracy, failed routing, broken city form, canonical drift, or sustained material ranking/engagement regression after comparable windows.

No early-season long-range day-specific forecast claims; the page explicitly states which evidence is and is not available at the point of visit.
