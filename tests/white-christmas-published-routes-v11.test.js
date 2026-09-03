const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"..");
const manifest=JSON.parse(fs.readFileSync(path.join(root,"public/white-christmas-route-manifest.json"),"utf8"));
const config=JSON.parse(fs.readFileSync(path.join(root,"vercel.json"),"utf8"));
const cities=JSON.parse(fs.readFileSync(path.join(root,"data/white-christmas-cities.json"),"utf8")).cities;
const bySource=new Map((config.rewrites||[]).map(r=>[r.source,r.destination]));

test("every published route has a backing file and matching canonical",()=>{
 for(const entry of manifest.routes){
   const full=path.join(root,entry.file);
   assert.ok(fs.existsSync(full),entry.route);
   const html=fs.readFileSync(full,"utf8");
   assert.match(html,new RegExp('<link rel="canonical" href="https://chrisizworski\\.com'+entry.route.replace(/[.*+?^$()|[\]\\]/g,"\\$&")+'">'),entry.route);
 }
});

test("nested city and region families use explicit index rewrites",()=>{
 assert.equal(bySource.get("/national-tools/white-christmas/cities"),"/national-tools/white-christmas/cities/index.html");
 assert.equal(bySource.get("/national-tools/white-christmas/cities/"),"/national-tools/white-christmas/cities/index.html");
 assert.equal(bySource.get("/national-tools/white-christmas/cities/:slug"),"/national-tools/white-christmas/cities/:slug/index.html");
 assert.equal(bySource.get("/national-tools/white-christmas/cities/:slug/"),"/national-tools/white-christmas/cities/:slug/index.html");
 assert.equal(bySource.get("/national-tools/white-christmas/regions/:slug/"),"/national-tools/white-christmas/regions/:slug/index.html");
});

test("every city in the data manifest has an indexable unique page",()=>{
 const seen=new Set();
 for(const c of cities){
   assert.ok(!seen.has(c.slug),c.slug); seen.add(c.slug);
   const p=path.join(root,"public/national-tools/white-christmas/cities",c.slug,"index.html");
   assert.ok(fs.existsSync(p),c.slug);
   const html=fs.readFileSync(p,"utf8");
   assert.match(html,/meta name="robots" content="index,follow,max-image-preview:large"/);
   assert.match(html,new RegExp('Will '+c.city.replace(/[.*+?^$()|[\]\\]/g,"\\$&")+' have a White Christmas\\?',"i"));
   assert.match(html,/href="\/national-tools\/white-christmas\/\?q=/);
   assert.match(html,new RegExp('/regions/'+c.regionSlug+'/'));
 }
 assert.equal(seen.size,28);
});
