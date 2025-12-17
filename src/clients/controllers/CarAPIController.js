import BasicController from "./BasicController.js";

export default class CarAPIController extends BasicController{
    _CAR_BRANDS_PATH = '/api/cars/brands';
    _CAR_MODELS_PATH = '/api/cars/models';
    _CAR_PATH = '/api/cars';

    constructor(request) {
        super(request);
    }

    getCarBrands() {
        return this.request.get(this._CAR_BRANDS_PATH);
    }

    getCarModels() {
        return this.request.get(this._CAR_MODELS_PATH);
    }

    getCarModelsByBrand({carBrandId}){
        return this.request.get(`${this._CAR_MODELS_PATH}?carBrandId=${carBrandId}`);
    }

    createCar({carBrandId, carModelId, mileage}) {
        return this.request.post(this._CAR_PATH, {
            data: {carBrandId,carModelId,mileage}
        });
    }

    getCarById({id}){
        return this.request.get(this._CAR_PATH+"/"+id);
    }
}