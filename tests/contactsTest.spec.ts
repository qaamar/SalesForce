import test from "@playwright/test";
import { LoginPage } from "../pages/LoginPage";
import logger from "../utils/Logger";
import cdata from '../data/contacts.json';
import  {convertCsvFileToJsonFile}  from "../utils/CsvToJsonUtil";

test.beforeEach(async () => {
    logger.info(`Starting test: ${test.info().title}`);
})
for (const contact of cdata) {
    test.skip(`Create new contact test for ${contact.firstName}`, async ({ page }) => {
        const loginPage = new LoginPage(page);
        await page.goto(process.env.url!);
        await loginPage.enterUsername(process.env.username!);
        await page.keyboard.press('Tab');
        await loginPage.enterPassword(process.env.password!);
        const homePage = await loginPage.clickLoginButton();
        await homePage.isHomePageVisible();
        const contactsPage = await homePage.navigateToContactsTab();
        await contactsPage.isContactsPageVisible();
        await contactsPage.populateContactForm(contact.firstName, contact.lastName);
        await contactsPage.expectContactLabelContainsFirstNameAndLastName(contact.firstName, contact.lastName);
    })
};
/* Koristiti kod Data Driven Testinga ovaj nacin da se pokrije sve iz JSON filea */

for (const contact of cdata) {
    test(`CSV format test for ${contact.firstName}`, async ({ page }) => {
        //await convertCsvFileToJsonFileMethod('contactsData.csv', 'contacts.json')
        /* Ovaj step iznad ne radi dobro jer uzima staru Data da runa test, tek naredni
        test koristi zeljenu data */
        const loginPage = new LoginPage(page);
        await page.goto(process.env.url!);
        await loginPage.enterUsername(process.env.username!);
        await page.keyboard.press('Tab');
        await loginPage.enterPassword(process.env.password!);
        const homePage = await loginPage.clickLoginButton();
        await homePage.isHomePageVisible();
        const contactsPage = await homePage.navigateToContactsTab();
        await contactsPage.isContactsPageVisible();
        await contactsPage.populateContactForm(contact.firstName, contact.lastName);
        await contactsPage.expectContactLabelContainsFirstNameAndLastName(contact.firstName, contact.lastName);
    })
};

test('Convert CSV to JSON test', async ({ page }) => {
    await convertCsvFileToJsonFile('contactsData.csv', 'contacts.json');
});

async function convertCsvFileToJsonFileMethod(csvFileName: string, jsonFileName: string) {
    const jsonData = await convertCsvFileToJsonFile(csvFileName, jsonFileName);
    return jsonData
    /*ubaciti faker metodu ovdje da generise svaki put druga imena u csv fileu*/
}
