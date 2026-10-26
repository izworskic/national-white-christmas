const test=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const path=require('node:path');
const root=path.join(__dirname,'..');
const html=fs.readFileSync(path.join(root,'public/national-tools/white-christmas/forecast/index.html'),'utf8');
const generator=fs.readFileSync(path.join(root,'scripts/clarify-white-christmas-intent.mjs'),'utf8');
test('2026 Christmas page preserves existing winning title, canonical, and local search action',()=>{
 assert.match(html,/<title>Will It Snow on Christmas 2026\? Local Odds \| Chris Izworski<\/title>/);
 assert.match(html,/<link rel="canonical" href="https:\/\/chrisizworski\.com\/national-tools\/white-christmas\/forecast\/">/);
 assert.match(html,/"@id":"https:\/\/chrisizworski\.com\/#person"/);
 assert.ok(html.indexOf('class="wc-locator"')<html.indexOf('class="wc-snow-question"'),'City lookup should precede explanation');
 assert.match(html,/name="q"/);
});
test('snippet explains snowfall versus snow cover honestly in 155 characters',()=>{
 const text=html.match(/<meta name="description" content="([^"]+)"/)?.[1];
 assert.ok(text && text.length<=155,'description length');
 assert.match(text,/Compare snowfall with snow on the ground/);
 assert.match(text,/odds by city or ZIP/);
 assert.match(text,/when a real forecast becomes useful/);
 assert.match(html,/Not forecastable yet/);
 assert.match(html,/White Christmas: at least 1 inch on the ground/);
 assert.ok(generator.includes(text),'Generator preserves new search-description experiment');
});
