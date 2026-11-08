import { chromium } from "playwright";

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  const consoleErrors = [];
  page.on("pageerror", err => consoleErrors.push("PAGEERROR: " + err.message));
  page.on("console", msg => {
    if (msg.type() === "error") consoleErrors.push("CONSOLE: " + msg.text());
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  console.log("Console errors on load:", consoleErrors);

  // Check element at center of screen / header
  const header = await page.$("header");
  console.log("Header found:", !!header);

  // Try clicking About
  console.log("Clicking About in nav...");
  const aboutLink = await page.$("nav a[href='/about']");
  console.log("About link found:", !!aboutLink);
  if (aboutLink) {
    await aboutLink.click();
    await page.waitForTimeout(1000);
    console.log("URL after clicking about:", page.url());
  }

  // Go back to home
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Scroll down 200px
  console.log("Scrolling down 200px...");
  await page.evaluate(() => window.scrollTo(0, 200));
  await page.waitForTimeout(500);

  // Check if ticker is visible
  const ticker = await page.$("div[aria-label='Chambers Scrolled Header Ribbon']");
  console.log("Ticker found:", !!ticker);

  // Now try clicking Contact or Services in nav when scrolled
  const contactLink = await page.$("nav a[href='/contact']");
  console.log("Contact link found:", !!contactLink);
  if (contactLink) {
    console.log("Clicking Contact while scrolled...");
    try {
      await contactLink.click({ timeout: 3000 });
      await page.waitForTimeout(1000);
      console.log("URL after clicking contact:", page.url());
    } catch (e) {
      console.error("FAILED to click contact link:", e.message);
    }
  }

  // Check CTA button
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  console.log("Checking hero CTA button...");
  const heroCta = await page.$("a[href='/request-service']");
  console.log("Hero CTA found:", !!heroCta);
  if (heroCta) {
    try {
      await heroCta.click({ timeout: 3000 });
      await page.waitForTimeout(1000);
      console.log("URL after clicking hero CTA:", page.url());
    } catch (e) {
      console.error("FAILED to click hero CTA:", e.message);
    }
  }

  await browser.close();
}

run().catch(console.error);

