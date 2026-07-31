import { Locator, Page, Download } from "@playwright/test";
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

  /**
   * Downloads the order invoice.
   *
   * @returns The downloaded invoice.
   */
  async downloadInvoice(): Promise<Download> {
    const downloadPromise = this.page.waitForEvent("download");

    await this.click(this.downloadInvoiceButton);

    return await downloadPromise;
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
