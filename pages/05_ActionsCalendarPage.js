class ActionsCalendarPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.fileUploadInput = page.locator('input[type="file"], #myFile').first();

    this.hoverMenuButton = page.locator('.dropbtn, button:has-text("Checkout"), .dropdown').first();

    this.targetInputField = page.locator('input[placeholder="Enter email"]').first();
  }

  async waitForUploadFieldVisible() {
    await this.fileUploadInput.waitFor({ state: 'attached', timeout: 10000 });
  }
}

module.exports = { ActionsCalendarPage };