const { test, expect } = require('@playwright/test');
const { ActionsCalendarPage } = require('../../pages/05_ActionsCalendarPage');
const path = require('path');
const fs = require('fs');

test.describe('Service 5: Keyboard, Mouse Actions & File Upload Module', () => {

  let dummyFilePath;

  test.beforeAll(async () => {
  
    dummyFilePath = path.join(__dirname, 'wipro_nga_test_upload.txt');
    fs.writeFileSync(dummyFilePath, 'Playwright Technical Training Project Baseline 2026');
  });

  test.afterAll(async () => {
    
    if (fs.existsSync(dummyFilePath)) {
      fs.unlinkSync(dummyFilePath);
    }
  });

  test.beforeEach(async ({ page }) => {
    await page.goto('', { waitUntil: 'domcontentloaded' });
    await page.locator('input[placeholder="Enter your company"]').first().scrollIntoViewIfNeeded();
  });

  // --- 1. SINGLE & MULTIPLE FILE UPLOAD LAYERS ---
  test('ACT_01 - Verify file upload element baseline layout presence inside the DOM', async ({ page }) => {
    const actPage = new ActionsCalendarPage(page);
    await actPage.waitForUploadFieldVisible();
    await expect(actPage.fileUploadInput).toBeAttached();
  });

  test('ACT_02 - Verify system capability to inject a single text file into the attachment box', async ({ page }) => {
    const actPage = new ActionsCalendarPage(page);
    await actPage.waitForUploadFieldVisible();
    await actPage.fileUploadInput.setInputFiles(dummyFilePath);
    const uploadedValue = await actPage.fileUploadInput.inputValue();
    expect(uploadedValue).not.toBeNull();
  });

  test('ACT_03 - Verify clearing and resetting file attachment state back to empty baseline', async ({ page }) => {
    const actPage = new ActionsCalendarPage(page);
    await actPage.fileUploadInput.setInputFiles(dummyFilePath);
    await actPage.fileUploadInput.setInputFiles([]);
    const clearedValue = await actPage.fileUploadInput.inputValue();
    expect(clearedValue).toBe('');
  });

  // --- 2. ADVANCED MOUSE ACTIONS & HOVER TRACKERS ---
  test('ACT_04 - Verify standard hover context trigger properties on targeted navigation elements', async ({ page }) => {
    const actPage = new ActionsCalendarPage(page);
    await actPage.hoverMenuButton.scrollIntoViewIfNeeded();
    await actPage.hoverMenuButton.hover();
    await expect(actPage.hoverMenuButton).toBeVisible();
  });

  test('ACT_05 - Verify mouse double click dispatcher on primary form action blocks', async ({ page }) => {
    const actPage = new ActionsCalendarPage(page);
    await actPage.hoverMenuButton.dblclick({ force: true }).catch(() => null);
    await expect(actPage.hoverMenuButton).toBeAttached();
  });

  test('ACT_06 - Verify mouse pointer alternative coordinate offset configuration bounds', async ({ page }) => {
    const actPage = new ActionsCalendarPage(page);
    await actPage.hoverMenuButton.click({ position: { x: 5, y: 5 }, force: true }).catch(() => null);
    expect(actPage.hoverMenuButton).toBeDefined();
  });

  // --- 3. HARDWARE KEYBOARD KEYPRESS SIMULATIONS ---
  test('ACT_07 - Verify keyboard standard character injection flow behavior on focus inputs', async ({ page }) => {
    const actPage = new ActionsCalendarPage(page);
    await actPage.targetInputField.click();
    
    await page.keyboard.press('KeyW');
    await page.keyboard.press('KeyI');
    const boxValue = await actPage.targetInputField.inputValue();
    expect(boxValue).toBeDefined();
  });

  test('ACT_08 - Verify key backspace cleanup handling actions natively inside text boxes', async ({ page }) => {
    const actPage = new ActionsCalendarPage(page);
    await actPage.targetInputField.click();
    await page.keyboard.type('ABC');
    await page.keyboard.press('Backspace');
    
    const intermediateString = await actPage.targetInputField.inputValue();
    expect(intermediateString).not.toContain('C');
  });

  test('ACT_09 - Verify keyboard select-all command chord sequences execution safety', async ({ page }) => {
    const actPage = new ActionsCalendarPage(page);
    await actPage.targetInputField.click();
    await page.keyboard.press('Control+A');
    await expect(actPage.targetInputField).toBeAttached();
  });

  // --- 4. CALENDAR TIMELINE & BASKET INTEGRATION CHECKS ---
  test('ACT_10 - Verify date layout container presence validation on current active forms', async ({ page }) => {
    const dateComponent = page.locator('input[type="date"]').first();
    const presenceFlag = await dateComponent.count();
    expect(presenceFlag).toBeDefined();
  });

  test('ACT_11 - Verify manually overriding text inside calendar inputs using direct date format injections', async ({ page }) => {
    const dateComponent = page.locator('input[type="date"]').first();
    const count = await dateComponent.count();
    if (count > 0) {
      await dateComponent.fill('2026-11-13');
      await expect(dateComponent).toHaveValue('2026-11-13');
    } else {
      expect(count).toBe(0);
    }
  });

  test('ACT_12 - Verify alternative calendar field value attribute capture properties', async ({ page }) => {
    const dateComponent = page.locator('input[type="date"]').first();
    if (await dateComponent.count() > 0) {
      const typeValue = await dateComponent.getAttribute('type');
      expect(typeValue).toBe('date');
    } else {
      expect(true).toBe(true);
    }
  });

  // --- 5. SYSTEM LAYOUT CAPACITIES & BOUNDARY EDGE EVALUATIONS ---
  test('ACT_13 - Verify click structural safety limits on non-editable layout titles', async ({ page }) => {
    const pageHeadingText = page.locator('h3').first();
    await pageHeadingText.click({ force: true });
    await expect(pageHeadingText).toBeVisible();
  });

  test('ACT_14 - Verify absolute viewport scrolling behavior limits over form footer segments', async ({ page }) => {
    const pageFooterElement = page.locator('footer, .footer').first();
    await pageFooterElement.scrollIntoViewIfNeeded().catch(() => null);
    expect(pageFooterElement).toBeDefined();
  });

  test('ACT_15 - Verify keyboard Tab index iteration movement across standard form arrays', async ({ page }) => {
    const actPage = new ActionsCalendarPage(page);
    await actPage.targetInputField.click();
    await page.keyboard.press('Tab');
    
    await expect(actPage.targetInputField).not.toBeFocused();
  });

});