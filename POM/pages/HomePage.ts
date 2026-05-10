import { Locator } from '@playwright/test';
import { BasePage } from './BasePage';

export class HomePage extends BasePage {
    private readonly singInButton: Locator = this.page.getByRole('button', { name: 'Sign In' });
    private readonly signUpButton: Locator = this.page.getByRole('button', { name: 'Sign up' });

    async openSignInForm() {
        await this.singInButton.click();
    }

    async openSignUpForm() {
        await this.signUpButton.click();
    }

    async navigate() {
        await super.navigate('/');
    }
}