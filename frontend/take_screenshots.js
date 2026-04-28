import puppeteer from 'puppeteer';
import fs from 'fs';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Set mobile viewport
  await page.setViewport({ width: 375, height: 812 });
  
  await page.goto('http://localhost:5173/');
  
  // Take screenshot
  await page.screenshot({ path: 'landing_mobile.png' });
  
  // Scroll down a bit to see if navbar is sticky
  await page.evaluate(() => window.scrollBy(0, 500));
  await new Promise(r => setTimeout(r, 500));
  
  await page.screenshot({ path: 'landing_mobile_scrolled.png' });
  
  // Now check the Campaigns modal
  // Set desktop viewport
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('http://localhost:5173/dashboard/campaigns');
  
  // bypass login
  await page.evaluate(() => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('userEmail', 'admin@msgdrop.com');
  });
  await page.goto('http://localhost:5173/dashboard/campaigns');
  
  await page.waitForSelector('button');
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('New Campaign')) {
      await btn.click();
      break;
    }
  }
  
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'campaigns_modal.png' });
  
  await browser.close();
})();
