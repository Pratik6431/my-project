class DataDrivenPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.userIdField = page.locator('input[placeholder="Enter your company"]').first(); 
    this.companyField = page.locator('input[placeholder="Enter your company"]').first();
    this.mobileField = page.locator('input[type="number"], #mobile, .mobile').first();
  }

  async fillParameterizedProfile(username, role, location) {

    await this.userIdField.waitFor({ state: 'attached', timeout: 10000 });
    await this.userIdField.clear();
    await this.userIdField.fill(username);
  }
}

module.exports = { DataDrivenPage };