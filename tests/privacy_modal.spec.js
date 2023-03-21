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

  // Click the Decline button and check that the page redirects to Google then go back
  page.locator('.modal-content #declineBtn').click()
  await page.waitForNavigation()
  expect(page.url()).toBe('https://www.google.com/');
  await page.goBack();

  // Click the Accept button and check that the modal closes and sets the cookie
  await page.locator('.modal-content #acceptBtn').click()
  await page.waitForSelector('body.modal-open', { state: 'detached' });
  expect(await modal.isVisible()).toBeFalsy();
  const cookies = await context.cookies();
  const privacyAccepted = cookies.find(cookie => cookie.name === 'privacyAccepted');
  expect(privacyAccepted.value).toEqual('true');

  // Navigate back to the page and check that the modal does not appear
  await page.reload( {waitUntil: 'domcontentloaded' });
  expect(await modal.isVisible()).toBeFalsy();

  // Close the context
  await context.close();
});
