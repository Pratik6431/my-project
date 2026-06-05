class FetcherAccessibilityPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    this.nativeHeaderRole = page.getByRole('heading', { level: 3 }).first();
    this.buttonRoleTarget = page.getByRole('button', { name: /Submit|Checkout|Filter/i }).first();
    this.inputRoleTarget = page.getByRole('textbox').first();
    this.localOriginUri = '';
  }

  async executeCustomFetchData(targetEndpoint) {
    return await this.page.evaluate(async (endpoint) => {
      try {
        const response = await fetch(endpoint);
        if (!response.ok) throw new Error(`Fetch Status Mismatch: ${response.status}`);
        return await response.json();
      } catch (err) {
        return { error: true, message: err.message };
      }
    }, targetEndpoint);
  }
}

module.exports = { FetcherAccessibilityPage };