import { BasicPage } from "../BasicPage.js";

export class GaragePage extends BasicPage{
    constructor(page){
        super(page,"/panel/garage");
        this.myProfileMenu = page.locator("#userNavDropdown");
    }

    async logout(){
        await this.myProfileMenu.click();
        await this.page.getByRole("button",{name:"Logout"}).click();
    }
}