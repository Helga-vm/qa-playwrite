import {test, expect} from "@playwright/test";
import { faker } from "@faker-js/faker";
import userEmails from "../../src/fixtures/userData/userEmails.json" with { type: "json" };
import userLastNames from "../../src/fixtures/userData/userLastNames.json" with { type: "json" };
import userNames from "../../src/fixtures/userData/userNames.json" with { type: "json" };
import userPasswords from "../../src/fixtures/userData/userPasswords.json" with { type: "json" };
import { HomePage } from "../../src/pageObjects/home/HomePage";
import { GaragePage } from "../../src/pageObjects/garage/GaragePage";


test.describe("Register new user - fields validation",async()=>{
    let homePage;

    test.beforeEach(async({page})=>{
        homePage = new HomePage(page);
        await homePage.navigate();
    });

    for (const {title,input,expected} of userNames){
        test("First name check: "+title, async({page})=>{
            const signUpPopup = await homePage.openSingUpModule();
            await signUpPopup.nameFld.fill(input.name);
            await signUpPopup.nameFld.blur();

            if (expected.message!=="Valid"){
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText(expected.message);
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator)).toHaveCSS('color', 'rgb(220, 53, 69)');
                await expect(signUpPopup.nameFld).toHaveCSS('border-color','rgb(220, 53, 69)');
            } else{
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message should not exist").toHaveCount(0);
                await expect(signUpPopup.nameFld).not.toHaveCSS('border-color','rgb(220, 53, 69)');
            }
        });
    }

    test("First name check: Empty field", async({page})=>{
        const signUpPopup = await homePage.openSingUpModule();
        await signUpPopup.nameFld.focus();
        await signUpPopup.nameFld.blur();

        await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText("Name is required");
        await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator)).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(signUpPopup.nameFld).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    for (const {title,input,expected} of userLastNames){
        test("Last name check: "+title, async({page})=>{
            const signUpPopup = await homePage.openSingUpModule();
            
            await signUpPopup.lastNameFld.fill(input.lastName);
            await signUpPopup.lastNameFld.blur();

            if (expected.message!=="Valid"){
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText(expected.message);
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator)).toHaveCSS('color', 'rgb(220, 53, 69)');
                await expect(signUpPopup.lastNameFld).toHaveCSS('border-color','rgb(220, 53, 69)');
            } else{
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message should not exist").toHaveCount(0);
                await expect(signUpPopup.lastNameFld).not.toHaveCSS('border-color','rgb(220, 53, 69)');
            }
        });
    }

    test("Last name check: Empty field", async({page})=>{
        const signUpPopup = await homePage.openSingUpModule();
        await signUpPopup.lastNameFld.focus();
        await signUpPopup.lastNameFld.blur();

        await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText("Last name is required");
        await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator)).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(signUpPopup.lastNameFld).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    for (const {title,input,expected} of userEmails){
        test("Email check: "+title, async({page})=>{
            const signUpPopup = await homePage.openSingUpModule();            
            await signUpPopup.emailFld.fill(input.email);
            await signUpPopup.emailFld.blur();

            if (expected.message!=="Valid"){
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText(expected.message);
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator)).toHaveCSS('color', 'rgb(220, 53, 69)');
                await expect(signUpPopup.emailFld).toHaveCSS('border-color','rgb(220, 53, 69)');
            } else{
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message should not exist").toHaveCount(0);
                await expect(signUpPopup.emailFld).not.toHaveCSS('border-color','rgb(220, 53, 69)');
            }
        });
    }

    test("Email check: Empty field", async({page})=>{
        const signUpPopup = await homePage.openSingUpModule();            
        await signUpPopup.emailFld.focus();
        await signUpPopup.emailFld.blur();
        
        await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText("Email required");
        await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator)).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(signUpPopup.emailFld).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    for (const {title,input,expected} of userPasswords){
        test("Password check: "+title, async({page})=>{
            const signUpPopup = await homePage.openSingUpModule();            
            await signUpPopup.passwordFld.fill(input.password);
            await signUpPopup.passwordFld.blur();

            if (expected.message!=="Valid"){
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText(expected.message);
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator)).toHaveCSS('color', 'rgb(220, 53, 69)');
                await expect(signUpPopup.passwordFld).toHaveCSS('border-color','rgb(220, 53, 69)');
            } else{
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message should not exist").toHaveCount(0);
                await expect(signUpPopup.passwordFld).not.toHaveCSS('border-color','rgb(220, 53, 69)');
            }
        });
    }

    test("Password check: Empty field", async({page})=>{
        const signUpPopup = await homePage.openSingUpModule();            
        await signUpPopup.passwordFld.focus();
        await signUpPopup.passwordFld.blur();

        await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText("Password required");
        await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator)).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(signUpPopup.passwordFld).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    for (const {title,input,expected} of userPasswords){
        test("Repeat password check: "+title, async({page})=>{
            const signUpPopup = await homePage.openSingUpModule();            
            await signUpPopup.repeatPasswordFld.fill(input.password);
            await signUpPopup.repeatPasswordFld.blur();

            if (expected.message!=="Valid"){
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText(expected.message);
            } else{
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText("Passwords do not match");
            }
            await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator)).toHaveCSS('color', 'rgb(220, 53, 69)');
            await expect(signUpPopup.repeatPasswordFld).toHaveCSS('border-color','rgb(220, 53, 69)');
        });
    }

    test("Repeat password check: Empty field", async({page})=>{
        const signUpPopup = await homePage.openSingUpModule();            
        await signUpPopup.repeatPasswordFld.focus();
        await signUpPopup.repeatPasswordFld.blur();

        await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText("Re-enter password required");
        await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator)).toHaveCSS('color', 'rgb(220, 53, 69)');
        await expect(signUpPopup.repeatPasswordFld).toHaveCSS('border-color','rgb(220, 53, 69)');
    });

    for (const {title,input,expected} of userPasswords){
        if(expected.message === "Valid"){
            test("Invalid repeat check: "+title, async({page})=>{
                const signUpPopup = await homePage.openSingUpModule();            
                await signUpPopup.passwordFld.fill(input.password);
                await signUpPopup.passwordFld.blur();

                if(input.password.length===15){
                    await signUpPopup.repeatPasswordFld.fill(input.password);
                    await page.keyboard.press('Backspace');
                }else {
                    await signUpPopup.repeatPasswordFld.fill(input.password+faker.string.alphanumeric(1));
                }
                await signUpPopup.repeatPasswordFld.blur();

                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator), "Error message text should match documented one").toContainText("Passwords do not match");
                await expect(signUpPopup.container.locator(signUpPopup.errorTextLocator)).toHaveCSS('color', 'rgb(220, 53, 69)');
                await expect(signUpPopup.repeatPasswordFld).toHaveCSS('border-color','rgb(220, 53, 69)');
                await expect(signUpPopup.passwordFld).not.toHaveCSS('border-color','rgb(220, 53, 69)');
            });
        }
    }


});;

test.describe("Register new user -  valid form submitting", async()=>{
    const userData = {};
    let homePage;
    let garagePage;

    test.beforeEach(async ({page})=>{
        const newPassword = `Qw1${faker.internet.password({length: faker.number.int({min:5,max:12}),pattern: /[A-Z+a-z+0-9+]/})}`;
        userData.name = faker.string.alpha({length:{min:2,max:20}});
        userData.lastName = faker.string.alpha({length:{min:2,max:20}});
        userData.email = `AQAOK${faker.internet.email()}`;
        userData.password = newPassword;
        userData.repeatPassword = newPassword;
        
        homePage = new HomePage(page);
        garagePage = new GaragePage(page);
        await homePage.navigate();
    });

    test("Check if user with valid data can be registered",async({page})=>{
        await homePage.signUp(userData);
        await expect(page.getByText("Add car",{exact:true})).toBeVisible();

        await garagePage.logout();
        
        await homePage.signIn(userData);
        await expect(page.getByText("Add car",{exact:true})).toBeVisible();
    });
});