const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const root=path.join(__dirname,"..");
const html=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/index.html"),"utf8");
const css=fs.readFileSync(path.join(root,"public/assets/white-christmas.css"),"utf8");

test("Christmas masthead and scenic hero are explicit",()=>{
  assert.match(html,/wc-masthead/);
  assert.match(html,/Weather Intelligence/);
  assert.match(html,/wc-header-share/);
  assert.match(css,/white-christmas-village\.svg/);
  assert.ok(fs.existsSync(path.join(root,"public/assets/white-christmas-village.svg")));
  assert.ok(fs.existsSync(path.join(root,"public/assets/evergreen-corner.svg")));
  assert.ok(fs.existsSync(path.join(root,"public/assets/holly-divider.svg")));
});

test("Christmas atmosphere includes lightweight reduced-motion-safe snowfall",()=>{
  assert.match(html,/class="wc-snow"/);
  assert.match(css,/@keyframes wc-snowfall/);
  assert.match(css,/@media\(prefers-reduced-motion:reduce\)/);
  assert.match(css,/\.wc-snow\{display:none!important\}/);
});

test("location search is paired with an actual Christmas countdown card",()=>{
  assert.match(html,/id="hero-countdown-days"/);
  assert.match(html,/id="hero-countdown-label"/);
  assert.match(html,/Days to Christmas/);
  assert.match(html,/function christmasCountdown/);
  assert.match(html,/renderHeroCountdown/);
});

test("main estimate remains the dominant weather-intelligence surface",()=>{
  assert.match(html,/id="probability"/);
  assert.match(html,/Chance of a White Christmas/);
  assert.match(html,/id="confidence"/);
  assert.match(html,/id="data-status"/);
  assert.match(html,/id="definition"/);
  assert.match(css,/--gold-bright:#efcb79/);
  assert.match(css,/font-size:clamp\(6\.4rem,13vw,10\.5rem\)/);
});

test("supporting sections use Christmas editorial language without kitsch",()=>{
  assert.match(html,/Your White Christmas odds over time/);
  assert.match(html,/Behind the Christmas forecast/);
  assert.match(html,/Sources &amp; methodology/);
  assert.doesNotMatch(html,/Santa|Rudolph|candy cane|elf|snow globe needs another shake/i);
});

test("390px mobile breakpoint and no external font dependency remain",()=>{
  assert.match(css,/@media\(max-width:390px\)/);
  assert.doesNotMatch(css,/@import|font-face/i);
});
