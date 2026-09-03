const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const root=path.join(__dirname,"..");
const vercel=JSON.parse(fs.readFileSync(path.join(root,"vercel.json"),"utf8"));
const html=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/index.html"),"utf8");
const css=fs.readFileSync(path.join(root,"public/assets/white-christmas.css"),"utf8");

test("White Christmas API has enough execution time for bounded source retries",()=>{
  assert.equal(vercel.functions["api/national-white-christmas.js"].maxDuration,30);
});

test("data failures and client render failures are not conflated",()=>{
  assert.match(html,/White Christmas Data Error/);
  assert.match(html,/White Christmas Render Error/);
  assert.match(html,/showRenderFallback/);
  assert.match(html,/Your estimate was returned, but some supporting details could not be displayed/);
  assert.match(css,/\.wc-render-fallback/);
});

test("source metadata renderer supports the shared core contract",()=>{
  assert.match(html,/source_status\|\|s\.status/);
  assert.match(html,/source_name\|\|s\.name/);
  assert.match(html,/source_url\|\|s\.url/);
});
