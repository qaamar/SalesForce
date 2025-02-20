import {test, expect, Page} from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import HomePage from '../pages/HomePage';
import  ContactsPage  from '../pages/ContactsPage';
import CasePage from '../pages/CasePage';
import logger from '../utils/Logger';
import serialTD from '../data/serialTestData.json';

test.describe.configure({ mode: 'serial' }); //this will run tests serially and not in paralel

let page : Page;

test.beforeAll(async ({ browser }) => {
    logger.info(`Starting test: ${test.info().title}`);
    page = await browser.newPage();
    await page.goto(process.env.url!);
    const loginPage = new LoginPage(page);
    await loginPage.quickLogin(process.env.username!, process.env.password!);
    const homePage = new HomePage(page);
    await homePage.isHomePageVisible();
});

test('Create a contact and open', async () =>{

    const contactsPage = new ContactsPage(page);
    await contactsPage.navigateToContactsTab();
    await contactsPage.isContactsPageVisible();
    await contactsPage.populateContactForm(serialTD.firstname, serialTD.lastname);
    await contactsPage.expectContactLabelContainsFirstNameAndLastName(serialTD.firstname, serialTD.lastname);
    await contactsPage.searchContact(serialTD.firstname);

});

test('Create a case for added contact', async() => {
    
const casePage = new CasePage(page);
await casePage.createNewCaseFromContactDetailPage(serialTD.caseOrigin,serialTD.caseProduct,serialTD.caseType);
const toast = page.locator('//div[@role="status" and contains(text(), "Success notification")]');
await expect(toast).toBeVisible();
});