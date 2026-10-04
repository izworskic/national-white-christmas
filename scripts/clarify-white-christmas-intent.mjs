#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const hubPath = path.join(root, 'public/national-tools/white-christmas/index.html');
const forecastPath = path.join(root, 'public/national-tools/white-christmas/forecast/index.html');

function replaceRequired(html, before, after, label) {
  if (!html.includes(before) && html.includes(after)) return html;
  if (!html.includes(before)) throw new Error(`White Christmas intent pass: missing ${label}`);
  return html.replaceAll(before, after);
}

let hub = await readFile(hubPath, 'utf8');
hub = replaceRequired(
  hub,
  '<title>Will I Have a White Christmas? | Chris Izworski</title>',
  '<title>White Christmas Calculator 2026: Local Snow Odds</title>',
  'hub title',
);
hub = replaceRequired(
  hub,
  '<meta name="description" content="Check your White Christmas odds using 1991-2020 snow-depth history, NOAA climate outlooks, current snowpack and the NWS forecast as Christmas nears.">',
  '<meta name="description" content="White Christmas calculator for 2026: enter a U.S. city or ZIP to see local snow odds from 1991-2020 history, current snowpack and weather signals.">',
  'hub description',
);
hub = replaceRequired(hub, 'content="Will I Have a White Christmas?"', 'content="White Christmas Calculator 2026"', 'hub social title');
hub = replaceRequired(
  hub,
  'content="See the evolving chance of at least 1 inch of snow on the ground on December 25 for your location."',
  'content="Enter a U.S. city or ZIP to check local 2026 White Christmas odds and the evidence behind them."',
  'hub OG description',
);
hub = replaceRequired(
  hub,
  'content="A place-specific White Christmas estimate that evolves from climatology toward snowpack and the Christmas-week forecast."',
  'content="A location-first White Christmas calculator that evolves from climatology toward snowpack and the Christmas-week forecast."',
  'hub social description',
);
hub = replaceRequired(hub, '"name":"Will I Have a White Christmas?"', '"name":"White Christmas Calculator 2026"', 'hub schema name');
hub = replaceRequired(hub, '"dateModified":"2026-09-03"', '"dateModified":"2026-10-01"', 'hub modified date');
hub = replaceRequired(hub, '<h1>Will you have a White Christmas?</h1>', '<h1>White Christmas Calculator 2026</h1>', 'hub h1');
hub = replaceRequired(
  hub,
  '<p class="lede">Check your local chance of waking up to at least an inch of snow on Christmas morning.</p>',
  '<p class="lede">Enter your city, state or ZIP to check your local chance of at least an inch of snow on the ground Christmas morning.</p>',
  'hub lede',
);
await writeFile(hubPath, hub);

let forecast = await readFile(forecastPath, 'utf8');
forecast = replaceRequired(
  forecast,
  '<title>Will It Snow on Christmas 2026? Forecast &amp; Local Odds</title>',
  '<title>Will It Snow on Christmas 2026? | Chris Izworski</title>',
  'forecast title',
);
forecast = replaceRequired(
  forecast,
  '<meta name="description" content="Will it snow on Christmas 2026? Check your city or ZIP for local White Christmas odds now, then follow snowpack and the Christmas-week forecast.">',
  '<meta name="description" content="Will it snow on Christmas 2026? Check local historical snow odds now, then follow snowpack and the Christmas-week forecast as December 25 approaches.">',
  'forecast description',
);
forecast = replaceRequired(
  forecast,
  'content="Will It Snow on Christmas 2026? Forecast &amp; Local Odds"',
  'content="Will It Snow on Christmas 2026? | Chris Izworski"',
  'forecast OG title',
);
forecast = replaceRequired(
  forecast,
  'content="Check your city or ZIP for local White Christmas odds now, then follow snowpack and the Christmas-week forecast as December 25 gets closer."',
  'content="Check local historical snow odds now. A Christmas Day snowfall forecast becomes useful close to December 25."',
  'forecast OG description',
);
forecast = replaceRequired(
  forecast,
  'content="Will It Snow on Christmas 2026?"',
  'content="Will It Snow on Christmas 2026? U.S. Forecast"',
  'forecast Twitter title',
);
forecast = replaceRequired(
  forecast,
  '"name":"Will It Snow on Christmas 2026? Forecast & Local Odds"',
  '"name":"Will It Snow on Christmas 2026? | Chris Izworski"',
  'forecast schema name',
);
forecast = replaceRequired(forecast, '"dateModified":"2026-09-25"', '"dateModified":"2026-10-01"', 'forecast modified date');
forecast = replaceRequired(
  forecast,
  '<div class="eyebrow">Christmas 2026 snow outlook</div>',
  '<div class="eyebrow">Christmas 2026 U.S. weather outlook</div>',
  'forecast eyebrow',
);
forecast = replaceRequired(forecast, '<p>Start with the answer we can support today for your location, then watch the estimate change as snowpack and the Christmas-week forecast become real signals.</p>', '<p>Snow falling on December 25 and snow already on the ground are different questions. Check your city’s historical White Christmas odds now; a dependable Christmas Day snowfall forecast becomes useful close to the date.</p>', 'forecast answer scope');
await writeFile(forecastPath, forecast);

console.log(JSON.stringify({ hub: 'calculator-intent', forecast: '2026-weather-intent' }));
