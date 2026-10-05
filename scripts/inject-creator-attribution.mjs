#!/usr/bin/env node
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
const root=path.resolve(import.meta.dirname,"..");
const publicRoot=path.join(root,"public");
const profile="https://chrisizworski.com/chris-izworski/";
const credit='<span class="creator-credit" style="display:inline-block;margin-inline-start:.5rem;font-size:.8rem;opacity:.75">Built by <a href="'+profile+'">Chris Izworski</a></span>';
async function htmlFiles(dir){
  const out=[];
  for(const entry of await readdir(dir,{withFileTypes:true})){
    const file=path.join(dir,entry.name);
    if(entry.isDirectory())out.push(...await htmlFiles(file));
    else if(entry.isFile()&&entry.name.endsWith(".html"))out.push(file);
  }
  return out;
}
function inject(html){
  if(html.includes('href="'+profile+'"')&&html.includes("Built by"))return html;
  const footerEnd=html.toLowerCase().lastIndexOf("</footer>");
  if(footerEnd>=0){
    let footerStart=html.toLowerCase().lastIndexOf("<footer",footerEnd);
    if(footerStart<0)footerStart=0;
    const before=html.slice(0,footerStart), footer=html.slice(footerStart,footerEnd), after=html.slice(footerEnd);
    const copyright=/©\s*2026\s*<a href="\/">Chris Izworski<\/a>/i;
    if(copyright.test(footer)){
      const next=footer.replace(copyright,'© 2026 · Built by <a href="'+profile+'">Chris Izworski</a>');
      return before+next+after;
    }
    return html.slice(0,footerEnd)+credit+html.slice(footerEnd);
  }
  const bodyEnd=html.toLowerCase().lastIndexOf("</body>");
  if(bodyEnd<0)return html;
  return html.slice(0,bodyEnd)+'<footer class="creator-credit-footer" style="padding:1rem;text-align:center">'+credit+"</footer>"+html.slice(bodyEnd);
}
const files=await htmlFiles(publicRoot);
let changed=0;
for(const file of files){
  const old=await readFile(file,"utf8"),next=inject(old);
  if(next!==old){await writeFile(file,next);changed++;}
}
console.log(`Creator attribution applied to ${changed} of ${files.length} White Christmas HTML pages.`);
