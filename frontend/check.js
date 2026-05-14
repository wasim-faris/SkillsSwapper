import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:5173/login', { waitUntil: 'networkidle0' });
  
  const content = await page.content();
  if (content.includes('SkillSwap')) {
    console.log('Page loaded SkillSwap text successfully.');
  } else {
    console.log('SkillSwap text not found on page.');
  }
  
  await browser.close();
})();
