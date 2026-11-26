const {chromium}=require('playwright-core');
const fs=require('node:fs');
const assert=require('node:assert/strict');
(async()=>{
const browser=await chromium.launch({executablePath:process.env.CHROME_PATH||'/usr/bin/google-chrome',headless:true,args:['--no-sandbox']});
try{
const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:1,hasTouch:true});
const home='https://tanishtra.in/__tanishtra_app__/index.html';
const html=fs.readFileSync('android/app/src/main/assets/portal.html','utf8');
await page.route('**/*',async route=>{
 const u=new URL(route.request().url());
 if(u.href===home) return route.fulfill({contentType:'text/html',body:html});
 if(u.pathname.endsWith('/products.json'))return route.fulfill({json:{products:[{title:'Test fixture',handle:'test-fixture',images:[{src:'https://tanishtra.in/test.jpg'}]}]}});
 return route.abort();
});
await page.goto(home);
await page.waitForFunction(()=>document.documentElement.classList.contains('motion'));
await page.waitForTimeout(150);
const state=()=>page.evaluate(()=>({x:document.querySelector('.panel.left').getBoundingClientRect().x,scale:getComputedStyle(document.querySelector('.wordmark')).transform,tracking:getComputedStyle(document.querySelector('.wordmark')).letterSpacing}));
let start=await state();
await page.evaluate(()=>scrollTo(0,700));await page.waitForTimeout(180);
let opened=await state();
console.log('Portal scroll at 700px:',JSON.stringify({start,opened,travel:Math.abs(opened.x-start.x)}));
assert(Math.abs(opened.x-start.x)>100,'Panel must move over 100px');
assert(parseFloat(opened.tracking)<parseFloat(start.tracking),'Tracking must tighten');
assert.notEqual(opened.scale,start.scale,'Title must grow');
await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(180);
assert(Math.abs((await state()).x-start.x)<1,'Portal must reverse');
await page.locator('#deck').scrollIntoViewIfNeeded();
await page.locator('#deck').focus();
await page.keyboard.press('ArrowRight');await page.waitForTimeout(350);
assert.match(await page.locator('#deck-status').innerText(),/02 \/ 02/);
await page.keyboard.press('ArrowLeft');await page.waitForTimeout(350);
assert.match(await page.locator('#deck-status').innerText(),/01 \/ 02/);
await page.emulateMedia({reducedMotion:'reduce'});await page.waitForTimeout(100);
assert.equal(await page.locator('.panel.left').evaluate(e=>getComputedStyle(e).display),'none');
console.log('PASS: reversible portal, title tracking/scale, keyboard deck, reduced motion. Catalogue uses mocked data in this test.');
}finally{await browser.close()}
})().catch(e=>{console.error(e);process.exit(1)});
