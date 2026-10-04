const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');

const hub = fs.readFileSync('public/national-tools/white-christmas/index.html', 'utf8');
const forecast = fs.readFileSync('public/national-tools/white-christmas/forecast/index.html', 'utf8');

test('White Christmas hub owns calculator/local-odds intent', () => {
  assert.match(hub, /<title>White Christmas Calculator 2026: Local Snow Odds<\/title>/);
  assert.match(hub, /<h1>White Christmas Calculator 2026<\/h1>/);
  assert.match(hub, /Enter your city, state or ZIP/i);
  assert.match(hub, /<link rel="canonical" href="https:\/\/chrisizworski\.com\/national-tools\/white-christmas\/">/);
});

test('White Christmas forecast answers 2026 snowfall intent without overstating the horizon', () => {
  assert.match(forecast, /<title>Will It Snow on Christmas 2026\? \| Chris Izworski<\/title>/);
  assert.match(forecast, /Christmas 2026 U\.S\. weather outlook/);
  assert.match(forecast, /Check local historical snow odds now/i);
  assert.match(forecast, /Snow falling on December 25 and snow already on the ground are different questions/);
  assert.match(forecast, /dependable Christmas Day snowfall forecast becomes useful close to the date/);
  assert.match(forecast, /<link rel="canonical" href="https:\/\/chrisizworski\.com\/national-tools\/white-christmas\/forecast\/">/);
});

test('calculator and forecast keep distinct canonical ownership', () => {
  assert.notEqual(
    hub.match(/<title>([^<]+)<\/title>/)?.[1],
    forecast.match(/<title>([^<]+)<\/title>/)?.[1],
  );
});
