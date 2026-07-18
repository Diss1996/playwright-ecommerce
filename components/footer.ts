import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export class Footer extends BasePage {
  readonly subscriptionHeading: Locator;
  readonly emailInput: Locator;
  readonly subscribeButton: Locator;
  readonly successMessage: Locator;
  readonly copyrightText: Locator;

  constructor(page: Page) {
    super(page);

    this.subscriptionHeading = page.getByRole("heading", {
      name: "Subscription",
    });
    this.emailInput = page.locator("#susbscribe_email");
    this.subscribeButton = page.locator("#subscribe");
    this.successMessage = page.locator("#success-subscribe .alert");
    this.copyrightText = page.locator(".footer-bottom p");
  }

  async subscribe(email: string) {
    await this.emailInput.fill(email);
    await this.click(this.subscribeButton);
  }

  async verifyLoaded() {
    await this.verifyVisible(this.subscriptionHeading);
  }

  async verifySubscriptionSuccess() {
    await this.verifyVisible(this.successMessage);
  }
}
