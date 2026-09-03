const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const root=path.join(__dirname,"..");
const main=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/index.html"),"utf8");
const css=fs.readFileSync(path.join(root,"public/assets/white-christmas.css"),"utf8");
const map=fs.readFileSync(path.join(root,"public/white-christmas-probability-map/index.html"),"utf8");
const mi=fs.readFileSync(path.join(root,"public/white-christmas-michigan/index.html"),"utf8");
const forecast=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/forecast/index.html"),"utf8");

test("main tool removes upper-left personal brand and starts with White Christmas",()=>{
  assert.doesNotMatch(main,/<header[\s\S]*?<strong>Chris Izworski<\/strong>/);
  assert.match(main,/class="wc-tool-mark"/);
  assert.match(main,/>White Christmas<\/strong>/);
});

test("generated hero is an explicit image element and preloaded",()=>{
  assert.match(main,/rel="preload" as="image" href="\/assets\/white-christmas-hero-final\.webp"/);
  assert.match(main,/<picture class="wc-hero-media"/);
  assert.match(main,/src="\/assets\/white-christmas-hero-final\.webp"/);
  assert.match(css,/\.white-christmas-page \.wc-hero\{[\s\S]*min-height:320px!important/);
});

test("technical explanation is buried behind one closed disclosure",()=>{
  assert.match(main,/<details class="wc-deep-dive"><summary>/);
  assert.doesNotMatch(main,/<details class="wc-deep-dive" open/);
  assert.match(main,/Want the weather details\?/);
  assert.match(main,/Sources &amp; methodology/);
  assert.doesNotMatch(main,/wc-season-story/);
});

test("growth pages exist for data explorer, Michigan and forecast-planning personas",()=>{
  assert.match(map,/White Christmas Probability Map/);
  assert.match(map,/wc-support-hero/);
  assert.match(mi,/Will Michigan have a White Christmas\?/);
  assert.match(mi,/wc-support-hero/);
  assert.match(forecast,/Will it snow on Christmas\?/i);
  assert.match(forecast,/December 19–24/);
});

test("support pages point back to the live local tool",()=>{
  for(const page of [map,mi,forecast]) assert.match(page,/href="\/national-tools\/white-christmas\//);
  assert.match(mi,/\?q=Detroit%2C%20MI/);
  assert.match(mi,/\?q=Marquette%2C%20MI/);
});

test("inline main script parses and IDs stay unique",()=>{
  const scripts=[...main.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean);
  for(const script of scripts){if(!script.trim().startsWith('{"@context"')) new Function(script);}
  const ids=[...main.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length);
});
