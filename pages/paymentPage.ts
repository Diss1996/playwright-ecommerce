import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { PaymentDetails } from "../test-data/paymentDetails";

export class PaymentPage extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  // Payment Form
  readonly paymentForm: Locator;
  readonly nameOnCardInput: Locator;
  readonly cardNumberInput: Locator;
  readonly cvcInput: Locator;
  readonly expiryMonthInput: Locator;
  readonly expiryYearInput: Locator;
  readonly payButton: Locator;

  // Order Success
  readonly successMessage: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    // Payment Form
    this.paymentForm = page.locator("#payment-form");

    this.nameOnCardInput = page.locator('[data-qa="name-on-card"]');
    this.cardNumberInput = page.locator('[data-qa="card-number"]');
    this.cvcInput = page.locator('[data-qa="cvc"]');
    this.expiryMonthInput = page.locator('[data-qa="expiry-month"]');
    this.expiryYearInput = page.locator('[data-qa="expiry-year"]');

    this.payButton = page.locator('[data-qa="pay-button"]');

    // Order Success
    this.successMessage = page.locator("#success_message .alert");
  }

  // ─────────────────────────────────────────────
  // Page Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the payment page has loaded successfully
   * by checking that the payment form is visible.
   */
  async verifyPageLoaded() {
    await this.verifyVisible(this.paymentForm);
  }

  // ─────────────────────────────────────────────
  // Payment Details
  // ─────────────────────────────────────────────

  /**
   * Fills in the payment form using the supplied payment details.
   *
   * @param payment - The payment details used to populate the payment form.
   */
  async enterPaymentDetails(payment: PaymentDetails) {
    await this.nameOnCardInput.fill(payment.nameOnCard);
    await this.cardNumberInput.fill(payment.cardNumber);
    await this.cvcInput.fill(payment.cvc);
    await this.expiryMonthInput.fill(payment.expiryMonth);
    await this.expiryYearInput.fill(payment.expiryYear);
  }

  // ─────────────────────────────────────────────
  // Payment Submission
  // ─────────────────────────────────────────────

  /**
   * Submits the payment form to place the order.
   */
  async payAndConfirmOrder() {
    await this.click(this.payButton);
  }

  // ─────────────────────────────────────────────
  // Order Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the order was successfully placed
   * by checking that the success message is visible.
   */
  async verifyOrderPlaced() {
    await this.verifyVisible(this.successMessage);
  }
}
