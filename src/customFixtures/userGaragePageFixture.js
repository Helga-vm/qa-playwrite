import {baseCustomFixture as base} from "./baseCustomeFixture.js";
import {GaragePage} from "../pageObjects/garage/GaragePage.js";

export const userGarageFixture = base.extend({
    page: async({browser},use) =>{
        const newCntx = await browser.newContext({
            storageState: 'state/existingUserStorageState.json'
        });
        const newPage = await newCntx.newPage();
        await use(newPage);
    },
    userGaragePage: async({page}, use) =>{
        const garagePage = new GaragePage(page);
        await garagePage.navigate();
        await use(garagePage);
    }
})