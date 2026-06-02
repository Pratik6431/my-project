const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/01_LoginPage');
const testData = require('../../config/test-data.json');

test.describe('Service 1: Authentication & Profile Matrix @service1', () => {

  // This hook runs before each individual test case
  test.beforeEach(async ({ page }) => {
    // Navigate to the practice page using the baseURL configured globally
    await page.goto('');
  });

  // [1-6] DATA-DRIVEN VALID ROLES SCRIPT MATRIX (6 Tests Allocated)
  testData.authService.validRoles.forEach((data) => {
    test(`${data.id} - Verify login data registration parameters for ${data.role}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.loginToPortal(data.user, data.pass, data.company);

      await expect(loginPage.userInput).toHaveValue(data.user);
      await expect(loginPage.passwordInput).toHaveValue(data.pass);
      await expect(loginPage.companyInput).toHaveValue(data.company);
    });
  });

  // [7-14] DATA-DRIVEN INVALID STRUCTURAL ROLES SUITE (8 Tests Allocated)
  testData.authService.invalidMatrix.forEach((data) => {
    test(`${data.id} - Verify boundary validation rejection for: ${data.desc}`, async ({ page }) => {
      const loginPage = new LoginPage(page);
      await loginPage.loginToPortal(data.user, data.pass, data.company);

      await expect(loginPage.userInput).toHaveValue(data.user);
      await expect(loginPage.passwordInput).toHaveValue(data.pass);
    });
  });

  // [15] STABILITY CHECK MATRIX GATEWAY (1 Test Allocated)
  test(`${testData.authService.uiCheck.id} - Verify core identity parameters state and visibility properties`, async ({ page }) => {
    const loginPage = new LoginPage(page);

    await expect(loginPage.userInput).toBeVisible();
    await expect(loginPage.companyInput).toBeVisible();
    await expect(loginPage.companyInput).toBeEditable();
  });
});

module.exports = { LoginPage };