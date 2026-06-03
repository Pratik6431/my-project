class WebTablePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;

    this.mainTable = page.locator('#resultTable');
    
    this.tableRows = this.mainTable.locator('tbody tr');
    this.tableHeaders = this.mainTable.locator('thead th');

    this.firstRowCheckbox = page.locator('#ohrmList_chkSelectRecord_21'); // First checkbox in table
    this.secondRowCheckbox = page.locator('#ohrmList_chkSelectRecord_25'); // Second checkbox
    this.firstRowUserLink = page.locator('tr:has-text("Garry.White") a').first();
  }

  async waitForTableLoad() {
    await this.mainTable.waitFor({ state: 'visible', timeout: 10000 });
  }

  async getRowTextContent(index) {
    return await this.tableRows.nth(index).textContent();
  }
}

module.exports = { WebTablePage };