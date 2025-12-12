import { BasicModule } from "../BasicModule.js";


export class CarTile extends BasicModule{
    constructor(page,container){
        super(page);
        this.tileContainer = container;
        this.updateMileageInput = this.tileContainer.locator('[name="miles"]');
    }
}