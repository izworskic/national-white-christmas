#!/usr/bin/env node
// Real Chromium checks of the generated White Christmas pages.
// Serve ./public with python3 -m http.server 4173 --directory public before running.
// This exercises the actual HTML/CSS/JS rather than asserting source text alone.
const { chromium } = require('playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = 'http://127.0.0.1:4173';
const viewports = [360, 390, 768, 1280, 1440];
const routes = [
  ['/national-tools/white-christmas/', 'calculator', 'White Christmas Calculator'],
  ['/national-tools/white-christmas/forecast/', 'forecast', 'Will it snow on Christmas'],
  ['/white-christmas-probability-map/', 'atlas', 'White Christmas probability map'],
  ['/white-christmas-michigan/', 'michigan', 'Will Michigan have a White Christmas'],
  ['/national-tools/white-christmas/cities/buffalo-ny/', 'buffalo', 'Will Buffalo have a White Christmas'],
  ['/national-tools/white-christmas/cities/marquette-mi/', 'marquette', 'Will Marquette have a White Christmas'],
  ['/national-tools/white-christmas/regions/great-lakes-ohio-valley/', 'great-lakes', 'White Christmas around the Great Lakes'],
  ['/national-tools/white-christmas/cities/', 'city-directory', 'White Christmas city guides']
];
const out = path.resolve('browser-qa-artifacts');
fs.mkdirSync(out, { recursive: true });

(async()=>{
const browser = await chromium.launch({ headless: true, ...(process.env.WC_USE_SYSTEM_CHROME ? {channel:'chrome'} : {}), args: ['--no-sandbox'] });
let passed = 0;
const failures = [];
async function check(label, fn) {
  try { await fn(); passed++; process.stdout.write('PASS ' + label + '\n'); }
  catch (e) { failures.push({label, error:e.stack||String(e)}); process.stderr.write('FAIL ' + label + ': ' + e.message + '\n'); }
}
try {
  for (const width of viewports) {
    const context = await browser.newContext({ viewport: {width, height: 900}, reducedMotion:'reduce' });
    const page = await context.newPage();
    for (const [url, id, heading] of routes) {
      await check(width+'px '+id+' structure + overflow', async () => {
        const response = await page.goto(root+url, {waitUntil:'domcontentloaded', timeout:30000});
        assert.equal(response.status(),200,'local generated page HTTP status');
        await page.locator('h1').first().waitFor({ timeout:10000 });
        const h1 = await page.locator('h1').first().innerText();
        assert.ok(h1.toLowerCase().includes(heading.toLowerCase()), 'Unexpected heading: '+h1);
        const metrics= await page.evaluate(() => ({
          width:document.documentElement.clientWidth,
          scrollWidth:document.documentElement.scrollWidth,
          bodyScrollWidth:document.body.scrollWidth
        }));
        assert.ok(metrics.scrollWidth <= width+3, 'Horizontal overflow: '+JSON.stringify(metrics));
        assert.ok(metrics.bodyScrollWidth <= width+3, 'Body overflow: '+JSON.stringify(metrics));
        assert.ok(await page.locator('link[rel="canonical"]').count(), 'Missing canonical');
        assert.ok(await page.locator('script[type="application/ld+json"]').count(), 'Missing Person/article structured metadata');
        if (id==='calculator') {
          const input=page.locator('#wc-location');
          assert.equal(await input.count(),1);
          const box=await input.boundingBox();
          assert.ok(box&&box.width>130&&box.y<900,'Location field is not discoverable in first phone screen: '+JSON.stringify(box));
          assert.ok(await page.locator('#probability').count(),'Estimator result absent');
        }
        if (id==='atlas') {
          const map=page.locator('#noaa-map iframe');
          const m=await map.boundingBox();
          assert.ok(m && m.height>=300 && m.width>=260,'Historical map too small');
          assert.ok(await page.locator('.wc-map-exit a[href*="noaa.maps.arcgis.com"]').count(),'NOAA fallback absent');
          assert.ok(await page.locator('.wc-map-exit a[href*="ncei.noaa.gov"]').count(),'NOAA source absent');
        }
        if (id==='buffalo'||id==='marquette') {
          assert.ok(await page.locator('.wc-city-lens p').isVisible(),'City-specific snow lens hidden');
          assert.ok(await page.locator('[data-wc-season-copy]').count(),'Seasonal state absent');
          assert.equal(await page.locator('#city-drivers').count(),1);
        }
        if (id==='michigan') {
          assert.equal(await page.locator('.wc-mi-decision').count(),2);
          assert.ok(await page.locator('.wc-mi-decision').first().isVisible());
        }
      });
      if (width===390||width===1280) {
        await check(width+'px '+id+' screenshot', async () => {
          if(id==='atlas') await page.waitForTimeout(4500);
          await page.screenshot({path:path.join(out,id+'-'+width+'.png'),animations:'disabled',timeout:30000});
        });
      }
    }
    if (width===390||width===1280) {
      await check(width+'px snowfall-versus-cover A-B-A', async () => {
        await page.goto(root+'/national-tools/white-christmas/forecast/', {waitUntil:'domcontentloaded'});
        const a=page.locator('[data-snow-question="falling"]'),b=page.locator('[data-snow-question="cover"]');
        assert.equal(await a.getAttribute('aria-pressed'),'true');
        await b.click();
        await page.screenshot({path:path.join(out,'forecast-cover-'+width+'.png'),animations:'disabled'});
        assert.equal(await b.getAttribute('aria-pressed'),'true');
        assert.equal(await a.getAttribute('aria-pressed'),'false');
        assert.match(await page.locator('#wc-question-answer-heading').innerText(),/White Christmas/);
        await a.click();
        assert.equal(await a.getAttribute('aria-pressed'),'true');
        assert.equal(await b.getAttribute('aria-pressed'),'false');
        assert.match(await page.locator('#wc-question-answer-heading').innerText(),/snowfall/i);
      });
    }
    await context.close();
  }
  await check('map embed network failure leaves official links',async()=>{
    const context = await browser.newContext({viewport:{width:390,height:850}});
    await context.route('**/noaa.maps.arcgis.com/**',route=>route.abort('failed'));
    const page=await context.newPage();
    await page.goto(root+'/white-christmas-probability-map/',{waitUntil:'domcontentloaded'});
    assert.ok(await page.locator('.wc-map-exit').isVisible());
    assert.ok(await page.locator('.wc-map-exit a').count()>=3);
    await context.close();
  });
  await check('no-JavaScript city/atlas/forecast content and fallback',async()=>{
    const context=await browser.newContext({javaScriptEnabled:false,viewport:{width:390,height:850}});
    const page=await context.newPage();
    for(const route of ['/white-christmas-probability-map/','/national-tools/white-christmas/cities/buffalo-ny/','/national-tools/white-christmas/forecast/']) {
      await page.goto(root+route,{waitUntil:'domcontentloaded'});
      assert.ok(await page.locator('h1').isVisible(),route+' heading missing');
      assert.ok(await page.locator('main a[href^="/national-tools/white-christmas/"]').count(),route+' has no navigable path');
    }
    await context.close();
  });
} finally {
  await browser.close();
}
fs.writeFileSync(path.join(out,'summary.json'),JSON.stringify({passed,failed:failures.length,failures},null,2)+'\n');
process.stdout.write('\nBrowser QA: '+passed+' passed, '+failures.length+' failed\n');
if(failures.length){for(const f of failures)process.stderr.write(f.label+'\n'+f.error+'\n');process.exitCode=1;}

})().catch(e=>{console.error(e);process.exitCode=1;});
