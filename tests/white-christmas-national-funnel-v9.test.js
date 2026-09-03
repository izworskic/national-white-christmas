const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const root=path.join(__dirname,"..");
const main=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/index.html"),"utf8");
const css=fs.readFileSync(path.join(root,"public/assets/white-christmas.css"),"utf8");
const hub=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/regions/index.html"),"utf8");
const re=s=>s.replace(/[.*+?^$()|[\]\\]/g,"\\$&");

const regionSlugs=[
  "northeast-new-england",
  "great-lakes-ohio-valley",
  "upper-midwest-northern-plains",
  "rockies-mountain-west",
  "pacific-northwest-sierra",
  "southwest-high-country",
  "mid-atlantic-appalachians",
  "alaska",
  "southern-plains-rare-snow"
];

test("bottom discovery cards have explicit readable text colors",()=>{
  assert.match(css,/\.wc-support \.card h3,[\s\S]*color:#0b3b2e!important/);
  assert.match(css,/\.wc-support \.card p,[\s\S]*color:#454b47!important/);
  assert.match(css,/\.wc-support \.card \.tool-kicker\{[\s\S]*color:#7a1b20!important/);
});

test("support-page hero headlines have deterministic light contrast",()=>{
  assert.match(css,/\.wc-support-hero h1\{[\s\S]*color:#fff8ec!important/);
  assert.match(css,/\.wc-support-hero \.eyebrow\{color:#f0ca7a!important/);
  assert.match(css,/\.wc-support-hero p\{color:#f6efe5!important/);
});

test("main funnel promotes national regional discovery",()=>{
  assert.match(main,/White Christmas Across America/);
  assert.match(main,/Explore U\.S\. snow regions/);
  assert.match(main,/\/national-tools\/white-christmas\/regions\//);
  assert.match(main,/white-christmas\.css\?v=20260903-state12/);
});

test("national hub covers every major U.S. snow-region family",()=>{
  for(const label of [
    "Northeast &amp; New England",
    "Great Lakes &amp; Ohio Valley",
    "Upper Midwest &amp; Northern Plains",
    "Rockies &amp; Mountain West",
    "Pacific Northwest &amp; Sierra",
    "Southwest High Country",
    "Mid-Atlantic &amp; Appalachians",
    "Alaska",
    "Southern Plains &amp; Rare-Snow South"
  ]) assert.match(hub,new RegExp(re(label)));
});

test("regional pages exist, are indexable, and drive back to the live tool",()=>{
  for(const slug of regionSlugs){
    const p=path.join(root,"public/national-tools/white-christmas/regions",slug,"index.html");
    assert.ok(fs.existsSync(p),slug);
    const html=fs.readFileSync(p,"utf8");
    assert.match(html,/meta name="robots" content="index,follow,max-image-preview:large"/);
    assert.match(html,/href="\/national-tools\/white-christmas\//);
    assert.match(html,/Check local 2026 odds/);
    assert.match(html,/white-christmas\.css\?v=20260903-(?:national9|city11)/);
  }
});

test("regional network contains broad city-entry coverage without state doorway pages",()=>{
  const all=regionSlugs.map(slug=>fs.readFileSync(path.join(root,"public/national-tools/white-christmas/regions",slug,"index.html"),"utf8")).join("\n");
  for(const city of ["Buffalo, NY","Marquette, MI","Minneapolis, MN","Denver, CO","Spokane, WA","Flagstaff, AZ","Asheville, NC","Anchorage, AK","Amarillo, TX"]){
    assert.match(all,new RegExp(re(city)));
  }
});

test("titles remain within SERP length target",()=>{
  const pages=[hub,...regionSlugs.map(slug=>fs.readFileSync(path.join(root,"public/national-tools/white-christmas/regions",slug,"index.html"),"utf8"))];
  for(const html of pages){
    const m=html.match(/<title>([^<]+)<\/title>/);
    assert.ok(m);
    assert.ok(m[1].length<=60,m[1]);
  }
});
