import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3005/');
});

// test("Should have 50 pokemon in a page", async ({ page }) => {
//     const count = await page.getByTestId('pokemonElement').count()
//     console.log(count)
// })

test("Should be able to change the generation", async ({ page }) => {
  await page.locator('#generation', { hasText: 'Select' }).click()
  await page.getByText('Generation IV', { exact: true }).click()
  await expect(page.getByRole('link', { name: 'arceus' })).toBeVisible()
})

test('Should be able to change the form', async ({ page }) => {
  await page.locator('#form', { hasText: 'Select' }).click()
  await page.getByText('Hisui', { exact: true }).click()
  await expect(page.getByRole('link', { name: 'growlithe hisui' })).toBeVisible()
})

test('Should be able to reset the filters', async ({ page }) => {
  await page.locator('#form', { hasText: 'Select' }).click()
  await page.getByText('Mega', { exact: true }).click()
  await expect(page.getByRole('link', { name: 'blastoise mega' })).toBeVisible()
  await page.locator('.select__clear-indicator').click()
  await expect(page.getByRole('link', { name: 'ivysaur' })).toBeVisible()
})

test('Should modify filters value when selecting multiple', async ({
  page,
}) => {
  await page.locator('#form', { hasText: 'Select' }).click();
  await page.getByText('Gmax', { exact: true }).click();
  await expect(page.getByRole('link', { name: 'pikachu gmax' })).toBeVisible();
  await page.locator('#generation', { hasText: 'Select' }).click();
  await page.getByText('Generation II', { exact: true }).click();
  await expect(page.getByRole('link', { name: 'ampharos' })).toBeVisible();
  await page.locator('.select__clear-indicator').click();
  await expect(page.getByRole('link', { name: 'ninetales' })).toBeVisible();
});

test('Should be able to change page', async ({ page }) => {
  await expect(page.getByRole('link', { name: 'raichu' })).toBeVisible()
  await page.getByRole('button', { name: 'Page 3', exact: true }).click()
  await expect(page.getByRole('link', { name: 'scyther' })).toBeVisible()
  await page.getByRole('button', { name: 'Page 2', exact: true }).click()
  await expect(page.getByRole('link', { name: 'magneton' })).toBeVisible()
})