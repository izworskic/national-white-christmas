# White Christmas forecast: October 26, 2026 search-intent diagnosis and city-first release

## Search Console baseline
- `sc-domain:chrisizworski.com`, Sep 25–Oct 22, 2026: /national-tools/white-christmas/forecast/ recorded **1,614 impressions, 3 clicks, 0.19% CTR, average position 3.93**. Values predate this release.
- For Oct 9–22, disclosed query `will it snow for christmas` generated 356 impressions, 0 clicks, average position 3.29. It is **ambiguous**: *Will It Snow for Christmas?* is also a 1996 French film directed by Sandrine Veysset, as verified in IMDb and film listings. The 1996 film confounds the search query's weather intent, and the query breakdown cannot quantify the movie share. `will it snow on christmas 2026` had 50 impressions, 0 clicks, average position 3.76 in that 14-day sample. Prior Sept 12–Oct 11 breakdown and earlier treatment preserved in docs/WHITE_CHRISTMAS_FORECAST_CTR_2026-10-14.md.
- A web search is **not** a stable, device/location-specific Google SERP capture. We cannot yet identify which exact title/snippet Google displayed for the user's impressions, prove a featured snippet or AI Overview caused low CTR, or benchmark weather-only traffic perfectly.

## Release
- Preserve weather-qualified 2026 title, meta description, schema, H1, author, canonical and two-intent switch that separates Christmas Day snowfall from 1-inch snow on the ground.
- Move the already working city/ZIP form to the first primary content section, directly after the weather-intent hero, with accessible input and regular GET URL into the existing estimator. Reposition the longer two-question explainer after the actual place decision. No new pages, sitemaps or historical likelihood claims.
- The current 2026-10-26 JSON-LD `dateModified` and deterministic generator transform are synchronized; test enforces city-first ordering and URL contract.
- No change to weather models, prices, APIs, ad code, identity, or route registry.

## Evaluation / stop-loss
- Measure future GSC weather-qualified queries separately (`will it snow on christmas 2026`, queries with city/state/ZIP, `white christmas odds [city]`). Treat bare `will it snow for christmas` as ambiguous until SERP evidence distinguishes movie versus weather.
- Compare 7/28 finalized days after search reprocessing (which may take days/weeks), with position, CTR, clicks and routing engagement, **not** clicks alone. No ranking uplift claim today.
- Regression gates: `npm test`, Vercel build, route manifest, query-to-estimator, mobile 360px and desktop 1440px.
