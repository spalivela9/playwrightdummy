/**
 * Playwright Utilities for Test Automation
 * Provides reusable helper functions for common test operations
 */

import { Page, expect } from '@playwright/test';

export class PlaywrightUtils {
  /**
   * Wait for an element to be visible and clickable
   */
  static async waitAndClick(page: Page, selector: string, timeout: number = 10000) {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    await element.click();
  }

  /**
   * Wait for and fill an input field
   */
  static async waitAndFill(page: Page, selector: string, text: string, timeout: number = 10000) {
    const element = page.locator(selector);
    await element.waitFor({ state: 'visible', timeout });
    await element.click();
    await element.clear();
    await element.fill(text);
  }

  /**
   * Check if element is visible
   */
  static async isElementVisible(page: Page, selector: string): Promise<boolean> {
    try {
      const element = page.locator(selector);
      await element.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get element text content
   */
  static async getElementText(page: Page, selector: string): Promise<string | null> {
    const element = page.locator(selector);
    return await element.textContent();
  }

  /**
   * Wait for navigation after an action
   */
  static async waitForNavigation(page: Page, action: () => Promise<void>) {
    await Promise.all([
      page.waitForNavigation({ waitUntil: 'networkidle' }),
      action(),
    ]);
  }

  /**
   * Get all text from multiple elements
   */
  static async getAllElementsText(page: Page, selector: string): Promise<string[]> {
    const elements = page.locator(selector);
    const count = await elements.count();
    const texts: string[] = [];

    for (let i = 0; i < count; i++) {
      const text = await elements.nth(i).textContent();
      if (text) {
        texts.push(text.trim());
      }
    }

    return texts;
  }

  /**
   * Wait for element to disappear
   */
  static async waitForElementToDisappear(page: Page, selector: string, timeout: number = 10000) {
    const element = page.locator(selector);
    await element.waitFor({ state: 'hidden', timeout });
  }

  /**
   * Check if error message contains expected text
   */
  static async verifyErrorMessage(
    page: Page,
    errorSelector: string,
    expectedText: string
  ): Promise<boolean> {
    try {
      const errorElement = page.locator(errorSelector);
      await expect(errorElement).toContainText(expectedText, { ignoreCase: true });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Scroll element into view
   */
  static async scrollIntoView(page: Page, selector: string) {
    const element = page.locator(selector);
    await element.scrollIntoViewIfNeeded();
  }

  /**
   * Get current page URL
   */
  static getCurrentUrl(page: Page): string {
    return page.url();
  }

  /**
   * Check if URL contains a specific string
   */
  static async urlContains(page: Page, urlPart: string): Promise<boolean> {
    const url = page.url();
    return url.includes(urlPart);
  }

  /**
   * Wait for URL to change
   */
  static async waitForUrlChange(page: Page, currentUrl: string, timeout: number = 10000) {
    await page.waitForFunction(
      (url) => window.location.href !== url,
      currentUrl,
      { timeout }
    );
  }

  /**
   * Take screenshot
   */
  static async takeScreenshot(page: Page, filename: string) {
    await page.screenshot({ path: `screenshots/${filename}.png` });
  }

  /**
   * Clear input field
   */
  static async clearInput(page: Page, selector: string) {
    const element = page.locator(selector);
    await element.click();
    await element.clear();
  }

  /**
   * Check if element has specific class
   */
  static async hasClass(page: Page, selector: string, className: string): Promise<boolean> {
    const element = page.locator(selector);
    const classAttribute = await element.getAttribute('class');
    return classAttribute?.includes(className) ?? false;
  }

  /**
   * Wait for multiple elements to be visible
   */
  static async waitForMultipleElements(page: Page, selectors: string[]): Promise<boolean> {
    try {
      for (const selector of selectors) {
        const element = page.locator(selector);
        await element.waitFor({ state: 'visible', timeout: 5000 });
      }
      return true;
    } catch {
      return false;
    }
  }
}

/**
 * Login Helper Class
 * Provides common login operations
 */
export class LoginHelper {
  /**
   * Perform login action
   */
  static async performLogin(
    page: Page,
    usernameSelector: string,
    passwordSelector: string,
    loginButtonSelector: string,
    username: string,
    password: string
  ) {
    // Fill username
    await PlaywrightUtils.waitAndFill(page, usernameSelector, username);

    // Fill password
    await PlaywrightUtils.waitAndFill(page, passwordSelector, password);

    // Click login button
    await PlaywrightUtils.waitAndClick(page, loginButtonSelector);

    // Wait for page to load
    await page.waitForLoadState('networkidle');
  }

  /**
   * Check if login was successful
   */
  static async isLoginSuccessful(page: Page, dashboardSelector: string): Promise<boolean> {
    try {
      const dashboard = page.locator(dashboardSelector);
      await dashboard.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Check if error message is displayed
   */
  static async isErrorDisplayed(page: Page, errorSelector: string): Promise<boolean> {
    return await PlaywrightUtils.isElementVisible(page, errorSelector);
  }

  /**
   * Get error message text
   */
  static async getErrorMessage(page: Page, errorSelector: string): Promise<string | null> {
    return await PlaywrightUtils.getElementText(page, errorSelector);
  }
}
