import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export class AddedToCartModal extends BasePage {
  readonly modal: Locator;
  readonly title: Locator;
  readonly message: Locator;
  readonly viewCartLink: Locator;
  readonly continueShoppingButton: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    this.modal = page.locator(".modal-content");

    this.title = this.modal.getByRole("heading", {
      name: "Added!",
    });

    this.message = this.modal.getByText(
      "Your product has been added to cart.",
    );

    this.viewCartLink = this.modal.getByRole("link", {
      name: "View Cart",
    });

    this.continueShoppingButton = this.modal.getByRole("button", {
      name: "Continue Shopping",
    });
  }

  // ─────────────────────────────────────────────
  // Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the "Added to Cart" modal is visible.
   */
  async verifyVisible() {
    await super.verifyVisible(this.modal);
  }

  // ─────────────────────────────────────────────
  // Actions
  // ─────────────────────────────────────────────

  /**
   * Navigates to the cart from the "Added to Cart" modal.
   */
  async viewCart() {
    await this.click(this.viewCartLink);
  }

  /**
   * Closes the modal and continues shopping.
   */
  async continueShopping() {
    await this.click(this.continueShoppingButton);
  }
}