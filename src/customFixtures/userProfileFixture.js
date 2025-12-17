import {baseCustomFixture as base, expect as baseExpect} from "./baseCustomeFixture.js";
import {GaragePage} from "../pageObjects/garage/GaragePage.js";
import ApiClient from "../clients/ApiClient.js";
import {request as pwRequest} from "@playwright/test";
import ProfilePage from "../pageObjects/user/ProfilePage.js";

export const userProfileFixture = base.extend({
    page: async({browser},use) =>{
        const newCntx = await browser.newContext({
            storageState: 'state/existingUserStorageState.json'
        });
        const newPage = await newCntx.newPage();
        await use(newPage);
    },
    request: async ({}, use)=> {
        const newCntx = await pwRequest.newContext({
            storageState: 'state/existingUserStorageState.json'
        });
        await use(newCntx);
    },
    apiClient: async ({request}, use)=> {
        const apiClient = new ApiClient(request);
        await use(apiClient);
    },
    userProfilePage: async({page}, use) =>{
        const profilePage = new ProfilePage(page);
        await profilePage.navigate();
        await use(profilePage);
    }
});

export const expect = baseExpect;