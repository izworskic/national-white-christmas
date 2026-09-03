const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const root=path.join(__dirname,"..");
const html=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/index.html"),"utf8");
const css=fs.readFileSync(path.join(root,"public/assets/white-christmas.css"),"utf8");

test("approved composition is structural, not just recoloring",()=>{
  assert.match(html,/wc-result-card/);
  assert.match(html,/wc-probability-pane/);
  assert.match(html,/wc-story-pane/);
  assert.match(html,/wc-analysis-grid/);
  assert.match(html,/wc-trend-standalone/);\n  assert.match(html,/wc-deep-dive/);
  assert.match(css,/grid-template-columns:minmax\(0,1\.05fr\) minmax\(0,\.82fr\) minmax\(260px,\.83fr\)/);
});

test("search behaves like one composed instrument",()=>{
  const form=(html.match(/<form id="loc">[\s\S]*?<\/form>/)||[""])[0];
  assert.match(form,/wc-input-wrap/);
  assert.match(form,/See my odds/);
  assert.doesNotMatch(form,/Use my current location/);
  assert.match(html,/wc-geo-link/);
});

test("decorative UI uses purpose-built local SVGs",()=>{
  for(const file of [
    "wc-icon-location.svg","wc-icon-share.svg","wc-icon-arrow.svg",
    "wc-icon-history.svg","wc-icon-seasonal.svg","wc-icon-snowpack.svg",
    "wc-icon-forecast.svg","wc-icon-confidence.svg","wc-icon-data.svg","wc-icon-ruler.svg"
  ]) assert.ok(fs.existsSync(path.join(root,"public/assets",file)),file);
  assert.match(css,/wc-icon-confidence\.svg/);
  assert.match(css,/wc-icon-data\.svg/);
  assert.match(css,/wc-icon-ruler\.svg/);
});

test("reference-like paired desktop rows stack on smaller screens",()=>{
  assert.match(css,/\.wc-analysis-grid\{/);
  assert.match(css,/\.wc-lower-grid\{/);
  assert.match(css,/@media\(max-width:820px\)/);
  assert.match(css,/\.wc-analysis-grid,\.wc-lower-grid\{grid-template-columns:1fr!important\}/);
});

test("inline script still parses and IDs remain unique",()=>{
  const scripts=[...html.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g)].map(m=>m[1]).filter(Boolean);
  for(const script of scripts){
    if(!script.trim().startsWith('{"@context"')) new Function(script);
  }
  const ids=[...html.matchAll(/\sid="([^"]+)"/g)].map(m=>m[1]);
  assert.equal(new Set(ids).size,ids.length);
});
