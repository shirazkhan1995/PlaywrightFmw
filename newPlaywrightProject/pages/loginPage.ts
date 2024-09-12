import { Base } from "./base";
import config from "../config/config.json";
import { expect } from "@playwright/test";
const pom = {
    loginPage: `//h3[text()='Sign In']`,
    emailInput: `//input[@placeholder="Email"]`,
    passwordInput: `//input[@placeholder="Password"]`,
    submitButton: `//button[@aria-label="submit"]`
};
export class LoginPage extends Base {
    async navigateToLoginPage() {
        await Promise.all([
            await this.page.goto(config.instanceURL),
            await this.page.waitForLoadState("domcontentloaded")
        ]);
        await this.page.waitForSelector(pom.loginPage, {state: "visible"});
    }

    async fillCredentialsAndSubmit(opts: {email: string, password: string}) {
        await this.page.locator(pom.emailInput).fill(opts.email);
        await this.page.locator(pom.passwordInput).fill(opts.password);
        await this.page.locator(pom.submitButton).click();
        await this.page.waitForLoadState("domcontentloaded");
    }

    async verifyErrorMessage() {
        expect(await this.page.locator("//p[text()='You entered an incorrect email and/or password.']").innerText()).toBe("You entered an incorrect email and/or password.");
    }
}