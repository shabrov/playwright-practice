import { Locator } from '@playwright/test'
import { BasePage } from './BasePage';

export class GaragePage extends BasePage {
    public readonly logOutButton: Locator = this.page.locator('//a[@class="btn btn-link text-danger btn-sidebar sidebar_btn"]');
    public readonly pageTitle: Locator = this.page.getByRole('heading', { name: 'Garage' });
    public readonly myProfileButton: Locator = this.page.locator('//button[@id="userNavDropdown"]');
    public readonly pageHeading: Locator = this.page.getByRole('heading', { name: 'Garage' });
    public readonly addCarButton: Locator = this.page.getByRole('button', {name: 'Add car'});

    async navigate() {
        await super.navigate('/panel/garage');
    }

    async clickLogOutButton() {
        await this.logOutButton.click();
    }

    async openAddCarForm() {
        await this.addCarButton.click();
    }
}