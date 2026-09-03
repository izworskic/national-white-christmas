const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");

const root=path.join(__dirname,"..");
const css=fs.readFileSync(path.join(root,"public/assets/white-christmas.css"),"utf8");
const html=fs.readFileSync(path.join(root,"public/national-tools/white-christmas/index.html"),"utf8");

function lum(hex){
  const rgb=hex.replace("#","").match(/../g).map(x=>parseInt(x,16)/255).map(v=>v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4));
  return 0.2126*rgb[0]+0.7152*rgb[1]+0.0722*rgb[2];
}
function ratio(a,b){const A=lum(a),B=lum(b),hi=Math.max(A,B),lo=Math.min(A,B);return (hi+0.05)/(lo+0.05);}

test("hero copy has a deterministic dark contrast zone",()=>{
  assert.match(html,/<picture class="wc-hero-media"/);
  assert.match(css,/rgba\(5,20,35,\.99\) 0%/);
  assert.match(css,/rgba\(5,20,35,\.96\) 25%/);
  assert.ok(ratio("#fff8ec","#061a2d")>7);
});

test("mobile hero separates photography from copy",()=>{
  assert.match(css,/@media\(max-width:820px\)/);
  assert.match(css,/\.wc-hero-media\{height:205px!important/);
  assert.match(css,/#061a2d 57%/);
  assert.match(css,/padding-top:12rem!important/);
});

test("cream surfaces force dark text rather than inheriting result white",()=>{
  assert.match(css,/\.wc-analysis-grid,[\s\S]*color:var\(--ink\)!important/);
  assert.ok(ratio("#4d514d","#fbf5e9")>4.5);
});

test("result panel keeps light text on fixed evergreen",()=>{
  assert.match(css,/linear-gradient\(135deg,#0a2a3d 0%,#0a332b 62%,#07251f 100%\)!important/);
  assert.ok(ratio("#fff8ec","#0a2a3d")>7);
});

test("contrast build is cache-busted",()=>{
  assert.match(html,/white-christmas\.css\?v=20260903-city11/);
});
