import { BasicPage } from "../BasicPage.js";


export default class ProfilePage extends BasicPage {
    _profileContainerSelector = "div.main";

    constructor(page){
        super(page,"/panel/profile");
        this.container = page.locator(this._profileContainerSelector);
        this.userPicture = this.container.getByAltText("User photo");
        this.userFullNameLbl = this.container.locator("p.profile_name");
        this.profileTab = this.page.getByRole('link', { name: 'Profile' });
    }
}