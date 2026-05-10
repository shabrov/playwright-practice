import { Locator, expect } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class AddCarForm extends BaseForm {
    public readonly formTitle: Locator = this.page.locator('.modal-title', { hasText: 'Add a car' });
    private readonly brandDropdown: Locator = this.page.locator('#addCarBrand');
    private readonly modelDropDown: Locator = this.page.locator('#addCarModel');
    private readonly mileageField: Locator = this.page.locator('#addCarMileage');
    private readonly _addButton: Locator = this.page.getByRole('button', { name: 'Add', exact: true });
    private readonly cancelButton: Locator = this.page.getByRole('button', { name: 'Cancel' });
    private readonly closeIcon: Locator = this.page.locator('button[aria-label="Close"]');
    public readonly successMessage: Locator = this.page.locator('.alert-success p', { hasText: 'Car added' });
    public readonly lastAddedCarName: Locator = this.page.locator('.car_name.h2').first();
    public readonly lastAddedCarMileageField: Locator = this.page.locator('[name=miles]').first();

    get addButton(): Locator {
        return this._addButton;
    }

    async addNewCar(brand: string, model: string, mileage: string) {
        await this.selectBrand(brand);
        await this.selectModel(model);
        await this.enterMileage(mileage);
        await this.clickAddCarButton();
    }

    async verifyCarIsAdded(carname: string, carMileage: string) {
        await expect(this.successMessage).toBeVisible();
        await expect(this.lastAddedCarName).toHaveText(carname);
        await expect(this.lastAddedCarMileageField).toHaveValue(carMileage);
    }

    async selectBrand(brand: string) {
        await this.brandDropdown.selectOption(brand);
    }

    async selectModel(model: string) {
        await this.modelDropDown.selectOption(model);
    }

    async enterMileage(mileage: string) {
        await this.mileageField.fill(mileage);
    }

    async clickAddCarButton() {
        await this.addButton.click();
    }

    async clickCancelButton() {
        await this.cancelButton.click();
    }

    async clickCloseIcon() {
        await this.closeIcon.click();
    }


}
