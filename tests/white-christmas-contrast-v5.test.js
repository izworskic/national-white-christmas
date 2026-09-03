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
function ratio(a,b){
  const A=lum(a),B=lum(b),hi=Math.max(A,B),lo=Math.min(A,B);
  return (hi+0.05)/(lo+0.05);
}

test("hero copy has a deterministic dark contrast zone",()=>{
  assert.match(css,/width:72%/);
  assert.match(css,/var\(--pine-dark\) 30%/);
  assert.match(css,/rgba\(6,42,34,\.99\) 36%/);
  assert.match(css,/color:#fffaf0!important/);
  assert.ok(ratio("#fffaf0","#062a22")>7);
});

test("mobile hero separates photography from copy",()=>{
  assert.match(css,/@media\(max-width:820px\)/);
  assert.match(css,/height:280px!important/);
  assert.match(css,/var\(--pine-dark\) 49%/);
  assert.match(css,/padding-top:17\.2rem!important/);
});

test("cream surfaces force dark text rather than inheriting result white",()=>{
  assert.match(css,/\.wc-analysis-grid,[\s\S]*color:var\(--ink\)!important/);
  assert.match(css,/\.wc-analysis-grid p,[\s\S]*color:#4d514d!important/);
  assert.ok(ratio("#4d514d","#fbf5e9")>4.5);
});

test("result panel keeps light text on fixed evergreen",()=>{
  assert.match(css,/linear-gradient\(145deg,#0b3b2e,#06281f\)!important/);
  assert.match(css,/\.wc-location-heading,[\s\S]*color:#fffaf0!important/);
  assert.ok(ratio("#fffaf0","#0b3b2e")>7);
});

test("contrast build is cache-busted",()=>{
  assert.match(html,/white-christmas\.css\?v=20260903-contrast5/);
});
