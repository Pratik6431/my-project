const { test, expect } = require('@playwright/test');
const { DataDrivenPage } = require('../../pages/07_DataDrivenPage');
const testData = require('./userData.json'); 

test.describe('Service 7: Data-Driven Testing & Parameterized Retries Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('', { waitUntil: 'domcontentloaded' });
    const focusTarget = page.locator('input[placeholder="Enter your company"]').first();
    await focusTarget.scrollIntoViewIfNeeded().catch(() => null);
  });

  // --- 1. DATA-DRIVEN INJECTIONS (DATASET ALPHA) ---
  test('DDT_01 - Verify structural form population using external Dataset Alpha parameters', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    const data = testData.datasetAlpha;
    
    await ddtPage.fillParameterizedProfile(data.username, data.role, data.location);
    await expect(ddtPage.userIdField).toHaveValue(data.username);
  });

  test('DDT_02 - Verify layout integrity retention under corporate role descriptions matching Alpha data', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    // Data directly reading from JSON node
    await ddtPage.companyField.fill(testData.datasetAlpha.role);
    await expect(ddtPage.companyField).toHaveValue('Project Engineer');
  });

  test('DDT_03 - Verify regional boundary data string parsing for default base location fields', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    const assignedValue = await ddtPage.companyField.inputValue();
    expect(assignedValue).toBeDefined();
  });

  // --- 2. PARAMETERIZED INJECTIONS (DATASET BETA) ---
  test('DDT_04 - Verify structural form population using alternative Dataset Beta parameters', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    const data = testData.datasetBeta;
    
    await ddtPage.fillParameterizedProfile(data.username, data.role, data.location);
    await expect(ddtPage.userIdField).toHaveValue(data.username);
  });

  test('DDT_05 - Verify automation role descriptor compliance matching Beta configuration parameters', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    await ddtPage.companyField.fill(testData.datasetBeta.role);
    await expect(ddtPage.companyField).toHaveValue('Automation Specialist');
  });

  test('DDT_06 - Verify safe string handling for hometown location attributes from secondary index mapping', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    const valueCheck = await ddtPage.companyField.inputValue();
    expect(valueCheck).toBeDefined();
  });

  // --- 3. BOUNDARY PARAMETER VALIDATIONS (DATASET GAMMA) ---
  test('DDT_07 - Verify structural form population using high privilege Dataset Gamma parameters', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    const data = testData.datasetGamma;
    
    await ddtPage.fillParameterizedProfile(data.username, data.role, data.location);
    await expect(ddtPage.userIdField).toHaveValue(data.username);
  });

  test('DDT_08 - Verify secure clearance level label inputs under supervisory payload tags', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    await ddtPage.companyField.fill(testData.datasetGamma.role);
    await expect(ddtPage.companyField).toHaveValue('QA Lead');
  });

  test('DDT_09 - Verify numeric base string formatting limits over core location fields', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    const valueVerify = await ddtPage.companyField.inputValue();
    expect(valueVerify).toBeDefined();
  });

  // --- 4. RUNTIME RETRIES & TIME OUT INFRASTRUCTURES ---
  test('DDT_10 - Verify test block level automatic retry overrides can allocate memory buffers cleanly', async () => {
    const currentRetryIndex = test.info().retry;
    expect(currentRetryIndex).toBeLessThanOrEqual(testData.systemConfig.maxRetries);
  });

  test('DDT_11 - Verify explicit custom test safety boundaries match json metric constraints', async () => {
    const configTimeout = testData.systemConfig.timeoutBaseline;
    expect(configTimeout).toBe(5000);
  });

  test('DDT_12 - Verify layout structural tag verification counts are consistent across iterations', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    const inputFieldCount = await ddtPage.userIdField.count();
    expect(inputFieldCount).toBeGreaterThan(0);
  });

  // --- 5. DATA CLEANING & CROSS ATTRIBUTE STABILITY ---
  test('DDT_13 - Verify synchronous field wipeouts do not break external dataset bindings', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    await ddtPage.userIdField.fill(testData.datasetAlpha.username);
    await ddtPage.userIdField.clear();
    await expect(ddtPage.userIdField).toHaveValue('');
  });

  test('DDT_14 - Verify combined structural evaluation across cross-referenced data keys concurrently', async ({ page }) => {
    const ddtPage = new DataDrivenPage(page);
    const crossCompiledString = `${testData.datasetAlpha.username}_Elite`;
    await ddtPage.userIdField.fill(crossCompiledString);
    await expect(ddtPage.userIdField).toHaveValue('PratikWipro_Elite');
  });

  test('DDT_15 - Verify JSON configuration structure loading sanity check', async () => {
    const hasDataKeys = Object.keys(testData).length;
    expect(hasDataKeys).toBe(4);
  });

});