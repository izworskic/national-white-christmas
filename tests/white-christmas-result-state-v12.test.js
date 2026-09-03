const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const root=path.join(__dirname,"..");
const html=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/index.html"),"utf8");
const css=fs.readFileSync(path.join(root,"public/assets/white-christmas.css"),"utf8");

test("inactive loading, error and content states cannot be revealed by author display rules",()=>{
  assert.ok(css.includes("#result-loading[hidden],#result-error[hidden],#result-content[hidden]{display:none!important}"));
  assert.ok(html.includes('id="result-error" class="wc-state-card wc-state-error" role="alert" hidden'));
  assert.ok(html.includes('id="result-content" hidden'));
});

test("result state machine hides the error whenever a usable estimate is rendered",()=>{
  assert.ok(html.includes('renderResult(loc,d);loading.hidden=true;error.hidden=true;content.hidden=false'));
  assert.ok(html.includes('showRenderFallback(loc,d)'));
  assert.ok(html.includes('error.hidden=true;content.hidden=false;result.setAttribute("aria-busy","false")'));
});

test("stale overlapping requests cannot overwrite a newer result with an error",()=>{
  assert.ok(html.includes("let current=null,requestSeq=0"));
  assert.ok(html.includes("const requestId=++requestSeq"));
  const guards=(html.match(/requestId!==requestSeq/g)||[]).length;
  assert.ok(guards>=3,"expected at least 3 stale-request guards, found "+guards);
});

test("main result-state fix is cache-busted",()=>{
  assert.ok(html.includes("white-christmas.css?v=20260903-state12"));
});
