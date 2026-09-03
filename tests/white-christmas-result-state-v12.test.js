const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const root=path.join(__dirname,"..");
const html=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/index.html"),"utf8");
const css=fs.readFileSync(path.join(root,"public/assets/white-christmas.css"),"utf8");

test("inactive loading, error and content states cannot be revealed by author display rules",()=>{
  assert.match(css,/#result-loading\\[hidden\\],#result-error\\[hidden\\],#result-content\\[hidden\\]\\{display:none!important\\}/);
  assert.match(html,/id="result-error"[^>]*hidden/);
  assert.match(html,/id="result-content" hidden/);
});

test("result state machine hides the error whenever a usable estimate is rendered",()=>{
  assert.match(html,/renderResult\\(loc,d\\);loading\\.hidden=true;error\\.hidden=true;content\\.hidden=false/);
  assert.match(html,/showRenderFallback\\(loc,d\\)/);
  assert.match(html,/error\\.hidden=true;content\\.hidden=false;result\\.setAttribute\\("aria-busy","false"\\)/);
});

test("stale overlapping requests cannot overwrite a newer result with an error",()=>{
  assert.match(html,/let current=null,requestSeq=0/);
  assert.match(html,/const requestId=\\+\\+requestSeq/);
  const guards=(html.match(/requestId!==requestSeq/g)||[]).length;
  assert.ok(guards>=3,"expected at least 3 stale-request guards, found "+guards);
});

test("main result-state fix is cache-busted",()=>{
  assert.match(html,/white-christmas\\.css\\?v=20260903-state12/);
});
