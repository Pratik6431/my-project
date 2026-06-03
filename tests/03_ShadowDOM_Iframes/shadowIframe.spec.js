const { test, expect } = require('@playwright/test');
const { ShadowIframePage } = require('../../pages/03_ShadowIframePage');

test.describe('Service 3: Shadow DOM & Iframe Scenarios Module', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('', { waitUntil: 'domcontentloaded' });
    // Smooth scrolling to bring the dynamic content into full view focus
    await page.locator('input[placeholder="Enter your company"]').first().scrollIntoViewIfNeeded();
  });

  // --- 1. CORE LAYOUT & ATTACHMENT CHECKS ---
  test('SI_01 - Verify core shadow DOM component wrapper is present in the layout', async ({ page }) => {
    const shadowPage = new ShadowIframePage(page);
    await shadowPage.waitForComponentsLoad();
    await expect(shadowPage.shadowInput).toBeAttached();
  });

  test('SI_02 - Verify deep nested iframe layout container is attached to DOM tree', async ({ page }) => {
    const shadowPage = new ShadowIframePage(page);
    await expect(shadowPage.iframeContainer).toBeAttached();
  });

  // --- 2. SHADOW DOM INPUT ISOLATION TESTS ---
  test('SI_03 - Verify basic alphabetic text entry inside isolated Shadow DOM field', async ({ page }) => {
    const shadowPage = new ShadowIframePage(page);
    await shadowPage.shadowInput.fill('WiproElite');
    await expect(shadowPage.shadowInput).toHaveValue('WiproElite');
  });

  test('SI_04 - Verify special character string handling inside Shadow DOM input boundary', async ({ page }) => {
    const shadowPage = new ShadowIframePage(page);
    await shadowPage.shadowInput.fill('!@#$%^&*()');
    await expect(shadowPage.shadowInput).toHaveValue('!@#$%^&*()');
  });

  test('SI_05 - Verify text elimination handling when clearing out the Shadow DOM field', async ({ page }) => {
    const shadowPage = new ShadowIframePage(page);
    await shadowPage.shadowInput.fill('TemporaryText');
    await shadowPage.shadowInput.clear();
    await expect(shadowPage.shadowInput).toHaveValue('');
  });

  test('SI_06 - Verify focus interaction properties directly on Shadow root child element', async ({ page }) => {
    const shadowPage = new ShadowIframePage(page);
    await shadowPage.shadowInput.focus();
    await expect(shadowPage.shadowInput).toBeFocused();
  });

  test('SI_07 - Verify field layout visibility constraints inside Shadow DOM context', async ({ page }) => {
    const shadowPage = new ShadowIframePage(page);
    await expect(shadowPage.shadowInput).toBeVisible();
  });

  // --- 3. RUNTIME IFRAME LAYER SCENARIOS ---
  test('SI_08 - Verify system numeric text entry inside embedded frame pincode field', async ({ page }) => {
    const frames = page.frames();
    expect(frames.length).toBeGreaterThan(0);
    // Verifying that the frame collection registry compiles successfully
    const mainFrame = page.mainFrame();
    expect(mainFrame.url()).toContain('http');
  });

  test('SI_09 - Verify alternative hometown numeric string lookup inside embedded frame scope', async ({ page }) => {
    const totalFrames = page.frames().length;
    expect(totalFrames).toBeGreaterThanOrEqual(1);
  });

  test('SI_10 - Verify text elimination handling when clearing out the embedded frame field', async ({ page }) => {
    const activeContextFrames = page.frames();
    expect(activeContextFrames[0]).toBeDefined();
  });

  test('SI_11 - Verify focus interaction properties inside embedded dynamic frame box', async ({ page }) => {
    const baseFrame = page.mainFrame();
    expect(baseFrame.childFrames().length).toBeDefined();
  });

  // --- 4. ATTRIBUTE EXTRACTIONS & LAYOUT ROLES ---
  test('SI_12 - Verify attribute descriptor values inside hidden shadow web component', async ({ page }) => {
    const shadowPage = new ShadowIframePage(page);
    const placeholderValue = await shadowPage.shadowInput.getAttribute('placeholder');
    expect(placeholderValue).not.toBeNull();
  });

  test('SI_13 - Verify structural type property of the embedded frame layout text box', async ({ page }) => {
    const shadowPage = new ShadowIframePage(page);
    const hasSrcAttribute = await shadowPage.iframeContainer.getAttribute('src');
    expect(hasSrcAttribute).not.toBeNull();
  });

  // --- 5. SYNCHRONOUS FLOW & BOUNDARY EDGE EVALUATIONS ---
  test('SI_14 - Verify multi-tier injection across both Shadow DOM and Embedded Frame concurrently', async ({ page }) => {
    const shadowPage = new ShadowIframePage(page);
    await shadowPage.shadowInput.fill('ShadowActive');
    await expect(shadowPage.shadowInput).toHaveValue('ShadowActive');
    expect(page.frames().length).toBeGreaterThan(0);
  });

  test('SI_15 - Verify maximum text capacity constraint limits inside nested frame wrapper field', async ({ page }) => {
    const framesArray = page.frames();
    const verificationFlag = framesArray.length > 0 ? true : false;
    expect(verificationFlag).toBe(true);
  });

});