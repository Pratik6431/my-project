const { expect } = require('@playwright/test');

class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    // UI Selectors / Locators
    this.userInput = page.locator("input[placeholder='Enter email']");
    this.passwordInput = page.locator("input[placeholder='Enter Password']");
    
    // Fixed strict mode violation by strictly targeting the first matched element
    this.companyInput = page.locator("input[placeholder='Enter your company']").first();
    this.submitButton = page.locator("button[type='submit']").getByText('Submit', { exact: false });
  }

  /**
   * Action method to fill the login form fields
   * @param {string} username - The user email address
   * @param {string} password - The user security account password
   * @param {string} company - The user company name profile
   */
  async loginToPortal(username, password, company) {
    // Step 1: Click the input field first to dynamically remove the 'readonly' attribute
    await this.userInput.click();
    // Step 2: Now perform the standard fill action safely
    await this.userInput.fill(username);
    
    // Perform the same safe action patterns for the password and company inputs
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    
    await this.companyInput.click();
    await this.companyInput.fill(company);
  }
}

module.exports = { LoginPage };