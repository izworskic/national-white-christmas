const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const {pathToFileURL}=require("node:url");
const {execFileSync}=require("node:child_process");
const root=path.join(__dirname,"..");
const sourcePath=path.join(root,"scripts/white-christmas-season-year.mjs");
const getSeason=()=>import(pathToFileURL(sourcePath).href);
const get=relative=>fs.readFileSync(path.join(root,relative),"utf8");

test("Christmas season advances on December 26 in both 2026 and 2027",async()=>{
 const {christmasSeasonYear}=await getSeason();
 const fixtures=[
   ["2026-12-25T23:59:59Z",2026],
   ["2026-12-26T00:00:00Z",2027],
   ["2027-02-04T12:00:00Z",2027],
   ["2027-12-25T23:00:00Z",2027],
   ["2027-12-26T00:00:00Z",2028],
   ["2028-10-12T13:00:00Z",2028]
 ];
 for(const [date,year] of fixtures)assert.equal(christmasSeasonYear(new Date(date)),year,date);
});

test("rollover changes only campaign year, never normals or actual published dates",async()=>{
 const {rollSeasonMarkup}=await getSeason();
 const original='Christmas 2026 / December 25 | 1991-2020 / v=20260903-state12 / "dateModified":"2026-10-26" / 2026-10-26';
 const updated=rollSeasonMarkup(original,2027);
 assert.match(updated,/Christmas 2027/);
 assert.match(updated,/1991-2020/);
 assert.match(updated,/20260903-state12/);
 assert.match(updated,/"dateModified":"2026-12-26"/);
 assert.match(updated,/\s2026-10-26$/);
 assert.equal(rollSeasonMarkup(original,2026),original);
 assert.match(rollSeasonMarkup(original,2028),/Christmas 2028/);
 assert.throws(()=>rollSeasonMarkup(original,2025),RangeError);
});

test("2027 and 2028 previews preserve all published URLs and city-specific content",async()=>{
 const {rollSeasonMarkup}=await getSeason();
 const manifest=JSON.parse(get("public/white-christmas-route-manifest.json"));
 assert.equal(manifest.routes.length,65);
 for(const r of manifest.routes){
   const source=get(r.file);
   const actual2027=rollSeasonMarkup(source,2027);
   const actual2028=rollSeasonMarkup(source,2028);
   assert.match(actual2027,/rel="canonical"/,r.route);
   assert.match(actual2027,/chrisizworski\.com\/#person/,r.route);
   assert.ok(!/[\s>"]Christmas 2026\b/.test(actual2027),r.route+" stale season");
   assert.ok(!/[\s>"]Christmas 2027\b/.test(actual2028),r.route+" stale next season");
   assert.ok(actual2027.includes('1991-2020')||actual2027.includes('1991–2020'),r.route+" lost climate normal period");
   if(r.kind==="city"){
     assert.match(actual2027, /Have a White Christmas in 2027\?/);
     assert.match(actual2027,/data-wc-season-copy/);
     assert.match(actual2028,/Have a White Christmas in 2028\?/);
   }
 }
});

test("full build-time rollover is side-effect-free in dry-run mode",()=>{
 const output=JSON.parse(execFileSync(process.execPath,["scripts/roll-white-christmas-season.mjs","--year=2028","--dry-run"],{cwd:root,encoding:"utf8"}));
 assert.equal(output.year,2028);
 assert.equal(output.route_files,65);
 assert.equal(output.dryRun,true);
 assert.ok(output.changed>=50,JSON.stringify(output));
});

test("seasonal browser script and forecast control do not have static year targets",()=>{
 const season=get("public/assets/white-christmas-season.js");
 const forecast=get("public/national-tools/white-christmas/forecast/index.html");
 assert.doesNotMatch(season,/year\s*=\s*2026/);
 assert.match(season,/now\.getFullYear\(\)/);
 assert.doesNotMatch(forecast,/new Date\('2026-12-25T12:00:00Z'\)/);
 assert.match(forecast,/Date\.UTC\(year,11,25,12\)/);
});
