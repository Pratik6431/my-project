const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../../pages/01_LoginPage');

test.describe('Service 1: Authentication & Form Profiles Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('', { waitUntil: 'domcontentloaded' }); 
  });

  // --- 1. CORE ELEMENT VISIBILITY & ACTION TARGETS ---
  test('AUTH_01 - Verify User ID entry field is attached and editable', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.waitForFormLoad();
    await expect(loginPage.usernameInput).toBeVisible();
    
    await loginPage.fillUsername('pratik@selectorshub.com');
    await expect(loginPage.usernameInput).toHaveValue('pratik@selectorshub.com');
  });

  test('AUTH_02 - Verify Password entry field securely accepts text input', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.passwordInput).toBeVisible();
    await loginPage.passwordInput.fill('SecurePass2026');
    await expect(loginPage.passwordInput).toHaveValue('SecurePass2026');
  });

  test('AUTH_03 - Verify Company field interaction level constraints', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.companyInput).toBeVisible();
    await loginPage.companyInput.fill('Wipro Limited');
    await expect(loginPage.companyInput).toHaveValue('Wipro Limited');
  });

  // --- 2. ATTRIBUTE EXTRACTIONS & USER GUIDES ---
  test('AUTH_04 - Verify password input field mask attribute configuration', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const inputType = await loginPage.passwordInput.getAttribute('type');
    expect(inputType).toBe('password'); 
  });

  test('AUTH_05 - Verify instructional placeholder value inside mobile number field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.mobileInput).toHaveAttribute('placeholder', 'Enter your mobile number');
  });

  // --- 3. BOUNDARY CHECKS & MAXIMUM LENGTH INJECTIONS ---
  test('AUTH_06 - Verify field tolerance when injecting high-volume character string inside User ID', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const longString = 'A'.repeat(50) + '@selectorshub.com';
    
    await loginPage.fillUsername(longString);
    await expect(loginPage.usernameInput).toHaveValue(longString);
  });

  test('AUTH_07 - Verify field tolerance under special character strings injection inside Company field', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const specialChars = 'Wipro!@#';
    await loginPage.companyInput.fill(specialChars);
    await expect(loginPage.companyInput).toHaveValue(specialChars);
  });

  // --- 4. CLEAR OPERATIONS & VALUE REMOVALS ---
  test('AUTH_08 - Verify text elimination handling upon clearing the input state inside User ID', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.fillUsername('temp@selectorshub.com');
    await loginPage.usernameInput.clear();
    await expect(loginPage.usernameInput).toHaveValue('');
  });

  test('AUTH_09 - Verify text elimination handling upon clearing the input state inside Password', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.passwordInput.fill('SecretData');
    await loginPage.passwordInput.clear();
    await expect(loginPage.passwordInput).toHaveValue('');
  });

  // --- 5. INTERACTION TYPES & ELEMENT FOCUS STATES ---
  test('AUTH_10 - Verify dynamic layout focus status inside User ID entry box', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.usernameInput.focus();
    await expect(loginPage.usernameInput).toBeFocused();
  });

  test('AUTH_11 - Verify dynamic layout focus status inside Password entry box', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.passwordInput.focus();
    await expect(loginPage.passwordInput).toBeFocused();
  });

  // --- 6. MULTI-FIELD DATA FLOW EXECUTION ---
  test('AUTH_12 - Verify synchronous multi-field profile data compilation', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.fillUsername('pratik@wipro.com');
    await loginPage.passwordInput.fill('wiproNGA2026');
    await loginPage.companyInput.fill('Wipro');
    
    await expect(loginPage.usernameInput).toHaveValue('pratik@wipro.com');
    await expect(loginPage.passwordInput).toHaveValue('wiproNGA2026');
    await expect(loginPage.companyInput).toHaveValue('Wipro');
  });

  // --- 7. HEADER & ELEMENT DOM CHECKS ---
  test('AUTH_13 - Verify main wrapper card description presence inside header tier', async ({ page }) => {
    const pageHeading = page.locator('h3').first(); 
    await expect(pageHeading).toBeVisible();
  });

  test('AUTH_14 - Verify absolute DOM presence for submit actions on page structure', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await expect(loginPage.loginButton).toBeAttached();
  });

  test('AUTH_15 - Verify system workflow execution layer initialization upon form submission click', async ({ page }) => {
    const loginPage = new LoginPage(page);
    
    await loginPage.fillUsername('test@selectorshub.com');
    await loginPage.passwordInput.fill('TestPass');
    await expect(loginPage.loginButton).toBeEnabled();
  });

});