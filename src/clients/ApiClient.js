import CarAPIController from "./controllers/CarAPIController.js";

export default class ApiClient {
    constructor(request) {
        this.cars = new CarAPIController(request);
    }
}