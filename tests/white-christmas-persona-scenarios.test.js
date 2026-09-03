const test=require("node:test");
const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const T=require("../api/national-white-christmas")._test;

function target(){return new Date("2026-12-25T12:00:00Z")}
function model(args){return T.probabilityModel({cpc:{},pack:null,forecast:null,historyConfidence:{level:"high",reason:"scenario-test"},target:target(),...args})}

test("scenario A: high-history location with durable nearby snow reads immediately high",()=>{
  const m=model({history:{probability:80},pack:{kind:"depth",value:6,unit:"in",distance_miles:10,station:"Near"},now:new Date("2026-12-15T12:00:00Z")});
  assert.ok(m.probability>=85);
  assert.ok(m.factors.some(f=>f.id==="pack"&&f.effect_points>0));
  assert.match(T.verdict(m).headline,/strongly favored|lean toward/i);
});

test("scenario B: historically snowy location under a warm wet final-week forecast drops below climatology",()=>{
  const m=model({history:{probability:85},pack:{kind:"depth",value:.2,unit:"in",distance_miles:10,station:"Near"},forecast:{available:true,snow_signal:false,rain_signal:true,max_temperature_f:48,min_temperature_f:39},now:new Date("2026-12-21T12:00:00Z")});
  assert.ok(m.probability<85);
  assert.ok(m.factors.some(f=>f.id==="nws"&&f.effect_points<0));
});

test("scenario C: marginal location stays a toss-up without false certainty",()=>{
  const m=model({history:{probability:50},now:new Date("2026-09-03T12:00:00Z")});
  assert.equal(m.probability,50);
  assert.doesNotMatch(T.verdict(m).headline,/certain|definite|guarantee/i);
});

test("scenario D: very low-climatology location still produces a useful finite result",()=>{
  const m=model({history:{probability:1},now:new Date("2026-09-03T12:00:00Z")});
  assert.equal(m.probability,1);
  assert.match(T.verdict(m).headline,/long shot/i);
});

test("scenario E: partial evidence remains renderable with reduced-coverage messaging in the UI",()=>{
  const m=T.probabilityModel({history:{probability:55},historyConfidence:{level:"low",reason:"regional_blend_uncertainty"},cpc:{},pack:null,forecast:null,target:target(),now:new Date("2026-12-12T12:00:00Z")});
  assert.ok(Number.isFinite(m.probability));
  assert.notEqual(m.confidence,"unavailable");
  const page=fs.readFileSync(path.join(__dirname,"../public/national-tools/white-christmas/index.html"),"utf8");
  assert.match(page,/Reduced coverage/);
  assert.match(page,/One or more source families are unavailable/);
  assert.doesNotMatch(page,/HTTP 502|HTTP 503|HTTP 504/);
});