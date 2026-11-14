import { chromium } from 'playwright';
import { createServer } from 'node:http';
import { readFileSync, statSync, mkdirSync } from 'node:fs';
import { join, extname, normalize } from 'node:path';
import assert from 'node:assert/strict';

const origin='http://127.0.0.1:4173';
const types={'.html':'text/html; charset=utf-8','.css':'text/css','.js':'text/javascript','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
const server=createServer((req,res)=>{
  try{
    const pathname=decodeURIComponent(new URL(req.url,origin).pathname);
    const full=normalize(join('dist',pathname.endsWith('/')?pathname+'index.html':pathname));
    if(!full.startsWith('dist/')){res.writeHead(403).end();return;}
    const data=readFileSync(full);
    res.writeHead(200,{'Content-Type':types[extname(full)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data);
  }catch(e){res.writeHead(404).end('Not found')}
});
await new Promise(resolve=>server.listen(4173,'127.0.0.1',resolve));
let browser;
try{
  browser=await chromium.launch({headless:true});
  mkdirSync('test-artifacts',{recursive:true});
  const scenarios=[
    {path:'/',name:'home-en-desktop',size:{width:1440,height:900},language:'en'},
    {path:'/zh/',name:'home-zh-mobile',size:{width:390,height:844},language:'zh-CN'},
    {path:'/products/askthem/',name:'askthem-en-desktop',size:{width:1440,height:900},language:'en'},
    {path:'/zh/products/askthem/',name:'askthem-zh-mobile',size:{width:390,height:844},language:'zh-CN'},
    {path:'/products/tabgroup/',name:'tabgroup-en-mobile',size:{width:390,height:844},language:'en'},
    {path:'/zh/products/tabgroup/',name:'tabgroup-zh-desktop',size:{width:1440,height:900},language:'zh-CN'}
  ];
  for(const t of scenarios){
    const page=await browser.newPage({viewport:t.size,deviceScaleFactor:1});
    const errors=[];
    page.on('pageerror',err=>errors.push(err.message));
    const response=await page.goto(origin+t.path,{waitUntil:'networkidle'});
    assert.equal(response.status(),200,t.name+' HTTP status');
    assert.equal(await page.locator('html').getAttribute('lang'),t.language,t.name+' locale');
    assert.equal(await page.locator('h1').count(),1,t.name+' h1 count');
    const title=await page.title();assert.ok(title.includes('KMindLab'),t.name+' title');
    const measured=await page.evaluate(()=>({
      scroll:document.documentElement.scrollWidth,
      client:document.documentElement.clientWidth,
      broken:[...document.querySelectorAll('img')].filter(x=>!x.complete||x.naturalWidth===0).map(x=>x.src),
      missingAnchors:[...document.querySelectorAll('a[href^="#"]')].map(a=>a.getAttribute('href')).filter(x=>x.length>1&&!document.getElementById(x.slice(1)))
    }));
    assert.ok(measured.scroll<=measured.client+2,t.name+' horizontal overflow: '+JSON.stringify(measured));
    assert.deepEqual(measured.broken,[],t.name+' broken image');
    assert.deepEqual(measured.missingAnchors,[],t.name+' broken in-page links');
    assert.deepEqual(errors,[],t.name+' JS errors');
    await page.screenshot({path:'test-artifacts/'+t.name+'.png',fullPage:true,animations:'disabled'});
    const counterpart=t.path.startsWith('/zh/')?t.path.replace(/^\/zh/,''):('/zh'+t.path);
    assert.equal(await page.locator('a.lang-toggle').getAttribute('href'),counterpart,t.name+' language switch');
    if(t.path.includes('askthem'))assert.equal(await page.locator('img[src*="askthem-studio"]').count(),1,t.name+' screenshot');
    console.log('PASS '+t.name+' '+measured.client+'px; screenshot saved');
    await page.close();
  }
  console.log('All '+scenarios.length+' Chromium visual/navigation checks passed.');
}finally{
  if(browser)await browser.close();
  await new Promise(resolve=>server.close(resolve));
}
