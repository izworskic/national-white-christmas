const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.join(__dirname,"..");
const data=JSON.parse(fs.readFileSync(path.join(root,"data/white-christmas-cities.json"),"utf8"));
const hub=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/cities/index.html"),"utf8");
const main=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/index.html"),"utf8");

test("city network launches with broad national snow coverage",()=>{
 assert.equal(data.cities.length,28);
 for(const region of ["Great Lakes & Ohio Valley","Northeast & New England","Upper Midwest & Northern Plains","Rockies & Mountain West","Pacific Northwest & Sierra","Southwest High Country","Mid-Atlantic & Appalachians","Alaska","Southern Plains & Rare-Snow South"]){
   assert.ok(data.cities.some(c=>c.region===region),region);
 }
});

test("city hub is discoverable from the flagship and contains every phase-one city",()=>{
 assert.match(main,/White Christmas City Guides/);
 assert.match(main,/href="\/national-tools\/white-christmas\/cities\//);
 for(const c of data.cities) assert.match(hub,new RegExp('/cities/'+c.slug+'/'));
});

test("city pages have material local depth rather than keyword-only doorway copy",()=>{
 for(const c of data.cities){
   assert.ok(c.summary.length>120,c.slug);
   assert.equal(c.factors.length,3,c.slug);
   assert.ok(c.factors.every(x=>x[1].length>70),c.slug);
   assert.ok(c.thisYear.length>100,c.slug);
   assert.equal(c.nearby.length,3,c.slug);
 }
});

test("city titles and descriptions stay within SERP guardrails",()=>{
 for(const c of data.cities){
   const html=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/cities",c.slug,"index.html"),"utf8");
   const title=(html.match(/<title>([^<]+)<\/title>/)||[])[1];
   const desc=(html.match(/<meta name="description" content="([^"]+)"/)||[])[1];
   assert.ok(title&&title.length<=60,title);
   assert.ok(desc&&desc.length<=158,c.slug+" "+(desc||""));
 }
});
