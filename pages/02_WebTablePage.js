const { expect } = require('@playwright/test');

class WebTablePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    // UI Selectors / Locators for Web Table Components (Service 2: Data Grids)
    this.tableRows = page.locator('#shub151 table tbody tr');
    this.searchCountDropdown = page.locator("select[name='tablepress-1_length']");
    this.tableSearchInput = page.locator("input[type='search'][aria-controls='tablepress-1']");
  }

  /**
   * Action method to get the total row count visible in the data grid
   * @returns {Promise<number>} Total number of rows found
   */
  async getTableRowCount() {
    return await this.tableRows.count();
  }

  /**
   * Action method to search for a specific record inside the table search box
   * @param {string} criteria - The search keyword (e.g., Country name or Role)
   */
  async searchInTable(criteria) {
    await this.tableSearchInput.waitFor({ state: 'visible' });
    await this.tableSearchInput.clear();
    await this.tableSearchInput.fill(criteria);
  }
}

module.exports = { WebTablePage };