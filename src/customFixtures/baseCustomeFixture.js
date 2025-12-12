import {test as base, expect as baseExpect} from "@playwright/test";
import {HomePage} from "../pageObjects/home/HomePage.js";

export const baseCustomFixture = base.extend({
    homePage: async ({page},use) =>{
        const homePage = new HomePage(page);
        await homePage.navigate();
        await use(homePage);
    },
});

export const expect = baseExpect;