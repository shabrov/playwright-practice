import test, { expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('to be visible', async ({ page }) => {
    const signInBtn = page.getByRole('button', { name: 'Sign In' });
    await expect(signInBtn).toBeVisible();
});

test('to have text', async ({ page }) => {
    const headerElement = page.locator('.hero-descriptor_title');
    await expect(headerElement).toHaveText('Do more!');
});

test('to have count', async ({ page }) => {
    const altElements = page.getByAltText('Instructions');
    await expect(altElements).toHaveCount(2);
});
