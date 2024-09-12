import { LoginPage } from "./loginPage";

export class PomManager {
    request: any;
    page: any;
    loginPage: LoginPage;

    constructor(page: any) {
        this.page = page;
        this.loginPage = new LoginPage(page);
    }

    getLoginPage() {
        return this.loginPage;
    }
}