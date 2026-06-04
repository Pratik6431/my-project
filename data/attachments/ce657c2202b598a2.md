# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: 05_Mouse_Keyboard_Actions/actionsCalendar.spec.js >> Service 5: Keyboard, Mouse Actions & File Upload Module >> ACT_03 - Verify clearing and resetting file attachment state back to empty baseline
- Location: tests/05_Mouse_Keyboard_Actions/actionsCalendar.spec.js:43:3

# Error details

```
Test timeout of 120000ms exceeded while running "beforeEach" hook.
```

```
TimeoutError: locator.scrollIntoViewIfNeeded: Timeout 120000ms exceeded.
Call log:
  - waiting for locator('input[placeholder="Enter your company"]').first()

```

# Test source

```ts
  1   | const { test, expect } = require('@playwright/test');
  2   | const { ActionsCalendarPage } = require('../../pages/05_ActionsCalendarPage');
  3   | const path = require('path');
  4   | const fs = require('fs');
  5   | 
  6   | test.describe('Service 5: Keyboard, Mouse Actions & File Upload Module', () => {
  7   | 
  8   |   let dummyFilePath;
  9   | 
  10  |   test.beforeAll(async () => {
  11  |   
  12  |     dummyFilePath = path.join(__dirname, 'wipro_nga_test_upload.txt');
  13  |     fs.writeFileSync(dummyFilePath, 'Playwright Technical Training Project Baseline 2026');
  14  |   });
  15  | 
  16  |   test.afterAll(async () => {
  17  |     
  18  |     if (fs.existsSync(dummyFilePath)) {
  19  |       fs.unlinkSync(dummyFilePath);
  20  |     }
  21  |   });
  22  | 
  23  |   test.beforeEach(async ({ page }) => {
  24  |     await page.goto('', { waitUntil: 'domcontentloaded' });
> 25  |     await page.locator('input[placeholder="Enter your company"]').first().scrollIntoViewIfNeeded();
      |                                                                           ^ TimeoutError: locator.scrollIntoViewIfNeeded: Timeout 120000ms exceeded.
  26  |   });
  27  | 
  28  |   // --- 1. SINGLE & MULTIPLE FILE UPLOAD LAYERS ---
  29  |   test('ACT_01 - Verify file upload element baseline layout presence inside the DOM', async ({ page }) => {
  30  |     const actPage = new ActionsCalendarPage(page);
  31  |     await actPage.waitForUploadFieldVisible();
  32  |     await expect(actPage.fileUploadInput).toBeAttached();
  33  |   });
  34  | 
  35  |   test('ACT_02 - Verify system capability to inject a single text file into the attachment box', async ({ page }) => {
  36  |     const actPage = new ActionsCalendarPage(page);
  37  |     await actPage.waitForUploadFieldVisible();
  38  |     await actPage.fileUploadInput.setInputFiles(dummyFilePath);
  39  |     const uploadedValue = await actPage.fileUploadInput.inputValue();
  40  |     expect(uploadedValue).not.toBeNull();
  41  |   });
  42  | 
  43  |   test('ACT_03 - Verify clearing and resetting file attachment state back to empty baseline', async ({ page }) => {
  44  |     const actPage = new ActionsCalendarPage(page);
  45  |     await actPage.fileUploadInput.setInputFiles(dummyFilePath);
  46  |     await actPage.fileUploadInput.setInputFiles([]);
  47  |     const clearedValue = await actPage.fileUploadInput.inputValue();
  48  |     expect(clearedValue).toBe('');
  49  |   });
  50  | 
  51  |   // --- 2. ADVANCED MOUSE ACTIONS & HOVER TRACKERS ---
  52  |   test('ACT_04 - Verify standard hover context trigger properties on targeted navigation elements', async ({ page }) => {
  53  |     const actPage = new ActionsCalendarPage(page);
  54  |     await actPage.hoverMenuButton.scrollIntoViewIfNeeded();
  55  |     await actPage.hoverMenuButton.hover();
  56  |     await expect(actPage.hoverMenuButton).toBeVisible();
  57  |   });
  58  | 
  59  |   test('ACT_05 - Verify mouse double click dispatcher on primary form action blocks', async ({ page }) => {
  60  |     const actPage = new ActionsCalendarPage(page);
  61  |     await actPage.hoverMenuButton.dblclick({ force: true }).catch(() => null);
  62  |     await expect(actPage.hoverMenuButton).toBeAttached();
  63  |   });
  64  | 
  65  |   test('ACT_06 - Verify mouse pointer alternative coordinate offset configuration bounds', async ({ page }) => {
  66  |     const actPage = new ActionsCalendarPage(page);
  67  |     await actPage.hoverMenuButton.click({ position: { x: 5, y: 5 }, force: true }).catch(() => null);
  68  |     expect(actPage.hoverMenuButton).toBeDefined();
  69  |   });
  70  | 
  71  |   // --- 3. HARDWARE KEYBOARD KEYPRESS SIMULATIONS ---
  72  |   test('ACT_07 - Verify keyboard standard character injection flow behavior on focus inputs', async ({ page }) => {
  73  |     const actPage = new ActionsCalendarPage(page);
  74  |     await actPage.targetInputField.click();
  75  |     
  76  |     await page.keyboard.press('KeyW');
  77  |     await page.keyboard.press('KeyI');
  78  |     const boxValue = await actPage.targetInputField.inputValue();
  79  |     expect(boxValue).toBeDefined();
  80  |   });
  81  | 
  82  |   test('ACT_08 - Verify key backspace cleanup handling actions natively inside text boxes', async ({ page }) => {
  83  |     const actPage = new ActionsCalendarPage(page);
  84  |     await actPage.targetInputField.click();
  85  |     await page.keyboard.type('ABC');
  86  |     await page.keyboard.press('Backspace');
  87  |     
  88  |     const intermediateString = await actPage.targetInputField.inputValue();
  89  |     expect(intermediateString).not.toContain('C');
  90  |   });
  91  | 
  92  |   test('ACT_09 - Verify keyboard select-all command chord sequences execution safety', async ({ page }) => {
  93  |     const actPage = new ActionsCalendarPage(page);
  94  |     await actPage.targetInputField.click();
  95  |     await page.keyboard.press('Control+A');
  96  |     await expect(actPage.targetInputField).toBeAttached();
  97  |   });
  98  | 
  99  |   // --- 4. CALENDAR TIMELINE & BASKET INTEGRATION CHECKS ---
  100 |   test('ACT_10 - Verify date layout container presence validation on current active forms', async ({ page }) => {
  101 |     const dateComponent = page.locator('input[type="date"]').first();
  102 |     const presenceFlag = await dateComponent.count();
  103 |     expect(presenceFlag).toBeDefined();
  104 |   });
  105 | 
  106 |   test('ACT_11 - Verify manually overriding text inside calendar inputs using direct date format injections', async ({ page }) => {
  107 |     const dateComponent = page.locator('input[type="date"]').first();
  108 |     const count = await dateComponent.count();
  109 |     if (count > 0) {
  110 |       await dateComponent.fill('2026-11-13');
  111 |       await expect(dateComponent).toHaveValue('2026-11-13');
  112 |     } else {
  113 |       expect(count).toBe(0);
  114 |     }
  115 |   });
  116 | 
  117 |   test('ACT_12 - Verify alternative calendar field value attribute capture properties', async ({ page }) => {
  118 |     const dateComponent = page.locator('input[type="date"]').first();
  119 |     if (await dateComponent.count() > 0) {
  120 |       const typeValue = await dateComponent.getAttribute('type');
  121 |       expect(typeValue).toBe('date');
  122 |     } else {
  123 |       expect(true).toBe(true);
  124 |     }
  125 |   });
```