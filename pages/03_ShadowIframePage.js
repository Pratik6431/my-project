class ShadowIframePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.shadowInput = page.locator('#kils'); 
    
    this.iframeContainer = page.locator('iframe').first();
  }

  async waitForComponentsLoad() {
    await this.shadowInput.waitFor({ state: 'attached', timeout: 10000 });
  }
}

module.exports = { ShadowIframePage };