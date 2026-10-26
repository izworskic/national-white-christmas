# Christmas 2026 weather-intent SERP test — October 26, 2026

## Decision
Keep the approved title, published URL, author identity and city/ZIP lookup. Test only a more literal search-result description that separates **snowfall on December 25** from **a White Christmas with snow already on the ground**. The local lookup was already moved ahead of the long explainer in main. No fake 2026 storm forecast.

## Search Console evidence
Property: `sc-domain:chrisizworski.com`, Google Web Search, October 9–23 inclusive (15 days; 2026-10-23 latest requested).
- Forecast canonical: **597 impressions, 1 click, 0.17% CTR, average position 4.43**.
- Disclosed query `will it snow for christmas`: **362 impressions, 0 clicks, position 3.36**. About 61% of total impressions come from this exact query, but query totals do not cover all anonymized traffic.
- Disclosed query `will it snow on christmas 2026`: **50 impressions, 0 clicks, position 3.76**.
- The query family is not exclusively a forecast request: independent web search found Christmas-weather pages and unrelated entertainment titled *Will It Snow for Christmas?*. Google may also answer a broad early-season forecast question directly without a click. These are possible mechanisms, **not verified Google SERP features**.
- Third-party US Christmas tools prominently offer ZIP/city estimates and NOAA station history (e.g. whitechristmasusa.com and mywild.report/white-christmas), so a plain `Local Odds` claim without defining the two questions can be undifferentiated.

## Controlled intervention
- Keep exact `<title>Will It Snow on Christmas 2026? Local Odds | Chris Izworski</title>`.
- Change only the HTML meta description to: `Will it snow on Christmas 2026? Compare snowfall with snow on the ground, check odds by city or ZIP, and see when a real forecast becomes useful.` (145 characters).
- Preserve current social/structured descriptions, because the underlying product and Person entity did not change.
- Preserve live season/evidence logic, URLs, API, ads and calculator. Make the generator recognize old and new descriptions on reruns.
- Preserve the already-prominent city lookup and the honest distinction between falling snow and settled snow.
- No schema FAQ manipulation or FAQ-rich-result promise.

## Scorecard and release gate
- Baseline metrics **not treatment outcome**; follow-up at 7 and 28 complete days after verified production release by exact page and distinct query families (weather falling, historical snow cover, 2026 vs generic).
- Check live HTML head and that indexable canonical remains the same.
- Capture actual Google SERP title, description and answer features with manual Search Console/Google evidence before attributing causality. A meta change does not guarantee Google displays it.
- Revert if local 2026 query CTR and clicks drop materially, or if snippet is rewritten misleadingly. Do not cherry-pick a daily spike.
- This is an experiment, not a guarantee of CTR uplift; do not infer revenue impact.
