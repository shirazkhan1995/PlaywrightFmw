import { test } from '../../baseTest';
import { expect } from '@playwright/test';

test.describe("Popups", () => {
    test('should be able to enter basic credentails on auth popup', async ({ browser }) => {
        const context =  await browser.newContext({ httpCredentials: { username: 'admin', password: 'admin' } }); 
        const page = await context.newPage();
        await Promise.all([
            page.goto("https://the-internet.herokuapp.com/basic_auth"),
            page.waitForLoadState('domcontentloaded')
        ]);
        expect(await page.locator("//p").innerText()).toBe("Congratulations! You must have the proper credentials.");
    });
});