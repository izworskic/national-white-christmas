# White Christmas historical evidence integrity (2026-11-26)

Product Engineering OS FIX; lead historical-data-intelligence. Visitor job: distinguish a local historical Christmas snow-depth frequency from a weather-adjusted current-year estimate. The owning repository is national-white-christmas; the central site owns routing only. Main Verify repository 44914883337 passed; scheduled source smoke 45696556136 passed; no open PRs at intake.

Source audit: annual snow-depth rows accepted negative values, whitespace and booleans as measurements; dated input did not enforce Christmas Day; duplicate years could inflate coverage. Correct strict date/number handling, require complete positional interval, deduplicate agreeing annual values and withhold ambiguous years. Minimum usable history remains 15 unique years. Trace and measured zero remain zero. Normal and recent periods stay 1991–2020 and 2016–2025. No changes to existing weather adjustment algorithm or shared source contracts.

Result copy explicitly identifies an estimate and an evidence-quality rating, not measured forecast accuracy. No redesign: existing location-first lookup, historical comparison and progressive disclosure are retained. Existing JS/HTML is sufficient; no Python, Rust or Java. Preserve titles, canonical URLs, Person/creator identity, ads, source links and privacy. No route, sitemap, dependency, schedule, service or extra function.

Five added regression tests covering duplicate, invalid, date, positional and copy behavior. Full CI, independent review and live station coverage after deployment pending. Browser verification of the revised copy is not yet performed. No search or predictive accuracy improvement claimed. No private growth figures.
