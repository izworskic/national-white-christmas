const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const root=path.join(__dirname,"..");
const html=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/index.html"),"utf8");
const css=fs.readFileSync(path.join(root,"public/assets/white-christmas.css"),"utf8");
const hero=path.join(root,"public/assets/white-christmas-hero-final.webp");

test("final photographic hero asset is present and wired into the page",()=>{
  assert.ok(fs.existsSync(hero));
  assert.ok(fs.statSync(hero).size>20000);
  assert.match(css,/white-christmas-hero-final\.webp/);
  assert.match(html,/white-christmas\.css\?v=20260903-finalhero6/);
});

test("hero palette matches the photographic night scene",()=>{
  assert.match(css,/--wc-night:#061a2d/);
  assert.match(css,/--wc-amber:#e6ad55/);
  assert.match(css,/--wc-winter-cream:#f7efe2/);
  assert.match(css,/linear-gradient\(135deg,#0a2a3d 0%,#0a332b 62%,#07251f 100%\)/);
});

test("hero remains readable over the final image on desktop and mobile",()=>{
  assert.match(css,/rgba\(6,26,45,\.99\) 0%/);
  assert.match(css,/rgba\(6,26,45,\.98\) 28%/);
  assert.match(css,/@media\(max-width:820px\)/);
  assert.match(css,/height:292px!important/);
  assert.match(css,/var\(--wc-night\) 49%/);
});

test("social cards use the same final hero artwork",()=>{
  assert.match(html,/property="og:image" content="https:\/\/chrisizworski\.com\/assets\/white-christmas-hero-final\.webp"/);
  assert.match(html,/name="twitter:card" content="summary_large_image"/);
  assert.match(html,/name="twitter:image" content="https:\/\/chrisizworski\.com\/assets\/white-christmas-hero-final\.webp"/);
});
