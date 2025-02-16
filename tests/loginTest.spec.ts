import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import logger from '../utils/Logger';
import { log } from 'console';

test.beforeEach(async () => {
  logger.info(`Starting test: ${test.info().title}`);
})

test('Login test', async ({ page }) => {

  const loginPage = new LoginPage(page);
  await page.goto(process.env.url!);
  await loginPage.enterUsername(process.env.username!);
  await page.keyboard.press('Tab');
  await loginPage.enterPassword(process.env.password!);
  const homePage = await loginPage.clickLoginButton();
  await page.pause
  await homePage.isHomePageVisible();
  await page.pause()
  expect(page.locator('text=Home')).toBeVisible();

});

test.skip('check env file', async ({ page }) => {
  //console.log(process.env);
  console.log(process.env.username);
  console.log(process.env.password);
});
