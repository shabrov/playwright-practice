import { generateExpenseData } from "../utils/api/factories/expense.factory";
import GarageService from "../utils/api/services/GarageService";
import { expect, test } from "../utils/fixtures/pagesFixtures";
import { getSidFromStorageState } from "../utils/storageState/StorageState";
import { faker } from '@faker-js/faker';

test.describe('Fuel expenses tests', () => {

    let garageService: GarageService;
    let car = { carBrandId: 1, carModelId: 1, mileage: 999 };

    test.use({ storageState: '.states/testuser2.json' })

    test.beforeEach(async({ request }) => {
        garageService = new GarageService(request);
        const sid = getSidFromStorageState('.states/testuser2.json');
        await garageService.addCar(sid, car);
    })

    test('Correct adding of expense with valid data', async({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData();
        const date = new Date().toISOString();
        const dateList = date.split('T')[0].split('-');
        const currentDate = `${dateList[2]}.${dateList[1]}.${dateList[0]}`;

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.addNewExpense(mileage, numberOfLiters, totalCost);
        await app.expensesPage.verifyLastExpense(currentDate, mileage, numberOfLiters, totalCost);
    });

    test('Validation - future date', async({ app }) => {
        const randomFutureDate = faker.date.soon({days: 5}).toISOString();
        const dateList = randomFutureDate.split('T')[0].split('-');
        const futureDate = `${dateList[2]}.${dateList[1]}.${dateList[0]}`;

        const { mileage, numberOfLiters, totalCost } = generateExpenseData();

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.addNewExpense(mileage, numberOfLiters, totalCost, undefined, futureDate);
        await expect(app.addExpenseForm.futureDateErrorMessage).toBeVisible();
    });

    test('Validation - adding expense with current number of mileage', async({ app }) => {
        const { numberOfLiters, totalCost } = generateExpenseData();

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.addNewExpense(String(car.mileage), numberOfLiters, totalCost);
        await expect(app.addExpenseForm.lessOrEqualMileageErrorMessage).toBeVisible();
    });

    test('Validation - zero or negative number of liters', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ litersMin: -10, litersMax: 0 });

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);

        await expect(app.addExpenseForm.wrongLitersErrorMessage).toBeVisible();
    })

    test('Validation - zero or negative total cost', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ costMin: -10, costMax: 0 });

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        await expect(app.addExpenseForm.wrongCostErrorMessage).toBeVisible();
    })

    test('Validation - more than 9999 liters', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ litersMin: 10000, litersMax: 500000 });

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        await expect(app.addExpenseForm.wrongLitersErrorMessage).toBeVisible();
    })

    test('Validation - more than 1000000 total cost', async ({ app }) => {
        const { mileage, numberOfLiters, totalCost } = generateExpenseData({ costMin: 10000001, costMax: 100000000 });

        await app.expensesPage.navigate();
        await app.expensesPage.openAddExpenseForm();
        await app.addExpenseForm.enterMileage(mileage);
        await app.addExpenseForm.enterNumberOfLiters(numberOfLiters);
        await app.addExpenseForm.enterTotalCost(totalCost);
        await expect(app.addExpenseForm.wrongCostErrorMessage).toBeVisible();
    })
});

