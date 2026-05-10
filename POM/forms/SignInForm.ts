import { Locator } from '@playwright/test';
import { BaseForm } from './BaseForm';

export class SignInForm extends BaseForm {
    private readonly emailField: Locator = this.page.getByRole('textbox', { name: 'Email' });
    private readonly passwordField: Locator = this.page.getByRole('textbox', { name: 'Password' });
    private readonly loginButton: Locator = this.page.getByRole('button', { name: 'Login' });
    public readonly emptyEmailMessage: Locator = this.page.getByText('Email required');
    public readonly emptyPasswordMessage: Locator = this.page.getByText('Password required');
    public readonly wrongEmailMessage: Locator = this.page.getByText('Email is incorrect');
    public readonly wrongCredentialsMessage: Locator = this.page.getByText('Wrong email or password');

    async navigate() {
        await this.page.goto('/');
    }

    async fillEmail(email: string) {
        await this.emailField.fill(email);
    }

    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }

    async signInWithCredentials(email: string, password: string) {
        await this.fillEmail(email);
        await this.fillPassword(password);
        await this.loginButton.click();
    }

    async triggerOnField(fieldName: string) {
        let field: Locator;
        switch (fieldName) {
            case 'email':
                field = this.emailField;
                break;
            case 'password':
                field = this.passwordField;
                break;
            default:
                throw new Error('Wrong field');
        }
        await field.focus();
        await field.blur();
    }
}
