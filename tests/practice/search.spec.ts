import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('search', async ({ page }) => {});

test('page.locator - xpath', async ({ page }) => {
    page.locator('//h1');
});

test('page locator get by role', async ({ page }) => {
    await page.getByRole('button', { name: 'Sign In' }).highlight();
});

test('home el', async ({page}) => {
    await page.getByText('Home').highlight();
});

test('about el', async ({page}) => {
    await page.getByText('About').highlight();
});

test('contacts el', async ({page}) => {
    await page.getByText('Contacts').highlight();
});