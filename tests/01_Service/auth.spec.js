const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/01_LoginPage');
const testData = require('../../config/test-data.json');

test.describe('Service 1: Authentication & Profile Matrix @service1', () => {

  // This hook runs before each individual test case
  test.beforeEach(async ({ page }) => {
    // Navigate to the practice page using the baseURL configured globally
    await page.goto('');
  });

  // Test Case 1: Verifying Admin User Role Login Flow
  test('TC001 - Verify successful login configuration for Admin role', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const adminData = testData.authService.loginMatrix[0];

    // Execute the login action method using data-driven JSON inputs
    await loginPage.loginToPortal(adminData.user, adminData.pass, adminData.company);

    // Hard assertion to verify the input fields successfully retained the typed data
    await expect(loginPage.userInput).toHaveValue(adminData.user);
    await expect(loginPage.passwordInput).toHaveValue(adminData.pass);
    await expect(loginPage.companyInput).toHaveValue(adminData.company);
  });
});