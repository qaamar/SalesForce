import {test as base, expect as defaultExpect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import HomePage from '../pages/HomePage';


type TestFixtures = {
    loginPage: LoginPage;
    homePage: HomePage;
}; 
export const expect = defaultExpect; //da bi assertion radio moras imati i ovaj expect

export const test = base.extend<TestFixtures>({

    homePage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto(process.env.url!);
        await loginPage.enterUsername(process.env.username!);
        await page.keyboard.press('Tab');
        await loginPage.enterPassword(process.env.password!);
        const homePage = await loginPage.clickLoginButton();
        await use(homePage);
    }
});