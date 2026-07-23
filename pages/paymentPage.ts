import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { PaymentDetails } from "../test-data/paymentDetails";

export class PaymentPage extends BasePage {
  // Payment form
  readonly paymentForm: Locator;
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payButton: Locator;

  // Order success message
  readonly successMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.paymentForm = page.locator("#payment-form");

    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');

    this.payButton = page.locator('[data-qa="pay-button"]');

    this.successMessage = page.locator("#success_message .alert");
  }

  async verifyPageLoaded() {
    await this.verifyVisible(this.paymentForm);
  }

  async enterPaymentDetails(payment: PaymentDetails) {
  await this.nameOnCardInput.fill(payment.nameOnCard);
  await this.cardNumberInput.fill(payment.cardNumber);
  await this.cvcInput.fill(payment.cvc);
  await this.expiryMonthInput.fill(payment.expiryMonth);
  await this.expiryYearInput.fill(payment.expiryYear);
}

  async payAndConfirmOrder() {
    await this.click(this.payButton);
  }

  async verifyOrderPlaced() {
    await this.verifyVisible(this.successMessage);
  }
}