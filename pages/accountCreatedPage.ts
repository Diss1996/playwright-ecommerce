import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class AccountCreatedPage extends BasePage {
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

    this.heading = page.getByTestId("account-created");
    this.continueButton = page.getByTestId("continue-button");
  }

  // ─────────────────────────────────────────────
  // Page Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the account creation confirmation page
   * has loaded successfully by checking the page heading.
   */
  async verifyPageLoaded() {
    await this.verifyText(this.heading, "Account Created!");
  }

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  /**
   * Clicks the Continue button to proceed from the
   * account creation confirmation page.
   */
  async clickContinue() {
    await this.click(this.continueButton);
  }
}
