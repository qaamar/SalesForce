import { expect, test } from "../fixtures/my-fixtures";

test('Login test', async ({homePage }) => {
    await homePage.isHomePageVisible();
    expect(homePage.contactButton).toBeVisible();
});