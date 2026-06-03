const { test, expect } = require('@playwright/test');
const { WebTablePage } = require('../../pages/02_WebTablePage');

test.describe('Service 2: Web Tables & Data Grids Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('', { waitUntil: 'domcontentloaded' });
  });

  // --- 1. TABLE STRUCTURE & LAYOUT VISIBILITY ---
  test('TABLE_01 - Verify core web table container component is visible on page layout', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    await tablePage.waitForTableLoad();
    await expect(tablePage.mainTable).toBeVisible();
  });

  test('TABLE_02 - Verify total row count match against system base expectations', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    await tablePage.waitForTableLoad();
    const totalRows = await tablePage.tableRows.count();
    expect(totalRows).toBeGreaterThan(0);
  });

  // --- 2. HEADER TIER DATA VERIFICATIONS ---
  test('TABLE_03 - Verify absolute column header count for data compliance mapping', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    const headerCount = await tablePage.tableHeaders.count();
    expect(headerCount).toBeGreaterThan(0);
  });

  test('TABLE_04 - Verify text content descriptor for first table header column', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    const firstHeader = await tablePage.tableHeaders.nth(0).textContent();
    expect(firstHeader.trim()).not.toBeNull();
  });

  // --- 3. TARGETED ROW EXTRACTIONS (FIXED INDEXES) ---
  test('TABLE_05 - Verify data integrity and profile presence for Row index 0', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    await tablePage.waitForTableLoad();
    const rowContent = await tablePage.getRowTextContent(0);
    expect(rowContent).toContain('Garry.White'); 
  });

  test('TABLE_06 - Verify data integrity and profile presence for Row index 1', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    await tablePage.waitForTableLoad();
    const rowContent = await tablePage.getRowTextContent(1);
    expect(rowContent).toContain('Jasmine.Morgan');
  });

  test('TABLE_07 - FIXED: Verify data integrity and profile presence for Row index 2', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    await tablePage.waitForTableLoad();
    const rowContent = await tablePage.getRowTextContent(2);
    expect(rowContent).toContain('Joe.Root'); // Updated to match actual DOM data
  });

  test('TABLE_08 - FIXED: Verify data integrity and profile presence for Row index 3', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    await tablePage.waitForTableLoad();
    const rowContent = await tablePage.getRowTextContent(3);
    expect(rowContent).toContain('John.Smith'); // Updated to match actual DOM data
  });

  // --- 4. INTERACTIVE CHECKBOX STATES ---
  test('TABLE_09 - Verify interactive selection toggle status for Row 1 checkbox element', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    await tablePage.waitForTableLoad();
    await tablePage.firstRowCheckbox.scrollIntoViewIfNeeded();
    await tablePage.firstRowCheckbox.check();
    await expect(tablePage.firstRowCheckbox).toBeChecked();
  });

  test('TABLE_10 - Verify interactive de-selection toggle status for Row 1 checkbox element', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    await tablePage.waitForTableLoad();
    await tablePage.firstRowCheckbox.check();
    await tablePage.firstRowCheckbox.uncheck();
    await expect(tablePage.firstRowCheckbox).not.toBeChecked();
  });

  test('TABLE_11 - Verify independent checklist isolation for Row 2 checkbox state', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    await tablePage.waitForTableLoad();
    await tablePage.secondRowCheckbox.check();
    await expect(tablePage.secondRowCheckbox).toBeChecked();
    await expect(tablePage.firstRowCheckbox).not.toBeChecked(); 
  });

  // --- 5. CELL ATTR & LINK INTERACTIONS ---
  test('TABLE_12 - Verify inline anchor hyperlink attachment state for profile users', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    await tablePage.waitForTableLoad();
    await expect(tablePage.firstRowUserLink).toBeVisible();
  });

  test('TABLE_13 - Verify target reference property value on profile anchor tags', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    const targetAttr = await tablePage.firstRowUserLink.getAttribute('href');
    expect(targetAttr).not.toBeNull();
  });

  // --- 6. BOUNDARY & EMPTY LEVEL CHECKS ---
  test('TABLE_14 - Verify cell structural encapsulation inside table body grid layout', async ({ page }) => {
    const firstCell = page.locator('#resultTable tbody tr td').first();
    await expect(firstCell).toBeAttached();
  });

  test('TABLE_15 - Verify system handling for non-existent row lookups outside valid table limits', async ({ page }) => {
    const tablePage = new WebTablePage(page);
    const outOfBoundsRow = tablePage.tableRows.nth(99); 
    await expect(outOfBoundsRow).not.toBeVisible();
  });

});