import { BasicPage } from "../BasicPage.js";
import {AddCarModule} from "./AddCarModule.js";
import { CarTile } from "./CarTile.js";

export class GaragePage extends BasicPage{
    _carTileSelector = ".jumbotron";

    constructor(page){
        super(page,"/panel/garage");
        this.myProfileMenu = page.locator("#userNavDropdown");
        this.logoutBtn = this.page.getByRole("button",{name:"Logout"});
        this.addCarBtn = this.page.getByText("Add car",{exact:true});
        this.profileTab = this.page.getByRole('link', { name: 'Profile' });
    }

    async logout(){
        await this.myProfileMenu.click();
        await this.logoutBtn.click();
    }

    async openCreateCarModule(){
        await this.addCarBtn.click();
        return new AddCarModule(this.page);
    }

    async createBasicCar({mileage}){
        const createCarPopup = await this.openCreateCarModule();
        await createCarPopup.createBasicCar({mileage});
    }

    async createCarByBrandModelIds({carBrandId, carModelId, mileage}){
        const createCarPopup = await this.openCreateCarModule();
        await createCarPopup.createCarByIds({carBrandId, carModelId, mileage});
    }

    async createCarByBrandModelName({brand, model, mileage}){
        const createCarPopup = await this.openCreateCarModule();
        await createCarPopup.createCarByName({brand, model, mileage});
    }

    async getCarTileByBrandModel({brand,model}){
        const carTileContainer = this.page.locator(this._carTileSelector, {hasText: brand})
            .filter({hasText: model}).nth(0);
        return new CarTile(this.page, carTileContainer);
    }
}