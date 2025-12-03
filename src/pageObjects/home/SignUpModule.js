import { BasicModule } from "../BasicModule.js";
import { expect } from "@playwright/test";

export class SignUpModule extends BasicModule{
    errorTextLocator = '.invalid-feedback';

    constructor(page){
        super(page);
        this.container = page.locator(".modal-content");
        this.nameFld = this.container.locator('#signupName');
        this.lastNameFld = this.container.locator('#signupLastName');
        this.emailFld = this.container.locator('#signupEmail');
        this.passwordFld = this.container.locator('#signupPassword');
        this.repeatPasswordFld = this.container.locator('#signupRepeatPassword');
        this.submitBtn = this.container.locator('.btn-primary');
    }

    async fillForm({name, lastName, email, password, repeatPassword}){
        await this.nameFld.fill(name);
        await this.lastNameFld.fill(lastName);
        await this.emailFld.fill(email);
        await this.passwordFld.fill(password);
        await this.repeatPasswordFld.fill(repeatPassword);
    }

    async signUp({name,lastName,email,password,repeatPassword}){
        await this.fillForm({name, lastName,email,password,repeatPassword});
        await expect(this.submitBtn).not.toBeDisabled();
        await this.submitBtn.click();
    }
}