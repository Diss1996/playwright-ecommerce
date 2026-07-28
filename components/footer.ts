import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export class Footer extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  // Subscription
  readonly subscriptionHeading: Locator;
  readonly emailInput: Locator;
  readonly subscribeButton: Locator;
  readonly successMessage: Locator;

  // Footer
  readonly copyrightText: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    // Subscription
    this.subscriptionHeading = page.getByRole("heading", {
      name: "Subscription",
    });
    this.emailInput = page.locator("#susbscribe_email");
    this.subscribeButton = page.locator("#subscribe");
    this.successMessage = page.locator("#success-subscribe .alert");

    // Footer
    this.copyrightText = page.locator(".footer-bottom p");
  }

  // ─────────────────────────────────────────────
  // Subscription
  // ─────────────────────────────────────────────

  /**
   * Subscribes to the newsletter using the supplied email address.
   *
   * @param email - The email address to use for the subscription.
   */
  async subscribe(email: string) {
    await this.emailInput.fill(email);
    await this.click(this.subscribeButton);
  }

  // ─────────────────────────────────────────────
  // Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the Footer component is visible on the page
   * by checking that the Subscription heading is visible.
   */
  async verifyLoaded() {
    await this.verifyVisible(this.subscriptionHeading);
  }

  /**
   * Verifies that the newsletter subscription was successful
   * by checking that the success message is visible.
   */
  async verifySubscriptionSuccess() {
    await this.verifyVisible(this.successMessage);
  }
}
