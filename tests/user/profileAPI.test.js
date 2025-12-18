import {userProfileFixture, expect} from "../../src/customFixtures/userProfileFixture.js";
import { request } from "@playwright/test";

userProfileFixture.describe("User profile", ()=>{
    userProfileFixture("Replace user profile data through API", async ({userProfilePage, page})=>{
        const mockedProfile = {
            "status": "ok",
            "data": {
                "userId": 300351,
                "photoFilename": "default-user.png",
                "name": "ChangedName123",
                "lastName": "ChangedLastName27"
                }
        };

        await userProfileFixture.step("Set interceptor", async ()=>{
            await userProfilePage.page.route("**/api/users/profile", async (route) =>{
                await route.fulfill({
                    status: 200,
                    body: JSON.stringify(mockedProfile)
                });
            });
        });
        await userProfileFixture.step("Reload profile", async ()=>{
            await userProfilePage.page.reload();
        });
        await userProfileFixture.step("Check if displayed data equals mocked data", async ()=>{
            await expect(userProfilePage.userFullNameLbl, "Displayed profile data should match mocked one").toHaveText(`${mockedProfile.data.name} ${mockedProfile.data.lastName}`);
        });
    });
});