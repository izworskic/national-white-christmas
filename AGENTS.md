# Agent boundary

Work only inside this repository's stated ownership scope.

Do not copy implementation from sibling tool repositories. Shared location/freshness helpers belong in `izworskic/national-outdoor-core`. Cross-tool behavior must use explicit versioned package or HTTP contracts.

Preserve existing public canonical URLs unless a migration issue explicitly authorizes a URL change.

## Published-route release contract

**Hard rule: no indexable White Christmas URL may be added to a sitemap until the route is proven.** For every new funnel, hub, region, city, state, history, watch, or travel URL:

1. The backing file must exist under `public/` and its canonical must match the public `chrisizworski.com` URL.
2. Nested route families must have explicit `vercel.json` rewrites to their `index.html` backing files. A wildcard rewrite is fallback only and does **not** satisfy this gate.
3. The route must be registered in `public/white-christmas-route-manifest.json`.
4. `npm test` must pass the published-route contract, including backing-file, canonical, route-family, and city/region coverage checks.
5. Merge and verify the owning `national-white-christmas` production deployment **before** the main-site shell adds the URL to a sitemap.
6. The main-site shell must then add an explicit route family before its White Christmas wildcard and pass `npm run benchmark:extracted-routing` before merge.

If any step is red or unknown, do not publish the sitemap URL.
