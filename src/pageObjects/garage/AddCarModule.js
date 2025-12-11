import { BasicModule } from "../BasicModule.js";


export class AddCarModule extends BasicModule{
    constructor(page){
        super(page);
        this.container = page.locator(".modal-content");
        this.brandSelect = this.container.locator("#addCarBrand");
        this.modelSelect = this.container.locator("#addCarModel");
        this.mileageFld = this.container.locator("#addCarMileage");
        this.addBtn = this.container.getByRole("button",{"name":"Add"});
    }

    async fillFormById({carBrandId, carModelId, mileage}){
        await this.brandSelect.selectOption(`${carBrandId-1}: ${carBrandId}`);
        await this.modelSelect.selectOption(`${carModelId-1}: ${carModelId}`);
        await this.mileageFld.fill(mileage);
    }

    async fillFormByName({brand, model, mileage}){
        await this.brandSelect.selectOption(brand);
        await this.modelSelect.selectOption(model);
        await this.mileageFld.fill(mileage);
    }

    async createBasicCar({mileage}){
        await this.mileageFld.fill(mileage);
        await this.addBtn.click();
    }

    async createCarByIds({carBrandId,carModelId,mileage}){
        await this.fillFormById({carBrandId,carModelId,mileage});
        await this.addBtn.click();
    }

    async createCarByName({brand, model, mileage}){
        await this.fillFormByName({brand, model, mileage});
        await this.addBtn.click();
    }
}