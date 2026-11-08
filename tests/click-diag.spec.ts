import { test, expect } from '@playwright/test';

test('diagnose clicks and navigation on home page', async ({ page }) => {
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', err => consoleErrors.push(err.message));

  await page.goto('http://localhost:3000', { waitUntil: 'domcontentloaded' });
  console.log('Errors on load:', consoleErrors);

  // Check what element is at (100, 100) or at the navigation bar
  const navBox = await page.locator('header').boundingBox();
  console.log('Header bounding box:', navBox);

  // Check top element at (200, 40)
  const topElementAtHeader = await page.evaluate(() => {
    const el = document.elementFromPoint(200, 40);
    return el ? { tagName: el.tagName, className: el.className, outerHTML: el.outerHTML.slice(0, 100) } : null;
  });
  console.log('Top element at (200, 40):', topElementAtHeader);

  // Check top element at center of page (500, 300)
  const topElementAtHero = await page.evaluate(() => {
    const el = document.elementFromPoint(500, 300);
    return el ? { tagName: el.tagName, className: el.className, outerHTML: el.outerHTML.slice(0, 100) } : null;
  });
  console.log('Top element at (500, 300):', topElementAtHero);

  // Try clicking About link
  console.log('Attempting click on About link...');
  await page.locator('nav a[href="/about"]').click();
  console.log('Navigated to:', page.url());
  expect(page.url()).toContain('/about');
});

