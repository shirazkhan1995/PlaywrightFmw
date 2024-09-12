import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {

  await Promise.all([
    page.goto('https://www.formula1.com/'),
    page.waitForLoadState('domcontentloaded'),
  ]);

  const frame = page.frameLocator('//iframe[@title="SP Consent Message"]');
  const acceptAllButton = frame.locator('//button[@title="ACCEPT ALL"]');
  await acceptAllButton.click();
  await page.locator('//header').waitFor();
  await page.locator('//a[@data-action-type="CTA Click | Sign In"]').click();
  await page.waitForLoadState('domcontentloaded');
  await frame.locator('//button[@title="ACCEPT ALL"]').click();
  await page.getByRole('heading', { name: 'Sign In' }).isVisible();
  await page.getByRole('button', { name: 'Sign In' }).click();
  await page.waitForSelector('//span[text()="Please enter valid username/email address"]', { state: 'visible' });
});
