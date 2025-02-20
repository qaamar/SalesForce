import { Locator, Page, expect } from '@playwright/test';
import logger from '../utils/Logger';
import { error, time } from 'console';

export default class ContactsPage {
    readonly page: Page;
    readonly contactsTitle: Locator;
    readonly firstNameInput: Locator;
    readonly lastNameInput: Locator;
    readonly saveButton: Locator;
    readonly deleteButton: Locator;
    readonly newButton: Locator;
    readonly contactFullNameLabelLocator: Locator;
    readonly searchBox: Locator;
    readonly searchBoxButton: Locator;
    constructor(page: Page) {
        this.page = page;
        this.newButton = page.getByRole('button', { name: 'New' });
        this.contactsTitle = page.getByRole('paragraph').filter({ hasText: /^Contacts$/ });
        this.firstNameInput = page.getByRole('textbox', { name: 'First Name' });
        this.lastNameInput = page.getByRole('textbox', { name: '*Last Name' });
        this.saveButton = page.getByRole('button', { name: 'Save', exact: true });
        this.deleteButton = page.getByRole('button', { name: 'Delete' });
        this.searchBox = page.getByRole('searchbox', { name: 'Search...' });
        this.searchBoxButton = page.getByRole('button', { name: 'Search' })
    }

    async navigateToContactsTab() {
        await this.page.getByRole('link', { name: 'Contacts' }).click();
        logger.info('Navigated to contacts tab');
    }
    async populateContactForm(firstName: string, lastName: string) {
        await this.newButton.click();
        await this.enterFirstName(firstName);
        await this.enterLastName(lastName);
        await this.clickSaveButton();
        logger.info(`${firstName} ${lastName} contact populated`);
    }
    async isContactsPageVisible() {
        await expect(this.contactsTitle).toBeVisible({ timeout: 5000 })
            .catch(error => {
                logger.error('Contacts page is not visible');
                throw error;
            })
            .then(() => logger.info('Contacts page is visible'));
    }
    async enterFirstName(firstName: string) {
        await this.firstNameInput.fill(firstName);
        logger.info(`${firstName} entered as Name`);
    }
    async enterLastName(lastName: string) {
        await this.lastNameInput.fill(lastName);
        logger.info(`${lastName} entered as Last Name`);
    }
    async clickSaveButton() {
        await this.saveButton.click();
        logger.info('Contact saved');
    }

    async expectContactLabelContainsFirstNameAndLastName(firstName: string, lastName: string) {
        const contactFullNameLabelLocator = this.page.getByText(`Contact "${firstName} ${lastName}" was created.`, { exact: true });
        await expect(contactFullNameLabelLocator).toContainText(`${firstName} ${lastName}`, { timeout: 5000 }).catch(error => {
            logger.error(`New contact created and ${firstName} ${lastName} is not visible`);
            throw error;
        }).then(() => logger.info(`New contact created and ${firstName} ${lastName} is visible`));
    }

    async searchContact(contactName: string) {
        await this.searchBoxButton.click();
        await this.searchBox.fill(contactName);
        await this.page.keyboard.press('Enter');
        await this.page.getByRole('link', { name: 'Ken Doe' }).first().click();

    }

}