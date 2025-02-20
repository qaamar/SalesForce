import { Locator, Page } from "@playwright/test";
import logger from "../utils/Logger";
import  HomePage from "./HomePage";

export class LoginPage {
    readonly page: Page;
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Log In' });
    }

    async enterUsername(username: string) {
        await this.usernameInput.fill(username);
        logger.info('Username entered');

    }

    async enterPassword(password: string) {
        await this.passwordInput.fill(password);
        logger.info('Password entered');
    }

    async clickLoginButton() {
        await this.loginButton.click();
        logger.info('Login button clicked');
        const homePage = new HomePage(this.page);
        return homePage //chaining
    }

    async quickLogin(username: string, password: string) {
        await this.enterUsername(username);
        await this.page.keyboard.press('Tab');
        await this.enterPassword(password);
        await this.clickLoginButton();
    }
}