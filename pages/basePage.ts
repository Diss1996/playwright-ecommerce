import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  // ─────────────────────────────────────────────
  // Actions
  // ─────────────────────────────────────────────

  /**
   * Clicks the specified locator.
   *
   * @param locator - The locator representing the element to click.
   */
  async click(locator: Locator) {
    await locator.click();
  }

  // ─────────────────────────────────────────────
  // Assertions
  // ─────────────────────────────────────────────

  /**
   * Verifies that the specified locator contains the expected text.
   *
   * @param locator - The locator representing the element to verify.
   * @param text - The expected text content of the element.
   */
  async verifyText(locator: Locator, text: string) {
    await expect(locator).toHaveText(text);
  }

  /**
   * Verifies that the specified element is visible on the page.
   *
   * @param locator - The locator representing the element to verify.
   */
  async verifyVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  /**
   * Navigates to the specified path and waits for the
   * DOM content to finish loading.
   *
   * @param path - The URL path to navigate to.
   */
  async goto(path: string) {
    await this.page.goto(path, {
      waitUntil: "domcontentloaded",
    });
  }
}
