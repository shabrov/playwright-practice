import test, { expect } from "@playwright/test";
import { testUser1 } from '../../test-data/credentials/user-data';
import GarageService from "../../utils/api/services/GarageService";
import AuthService from "../../utils/api/services/AuthService";
import { generateNewCar } from "../../utils/api/factories/cars.factory";

let garageService: GarageService;
let authService: AuthService;

let sid: string;

test.describe('Removing cars', () => {
    test.beforeEach(({ request }) => {
        garageService = new GarageService(request);
        authService = new AuthService(request);
    })

    test.beforeAll(async ({ request }) => {
        authService = new AuthService(request);

        sid = await authService.getAuthCookie(testUser1.email, testUser1.password);
    })

    let carToRemoveId: string;

    test.beforeAll(async ({ request }) => {
        garageService = new GarageService(request);

        const newCar = generateNewCar(1, 1, 123);

        const addedCar = await garageService.addCar(sid, newCar);
        carToRemoveId = addedCar.id;
    })

    test('Remove a car', async () => {
        const response = await garageService.removeCar(sid, carToRemoveId);

        expect(response.status()).toBe(200);
    })

    test('Remove a car with invalid id', async () => {
        const response = await garageService.removeCar(sid, '5325325325', true);

        const responseJson = await response.json();

        expect(response.status()).toBe(404);
        expect(responseJson.message).toBe('Car not found');
    })

})