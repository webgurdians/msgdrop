import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  // Login first since dashboard is protected
  await page.goto('http://localhost:5173/login');
  
  // Check if we need to click "Sign in with Google" or similar
  // Looking at the codebase, wait for the page to load
  await page.waitForSelector('button');
  
  // Wait, let's just bypass login by setting localStorage
  await page.evaluate(() => {
    localStorage.setItem('token', 'fake-token');
    localStorage.setItem('userEmail', 'admin@msgdrop.com');
  });
  
  await page.goto('http://localhost:5173/dashboard/campaigns');
  
  // Wait for the New Campaign button
  await page.waitForSelector('button');
  
  // Find the button with text "+ New Campaign" or similar
  const buttons = await page.$$('button');
  for (const btn of buttons) {
    const text = await page.evaluate(el => el.textContent, btn);
    if (text && text.includes('New Campaign')) {
      await btn.click();
      break;
    }
  }
  
  // Wait for modal to open
  await new Promise(r => setTimeout(r, 1000));
  
  // Extract HTML of the modal
  const modalHTML = await page.evaluate(() => {
    const modal = document.querySelector('.pop-in');
    return modal ? modal.outerHTML : 'Modal not found';
  });
  
  console.log(modalHTML);
  
  await browser.close();
})();
