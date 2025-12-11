import {expect, test as setup} from "@playwright/test";
import {HomePage} from "../../src/pageObjects/home/HomePage.js";
import { GaragePage } from "../../src/pageObjects/garage/GaragePage.js";

setup("Login as registered user", async ({page, context}) => {
    const userCredentials = {
        email: process.env.USER_CREDENTIALS_EMAIL ?? "",
        password: process.env.USER_CREDENTIALS_PASSWORD ?? ""
    }

    const homePage = new HomePage(page);
    await homePage.navigate();
    await homePage.signIn(userCredentials);

    const garagePage = new GaragePage(page);
    await expect(garagePage.addCarBtn).toHaveCount(1);

    await context.storageState({
        path: 'state/existingUserStorageState.json'
    })
})