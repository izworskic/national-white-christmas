const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'public/national-tools/white-christmas/index.html'),'utf8');
const css=fs.readFileSync(path.join(root,'public/assets/white-christmas.css'),'utf8');

test('answer architecture is persona-first and preserves canonical search intent',()=>{
  assert.match(html,/<link rel="canonical" href="https:\/\/chrisizworski\.com\/national-tools\/white-christmas\/">/);
  assert.match(html,/Will you have a White Christmas\?/);
  assert.match(html,/Chance of a White Christmas/);
  assert.match(html,/Historical chance/);
  assert.match(html,/Current 2026 estimate/);
  assert.match(html,/What we're watching next/);
});
test('return visits, shareability and confidence have dedicated UI',()=>{
  assert.match(html,/ci-white-christmas-trend-v1/);
  assert.match(html,/How your White Christmas chance has changed/);
  assert.match(html,/Saved only on this device/);
  assert.match(html,/id="share-result"/);
  assert.match(html,/White Christmas Shared/);
  assert.match(html,/id="confidence"/);
  assert.match(html,/id="data-status"/);
});
test('evidence is progressively disclosed and maps are deferred',()=>{
  assert.match(html,/<details class="wc-disclosure"/);
  assert.match(html,/id="history-map-frame"[^>]*loading="lazy"[^>]*data-src=/);
  assert.match(html,/src="about:blank"/);
  assert.match(html,/How this estimate is built/);
  assert.match(html,/Source status/);
});
test('error states do not expose transport jargon',()=>{
  assert.match(html,/We couldn't refresh this White Christmas estimate/);
  assert.match(html,/We couldn't find that location right now/);
  const visibleErrorCopy=[...html.matchAll(/We couldn't[^<"]+/g)].map(x=>x[0]).join(' ');
  assert.doesNotMatch(visibleErrorCopy,/HTTP|status code|502|503|504/i);
});
test('accessibility and mobile/reduced-motion contracts are explicit',()=>{
  assert.match(html,/role="img" aria-labelledby="trend-chart-title trend-chart-desc"/);
  assert.match(html,/aria-live="polite"/);
  assert.match(html,/<label class="wc-sr-only" for="wc-location">/);
  assert.match(css,/@media\(max-width:390px\)/);
  assert.match(css,/@media\(max-width:760px\)/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css,/min-height:50px/);
  assert.doesNotMatch(css,/@import|font-face/i);
});