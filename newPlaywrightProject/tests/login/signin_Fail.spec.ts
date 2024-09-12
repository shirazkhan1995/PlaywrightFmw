import {test} from '../../baseTest.ts';
import { PomManager } from "../../pages/pomManager";

test.describe("Sign In", () => {
    let loginPage;
    let pomManager: PomManager;

    test.beforeEach(async ({page}) => {
        pomManager = new PomManager(page);
        loginPage = pomManager.getLoginPage();
    });
    
    test('should fail with wrong credentials', async ({page}) => {
        await loginPage.navigateToLoginPage();
        await loginPage.fillCredentialsAndSubmit({
            email: process.env.email, 
            password: process.env.password
        });
        await loginPage.verifyErrorMessage();
    });
});


