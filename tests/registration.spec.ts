import { test, expect } from '@playwright/test';
import { HomePage } from '../POM/pages/HomePage';
import { SignUpForm } from '../POM/forms/SignUpForm';
import { GaragePage } from '../POM/pages/GaragePage';

let email: string;
let homePage: HomePage;
let signUpForm: SignUpForm;
let garagePage: GaragePage;

test.describe('Sign up verification', () => {
    test.beforeEach(async ({ page }) => {
        email = `aqa-test+${Date.now()}@gmail.com`;

        homePage = new HomePage(page);
        signUpForm = new SignUpForm(page);
        garagePage = new GaragePage(page);

        await homePage.navigate();
        await homePage.openSignUpForm();
    });

    test.describe('Sign up process', () => {
        test('Verify possibility to sign up with valid data', async () => {
            await signUpForm.signUp(
                'Name',
                'LastName',
                email,
                '123456Qwerty',
                '123456Qwerty',
            );
            await expect(garagePage.pageTitle).toHaveText('Garage');
        });

        test('Verify it is impossible to sign up with an existing email', async () => {
            await signUpForm.signUp(
                'Name',
                'LastName',
                email,
                '123456Qwerty',
                '123456Qwerty',
            );

            await expect(garagePage.pageTitle).toBeVisible();
            await garagePage.clickLogOutButton();
            await homePage.openSignUpForm();
            await signUpForm.signUp(
                'Name',
                'LastName',
                email,
                '123456Qwerty',
                '123456Qwerty',
            );
            await expect(signUpForm.errorMessageUserExists).toHaveText(
                'User already exists',
            );
        });
    });

    test.describe('Modal dialog', () => {
        test('Verify possibility of closing "Registration" dialog', async () => {
            await signUpForm.clickCloseButton();
            await expect(signUpForm.modalDialog).not.toBeVisible();
        });
    });

    test.describe('Name field validation', () => {
        test('Verify error message when entering 1 character in the "Name" field', async () => {
            await signUpForm.enterName('N');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.nameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessageWithP).toHaveText(
                'Name has to be from 2 to 20 characters long',
            );
        });

        test('Verify error message when entering 21 character in the "Name" field', async () => {
            await signUpForm.enterName('NameNameNameNameNameN');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.nameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessageWithP).toHaveText(
                'Name has to be from 2 to 20 characters long',
            );
        });

        test('Verify error message when  "Name" field is empty', async () => {
            await signUpForm.focusOnField(signUpForm.nameField);
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.nameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessageWithP).toHaveText(
                'Name required',
            );
        });

        test('Verify error message when entering Cyrillic in the  "Name" field', async () => {
            await signUpForm.enterName('Юзер');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.nameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessageWithP).toHaveText(
                'Name is invalid',
            );
        });

        test('Verify error message when entering symbols in the  "Name" field', async () => {
            await signUpForm.enterName('!@$%^&*');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.nameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessageWithP).toHaveText(
                'Name is invalid',
            );
        });

        test('Verify error message when entering spaces in the "Name" field', async () => {
            await signUpForm.enterName('    ');
            await signUpForm.blurOnField(signUpForm.nameField);
            await expect(signUpForm.nameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessageWithP).toHaveText(
                'Name is invalid',
            );
        });
    });

    test.describe('Last name field validation', () => {
        test('Verify error message when entering 1 character in the "Last name" field', async () => {
            await signUpForm.enterLastName('L');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.lastNameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Last name has to be from 2 to 20 characters long',
            );
        });

        test('Verify error message when entering 21 character in the "Last name" field', async () => {
            await signUpForm.enterLastName('LastnameLastnameLastL');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.lastNameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Last name has to be from 2 to 20 characters long',
            );
        });

        test('Verify error message when "Last name" field is empty', async () => {
            await signUpForm.focusOnField(signUpForm.lastNameField);
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.lastNameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Last name required',
            );
        });

        test('Verify error message when entering Cyrillic in the "Last name" field', async () => {
            await signUpForm.enterLastName('Прізвище');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.lastNameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Last name is invalid',
            );
        });

        test('Verify error message when entering spaces in the "Last name" field', async () => {
            await signUpForm.enterLastName('   ');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.lastNameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Last name is invalid',
            );
        });

        test('Verify error message when entering symbols in the "Last name" field', async () => {
            await signUpForm.enterLastName('!@$%^&*');
            await signUpForm.blurOnField(signUpForm.lastNameField);
            await expect(signUpForm.lastNameField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Last name is invalid',
            );
        });
    });

    test.describe('Email field validation', () => {
        test('Verify that email can not start from @ symbol', async () => {
            await signUpForm.enterEmail('@testgmail.com');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.emailField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Email is incorrect',
            );
        });

        test('Verify that email can not end with @ symbol', async () => {
            await signUpForm.enterEmail('testgmail.com@');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.emailField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Email is incorrect',
            );
        });

        test('Verify that domain can not be without dots', async () => {
            await signUpForm.enterEmail('test@gmailcom');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.emailField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Email is incorrect',
            );
        });

        test('Verify that domain parts can not contain characters other than letters, digits, and optional hyphens', async () => {
            await signUpForm.enterEmail('test@gma#!il.com');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.emailField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Email is incorrect',
            );
        });

        test('Verify that top-level domain can not have 1 letter', async () => {
            await signUpForm.enterEmail('test@gmail.c');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.emailField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Email is incorrect',
            );
        });

        test('Verify that email can not contain spaces in the domain part', async () => {
            await signUpForm.enterEmail('test@ gmail.com');
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.emailField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Email is incorrect',
            );
        });

        test('Verify error message when  "Email" field is empty', async () => {
            await signUpForm.focusOnField(signUpForm.emailField);
            await signUpForm.blurOnField(signUpForm.emailField);
            await expect(signUpForm.emailField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText('Email required');
        });
    });

    test.describe('Password field validation', () => {
        test('Verify error message with 7 characters  in  "Password" field', async () => {
            await signUpForm.enterPassword('Ab12345');
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.passwordField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
            );
        });

        test('Verify error message with 16 characters  in  "Password" field', async () => {
            await signUpForm.enterPassword('Ab12345678901234');
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.passwordField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
            );
        });

        test('Verify error  message when password has valid length but lacks a capital letter', async () => {
            await signUpForm.enterPassword('b1234567');
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.passwordField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
            );
        });

        test('Verify error  message when password has valid length but lacks a small letter', async () => {
            await signUpForm.enterPassword('B1234567');
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.passwordField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
            );
        });

        test('Verify error message when password has valid length but lacks a digit', async () => {
            await signUpForm.enterPassword('Aaaaaaaaa');
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.passwordField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter',
            );
        });

        test('Verify error message when "Password" field is empty', async () => {
            await signUpForm.focusOnField(signUpForm.passwordField);
            await signUpForm.blurOnField(signUpForm.passwordField);
            await expect(signUpForm.passwordField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Password required',
            );
        });
    });

    test.describe('Re-enter password field validation', () => {
        test('Verify error message when "Re-enter password" field is empty', async () => {
            await signUpForm.enterPassword('Ab123456');
            await signUpForm.focusOnField(signUpForm.repeatPasswordField);
            await signUpForm.blurOnField(signUpForm.repeatPasswordField);
            await expect(signUpForm.repeatPasswordField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Re-enter password required',
            );
        });

        test('Verify error message  when passwords do not match', async () => {
            await signUpForm.enterPassword('Ab123456');
            await signUpForm.enterRepeatPassword('Ab123457');
            await signUpForm.blurOnField(signUpForm.repeatPasswordField);
            await expect(signUpForm.repeatPasswordField).toHaveCSS(
                'border-color',
                'rgb(220, 53, 69)',
            );
            await expect(signUpForm.errorMessage).toHaveText(
                'Passwords do not match',
            );
        });
    });

    test.describe('Register button state', () => {
        test('Verify "Register" button is enabled when all fields are valid', async () => {
            await signUpForm.enterName('Name');
            await signUpForm.enterLastName('LastName');
            await signUpForm.enterEmail(email);
            await signUpForm.enterPassword('123456Qwerty');
            await signUpForm.enterRepeatPassword('123456Qwerty');
            await expect(signUpForm.registerButton).toBeEnabled();
        });

        test('Verify "Register" button is disabled initially when all fields are empty', async () => {
            await expect(signUpForm.registerButton).toBeDisabled();
        });

        test('"Register" button is disabled when the "Last name" data is incorrect', async () => {
            await signUpForm.enterName('Name');
            await signUpForm.enterLastName('L');
            await signUpForm.enterEmail(email);
            await signUpForm.enterPassword('123456Qwerty');
            await signUpForm.enterRepeatPassword('123456Qwerty');
            await expect(signUpForm.registerButton).toBeDisabled();
        });

        test('"Register" button is disabled when the "Name" data is incorrect', async () => {
            await signUpForm.enterName('Тест');
            await signUpForm.enterLastName('LastName');
            await signUpForm.enterEmail(email);
            await signUpForm.enterPassword('123456Qwerty');
            await signUpForm.enterRepeatPassword('123456Qwerty');
            await expect(signUpForm.registerButton).toBeDisabled();
        });

        test('"Register" button is disabled when the "Email" data is incorrect', async () => {
            await signUpForm.enterName('Name');
            await signUpForm.enterLastName('LastName');
            await signUpForm.enterEmail('test@@gmail.com');
            await signUpForm.enterPassword('123456Qwerty');
            await signUpForm.enterRepeatPassword('123456Qwerty');
            await expect(signUpForm.registerButton).toBeDisabled();
        });

        test('"Register" button is disabled when the "Password" and "Re-enter password" data is incorrect', async () => {
            await signUpForm.enterName('Name');
            await signUpForm.enterLastName('LastName');
            await signUpForm.enterEmail(email);
            await signUpForm.enterPassword('Ab12345');
            await signUpForm.enterRepeatPassword('Ab1234');
            await signUpForm.blurOnField(signUpForm.repeatPasswordField);
            await expect(signUpForm.registerButton).toBeDisabled();
        });

        test('Verify that "Register" button becomes enabled after correcting invalid data', async () => {
            await signUpForm.enterName('Name');
            await signUpForm.enterLastName('LastName');
            await signUpForm.enterEmail('test@@gmail.com');
            await signUpForm.enterPassword('123456Qwerty');
            await signUpForm.enterRepeatPassword('123456Qwerty');
            await expect(signUpForm.registerButton).toBeDisabled();
            await signUpForm.enterEmail('test@gmail.com');
            await expect(signUpForm.registerButton).toBeEnabled();
        });
    });
});
