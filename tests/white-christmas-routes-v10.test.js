const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const root=path.join(__dirname,"..");
const config=JSON.parse(fs.readFileSync(path.join(root,"vercel.json"),"utf8"));

function dest(source){
  const r=(config.rewrites||[]).find(x=>x.source===source);
  return r&&r.destination;
}

test("forecast route resolves to its index file",()=>{
  assert.equal(dest("/national-tools/white-christmas/forecast"),"/national-tools/white-christmas/forecast/index.html");
  assert.equal(dest("/national-tools/white-christmas/forecast/"),"/national-tools/white-christmas/forecast/index.html");
});

test("regions hub resolves to its index file",()=>{
  assert.equal(dest("/national-tools/white-christmas/regions"),"/national-tools/white-christmas/regions/index.html");
  assert.equal(dest("/national-tools/white-christmas/regions/"),"/national-tools/white-christmas/regions/index.html");
});

test("regional child pages resolve to child index files",()=>{
  assert.equal(dest("/national-tools/white-christmas/regions/:slug"),"/national-tools/white-christmas/regions/:slug/index.html");
  assert.equal(dest("/national-tools/white-christmas/regions/:slug/"),"/national-tools/white-christmas/regions/:slug/index.html");
});
