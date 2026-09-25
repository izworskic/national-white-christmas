import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const html=fs.readFileSync("public/national-tools/white-christmas/index.html","utf8");

test("White Christmas ZIP handoff resolves query params without crashing on external geolocation control",()=>{
  assert.match(html,/geo=document\.querySelector\("\[data-use-location\]"\)/);
  assert.doesNotMatch(html,/geo=form\.querySelector\("\[data-use-location\]"\)/);
  assert.match(html,/if\(geo\)\{if\(!navigator\.geolocation\)geo\.hidden=true;else geo\.addEventListener/);
  assert.match(html,/new URLSearchParams\(location\.search\)\.get\("q"\);if\(q\)\{input\.value=q;resolveQuery\(q\)\}/);
});
