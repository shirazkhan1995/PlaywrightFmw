import {test} from '@playwright/test';

test.describe('Lowest airline price', () => {
    test('Lowest airline price', async({page}) => {
        await Promise.all([
            page.goto("https://www.makemytrip.com/flights/"),
            page.waitForLoadState('domcontentloaded')
        ]);
        await page.locator("//span[@class='commonModal__close']").click();
        await page.locator("//label[@for='departure']").click();
        await page.waitForSelector("//div[@class='DayPicker-Months']/div//p[@class=' todayPrice']", {state: 'visible'});
        const prices = await page.locator("//div[@class='DayPicker-Months']/div//p[@class=' todayPrice']").evaluateAll((elements) => {
            return elements.map((element) => {
                const priceText = element.textContent || '';
                // console.log(`Price text found: ${priceText}`); // Debugging: Log the text content
                const numericPrice = parseInt(priceText.replace(/[₹,]/g, ''), 10);
                // console.log(`Numeric price: ${numericPrice}`); // Debugging: Log the numeric price
                return numericPrice;
            });
        });
        function getPriceExtremes(prices: number[]): { min: number, max: number } {
            const min = Math.min(...prices);
            const max = Math.max(...prices);
            return { min, max };
        }
        
        // Usage
        const { min: minimumPrice, max: maximumPrice } = getPriceExtremes(prices);
        console.log(`The minimum Price is: ${minimumPrice}`);
        console.log(`The maximum Price is: ${maximumPrice}`);
    });
}); 