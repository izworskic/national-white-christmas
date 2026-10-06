const test=require('node:test');
const assert=require('node:assert/strict');
const {readFile,readdir}=require('node:fs/promises');
const path=require('node:path');
const root=path.join(__dirname,'../public');
async function htmlFiles(dir){const out=[];for(const entry of await readdir(dir,{withFileTypes:true})){const file=path.join(dir,entry.name);if(entry.isDirectory())out.push(...await htmlFiles(file));else if(entry.isFile()&&entry.name.endsWith('.html'))out.push(file);}return out;}
test('published White Christmas HTML carries a quiet linked Chris Izworski creator credit',async()=>{
  const profile='https://chrisizworski.com/chris-izworski/';
  const files=await htmlFiles(root);
  assert.ok(files.length>0,'published HTML pages should exist');
  const missing=[];
  for(const file of files){const html=await readFile(file,'utf8');if(!html.includes('Built by')||!html.includes('href="'+profile+'"'))missing.push(path.relative(root,file));}
  assert.deepEqual(missing,[]);
});
