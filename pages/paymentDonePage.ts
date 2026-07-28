import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class PaymentDonePage extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  readonly orderPlacedMessage: Locator;
  readonly downloadInvoiceButton: Locator;
  readonly continueButton: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    this.orderPlacedMessage = page.locator('[data-qa="order-placed"]');

    this.downloadInvoiceButton = page.getByRole("link", {
      name: "Download Invoice",
    });

    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  // ─────────────────────────────────────────────
  // Page Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the payment completion page has loaded
   * by checking that the order placed confirmation message is visible.
   */
  async verifyPageLoaded() {
    await this.verifyVisible(this.orderPlacedMessage);
  }

  // ─────────────────────────────────────────────
  // Invoice
  // ─────────────────────────────────────────────

  /**
   * Clicks the Download Invoice link to download the order invoice.
   */
  async downloadInvoice() {
    await this.click(this.downloadInvoiceButton);
  }

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  /**
   * Clicks the Continue button to proceed from the payment
   * completion page.
   */
  async continue() {
    await this.click(this.continueButton);
  }
}
