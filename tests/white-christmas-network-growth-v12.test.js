const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"..");
const data=JSON.parse(fs.readFileSync(path.join(root,"data/white-christmas-cities.json"),"utf8"));
const hub=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/cities/index.html"),"utf8");
const forecast=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/forecast/index.html"),"utf8");
const season=fs.readFileSync(path.join(root,"public/assets/white-christmas-season.js"),"utf8");
const manifest=JSON.parse(fs.readFileSync(path.join(root,"public/white-christmas-route-manifest.json"),"utf8"));

test("selective city expansion reaches 50 without turning into a doorway-page spray",()=>{
  assert.equal(data.cities.length,50);
  assert.ok(data.cities.length<=60);
  const slugs=new Set(data.cities.map(c=>c.slug));
  assert.equal(slugs.size,50);
  for(const c of data.cities){
    assert.ok(c.summary.length>120,c.slug);
    assert.equal(c.factors.length,3,c.slug);
    assert.ok(c.factors.every(x=>x[1].length>50),c.slug);
    assert.ok(c.thisYear.length>100,c.slug);
    assert.equal(c.nearby.length,3,c.slug);
  }
});

test("growth pass concentrates on proven snow regions and destination searches",()=>{
  for(const slug of ["rochester-ny","erie-pa","cleveland-oh","milwaukee-wi","madison-wi","green-bay-wi","albany-ny","worcester-ma","bangor-me","concord-nh","lake-placid-ny","bismarck-nd","sioux-falls-sd","rapid-city-sd","st-cloud-mn","missoula-mt","billings-mt","jackson-wy","colorado-springs-co","steamboat-springs-co","leavenworth-wa","mammoth-lakes-ca"]){
    assert.ok(data.cities.some(c=>c.slug===slug),slug);
  }
});

test("city hub exposes the 50-guide network and preserves direct local lookup",()=>{
  assert.match(hub,/50 local guides/);
  assert.match(hub,/name="q"/);
  assert.match(hub,/action="\/national-tools\/white-christmas\/"/);
  for(const c of data.cities)assert.match(hub,new RegExp("/cities/"+c.slug+"/"));
});

test("city pages show the current seasonal phase and cross-link to sibling guides",()=>{
  const rochester=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/cities/rochester-ny/index.html"),"utf8");
  assert.match(rochester,/data-wc-season-copy/);
  assert.match(rochester,/white-christmas-season\.js/);
  assert.match(rochester,/\/cities\/syracuse-ny\//);
  assert.match(rochester,/More White Christmas guides in Great Lakes &amp; Ohio Valley/);
});

test("regional pages now feed authority into local city guides",()=>{
  const greatLakes=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/regions/great-lakes-ohio-valley/index.html"),"utf8");
  assert.match(greatLakes,/data-wc-region-city-guides/);
  assert.match(greatLakes,/\/cities\/cleveland-oh\//);
  assert.match(greatLakes,/\/cities\/erie-pa\//);
  assert.match(greatLakes,/data-wc-season-copy/);
});

test("season logic visibly changes from early outlook to forecast window",()=>{
  for(const phrase of ["Early outlook","Seasonal setup","Snowpack watch","Forecast window","Christmas Day"])assert.match(season,new RegExp(phrase));
  assert.match(forecast,/data-wc-season-copy/);
  assert.match(forecast,/white-christmas-season\.js/);
});

test("every expanded city is registered in the published-route manifest",()=>{
  const routes=new Set(manifest.routes.filter(r=>r.kind==="city").map(r=>r.route));
  assert.equal(routes.size,50);
  for(const c of data.cities)assert.ok(routes.has(`/national-tools/white-christmas/cities/${c.slug}/`),c.slug);
});
