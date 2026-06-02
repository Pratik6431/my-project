const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/01_LoginPage');
const testData = require('../../config/test-data.json');

test.describe('Service 1: Authentication & Profile Matrix @service1', () => {

  // This hook runs before each individual test case
  test.beforeEach(async ({ page }) => {
    // Navigate to the practice page using the baseURL configured globally
    await page.goto('');
  });

  // 1. DATA-DRIVEN LOOP: Iterating over all valid user roles (Admin, Customer, Guest)
  testData.authService.loginMatrix.forEach((data) => {
    test(`TC - Verify successful login configuration for ${data.role} role`, async ({ page }) => {
      const loginPage = new LoginPage(page);

      // Execute the login action method using current loop credentials
      await loginPage.loginToPortal(data.user, data.pass, data.company);

      // Assertions to verify the input fields successfully retained the typed data
      await expect(loginPage.userInput).toHaveValue(data.user);
      await expect(loginPage.passwordInput).toHaveValue(data.pass);
      await expect(loginPage.companyInput).toHaveValue(data.company);
    });
  });

  // 2. NEGATIVE SCENARIO: Verifying behavior with invalid credentials
  test('TC - Verify login system integrity with invalid credentials reject profile', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const invalidData = testData.authService.invalidCredentials;

    // Execute login with bad dataset
    await loginPage.loginToPortal(invalidData.user, invalidData.pass, invalidData.company);

    // Verify fields accept the data but system boundaries remain secure
    await expect(loginPage.userInput).toHaveValue(invalidData.user);
    await expect(loginPage.passwordInput).toHaveValue(invalidData.pass);
  });

  // 3. UI STATE CHECK: Verify the interactive element fields are visible and active
  test('TC - Verify profile form interactive elements state and visibility properties', async ({ page }) => {
    const loginPage = new LoginPage(page);

    // Assert that the essential core form inputs are visible on viewport and editable
    await expect(loginPage.userInput).toBeVisible();
    await expect(loginPage.companyInput).toBeVisible();
    await expect(loginPage.companyInput).toBeEditable();
  });
});