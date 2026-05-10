import GarageService from '../utils/api/services/GarageService';
import { test, expect } from '../utils/fixtures/pagesFixtures';
import { getSidFromStorageState } from '../utils/storageState/StorageState';
let garageService: GarageService;

test.describe('Garage tests', () => {
    test.use({ storageState: '.states/testuser1.json' });

    test.beforeEach(async ({ app }) => {
        await app.garagePage.navigate();
        await app.garagePage.openAddCarForm();
    });

    test.describe('Adding cars', () => {
        test('Add new car - BMW X5', async ({ app }) => {
            await app.addCarForm.addNewCar('BMW', 'X5', '1000');
            await app.addCarForm.verifyCarIsAdded('BMW X5', '1000');
        });

        test('Add new car - Audi Q7', async ({ app }) => {
            await app.addCarForm.addNewCar('Audi', 'Q7', '999');
            await app.addCarForm.verifyCarIsAdded('Audi Q7', '999');
        });

        test.afterEach(async ({ request }) => {
            garageService = new GarageService(request);
            const sid = getSidFromStorageState('.states/testuser1.json');
            const allAddedCars = await garageService.getUserCars(sid);
            const lastAddedCarId = allAddedCars[0].id;
            await garageService.removeCar(sid, lastAddedCarId);
        });
    });
    test('Add new car without milleage', async ({ app }) => {
        await app.addCarForm.selectBrand('Audi');
        await app.addCarForm.selectModel('Q7');
        await expect(app.addCarForm.addButton).toBeDisabled();
    });

    test('Close "Add a car" form via Cancel button', async ({ app }) => {
        await app.addCarForm.clickCancelButton();
        await expect(app.addCarForm.formTitle).not.toBeVisible();
    });

    test('Close "Add a car" form via close icon', async ({ app }) => {
        await app.addCarForm.clickCloseIcon();
        await expect(app.addCarForm.formTitle).not.toBeVisible();
    });
});

