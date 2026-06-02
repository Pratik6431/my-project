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
    this.companyInput = page.locator("input[placeholder='Enter your company']").first();
  }

  /**
   * Action method to fill the login form fields
   * @param {string} username - The user email address
   * @param {string} password - The user security account password
   * @param {string} company - The user company name profile
   */
  async loginToPortal(username, password, company) {
    await this.userInput.click();
    await this.userInput.fill(username);
    
    await this.passwordInput.click();
    await this.passwordInput.fill(password);
    
    await this.companyInput.click();
    await this.companyInput.fill(company);
  }
}
module.exports = { LoginPage };