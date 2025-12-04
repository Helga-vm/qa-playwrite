import {test, expect} from "@playwright/test";
import { faker } from "@faker-js/faker";
import userEmails from "../../src/fixtures/userData/userEmails.json" with { type: "json" };
import userLastNames from "../../src/fixtures/userData/userLastNames.json" with { type: "json" };
import userNames from "../../src/fixtures/userData/userNames.json" with { type: "json" };
import userPasswords from "../../src/fixtures/userData/userPasswords.json" with { type: "json" };
import { beforeEach } from "node:test";


test.describe("Register new user - fields validation",async()=>{
    test.beforeEach(async({page})=>{
        await page.goto("/");
        const signUpBtn = page.getByRole('button',{name: 'Sign up'});
        await signUpBtn.click();
    });

    for (const {title,input,expected} of userNames){
        test("First name check: "+title, async({page})=>{
            const popup = page.locator(".modal-content");
            const firstNameFld = popup.locator("#signupName");
            const firstNameSection = firstNameFld.locator("..");
            
            await firstNameFld.fill(input.name);
            await firstNameFld.blur();

            if (expected.message!=="Valid"){
                await expect(firstNameSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText(expected.message);
            } else{
                await expect(firstNameSection.locator(".invalid-feedback"), "Error message should not exist").toHaveCount(0);
            }
        });
    }

    test("First name check: Empty field", async({page})=>{
        const popup = page.locator(".modal-content");
        const firstNameFld = popup.locator("#signupName");
        const firstNameSection = firstNameFld.locator("..");
        await firstNameFld.focus();
        await firstNameFld.blur();

        await expect(firstNameSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText("Name is required");
    });

    for (const {title,input,expected} of userLastNames){
        test("Last name check: "+title, async({page})=>{
            const popup = page.locator(".modal-content");
            const lastNameFld = popup.locator("#signupLastName");
            const lastNameSection = lastNameFld.locator("..");
            
            await lastNameFld.fill(input.lastName);
            await lastNameFld.blur();

            if (expected.message!=="Valid"){
                await expect(lastNameSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText(expected.message);
            } else{
                await expect(lastNameSection.locator(".invalid-feedback"), "Error message should not exist").toHaveCount(0);
            }
        });
    }

    test("Last name check: Empty field", async({page})=>{
        const popup = page.locator(".modal-content");
        const lastNameFld = popup.locator("#signupLastName");
        const lastNameSection = lastNameFld.locator("..");
        await lastNameFld.focus();
        await lastNameFld.blur();

        await expect(lastNameSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText("Last name is required");
    });

    for (const {title,input,expected} of userEmails){
        test("Email check: "+title, async({page})=>{
            const popup = page.locator(".modal-content");
            const emailFld = popup.locator("#signupEmail");
            const emailSection = emailFld.locator("..");
            
            await emailFld.fill(input.email);
            await emailFld.blur();

            if (expected.message!=="Valid"){
                await expect(emailSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText(expected.message);
            } else{
                await expect(emailSection.locator(".invalid-feedback"), "Error message should not exist").toHaveCount(0);
            }
        });
    }

    test("Email check: Empty field", async({page})=>{
        const popup = page.locator(".modal-content");
        const emailFld = popup.locator("#signupEmail");
        const emailSection = emailFld.locator("..");
        await emailFld.focus();
        await emailFld.blur();

        await expect(emailSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText("Email required");
    });

    for (const {title,input,expected} of userPasswords){
        test("Password check: "+title, async({page})=>{
            const popup = page.locator(".modal-content");
            const passwordFld = popup.locator("#signupPassword");
            const passwordSection = passwordFld.locator("..");
            
            await passwordFld.fill(input.password);
            await passwordFld.blur();

            if (expected.message!=="Valid"){
                await expect(passwordSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText(expected.message);
            } else{
                await expect(passwordSection.locator(".invalid-feedback"), "Error message should not exist").toHaveCount(0);
            }
        });
    }

    test("Password check: Empty field", async({page})=>{
        const popup = page.locator(".modal-content");
        const passwordFld = popup.locator("#signupPassword");
        const passwordSection = passwordFld.locator("..");
        await passwordFld.focus();
        await passwordFld.blur();

        await expect(passwordSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText("Password required");
    });

    for (const {title,input,expected} of userPasswords){
        test("Repeat password check: "+title, async({page})=>{
            const popup = page.locator(".modal-content");
            const rePasswordFld = popup.locator("#signupRepeatPassword");
            const rePasswordSection = rePasswordFld.locator("..");
            
            await rePasswordFld.fill(input.password);
            await rePasswordFld.blur();

            if (expected.message!=="Valid"){
                await expect(rePasswordSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText(expected.message);
            } else{
                await expect(rePasswordSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText("Passwords do not match");
            }
        });
    }

    test("Repeat password check: Empty field", async({page})=>{
        const popup = page.locator(".modal-content");
        const rePasswordFld = popup.locator("#signupRepeatPassword");
        const rePasswordSection = rePasswordFld.locator("..");
        await rePasswordFld.focus();
        await rePasswordFld.blur();

        await expect(rePasswordSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText("Re-enter password required");
    });

    for (const {title,input,expected} of userPasswords){
        if(expected.message === "Valid"){
            test("Invalid repeat check: "+title, async({page})=>{
                const popup = page.locator(".modal-content");
                const passwordFld = page.locator("#signupPassword");
                const rePasswordFld = popup.locator("#signupRepeatPassword");
                const rePasswordSection = rePasswordFld.locator("..");

                await passwordFld.fill(input.password);
                await passwordFld.blur();

                if(input.password.length===15){
                    await rePasswordFld.fill(input.password);
                    await page.keyboard.press('Backspace');
                }else {
                    await rePasswordFld.fill(input.password+faker.string.alphanumeric(1));
                }
                await rePasswordFld.blur();

                await expect(rePasswordSection.locator(".invalid-feedback"), "Error message text should match documented one").toContainText("Passwords do not match");

            });
        }
    }


});;

test.describe("Register new user -  valid form submitting", async()=>{
    const userData = {};

    test.beforeEach(async ({page})=>{
        const newPassword = `Qw1${faker.internet.password({length: faker.number.int({min:5,max:12}),pattern: /[A-Z+a-z+0-9+]/})}`;
        userData.name = faker.string.alpha({length:{min:2,max:20}});
        userData.lastName = faker.string.alpha({length:{min:2,max:20}});
        userData.email = `AQAOK${faker.internet.email()}`;
        userData.password = newPassword;
        userData.repeatPassword = newPassword;
        await page.goto("/");
        const signUpBtn = page.getByRole('button',{name: 'Sign up'});
        await signUpBtn.click();
    });

    test("Check if user with valid data can be registered",async({page})=>{
        const signupPopup = page.locator('.modal-content');
        const nameInput = signupPopup.locator('#signupName');
        const lastNameInput = signupPopup.locator('#signupLastName');
        const emailInput = signupPopup.locator('#signupEmail');
        const passwordInput = signupPopup.locator('#signupPassword');
        const repeatPasswordInput = signupPopup.locator('#signupRepeatPassword');
        const submitButton = signupPopup.locator('.btn-primary');
        
        await expect(nameInput).toBeVisible({timeout:7000});
        await nameInput.fill(userData.name);
        await lastNameInput.fill(userData.lastName);
        await emailInput.fill(userData.email);
        await passwordInput.fill(userData.password);
        await repeatPasswordInput.fill(userData.repeatPassword);
        await submitButton.click();

        await expect(page.getByText("Add car",{exact:true})).toBeVisible();

        await page.locator("#userNavDropdown").click();
        await page.getByRole("button",{name:"Logout"}).click();
        
        await page.getByRole("button",{name:"Sign in"}).click();
        const signinPopup = page.locator(".modal-content");
        await signinPopup.locator("#signinEmail").fill(userData.email);
        await signinPopup.locator("#signinPassword").fill(userData.password);
        const loginBtn = signinPopup.getByRole("button", {name:"Login"});
        await loginBtn.click();

        await expect(page.getByText("Add car",{exact:true})).toBeVisible();
    });
});