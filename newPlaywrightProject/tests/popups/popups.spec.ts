import { PomManager } from "../../pages/pomManager";
import { test } from '../../baseTest';
import { expect } from '@playwright/test';

test.describe("Popups", () => {
    let pomManager: PomManager;

    test.beforeEach(async ({ page }) => {
        pomManager = new PomManager(page);
    });

    test('should open a popup', async ({ page }) => {
        await Promise.all([
            page.goto("https://the-internet.herokuapp.com/javascript_alerts"),
            page.waitForLoadState('domcontentloaded')
        ]);
        
        await page.once('dialog', async dialog => {
            await dialog.dismiss();
        })

        await page.locator("//button[@onclick='jsAlert()']").click();

        await page.locator("//p[@id='result']").innerText().then(text => {
            expect(text).toBe("You successfully clicked an alert");
        });
    });
});