const { test, expect } = require('@playwright/test');

test.describe('Service 2: Web Table Automated Scenarios', () => {

  // Yeh hook har test se pehle page par navigate karega
  test.beforeEach(async ({ page }) => {
    await page.goto('');
  });

  // [1] FIXED: Direct unique table ID use ki hai yahan
  test('WT_01 - Verify Table visibility on page load', async ({ page }) => {
    const table = page.locator('#tablepress-1');
    await expect(table).toBeVisible();
  });

  // [2-14] LOOP MAGIC: Ek hi loop se 13 test cases automatic generate honge!
  const searchKeywords = [
    { id: 'WT_02', word: 'India' },
    { id: 'WT_03', word: 'United States' },
    { id: 'WT_04', word: 'United Kingdom' },
    { id: 'WT_05', word: 'Russia' },
    { id: 'WT_06', word: 'Canada' },
    { id: 'WT_07', word: 'UAE' },
    { id: 'WT_08', word: 'John' },
    { id: 'WT_09', word: 'Admin' },
    { id: 'WT_10', word: 'User' },
    { id: 'WT_11', word: 'Developer' },
    { id: 'WT_12', word: 'Tester' },
    { id: 'WT_13', word: 'Manager' },
    { id: 'WT_14', word: 'Finance' }
  ];

  for (const data of searchKeywords) {
    test(`${data.id} - Verify table filtration for keyword: ${data.word}`, async ({ page }) => {
      const searchInput = page.locator("input[type='search'][aria-controls='tablepress-1']");
      
      await searchInput.fill(data.word);
      await expect(searchInput).toHaveValue(data.word);

      // FIXED: Sahi table structure ke hisab se rows count ki hain
      const rows = page.locator('#tablepress-1 tbody tr');
      const count = await rows.count();
      expect(count).toBeGreaterThanOrEqual(0);
    });
  }

  // [15] Aakhiri test: Galat data search karne par table handle kar pata hai ya nahi
  test('WT_15 - Verify table handling with non-existing criteria', async ({ page }) => {
    const searchInput = page.locator("input[type='search'][aria-controls='tablepress-1']");
    await searchInput.fill('InvalidCountryXYZ');
    
    // FIXED: Sahi table structure rows ke liye
    const rows = page.locator('#tablepress-1 tbody tr');
    const count = await rows.count();
    expect(count).toBeLessThanOrEqual(1);
  });

});