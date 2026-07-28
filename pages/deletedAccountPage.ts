import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class DeletedAccountPage extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  readonly heading: Locator;
  readonly continueButton: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    this.heading = page.getByTestId("account-deleted");
    this.continueButton = page.getByTestId("continue-button");
  }

  // ─────────────────────────────────────────────
  // Page Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the account deletion confirmation page
   * has loaded successfully by checking the page heading.
   */
  async verifyPageLoaded() {
    await this.verifyText(this.heading, "Account Deleted!");
  }

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  /**
   * Clicks the Continue button to proceed from the
   * account deletion confirmation page.
   */
  async clickContinue() {
    await this.click(this.continueButton);
  }
}
