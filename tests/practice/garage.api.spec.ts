import { test, expect, request } from '@playwright/test';
import { testUser1 } from '../../test-data/credentials/user-data';
import GarageService from '../../utils/api/services/GarageService';
import AuthService from '../../utils/api/services/AuthService';
import { generateNewCar } from '../../utils/api/factories/cars.factory';

let garageService: GarageService;
let authService: AuthService;

test.beforeEach(({ request }) => {
    garageService = new GarageService(request);
    authService = new AuthService(request);
});

test.describe('Get brands and models', () => {
    test('Get all brands', async () => {
        const brands = await garageService.getAllBrands();
        expect(brands).toHaveLength(5);
    });

    test('Get all models', async () => {
        const models = await garageService.getAllModels();
        expect(models).toHaveLength(23);
    });

    test('Get model by id', async () => {
        const model = await garageService.getModel(2);
        expect(model.carBrandId).toBe(1);
        expect(model.title).toBe('R8');
    });

    test('Get model invalid id', async () => {
        const response = await garageService.getModel(777, false);
        const responseJson = await response.json();

        expect(response.status()).toBe(404);
        expect(responseJson.message).toBe('No car models found with this id');
    });
});

test.describe('Private requests', () => {
    let sid: string;

    test.beforeAll(async ({ request }) => {
        authService = new AuthService(request);
        sid = await authService.getAuthCookie(
            testUser1.email,
            testUser1.password,
        );
    });

    test.describe('Removing cars', () => {
        let carToRemoveId: string;

        test.beforeAll(async ({ request }) => {
            garageService = new GarageService(request);

            const newCar = generateNewCar(1, 1, 122);
            const addedCar = await garageService.addCar(sid, newCar);
            carToRemoveId = addedCar.id;
        });

        test('Remove car', async () => {
            const response = await garageService.removeCar(sid, carToRemoveId);

            expect(response.status()).toBe(200);
        });

        test('Remove a car with invalid id', async () => {
            const response = await garageService.removeCar(sid, '5325325325');
            const responseJson = await response.json();

            expect(response.status()).toBe(404);
            expect(responseJson.message).toBe('Car not found');
        });
    });

    test.describe('Adding new cars', () => {
        let carsToRemove: string[] = [];

        test('Add new car - Ford Fiesta', async () => {
            const newCar = generateNewCar(3, 11, 555);
            const carData = await garageService.addCar(sid, newCar);

            expect(carData.brand).toBe('Ford');
            expect(carData.model).toBe('Fiesta');
            expect(carData.initialMileage).toBe(newCar.mileage);
            expect(carData.id).toBeDefined();

            carsToRemove.push(carData.id);
        });

        test('Add new car - Audi TT', async () => {
            const newCar = generateNewCar(1, 1, 777);
            const carData = await garageService.addCar(sid, newCar);

            expect(carData.brand).toBe('Audi');
            expect(carData.model).toBe('TT');
            expect(carData.initialMileage).toBe(newCar.mileage);
            expect(carData.id).toBeDefined();

            carsToRemove.push(carData.id);
        });

        test.afterAll(async ({ request }) => {
            const garageService = new GarageService(request);

            for (const id of carsToRemove) {
                await garageService.removeCar(sid, id);
            }
        });
    });
});
