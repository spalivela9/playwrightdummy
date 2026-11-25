/**
 * Example Step Definitions
 * This file demonstrates how to add new steps for extended functionality
 * Copy patterns from here to extend login.steps.ts
 */

import { Given, When, Then } from '@cucumber/cucumber';
import { expect, Page } from '@playwright/test';

// Example selectors
const exampleSelectors = {
  rememberMeCheckbox: 'input[name="remember_me"]',
  successAlert: '.alert-success',
  userProfileName: '.user-profile .name',
  logoutButton: 'a:has-text("Logout")',
  newAccountLink: 'a:has-text("Create Account"), a:has-text("Register")',
  passwordVisibilityToggle: 'button.toggle-password',
};

/**
 * EXAMPLE: Additional Setup Steps
 */

Given('user accepts cookies if prompted', async (page: Page) => {
  try {
    const cookieAcceptButton = page.locator('button:has-text("Accept"), button:has-text("OK")').first();
    if (await cookieAcceptButton.isVisible({ timeout: 3000 })) {
      await cookieAcceptButton.click();
      console.log('✓ Cookies accepted');
    }
  } catch (e) {
    // No cookie banner found, continue
    console.log('✓ No cookie banner found');
  }
});

Given('user is on the login page', async (page: Page) => {
  const loginForm = page.locator('form:has-text("Login"), form:has-text("Sign In")').first();
  await expect(loginForm).toBeVisible();
  console.log('✓ User is on login page');
});

/**
 * EXAMPLE: Additional User Actions
 */

When('user checks the remember me checkbox', async (page: Page) => {
  const rememberCheckbox = page.locator(exampleSelectors.rememberMeCheckbox);
  if (await rememberCheckbox.isVisible()) {
    await rememberCheckbox.check();
    console.log('✓ Remember me checkbox checked');
  }
});

When('user clicks the forgot password link', async (page: Page) => {
  const forgotLink = page.locator(exampleSelectors.logoutButton).first();
  await forgotLink.click();
  console.log('✓ Forgot password link clicked');
});

When('user clicks the logout button', async (page: Page) => {
  const logoutButton = page.locator(exampleSelectors.logoutButton);
  await logoutButton.click();
  console.log('✓ Logout button clicked');
});

When('user waits {int} seconds', async (seconds: number, page: Page) => {
  await page.waitForTimeout(seconds * 1000);
  console.log(`✓ Waited ${seconds} seconds`);
});

When('user clicks on the new account link', async (page: Page) => {
  const newAccountLink = page.locator(exampleSelectors.newAccountLink);
  await newAccountLink.click();
  console.log('✓ New account link clicked');
});

When('user toggles password visibility', async (page: Page) => {
  const toggleButton = page.locator(exampleSelectors.passwordVisibilityToggle);
  if (await toggleButton.isVisible()) {
    await toggleButton.click();
    console.log('✓ Password visibility toggled');
  }
});

/**
 * EXAMPLE: Additional Verifications
 */

Then('success message should be displayed', async (page: Page) => {
  const successMessage = page.locator(exampleSelectors.successAlert);
  await expect(successMessage).toBeVisible();
  const text = await successMessage.textContent();
  console.log(`✓ Success message displayed: ${text}`);
});

Then('user name should display {string}', async (expectedName: string, page: Page) => {
  const profileName = page.locator(exampleSelectors.userProfileName);
  await expect(profileName).toContainText(expectedName);
  console.log(`✓ User name displayed: ${expectedName}`);
});

Then('user should be redirected to {string}', async (expectedUrl: string, page: Page) => {
  const currentUrl = page.url();
  expect(currentUrl).toContain(expectedUrl);
  console.log(`✓ User redirected to: ${currentUrl}`);
});

Then('logout button should be visible', async (page: Page) => {
  const logoutButton = page.locator(exampleSelectors.logoutButton);
  await expect(logoutButton).toBeVisible();
  console.log('✓ Logout button is visible');
});

Then('register link should be visible', async (page: Page) => {
  const registerLink = page.locator(exampleSelectors.newAccountLink);
  await expect(registerLink).toBeVisible();
  console.log('✓ Register link is visible');
});

Then('page title should be {string}', async (expectedTitle: string, page: Page) => {
  const title = await page.title();
  expect(title).toContain(expectedTitle);
  console.log(`✓ Page title: ${title}`);
});

Then('page should contain {string}', async (expectedText: string, page: Page) => {
  const pageContent = await page.textContent('body');
  expect(pageContent).toContain(expectedText);
  console.log(`✓ Page contains: ${expectedText}`);
});

/**
 * EXAMPLE: Data Table Support
 * For more complex scenarios with multiple data inputs
 */

import { DataTable } from '@cucumber/cucumber';

// Example: Multiple login attempts
When('user tries to login with the following credentials:', async (dataTable: DataTable, page: Page) => {
  const rows = dataTable.hashes();

  for (const row of rows) {
    const usernameInput = page.locator('input[name="email"]');
    const passwordInput = page.locator('input[name="password"]');
    const loginButton = page.locator('button[type="submit"]');

    await usernameInput.fill(row.username);
    await passwordInput.fill(row.password);
    await loginButton.click();

    console.log(`✓ Attempted login with: ${row.username}`);

    // Small delay between attempts
    await page.waitForTimeout(1000);
  }
});

/**
 * EXAMPLE: Conditional Steps
 */

Then('user should {string}', async (action: string, page: Page) => {
  switch (action.toLowerCase()) {
    case 'be logged in':
      const dashboard = page.locator('.dashboard, .account-page');
      await expect(dashboard).toBeVisible();
      console.log('✓ User is logged in');
      break;

    case 'be logged out':
      const loginForm = page.locator('form:has-text("Login")').first();
      await expect(loginForm).toBeVisible();
      console.log('✓ User is logged out');
      break;

    case 'see an error':
      const errorMessage = page.locator('.alert-danger, .error-message');
      await expect(errorMessage).toBeVisible();
      console.log('✓ Error is visible');
      break;

    default:
      throw new Error(`Unknown action: ${action}`);
  }
});

/**
 * EXAMPLE: Performance/Network Tests
 */

Then('page should load in less than {int} seconds', async (maxSeconds: number, page: Page) => {
  const navigationTiming = await page.evaluate(() => {
    const timing = performance.timing;
    return timing.loadEventEnd - timing.navigationStart;
  });

  const loadTime = navigationTiming / 1000;
  expect(loadTime).toBeLessThan(maxSeconds);
  console.log(`✓ Page loaded in ${loadTime.toFixed(2)} seconds`);
});

/**
 * EXAMPLE: Screenshot/Evidence Collection
 */

Then('user should take a screenshot named {string}', async (screenshotName: string, page: Page) => {
  try {
    // Create screenshots directory if it doesn't exist
    const fs = require('fs');
    if (!fs.existsSync('screenshots')) {
      fs.mkdirSync('screenshots');
    }

    await page.screenshot({ path: `screenshots/${screenshotName}.png` });
    console.log(`✓ Screenshot saved: ${screenshotName}.png`);
  } catch (e) {
    console.log(`✗ Failed to save screenshot: ${e}`);
  }
});

/**
 * EXAMPLE: Element State Verification
 */

Then('element {string} should be {string}', async (selector: string, state: string, page: Page) => {
  const element = page.locator(selector);

  switch (state.toLowerCase()) {
    case 'visible':
      await expect(element).toBeVisible();
      console.log(`✓ Element is visible: ${selector}`);
      break;

    case 'hidden':
      await expect(element).toBeHidden();
      console.log(`✓ Element is hidden: ${selector}`);
      break;

    case 'enabled':
      await expect(element).toBeEnabled();
      console.log(`✓ Element is enabled: ${selector}`);
      break;

    case 'disabled':
      await expect(element).toBeDisabled();
      console.log(`✓ Element is disabled: ${selector}`);
      break;

    case 'checked':
      await expect(element).toBeChecked();
      console.log(`✓ Element is checked: ${selector}`);
      break;

    case 'unchecked':
      await expect(element).not.toBeChecked();
      console.log(`✓ Element is unchecked: ${selector}`);
      break;

    default:
      throw new Error(`Unknown state: ${state}`);
  }
});

/**
 * USAGE EXAMPLES IN FEATURE FILE:
 *
 * # Additional Setup
 * Given user is on the login page
 * Given user accepts cookies if prompted
 *
 * # Additional Actions
 * When user checks the remember me checkbox
 * When user clicks the forgot password link
 * When user toggles password visibility
 * When user clicks on the new account link
 * When user waits 2 seconds
 *
 * # Additional Verifications
 * Then success message should be displayed
 * Then user name should display "John Doe"
 * Then user should be redirected to "/account/account"
 * Then logout button should be visible
 * Then page title should be "My Account"
 *
 * # Conditional
 * Then user should "be logged in"
 * Then user should "see an error"
 *
 * # State Checks
 * Then element "button.submit" should be "enabled"
 * Then element "input[name='email']" should be "visible"
 *
 * # Data Tables
 * When user tries to login with the following credentials:
 *   | username         | password      |
 *   | user1@test.com   | Password123   |
 *   | user2@test.com   | WrongPass     |
 *
 * # Performance
 * Then page should load in less than 5 seconds
 *
 * # Evidence
 * Then user should take a screenshot named "successful_login"
 */
