import test from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('');
});

test('all buttons', async ({ page }) => {
    const buttons = page.getByRole('button');
    const signInBtn = buttons.filter({ hasText: 'Sign In' });
    await signInBtn.highlight();
});
