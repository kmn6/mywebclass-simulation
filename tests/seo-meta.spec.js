const { test, expect } = require('@playwright/test');

const pages = ['index.html', 'template-content.html', 'contact.html'];

for (const pageUrl of pages) {
    test(`Verify SEO meta tags - ${pageUrl}`, async ({ page }) => {
      await page.goto(pageUrl);

      // Verify the charset meta tag
      expect(await page.querySelector('meta[charset="UTF-8"]')).toBeTruthy();

      // Verify the viewport meta tag
      expect(await page.querySelector('meta[name="viewport"][content="width=device-width, initial-scale=1.0"]')).toBeTruthy();

      // Verify the keywords meta tag
      expect(await page.querySelector('meta[name="keywords"][content="My Webclass Homepage"]')).toBeTruthy();

      // Verify the author meta tag
      expect(await page.querySelector('meta[name="author"][content="John Idone & Kevin Nipal"]')).toBeTruthy();

      // Verify the description meta tag
      expect(await page.querySelector('meta[name="description"][content="A project to help educators integrate new technologies into their teaching"]')).toBeTruthy();

      // Verify the OpenGraph title meta tag
      expect(await page.querySelector('meta[property="og:title"][content=""]')).toBeTruthy();

      // Verify the OpenGraph description meta tag
      expect(await page.querySelector('meta[property="og:description"][content=""]')).toBeTruthy();

      // Verify the OpenGraph image meta tag
      expect(await page.querySelector('meta[property="og:image"][content="assets/images/logo.png"]')).toBeTruthy();

      // Verify the OpenGraph URL meta tag
      expect(await page.querySelector('meta[property="og:url"][content=""]')).toBeTruthy();
    });
}
