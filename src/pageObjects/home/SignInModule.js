import { BasicModule } from "../BasicModule";
//import { expect } from "@playwright/test";

export class SignInModule extends BasicModule{
    constructor(page){
        super(page);
        this.container = page.locator(".modal-content");
        this.emailFld = this.container.locator("#signinEmail");
        this.passwordFld = this.container.locator("#signinPassword");
        this.loginBtn = this.container.getByRole('button', {name: 'Login'});
    }

    async fillForm({email,password}){
        await this.emailFld.fill(email);
        await this.passwordFld.fill(password);
    }

    async signIn({email,password}){
        await this.fillForm({email,password});
        await this.loginBtn.click();
    }

}