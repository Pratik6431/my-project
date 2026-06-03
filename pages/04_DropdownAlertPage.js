class DropdownAlertPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.carDropdown = page.locator('#cars'); 
    
    this.userLinkElement = page.locator('tr:has-text("Garry.White") a').first();
  }

  async waitForDropdownVisible() {
    await this.carDropdown.waitFor({ state: 'visible', timeout: 10000 });
  }
}

module.exports = { DropdownAlertPage };