import { Locator } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class SignUpForm extends BaseForm {
    public readonly nameField: Locator = this.page.locator('//input[@id="signupName"]');
    public readonly lastNameField: Locator = this.page.locator('//input[@id="signupLastName"]');
    public readonly emailField: Locator = this.page.locator('//input[@id="signupEmail"]');
    public readonly passwordField: Locator = this.page.locator('//input[@id="signupPassword"]');
    public readonly repeatPasswordField: Locator = this.page.locator('//input[@id="signupRepeatPassword"]');
    public readonly registerButton: Locator = this.page.getByRole('button', { name: 'Register' });
    private readonly closeButton: Locator = this.page.getByRole('button', { name: 'Close' });
    public readonly modalDialog: Locator = this.page.locator('//div[@class="modal-content"]');
    public readonly errorMessageUserExists: Locator = this.page.locator('//form[@class="ng-dirty ng-touched ng-valid"]//p');
    public readonly errorMessage: Locator = this.page.locator('//div[@class="invalid-feedback"]');
    public readonly errorMessageWithP: Locator = this.page.locator('//div[@class="invalid-feedback"]//p');

    async signUp(name: string, lastName: string, email: string, password: string, repeatedPassword: string): Promise<void> {
        await this.enterName(name);
        await this.enterLastName(lastName);
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.enterRepeatPassword(repeatedPassword);
        await this.clickRegisterButton();
    }

    async enterName(name: string) {
        await this.nameField.fill(name);
    }

    async enterLastName(lastName: string) {
        await this.lastNameField.fill(lastName);
    }

    async enterEmail(email: string) {
        await this.emailField.fill(email);
    }

    async enterPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async enterRepeatPassword(repeatedPassword: string) {
        await this.repeatPasswordField.fill(repeatedPassword);
    }

    async clickRegisterButton() {
        await this.registerButton.click();
    }

    async clickCloseButton() {
        await this.closeButton.click();
    }

    async blurOnField(field: Locator) {
        await field.blur();
    }

    async focusOnField(field: Locator) {
        await field.focus();
    }
}