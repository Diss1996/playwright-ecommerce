import { Page, Locator, expect } from "@playwright/test";

export class AccountCreatedPage {
  readonly heading: Locator;
  readonly continueButton: Locator;

  constructor(private page: Page) {
    this.heading = page.locator('[data-qa="account-created"]');
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async clickContinueButton(){
    this.continueButton.click();
  }

  async verifyPageLoaded() {
  await expect(this.heading).toHaveText("Account Created!");
}
}
