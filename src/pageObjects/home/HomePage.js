import { BasicPage } from "../BasicPage.js";
import { SignInModule } from "./SignInModule.js";
import { SignUpModule } from "./SignUpModule.js";

export class HomePage extends BasicPage{
    constructor(page){
        super(page,"/");
        this.signUpBtn = page.getByRole("button",{name:"Sign up"});
        this.signInBtn = page.getByRole("button",{name:"Sign in"});
    }

    async openSingUpModule(){
        await this.signUpBtn.click();
        return new SignUpModule(this.page);
    }

    async signUp({name,lastName,email,password,repeatPassword}){
        const signUpPopup = await this.openSingUpModule();
        await signUpPopup.signUp({name,lastName,email,password,repeatPassword});
    }

    async openSignInModule(){
        await this.signInBtn.click();
        return new SignInModule(this.page);
    }

    async signIn({email, password}){
        const signInPopup = await this.openSignInModule();
        await signInPopup.signIn({email, password});
    }
}