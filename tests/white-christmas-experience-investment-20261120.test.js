const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const root = path.join(__dirname, "..");
const read = (file) => fs.readFileSync(path.join(root, file), "utf8");
const map = read("public/white-christmas-probability-map/index.html");
const forecast = read("public/national-tools/white-christmas/forecast/index.html");
const css = read("public/assets/white-christmas.css");
const data = JSON.parse(read("data/white-christmas-cities.json"));

test("historical atlas has the real map and an NOAA-hosted fallback, not a forecast claim", () => {
  assert.match(map, /class="white-christmas-page wc-support-page wc-map-atlas"/);
  assert.match(map, /id="noaa-map"/);
  assert.match(map, /title="NOAA White Christmas probability map" loading="eager"/);
  assert.match(map, /src="https:\/\/noaa\.maps\.arcgis\.com\/apps\/instant\/sidebar\/index\.html\?appid=b84e9ad7fa6d4c2da15001efc048c809"/);
  assert.match(map, /noaa\.maps\.arcgis\.com\/apps\/instant\/sidebar/);
  assert.match(map, /www\.ncei\.noaa\.gov\/news\/white-christmas/);
  assert.match(map, /Map not loading\?/);
  assert.match(map, /historical map does not forecast Christmas 2026/i);
  assert.match(map, /href="https:\/\/chrisizworski\.com\/white-christmas-probability-map\/"/);
});

test("forecast preserves the location-first decision while clarifying two different snow questions", () => {
  assert.match(forecast, /wc-forecast-decision/);
  assert.ok(forecast.indexOf('<div class="wc-locator"') < forecast.indexOf('<section class="wc-snow-question"'));
  assert.match(forecast, /Fresh flakes falling on December 25 and snow already covering the ground are different questions/);
  assert.match(forecast, /data-snow-question="falling"/);
  assert.match(forecast, /data-snow-question="cover"/);
  assert.match(forecast, /name="q"/);
});

test("every city guide starts with a city-specific sourced snow-pattern reading", () => {
  assert.equal(data.cities.length, 50);
  for (const city of data.cities) {
    const html = read("public/national-tools/white-christmas/cities/" + city.slug + "/index.html");
    assert.match(html, /wc-city-guide/);
    assert.match(html, /wc-city-lens/);
    assert.match(html, /aria-label="[^"]+ snow pattern"/);
    assert.match(html, /href="#city-drivers"/);
    assert.match(html, /id="city-drivers"/);
    assert.match(html, /id="city-alternatives"/);
    assert.ok(html.includes(city.factors[0][0]), city.slug);
    assert.match(html, /data-wc-season-copy/);
    assert.match(html, /"@type":"FAQPage"/);
    assert.match(html, /https:\/\/chrisizworski\.com\/#person/);
  }
});

test("regional and city directory layouts remain separate from the flagship", () => {
  const region = read("public/national-tools/white-christmas/regions/great-lakes-ohio-valley/index.html");
  const directory = read("public/national-tools/white-christmas/cities/index.html");
  const flagship = read("public/national-tools/white-christmas/index.html");
  assert.match(region, /wc-region-guide/);
  assert.match(region, /id="region-cities"/);
  assert.match(directory, /wc-city-directory/);
  assert.match(flagship, /id="probability"/);
  assert.doesNotMatch(flagship, /wc-map-atlas|wc-city-guide|wc-forecast-decision/);
});

test("scoped styles have responsive, reduced-motion and keyboard affordances without a new runtime dependency", () => {
  for (const cls of [".wc-map-atlas", ".wc-city-guide", ".wc-forecast-decision", ".wc-region-guide"]) {
    assert.ok(css.includes(cls), cls);
  }
  assert.match(css, /\.wc-city-lens a:focus-visible/);
  assert.match(css, /@media\(max-width:430px\)/);
  assert.match(css, /@media\(prefers-reduced-motion:reduce\)/);
});

test("the flagship retains the source-traceable result and presents an early mobile lookup", () => {
  const flagship = read("public/national-tools/white-christmas/index.html");
  assert.match(flagship, /class="white-christmas-page wc-calculator"/);
  assert.match(flagship, /id="wc-location"/);
  assert.match(flagship, /id="probability"/);
  assert.match(flagship, /id="confidence"/);
  assert.match(flagship, /id="data-status"/);
  assert.match(css, /\.wc-calculator \.wc-hero-inner/);
  assert.match(css, /\.wc-calculator \.wc-search-row/);
});

test("Michigan overview answers local-versus-travel decisions before historical station comparisons", () => {
  const michigan = read("public/white-christmas-michigan/index.html");
  assert.match(michigan, /wc-michigan-guide/);
  assert.match(michigan, /wc-mi-decisions/);
  assert.match(michigan, /Will my Michigan town have snow\?/);
  assert.match(michigan, /Where could we find a snowier Christmas\?/);
  assert.ok(michigan.indexOf("wc-mi-decisions") < michigan.indexOf("34.7% historical probability"));
  assert.match(michigan, /href="\/michigan-white-christmas-escapes\/"/);
  assert.match(css, /\.wc-mi-decision:focus-visible/);
});
