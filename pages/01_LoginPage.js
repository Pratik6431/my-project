class LoginPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    this.usernameInput = page.locator('input[placeholder="Enter email"]').first(); 
    this.passwordInput = page.locator('#pass');   
    this.companyInput = page.locator('input[placeholder="Enter your company"]').first();
    this.mobileInput = page.locator("input[placeholder='Enter your mobile number']").first(); 
    this.loginButton = page.locator("button:has-text('Submit'), input[type='submit']").first(); 
  }

  async fillUsername(text) {
    await this.usernameInput.waitFor({ state: 'visible' });
    // Pehle click/focus karenge taaki page ka script readonly hata de
    await this.usernameInput.click(); 
    await this.usernameInput.fill(text);
  }

  async waitForFormLoad() {
    await this.usernameInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  async login(username, password) {
    await this.waitForFormLoad();
    await this.fillUsername(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}

module.exports = { LoginPage };