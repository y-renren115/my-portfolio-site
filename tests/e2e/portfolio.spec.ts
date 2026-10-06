import { expect, test } from '@playwright/test';

const routes = [
  ['/', 'Welcome to My Portfolio Site!'],
  ['/about', 'Career Overview'],
  ['/works', 'フロントエンド開発'],
  ['/contact', 'お問い合わせはSNSからお願いいたします'],
] as const;

for (const [route, content] of routes) {
  test(`${route} loads without hydration errors`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('console', (message) => {
      if (message.type() === 'error' && /hydrat|Minified React error/i.test(message.text())) {
        errors.push(message.text());
      }
    });
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.getByText(content, { exact: true })).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    await page.getByRole('banner').getByRole('link', { name: 'Contact', exact: true }).click();
    await expect(page).toHaveURL('/contact');
    await expect(page.getByLabel('Your Email')).toBeVisible();
    expect(errors).toEqual([]);
  });
}

test('header and home links support navigation and browser history', async ({ page }) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  page.on('console', (message) => {
    if (message.type() === 'error' && /hydrat|Minified React error/i.test(message.text())) {
      errors.push(message.text());
    }
  });
  await page.goto('/');
  await page.getByRole('main').getByRole('link', { name: 'About', exact: true }).click();
  await expect(page).toHaveURL('/about');
  const image = page.getByAltText('プロフィール画像');
  await expect(image).toBeVisible();
  await expect.poll(() => image.evaluate((element: HTMLImageElement) => element.naturalWidth)).toBeGreaterThan(0);
  await page.getByRole('banner').getByRole('link', { name: 'Works', exact: true }).click();
  await expect(page).toHaveURL('/works');
  await page.goBack();
  await expect(page).toHaveURL('/about');
  await page.goForward();
  await expect(page).toHaveURL('/works');
  await page.getByRole('link', { name: 'My Portfolio', exact: true }).click();
  await expect(page).toHaveURL('/');
  await page.getByRole('main').getByRole('link', { name: 'Contact', exact: true }).click();
  await expect(page).toHaveURL('/contact');
  await page.getByLabel('Your Name').fill('Upgrade test');
  await page.getByLabel('Your Email').fill('upgrade-test@example.com');
  await page.getByLabel('Message', { exact: true }).fill('Local smoke test only');
  await expect(page.getByLabel('Your Name')).toHaveValue('Upgrade test');
  expect(errors).toEqual([]);
});
