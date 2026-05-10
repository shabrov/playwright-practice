import {test, expect } from "@playwright/test";
import { HomePage } from "../POM/pages/HomePage";
import { SignInForm } from "../POM/forms/SignInForm";
import { testUser1 } from "../test-data/credentials/user-data";
import { GaragePage } from "../POM/pages/GaragePage";
import { generateRandomEmail, generateRandomPassword, generateWrongEmailFormat } from "../utils/credentialsUtil";

test.describe('CodeGen Sign in tests', () => {
    let homePage: HomePage;
    let garagePage: GaragePage;
    let signInForm: SignInForm;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);
        signInForm = new SignInForm(page);
        garagePage = new GaragePage(page);
        
        await homePage.navigate();
        await homePage.openSignInForm();
    })

    test('Successful sign in', async () => {
        await signInForm.signInWithCredentials(testUser1.email, testUser1.password);
        await expect(garagePage.pageHeading).toContainText('Garage');
    })

    test('Sign in with empty email', async () => {
        await signInForm.triggerOnField('email');
        await signInForm.fillPassword(generateRandomPassword())
        await expect(signInForm.emptyEmailMessage).toBeVisible();
    })

    test('Sign in with empty password', async () => {
        await signInForm.triggerOnField('password');
        await signInForm.fillEmail(generateRandomEmail())

        await expect(signInForm.emptyPasswordMessage).toBeVisible();
    })

    test('Sign incorrect email', async () => {
        await signInForm.fillEmail(generateWrongEmailFormat());
        await signInForm.fillPassword(generateRandomPassword());
        await expect(signInForm.wrongEmailMessage).toBeVisible();
    })

    test('Sign in with wrong credentials', async () => {
        await signInForm.signInWithCredentials(generateRandomEmail(), generateRandomPassword());
        await expect(signInForm.wrongCredentialsMessage).toBeVisible();
    })
})