import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  await page.goto('https://www.google.com/maps/search/Duomo51+NYC');
  
  // Wait for network idle or a specific element
  await page.waitForTimeout(3000);
  
  // Dump text content of the main pane
  // In Maps, the side pane is often role="main" or aria-label="Duomo51"
  const text = await page.evaluate(() => {
    return document.body.innerText;
  });
  
  console.log(text.substring(0, 2000));
  await browser.close();
})();
