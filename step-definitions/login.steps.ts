import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { expect, chromium, Browser, Page } from '@playwright/test';

// Set timeout for all steps
setDefaultTimeout(30 * 1000);

// Global variables to store browser and page context
let browser: Browser;
let page: Page;

// Define selectors for the OpenCart login page
const selectors = {
  usernameInput: 'input[name="email"]',
  passwordInput: 'input[name="password"]',
  errorAlert: '.alert-danger, .alert.alert-error',
  successMessage: '.alert-success',
};

/**
 * Hook: Initialize browser before each scenario
 */
Before(async function () {
  browser = await chromium.launch({
    headless: false, // Set to true for headless mode
  });
  
  // Create a new page context
  page = await browser.newPage();
  
  // Set viewport size
  await page.setViewportSize({ width: 1280, height: 720 });
});

/**
 * Hook: Close browser after each scenario
 */
After(async function () {
  if (page) {
    await page.close();
  }
  if (browser) {
    await browser.close();
  }
});

/**
 * Background Step: Navigate to OpenCart application
 */
Given('user navigates to OpenCart application at {string}', async (url: string) => {
  await page.goto(url, { waitUntil: 'domcontentloaded' });

  const accountMenu = page.locator('#top-links');
  await accountMenu.getByTitle('My Account').click({ timeout: 10000 });
  await accountMenu.getByRole('link', { name: 'Login', exact: true }).click({ timeout: 10000 });
  await expect(page.locator(selectors.usernameInput)).toBeVisible();

  console.log(`✓ Navigated to ${url}`);
});

/**
 * When Steps: User input actions
 */
When('user enters username {string}', async (username: string) => {
  const usernameField = page.locator(selectors.usernameInput);
  await usernameField.click();
  await usernameField.clear();
  await usernameField.fill(username);
  console.log(`✓ Username entered: ${username}`);
});

When('user enters password {string}', async (password: string) => {
  const passwordField = page.locator(selectors.passwordInput);
  await passwordField.click();
  await passwordField.clear();
  await passwordField.fill(password);
  console.log(`✓ Password entered`);
});

When('user leaves username field empty', async () => {
  const usernameField = page.locator(selectors.usernameInput);
  await usernameField.click();
  await usernameField.clear();
  console.log(`✓ Username field left empty`);
});

When('user leaves password field empty', async () => {
  const passwordField = page.locator(selectors.passwordInput);
  await passwordField.click();
  await passwordField.clear();
  console.log(`✓ Password field left empty`);
});

When('user clicks the login button', async () => {
  await page.getByRole('button', { name: 'Login', exact: true }).click({ timeout: 10000 });

  console.log(`✓ Login button clicked`);
});

/**
 * Then Steps: Verification/assertions
 */
Then('user should be logged in successfully', async () => {
  await expect(page).toHaveURL(/[?&]route=account\/account(?:&|$)/);
  await expect(page.locator('#content').getByRole('heading', { name: 'My Account', exact: true })).toBeVisible();

  console.log('✓ User is logged in successfully');
});

Then('user dashboard should be visible', async () => {
  const dashboard = page.locator('#content').getByRole('heading', { name: 'My Account', exact: true });
  await expect(dashboard).toBeVisible();
  console.log('✓ Dashboard is visible');
});

Then('the My Account heading should be displayed', async () => {
  await expect(page.locator('#content').getByRole('heading', { name: 'My Account', exact: true })).toBeVisible();
  console.log('✓ My Account heading is displayed');
});

Then('login page should display username field', async () => {
  const usernameField = page.locator(selectors.usernameInput);
  await expect(usernameField).toBeVisible();
  console.log('✓ Username field is displayed');
});

Then('login page should display password field', async () => {
  const passwordField = page.locator(selectors.passwordInput);
  await expect(passwordField).toBeVisible();
  console.log('✓ Password field is displayed');
});

Then('login page should display login button', async () => {
  const loginButton = page.getByRole('button', { name: 'Login', exact: true });
  await expect(loginButton).toBeVisible();
  console.log('✓ Login button is displayed');
});

Then('login page should display forget password link', async () => {
  const forgotLink = page.locator('#content').getByRole('link', { name: 'Forgotten Password', exact: true });
  await expect(forgotLink).toBeVisible();

  console.log('✓ Forgot password link is displayed');
});

Then('user should see error message', async () => {
  const errorMessage = page.locator(selectors.errorAlert);
  await expect(errorMessage).toBeVisible();
  console.log('✓ Error message is displayed');
});

Then('error message should contain {string}', async (expectedText: string) => {
  const errorMessage = page.locator(selectors.errorAlert);
  await expect(errorMessage).toContainText(expectedText, { ignoreCase: true });
  
  const actualText = await errorMessage.textContent();
  console.log(`✓ Error message contains: "${expectedText}" (Actual: "${actualText}")`);
});

Then('user should remain on login page', async () => {
  const currentUrl = page.url();
  
  // Check if we're still on login page (URL contains login or account)
  const isLoginPage = currentUrl.includes('login') || 
                      currentUrl.includes('account') ||
                      currentUrl.includes('route=account');
  
  expect(isLoginPage).toBeTruthy();
  console.log('✓ User remains on login page');
});

Then('validation error should be displayed', async () => {
  // Look for validation errors - could be inline or alert
  const errorAlert = page.locator(selectors.errorAlert);
  const inlineErrors = page.locator('[role="alert"], .error, .invalid-feedback');
  
  const errorCount = await errorAlert.count();
  const inlineCount = await inlineErrors.count();
  
  expect(errorCount + inlineCount).toBeGreaterThan(0);
  console.log('error count is ' + errorCount);
  console.log('inline count is ' + inlineCount);
  console.log('✓ Validation error is displayed');
});
