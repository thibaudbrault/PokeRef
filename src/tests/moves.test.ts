import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3005/moves');
});

test('Should have all the moves', async ({ page }) => {
  await page.waitForSelector('#zippy-zap', { state: 'visible' });
  await expect(page.getByRole('link', { name: 'zippy zap' })).toBeVisible();
});

test('Should go to other tables', async ({ page }) => {
  await page.getByRole('button', { name: 'status' }).click();
  await expect(page.getByRole('cell', { name: 'infatuation' })).toBeVisible();
  await page.getByRole('button', { name: 'stats' }).click();
  await expect(page.getByRole('cell', { name: 'evasion' })).toBeVisible();
  await page.getByRole('button', { name: 'moves' }).click();
  await page.waitForSelector('#judgment', { state: 'visible' });
  await expect(page.getByRole('link', { name: 'judgment' })).toBeVisible();
});
