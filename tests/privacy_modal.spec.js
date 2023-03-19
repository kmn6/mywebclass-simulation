const { test, expect } = require('@playwright/test');

test('Privacy Modal Test', async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  // Clear cookies before starting the test
  await context.clearCookies();

  // Navigate to the page
  await page.goto('http://localhost:3000');

  // Check that the modal appears
  const modal = await page.$('#privacyModal');
  expect(modal).toBeTruthy();

  // Check that the modal content is correct
  const modalContent = await modal.$eval('.modal-body', el => el.textContent);
  expect(modalContent).toContain('Lorem ipsum dolor sit amet, consectetur adipiscing elit.');

  // Click the Accept button and check that the modal closes and sets the cookie
  await Promise.all([
    page.waitForNavigation(),
    modal.click('#acceptBtn')
  ]);
  expect(await modal.isVisible()).toBeFalsy();
  expect(await context.cookies()).toContainEqual({ name: 'privacyAccepted', value: 'true' });

  // Navigate back to the page and check that the modal does not appear
  await page.goto('http://localhost:3000');
  expect(await modal.isVisible()).toBeFalsy();

  // Click the Decline button and check that the page redirects to Google
  await modal.click('#declineBtn');
  expect(page.url()).toBe('https://www.google.com/');

  // Close the context
  await context.close();
});
