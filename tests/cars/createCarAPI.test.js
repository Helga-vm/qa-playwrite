import { userGarageFixture, expect } from "../../src/customFixtures/userGaragePageFixture.js";
import brands from "../../src/fixtures/cars/carBrands.json" with { type: "json" };
import models from "../../src/fixtures/cars/carModels.json" with {type: "json"};
import { faker } from "@faker-js/faker";


userGarageFixture.describe("Cars API checks positive", ()=>{
    
    userGarageFixture("Get brands @api", async ({request})=>{
        const expectedBrandsResp = {"status":"ok","data":[{"id":1,"title":"Audi","logoFilename":"audi.png"},{"id":2,"title":"BMW","logoFilename":"bmw.png"},{"id":3,"title":"Ford","logoFilename":"ford.png"},{"id":4,"title":"Porsche","logoFilename":"porsche.png"},{"id":5,"title":"Fiat","logoFilename":"fiat.png"}]};
        await userGarageFixture.step("Get brands", async ()=>{
            const getBrandsResp = await request.get("/api/cars/brands");
            const body = await getBrandsResp.json();
            expect(body, "Returned brands should be equal to example data").toEqual(expectedBrandsResp);
        });
    });

    userGarageFixture("Create a car with API @api", async ({request})=>{
        const carData = {};
        await userGarageFixture.step("Set car data from jsons", async ()=>{
            carData.carBrandId = brands[faker.number.int({min:0, max: brands.length-1})].id;
            const modelsByBrand = models.filter((model)=>model.carBrandId === carData.carBrandId);
            carData.carModelId = modelsByBrand[faker.number.int({min:0, max: modelsByBrand.length-1})].id;
            carData.mileage = faker.number.int({min:1, max:9999});
        });

        await userGarageFixture.step("Create a car with valid car data", async () =>{
            const createCarResp = await request.post("/api/cars", {data:carData});
            await expect(createCarResp.status()).toEqual(201);
            const createdCarRespBody = await createCarResp.json();
            await expect(createdCarRespBody.status, "In-responce status should be 'ok'").toEqual("ok");
            await expect(createdCarRespBody.data.carBrandId, "Brand id should eq input data").toEqual(carData.carBrandId);
            await expect(createdCarRespBody.data.carModelId, "Model id should eq input data").toEqual(carData.carModelId);
            await expect(createdCarRespBody.data.mileage, "Mileage should eq input data").toEqual(carData.mileage);
            await expect(createdCarRespBody.data.initialMileage, "Initial mileage should eq input data").toEqual(carData.mileage);
            carData.id = await createdCarRespBody.data.id;
        });

        await userGarageFixture.step("Check if created car data can be retrieved", async()=>{
            const getCarResp = await request.get(`/api/cars/${carData.id}`);
            await expect(getCarResp.status(), "Car should exist").toEqual(200);
            const retrievedCarBody = await getCarResp.json();

            await expect(retrievedCarBody.status, "In-responce status should be 'ok'").toEqual("ok");
            await expect(retrievedCarBody.data.id, "Car id should eq test data").toEqual(carData.id);
            await expect(retrievedCarBody.data.carBrandId, "Brand id should eq test data").toEqual(carData.carBrandId);
            await expect(retrievedCarBody.data.carModelId, "Model id should eq test data").toEqual(carData.carModelId);
            await expect(retrievedCarBody.data.mileage, "Mileage should eq test data").toEqual(carData.mileage);
            await expect(retrievedCarBody.data.initialMileage, "Initial mileage should eq test data").toEqual(carData.mileage);

        })

    });

    userGarageFixture("Create a car with API through controllers @api", async ({apiClient})=>{
        const carData = {};
        await userGarageFixture.step("Set input car data through API", async ()=>{
            const brandsResp = await apiClient.cars.getCarBrands();
            const brandsRespBody = await brandsResp.json();
            const brandsApi = await brandsRespBody.data;
            carData.carBrandId = await brandsApi[faker.number.int({min:0, max: brandsApi.length-1})].id;
            const modelsByBrandResp = await apiClient.cars.getCarModelsByBrand(carData);
            const modelsByBrandRespBody = await modelsByBrandResp.json();
            const modelsByBrandApi = await modelsByBrandRespBody.data;
            carData.carModelId = await modelsByBrandApi[faker.number.int({min:0, max: modelsByBrandApi.length-1})].id;
            carData.mileage = faker.number.int({min:1, max:9999});
        });

        await userGarageFixture.step("Create a car with car data through controller", async () =>{
            const createCarResp = await apiClient.cars.createCar(carData);
            await expect(createCarResp.status(), "Car responce status should be 201 Created").toEqual(201);
            const createdCarRespBody = await createCarResp.json();
            await expect(createdCarRespBody.status, "In-responce status should be 'ok'").toEqual("ok");
            await expect(createdCarRespBody.data.carBrandId, "Brand id should eq input data").toEqual(carData.carBrandId);
            await expect(createdCarRespBody.data.carModelId, "Model id should eq input data").toEqual(carData.carModelId);
            await expect(createdCarRespBody.data.mileage, "Mileage should eq input data").toEqual(carData.mileage);
            await expect(createdCarRespBody.data.initialMileage, "Initial mileage should eq input data").toEqual(carData.mileage);
            carData.id = await createdCarRespBody.data.id;
        });

        await userGarageFixture.step("Check if created car data can be retrieved", async()=>{
            const getCarResp = await apiClient.cars.getCarById(carData);
            await expect(getCarResp.status(), "Car should exist").toEqual(200);
            const retrievedCarBody = await getCarResp.json();

            await expect(retrievedCarBody.status, "In-responce status should be 'ok'").toEqual("ok");
            await expect(retrievedCarBody.data.id, "Car id should eq test data").toEqual(carData.id);
            await expect(retrievedCarBody.data.carBrandId, "Brand id should eq test data").toEqual(carData.carBrandId);
            await expect(retrievedCarBody.data.carModelId, "Model id should eq test data").toEqual(carData.carModelId);
            await expect(retrievedCarBody.data.mileage, "Mileage should eq test data").toEqual(carData.mileage);
            await expect(retrievedCarBody.data.initialMileage, "Initial mileage should eq test data").toEqual(carData.mileage);

        })

    });
});

userGarageFixture.describe("Car API checks negative",()=>{
    userGarageFixture("Check that car cannot be created with non-existing brand @api", async ({apiClient})=>{
        const carData ={};
        await userGarageFixture.step("Set input car data through API", async()=>{
            const brandsResp = await apiClient.cars.getCarBrands();
            const brandsRespBody = await brandsResp.json();
            const brandsApi = await brandsRespBody.data;
            carData.carBrandId = await brandsApi[brandsApi.length-1].id+1;
            const modelsResp = await apiClient.cars.getCarModels();
            const modelsRespBody = await modelsResp.json();
            const modelsApi = await modelsRespBody.data;
            carData.carModelId = await modelsApi[faker.number.int({min:0, max: modelsApi.length-1})].id;
            carData.mileage = faker.number.int({min:1, max:9999});
        });

        await userGarageFixture.step("Try creating car with invalid brand", async()=>{
            const createCarResp = await apiClient.cars.createCar(carData);
            await expect(createCarResp.status()).toEqual(404);
            const respBody = await createCarResp.json();
            await expect(respBody.status).toEqual("error");
        });
    });

    userGarageFixture("Check that car cannot be created with model of different brand @api", async ({apiClient})=>{
        const carData ={};
        await userGarageFixture.step("Set input car data through API", async()=>{
            const brandsResp = await apiClient.cars.getCarBrands();
            const brandsRespBody = await brandsResp.json();
            const brandsApi = await brandsRespBody.data;
            carData.carBrandId = await brandsApi[brandsApi.length-1].id;
            const modelsResp = await apiClient.cars.getCarModels();
            const modelsRespBody = await modelsResp.json();
            const modelsApi = await modelsRespBody.data.filter((model)=>model.carBrandId!==carData.carBrandId);
            carData.carModelId = await modelsApi[faker.number.int({min:0, max: modelsApi.length-1})].id;
            carData.mileage = faker.number.int({min:1, max:9999});
        });

        await userGarageFixture.step("Try creating car with model of different brand", async()=>{
            const createCarResp = await apiClient.cars.createCar(carData);
            await expect(createCarResp.status()).toEqual(404);
            const respBody = await createCarResp.json();
            await expect(respBody.status).toEqual("error");
        });
    });
});