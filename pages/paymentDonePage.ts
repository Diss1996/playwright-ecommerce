import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class PaymentDonePage extends BasePage {
  readonly orderPlacedMessage: Locator;
  readonly downloadInvoiceButton: Locator;
  readonly continueButton: Locator;

  constructor(page: Page) {
    super(page);

    this.orderPlacedMessage = page.locator('[data-qa="order-placed"]');
    this.downloadInvoiceButton = page.getByRole("link", {
      name: "Download Invoice",
    });
    this.continueButton = page.locator('[data-qa="continue-button"]');
  }

  async verifyPageLoaded() {
    await this.verifyVisible(this.orderPlacedMessage);
  }

  async downloadInvoice() {
    await this.click(this.downloadInvoiceButton);
  }

  async continue() {
    await this.click(this.continueButton);
  }
}