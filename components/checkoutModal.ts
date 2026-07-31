import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export class CheckoutModal extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  readonly modal: Locator;
  readonly title: Locator;
  readonly message: Locator;

  readonly loginLink: Locator;
  readonly continueOnCartButton: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    this.modal = page.locator(".modal-dialog.modal-confirm");

    this.title = this.modal.getByRole("heading", {
      name: "Checkout",
    });

    this.message = this.modal.getByText(
      "Register / Login account to proceed on checkout.",
    );

    this.loginLink = this.modal.getByRole("link", {
      name: "Register / Login",
    });

    this.continueOnCartButton = this.modal.getByRole("button", {
      name: "Continue On Cart",
    });
  }

  // ─────────────────────────────────────────────
  // Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the checkout modal is visible.
   */
  async verifyLoaded() {
    await this.verifyVisible(this.modal);
  }

  /**
   * Verifies that the checkout message is displayed.
   */
  async verifyMessage() {
    await this.verifyText(
      this.message,
      "Register / Login account to proceed on checkout.",
    );
  }

  // ─────────────────────────────────────────────
  // Actions
  // ─────────────────────────────────────────────

  /**
   * Navigates to the login/registration page.
   */
  async clickLogin() {
    await this.click(this.loginLink);
  }

  /**
   * Closes the checkout modal and returns to the cart.
   */
  async continueOnCart() {
    await this.click(this.continueOnCartButton);
  }
}