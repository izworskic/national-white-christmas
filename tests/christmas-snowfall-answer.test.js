import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const file='public/national-tools/white-christmas/forecast/index.html';
const html=fs.readFileSync(file,'utf8');

test('Christmas forecast answers the two genuinely different search intents',()=>{
 assert.match(html,/data-snow-question="falling"/);
 assert.match(html,/data-snow-question="cover"/);
 assert.match(html,/aria-pressed="true"/);
 assert.match(html,/1991–2020/);
 assert.match(html,/at least 1 inch/);
 assert.match(html,/short-range forecast/);
 assert.match(html,/action="\/national-tools\/white-christmas\/" method="get"/);
 assert.match(html,/name="q"/);
 assert.match(html,/National Weather Service/);
});

test('Question selection updates answer without inventing live data or a percentage',()=>{
 const script=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)?.[1];
 assert.ok(script?.includes('data-snow-question'),'Question script not found');
 const nodes=new Map();
 function node(id){if(!nodes.has(id))nodes.set(id,{textContent:''});return nodes.get(id);}
 const buttons=['falling','cover'].map(snowQuestion=>({
  dataset:{snowQuestion},properties:{},addEventListener(type,cb){this.action=cb;},
  setAttribute(key,val){this.properties[key]=val;}
 }));
 const document={querySelectorAll(){return buttons;},getElementById:node};
 const clock=class extends Date{static now(){return new Date('2026-10-20T15:00:00Z').getTime();}};
 vm.runInNewContext(script,{document,Date:clock});
 buttons[1].action();
 assert.equal(buttons[1].properties['aria-pressed'],'true');
 assert.equal(buttons[0].properties['aria-pressed'],'false');
 assert.match(node('wc-question-answer-detail').textContent,/historical/);
 assert.match(node('wc-question-evidence').textContent,/1991/);
 buttons[0].action();
 assert.match(node('wc-question-answer-heading').textContent,/too early/);
 assert.doesNotMatch(node('wc-question-answer-detail').textContent,/\d+%/);
});

test('the Christmas-week mode recommends source-based forecast, not an invented projection',()=>{
 const script=[...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)?.[1];
 const nodes=new Map(), buttons=['falling','cover'].map(snowQuestion=>({
  dataset:{snowQuestion},addEventListener(type,cb){this.action=cb;},setAttribute(){}
 }));
 const DateNear=class extends Date{static now(){return new Date('2026-12-22T14:00:00Z').getTime();}};
 const doc={querySelectorAll(){return buttons;},getElementById(id){if(!nodes.has(id))nodes.set(id,{textContent:''});return nodes.get(id);}};
 vm.runInNewContext(script,{document:doc,Date:DateNear});
 buttons[0].action();
 assert.match(nodes.get('wc-question-status').textContent,/Check current NWS forecast/);
 assert.match(nodes.get('wc-question-answer-detail').textContent,/dated National Weather Service/);
});
