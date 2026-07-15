import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class AccountCreatedPage extends BasePage {
  readonly heading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByTestId("account-created");
    this.continueButton = page.getByTestId("continue-button");
  }

  async verifyPageLoaded() {
    await this.verifyText(
      this.heading,
      "Account Created!"
    );
  }

  async clickContinue() {
    await this.click(this.continueButton);
  }
}