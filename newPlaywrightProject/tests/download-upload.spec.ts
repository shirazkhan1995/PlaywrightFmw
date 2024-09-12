import {test, expect} from '@playwright/test';
import path from 'path';

test.describe('Download and upload', () => {
    test.describe.configure({ mode: "serial"});
    test('Download', async({page}) => {
        const downloadPath = path.resolve(__dirname, './downloads');
        await page.goto('https://www.leapwork.com/services/learning-center/testing-internet-file-download');
        const downloadpromise = page.waitForEvent('download');
        await page.locator('//strong').click();
        const download = await downloadpromise;
        download.saveAs(path.join(downloadPath, 'downloadedfile.zip'));
    });
    test('Upload', async({page}) => {
        await page.goto('https://the-internet.herokuapp.com/upload');
        const fileInput = path.resolve(__dirname, 'PXL_20240401_065120379.jpg');
        await page.setInputFiles('//input[@id="file-upload"]', fileInput);
        await page.locator('//input[@class="button"]').click();
        await page.waitForSelector('//h3[text()="File Uploaded!"]', {state: 'visible'});
        const uploadedFileName = await page.locator('//div[@id="uploaded-files"]').innerText();
        expect(uploadedFileName.trim()).toBe('PXL_20240401_065120379.jpg');
    });
});