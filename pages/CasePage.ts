import { Locator, Page, expect } from "@playwright/test";
import logger from "../utils/Logger.ts";

export default class CasePage {
    private readonly page: Page;
    private readonly caseLink: Locator;
    private readonly newButtonLocator: Locator;
    private readonly caseOriginDropdownLocator: Locator;
    private readonly caseProductDropdownLocator: Locator;
    private readonly caseTypeDropdownLocator: Locator;
    private readonly saveButtonLocator: Locator;
    private readonly contactFullNameLabelLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.caseLink = page.getByLabel('Cases', { exact: true }).getByRole('button', { name: 'New' });
        this.newButtonLocator = page.getByLabel('Cases', { exact: true }).getByRole('button', { name: 'New' });
        this.caseOriginDropdownLocator = page.getByRole('combobox', { name: 'Case Origin' });
        //this.caseProductDropdownLocator = 'Case Product';
        this.caseTypeDropdownLocator = page.getByRole('combobox', { name: 'Type' });
        this.saveButtonLocator = page.getByRole('button', { name: 'Save', exact: true });
    }

    async createNewCaseFromContactDetailPage(caseOrigin: string, productName: string, caseType: string) {

        //test should be in Contact Detail page
        await this.newButtonLocator.click();
        await this.caseOriginDropdownLocator.click();
        await this.page
            .getByRole("option", { name: caseOrigin })
            .locator("span")
            .nth(1)
            .click();
        // await this.page.getByLabel(this.caseProductDropdownLocator).click();
        // await this.page
        //     .getByRole("option", { name: productName })
        //     .locator("span")
        //     .nth(1)
        //     .click();
        await this.caseTypeDropdownLocator.click();
        await this.page
            .getByRole("option", { name: caseType })
            .locator("span")
            .nth(1)
            .click();
        await this.saveButtonLocator.click();
        logger.info('Case created for contact');
    }
}