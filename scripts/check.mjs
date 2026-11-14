// Static SEO/GEO smoke checks. Run after npm run build.
import{readFileSync,existsSync}from'node:fs';
import assert from'node:assert/strict';
const pages=['index.html','zh/index.html','about/index.html','zh/about/index.html','privacy/index.html','zh/privacy/index.html','products/askthem/index.html','products/tabgroup/index.html','zh/products/askthem/index.html','zh/products/tabgroup/index.html'];
for(const p of pages){const html=readFileSync('dist/'+p,'utf8');assert.match(html,/<html lang=/);assert.match(html,/<title>[^<]+<\/title>/);assert.match(html,/<meta name="description"/);assert.match(html,/<link rel="canonical"/);assert.match(html,/hreflang="zh-CN"/);assert.match(html,/hreflang="en"/);assert.match(html,/<h1>.*?<\/h1>/s);assert.ok(!html.includes('undefined'),p);}
for (const p of pages) {
  const html=readFileSync('dist/'+p,'utf8');
  const route=p.replace(/^zh\//,'/').replace(/index\.html$/,'');
  const suffix=route==='/'?'/':(route.startsWith('/')?route:'/'+route);
  const other=p.startsWith('zh/')?suffix:'/zh'+suffix;
  assert.ok(html.includes('href="'+other+'"'), 'Language switch does not retain route: '+p);
}
for(const p of pages.filter(x=>x.includes('/products/')||x.startsWith('products/'))){const html=readFileSync('dist/'+p,'utf8');assert.match(html,/SoftwareApplication/);assert.match(html,/FAQ|Frequently asked questions|常见问题/);}
for(const p of ['robots.txt','sitemap.xml','llms.txt','CNAME','assets/site.css','assets/logo.svg','products/smart-tab-manager/index.html','assets/screenshots/askthem-studio-en.png','assets/screenshots/askthem-studio-zh.png','assets/icons/askthem.png','assets/icons/tabgroup.png','assets/og-brand.jpg','assets/brand-wordmark.svg'])assert.ok(existsSync('dist/'+p));
assert.match(readFileSync('dist/CNAME','utf8'),/www.kmindlab.com/);
assert.match(readFileSync('dist/sitemap.xml','utf8'),/products\/askthem/);
console.log('SEO/static checks passed for',pages.length,'pages.');
