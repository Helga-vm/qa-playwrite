import { BasicPage } from "../BasicPage.js";

export class GaragePage extends BasicPage{
    constructor(page){
        super(page,"/panel/garage");
        this.myProfileMenu = page.locator("#userNavDropdown");
        this.logoutBtn = this.page.getByRole("button",{name:"Logout"});
        this.addCarBtn = this.page.getByText("Add car",{exact:true});
    }

    async logout(){
        await this.myProfileMenu.click();
        await this.logoutBtn.click();
    }
}