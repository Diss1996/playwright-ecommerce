import { Page, Locator, expect } from "@playwright/test";

export class BasePage {
  constructor(protected page: Page) {}

  async click(locator: Locator) {
    await locator.click();
  }

  async verifyText(locator: Locator, text: string) {
    await expect(locator).toHaveText(text);
  }

  async verifyVisible(locator: Locator) {
    await expect(locator).toBeVisible();
  }

  async goto(path: string) {
    await this.page.goto(path, {
      waitUntil: "domcontentloaded",
    });
  }
}