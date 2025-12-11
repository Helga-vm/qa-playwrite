import { expect } from "@playwright/test";
import { userGarageFixture} from "../../src/customFixtures/userGaragePageFixture.js";
import { faker } from "@faker-js/faker";


userGarageFixture.describe.only("Create a car", ()=>{
    const carData = {
            brand: 'Porsche',
            model: 'Panamera'
        };

    userGarageFixture.beforeEach(()=>{
        carData.mileage = faker.number.int({min: 1, max: 9999}).toString();
    });

    userGarageFixture("Create a car without selecting brand and model using custome fixtures", async ({userGaragePage})=>{
        await userGarageFixture.step("Create the car", async()=>{
            await userGaragePage.createBasicCar(carData);
        });

        await userGarageFixture.step("Verify created car data", async ()=>{
            const createdCarTile = await userGaragePage.getCarTileByBrandModel({brand: 'Audi', model: 'TT'});
            await expect(createdCarTile.updateMileageInput, "Car current mileage should be equal to entered one").toHaveValue(carData.mileage);
        });
    });

    userGarageFixture("Create car with selecting brand and model using custome fixtures", async ({userGaragePage})=>{
        await userGarageFixture.step("Create the car", async()=>{
            await userGaragePage.createCarByBrandModelName(carData);
        });

        await userGarageFixture.step("Verify created car data", async ()=>{
            const createdCarTile = await userGaragePage.getCarTileByBrandModel(carData);
            await expect(createdCarTile.updateMileageInput, "Car current mileage should be equal to entered one").toHaveValue(carData.mileage);
        });
    });
});