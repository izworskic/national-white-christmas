#!/usr/bin/env node
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root=path.resolve(import.meta.dirname,"..");
const dataPath=path.join(root,"data/white-christmas-cities.json");
const manifestPath=path.join(root,"public/white-christmas-route-manifest.json");
const data=JSON.parse(await readFile(dataPath,"utf8"));
const esc=s=>String(s).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;");
const q=s=>encodeURIComponent(s);
const key=s=>String(s).trim().toLowerCase();
const byQuery=new Map(data.cities.map(c=>[key(`${c.city}, ${c.state}`),c]));
const regionOrder=[
  "Great Lakes & Ohio Valley",
  "Northeast & New England",
  "Upper Midwest & Northern Plains",
  "Rockies & Mountain West",
  "Pacific Northwest & Sierra",
  "Southwest High Country",
  "Mid-Atlantic & Appalachians",
  "Alaska",
  "Southern Plains & Rare-Snow South"
];
const seasonAsset=`<script src="/assets/white-christmas-season.js?v=20260925-growth1"></script>`;

for(const c of data.cities){
  const file=path.join(root,"public/national-tools/white-christmas/cities",c.slug,"index.html");
  let html=await readFile(file,"utf8");

  for(const [,query] of c.nearby){
    const match=byQuery.get(key(query));
    if(!match)continue;
    const live=`/national-tools/white-christmas/?q=${q(query)}`;
    const direct=`/national-tools/white-christmas/cities/${match.slug}/`;
    html=html.replaceAll(`href="${live}"`,`href="${direct}"`);
  }

  const current=`<div class="wc-support-callout wc-season-now" data-wc-season-copy data-wc-place="${esc(c.city)}"><strong>Current phase:</strong> loading the Christmas 2026 signal hierarchy…</div>`;
  html=html.replace(`<h2>What drives Christmas snow in ${esc(c.city)}?</h2>`,`${current}<h2>What drives Christmas snow in ${esc(c.city)}?</h2>`);

  const siblings=data.cities.filter(x=>x.regionSlug===c.regionSlug&&x.slug!==c.slug).slice(0,4);
  if(siblings.length){
    const siblingCards=siblings.map(x=>`<article class="wc-support-panel"><h3><a href="/national-tools/white-christmas/cities/${x.slug}/">${esc(x.city)}, ${esc(x.state)}</a></h3><p>${esc(x.summary)}</p></article>`).join("");
    const siblingSection=`<section class="wc-city-neighbors"><h2>More White Christmas guides in ${esc(c.region)}</h2><div class="wc-support-grid">${siblingCards}</div></section>`;
    html=html.replace(`<section class="wc-faq">`,`${siblingSection}<section class="wc-faq">`);
  }

  html=html.replace(`</body></html>`,`${seasonAsset}</body></html>`);
  await writeFile(file,html);
}

const groups=regionOrder.map(region=>[region,data.cities.filter(c=>c.region===region)]).filter(([,cities])=>cities.length);
const hubCards=groups.map(([region,cities])=>{
  const regionSlug=cities[0].regionSlug;
  return `<section class="wc-city-group"><div class="wc-heading-split"><h2>${esc(region)}</h2><a href="/national-tools/white-christmas/regions/${regionSlug}/">Explore this region →</a></div><div class="wc-city-index">${cities.map(c=>`<a class="wc-city-card" href="/national-tools/white-christmas/cities/${c.slug}/"><span>${esc(c.state)}</span><h3>${esc(c.city)}</h3><p>${esc(c.summary)}</p></a>`).join("")}</div></section>`;
}).join("");

const hub=`<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>White Christmas City Guides 2026 | Chris Izworski</title><meta name="description" content="Explore 50 White Christmas city guides across the U.S., then check live 2026 snow odds for any city or ZIP.">
<link rel="canonical" href="https://chrisizworski.com/national-tools/white-christmas/cities/"><meta name="robots" content="index,follow,max-image-preview:large">
<meta property="og:type" content="website"><meta property="og:title" content="White Christmas City Guides 2026"><meta property="og:description" content="Local Christmas snow context across 50 U.S. cities and destinations, linked to the live 2026 estimator."><meta property="og:url" content="https://chrisizworski.com/national-tools/white-christmas/cities/"><meta property="og:image" content="https://chrisizworski.com/assets/white-christmas-hero-final.webp">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="https://chrisizworski.com/assets/white-christmas-hero-final.webp">
<link rel="preload" as="image" href="/assets/white-christmas-hero-final.webp" type="image/webp"><link rel="stylesheet" href="/assets/national-tools.css?v=20260902-placebar1"><link rel="stylesheet" href="/assets/white-christmas.css?v=20260903-city11">
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@graph":[{"@type":"Person","@id":"https://chrisizworski.com/#person","name":"Chris Izworski","url":"https://chrisizworski.com/"},{"@type":"CollectionPage","url":"https://chrisizworski.com/national-tools/white-christmas/cities/","name":"White Christmas City Guides 2026","dateModified":"2026-09-25","author":{"@id":"https://chrisizworski.com/#person"}}]}).replaceAll("<","\u003c")}</script>
</head><body class="white-christmas-page wc-support-page"><header class="site-head wc-masthead"><div class="wrap head-in"><a class="wc-tool-mark" href="/national-tools/white-christmas/"><span class="wc-tool-mark-icon" aria-hidden="true"></span><strong>White Christmas</strong></a><nav class="nav" aria-label="Primary"><a href="/national-tools/white-christmas/regions/">U.S. regions</a><a href="/national-tools/white-christmas/forecast/">2026 forecast</a><a href="/national-tools/white-christmas/">Check my odds</a></nav></div></header>
<main><section class="wc-support-hero"><picture class="wc-hero-media" aria-hidden="true"><img src="/assets/white-christmas-hero-final.webp" alt="" fetchpriority="high" decoding="async"></picture><div class="wrap"><div class="eyebrow">50 local guides · Christmas 2026</div><h1>White Christmas city guides</h1><p>Start with the city or winter destination people actually search for, understand its local snow regime, then jump into the live 2026 estimate. The network stays selective: strong snow markets, major metros and Christmas destinations rather than thin pages for every U.S. city.</p></div></section>
<section class="wc-support-main"><div class="wrap">
<div class="wc-support-callout wc-season-now" data-wc-season-copy><strong>Current phase:</strong> loading the Christmas 2026 signal hierarchy…</div>
<div class="wc-locator" aria-labelledby="city-hub-search"><h2 id="city-hub-search">Check any U.S. city or ZIP</h2><form action="/national-tools/white-christmas/" method="get"><label class="wc-sr-only" for="city-hub-location">U.S. city, state or ZIP</label><div class="wc-input-wrap"><span class="wc-location-icon" aria-hidden="true"></span><input id="city-hub-location" name="q" autocomplete="postal-code" inputmode="search" placeholder="Enter city, state or ZIP code" required></div><button class="btn" type="submit">See my local odds <span class="wc-arrow-icon" aria-hidden="true"></span></button></form><div class="wc-locator-meta"><p>The 50 guides below add local context. The live estimator still works for any supported U.S. city or ZIP.</p></div></div>
${hubCards}
<div class="wc-support-grid"><article class="wc-support-panel"><h3>Browse by snow region</h3><p><a href="/national-tools/white-christmas/regions/">Explore White Christmas across America →</a></p></article><article class="wc-support-panel"><h3>Understand the 2026 forecast</h3><p><a href="/national-tools/white-christmas/forecast/">See what we can know now and what changes as Christmas approaches →</a></p></article><article class="wc-support-panel"><h3>See the national map</h3><p><a href="/white-christmas-probability-map/">Historical White Christmas probability map →</a></p></article></div>
</div></section></main><footer class="footer"><div class="wrap">© 2026 <a href="/">Chris Izworski</a> · National White Christmas city guides and weather intelligence.</div></footer>${seasonAsset}</body></html>`;
await writeFile(path.join(root,"public/national-tools/white-christmas/cities/index.html"),hub);

for(const [,cities] of groups){
  const regionSlug=cities[0].regionSlug;
  const file=path.join(root,"public/national-tools/white-christmas/regions",regionSlug,"index.html");
  let html=await readFile(file,"utf8");
  html=html.replace(/<section data-wc-region-city-guides>[\s\S]*?<\/section>/g,"");
  html=html.replace(/<div class="wc-support-callout wc-season-now"[\s\S]*?<\/div>/g,"");
  html=html.replaceAll(seasonAsset,"");
  for(const c of cities){
    const live=`/national-tools/white-christmas/?q=${q(`${c.city}, ${c.state}`)}`;
    const direct=`/national-tools/white-christmas/cities/${c.slug}/`;
    html=html.replaceAll(`href="${live}"`,`href="${direct}"`);
  }
  const regionGuides=`<section data-wc-region-city-guides><h2>Local White Christmas guides</h2><div class="wc-city-links">${cities.map(c=>`<a href="/national-tools/white-christmas/cities/${c.slug}/">${esc(c.city)}, ${esc(c.state)}</a>`).join("")}</div></section>`;
  const season=`<div class="wc-support-callout wc-season-now" data-wc-season-copy data-wc-place="${esc(cities[0].region)}"><strong>Current phase:</strong> loading the Christmas 2026 signal hierarchy…</div>`;
  html=html.replace(`<h2>What drives Christmas snow here?</h2>`,`${season}<h2>What drives Christmas snow here?</h2>`);
  html=html.replace(`<div class="wc-support-grid">`,`${regionGuides}<div class="wc-support-grid">`);
  html=html.replace(`</body></html>`,`${seasonAsset}</body></html>`);
  html=html.replaceAll('"dateModified":"2026-09-03"','"dateModified":"2026-09-25"');
  await writeFile(file,html);
}

const manifest=JSON.parse(await readFile(manifestPath,"utf8"));
const cityRoutes=data.cities.map(c=>({
  route:`/national-tools/white-christmas/cities/${c.slug}/`,
  file:`public/national-tools/white-christmas/cities/${c.slug}/index.html`,
  kind:"city"
}));
const routesWithoutCities=manifest.routes.filter(r=>r.kind!=="city");
const insertAt=routesWithoutCities.findIndex(r=>r.route==="/white-christmas-probability-map/");
manifest.routes=insertAt<0?[...routesWithoutCities,...cityRoutes]:[
  ...routesWithoutCities.slice(0,insertAt),
  ...cityRoutes,
  ...routesWithoutCities.slice(insertAt)
];
manifest.version="1.1.0";
manifest.updated="2026-09-25";
await writeFile(manifestPath,JSON.stringify(manifest,null,2)+"\n");

console.log(JSON.stringify({enhanced:data.cities.length,regions:groups.length,manifestRoutes:manifest.routes.length}));
