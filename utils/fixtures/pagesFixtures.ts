import { test as base, Page } from '@playwright/test';
import { GaragePage } from '../../POM/pages/GaragePage';
import { HomePage } from '../../POM/pages/HomePage';
import { SignInForm } from '../../POM/forms/SignInForm';
import { AddCarForm } from '../../POM/forms/AddCarForm';
import { SignUpForm } from '../../POM/forms/SignUpForm';
import { ExpensesPage } from '../../POM/pages/ExpensesPage';
import { AddExpenseForm } from '../../POM/forms/AddExpenseForm';
import { ProfilePage } from '../../POM/pages/ProfilePage';
import { EditProfileForm } from '../../POM/forms/EditProfileForm';

type App = {
    page: Page,
    garagePage: GaragePage;
    homePage: HomePage;
    signInForm: SignInForm;
    addCarForm: AddCarForm;
    expensesPage: ExpensesPage;
    addExpenseForm: AddExpenseForm;
    profilePage: ProfilePage;
    editProfileForm: EditProfileForm;
};

export const test = base.extend<{ app: App }>({
    app: async ({ page }, use) => {
        const app: App = {
            page,
            garagePage: new GaragePage(page),
            homePage: new HomePage(page),
            signInForm: new SignInForm(page),
            addCarForm: new AddCarForm(page),
            expensesPage: new ExpensesPage(page),
            addExpenseForm: new AddExpenseForm(page),
            profilePage: new ProfilePage(page),
            editProfileForm: new EditProfileForm(page)
        };
        await use(app);
    }
});

export { expect } from '@playwright/test';