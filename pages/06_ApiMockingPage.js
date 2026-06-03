class ApiMockingPage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    
    this.apiTargetPatterns = [
      '**/api/v1/users', 
      '**/api/v1/users?*', 
      '**/api/v1/users/*'
    ];
  }

  async mockUserApiResponse(status, mockData) {
    
    for (const pattern of this.apiTargetPatterns) {
      await this.page.route(pattern, async (route) => {
        await route.fulfill({
          status: status,
          contentType: 'application/json',
          body: JSON.stringify(mockData)
        });
      });
    }
  }
}

module.exports = { ApiMockingPage };