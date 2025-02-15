import { Locator, Page, expect } from '@playwright/test';
import  ContactsPage from './ContactsPage';
import logger from '../utils/Logger';

export default class HomePage {
    readonly page: Page;
    readonly homeButton: Locator;
    readonly contactButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.homeButton = page.getByRole('link', { name: 'Home' });
        this.contactButton = page.getByRole('link', { name: 'Contacts' });
    }
    async isHomePageVisible() {
        await expect(this.homeButton).toBeVisible({ timeout: 15000 }).catch(error => {
            logger.error('Home page is not visible');
            throw error;
        }).then(() => logger.info('Home page is visible'));

    };

    async navigateToContactsTab() {
        await expect(this.contactButton).toBeVisible()
        await this.contactButton.click();
        logger.info('Navigated to contacts tab');
        const contactsPage = new ContactsPage(this.page);
        return contactsPage;

    }

}
