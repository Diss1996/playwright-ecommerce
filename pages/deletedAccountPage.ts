import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class DeletedAccountPage extends BasePage {
  readonly heading: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.heading = page.getByTestId("account-deleted");
    this.continueButton = page.getByTestId("continue-button");
  }

  async verifyPageLoaded() {
    await this.verifyText(
      this.heading,
      "Account Deleted!"
    );
  }

  async clickContinue() {
    await this.click(this.continueButton);
  }
}