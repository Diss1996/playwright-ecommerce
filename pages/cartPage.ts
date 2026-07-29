import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { CartProduct, Product } from "../test-data/products";

export class CartPage extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  readonly cartTable: Locator;
  readonly cartRows: Locator;

  readonly checkoutButton: Locator;

  readonly checkoutModal: Locator;
  readonly continueCartButton: Locator;
  readonly loginLink: Locator;

  readonly emptyCartMessage: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    this.cartTable = page.locator("#cart_info_table");
    this.cartRows = page.locator("#cart_info_table tbody tr");

    this.checkoutButton = page.locator(".check_out");

    this.checkoutModal = page.locator("#checkoutModal");
    this.continueCartButton = this.checkoutModal.getByRole("button", {
      name: "Continue On Cart",
    });
    this.loginLink = this.checkoutModal.getByRole("link", {
      name: "Register / Login",
    });

    this.emptyCartMessage = page.locator("#empty_cart");
  }

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  /**
   * Navigates to the shopping cart page.
   */
  async gotoCart() {
    await this.goto("/view_cart");
  }

  // ─────────────────────────────────────────────
  // Page Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the shopping cart table is visible,
   * indicating that the cart page has loaded successfully.
   */
  async verifyCartLoaded() {
    await this.verifyVisible(this.cartTable);
  }

  // ─────────────────────────────────────────────
  // Cart Product Information
  // ─────────────────────────────────────────────

  /**
   * Returns the number of products currently displayed in the cart.
   *
   * @returns The number of product rows in the cart.
   */
  async getProductCount() {
    return await this.cartRows.count();
  }

  /**
   * Returns the names of all products currently in the cart.
   *
   * @returns An array containing the names of the products in the cart.
   */
  async getProductNames() {
    return await this.cartRows
      .locator(".cart_description h4")
      .allTextContents();
  }

  /**
   * Returns the displayed prices of all products currently in the cart.
   *
   * @returns An array containing the product prices.
   */
  async getProductPrices() {
    return await this.cartRows.locator(".cart_price p").allTextContents();
  }

  /**
   * Returns the quantities of all products currently in the cart.
   *
   * @returns An array containing the product quantities as displayed text.
   */
  async getProductQuantities() {
    return await this.cartRows
      .locator(".cart_quantity button")
      .allTextContents();
  }

  /**
   * Retrieves all products currently in the cart and returns their
   * details as CartProduct objects.
   *
   * @returns An array containing the products and their cart information.
   */
  async getCartProducts(): Promise<CartProduct[]> {
    const products: CartProduct[] = [];

    const count = await this.cartRows.count();

    for (let i = 0; i < count; i++) {
      const row = this.cartRows.nth(i);

      products.push({
        id:
          (await row
            .locator(".cart_quantity_delete")
            .getAttribute("data-product-id")) ?? "",

        name: (await row.locator(".cart_description h4").textContent()) ?? "",

        category:
          (await row.locator(".cart_description p").textContent()) ?? "",

        price: (await row.locator(".cart_price p").textContent()) ?? "",

        quantity: Number(
          (await row.locator(".cart_quantity button").textContent()) ?? "0",
        ),

        total: (await row.locator(".cart_total_price").textContent()) ?? "",
      });
    }

    return products;
  }

  // ─────────────────────────────────────────────
  // Cart Product Actions
  // ─────────────────────────────────────────────

  /**
   * Removes a product from the cart using its product ID.
   *
   * @param productId - The ID of the product to remove.
   */
  async removeProduct(productId: string) {
    const productRow = this.page.locator(`#product-${productId}`);

    const deleteButton = productRow.locator(
      `.cart_quantity_delete[data-product-id="${productId}"]`,
    );

    await this.click(deleteButton);

    await expect(productRow).toBeHidden();
  }


  // ─────────────────────────────────────────────
  // Cart Product Validation
  // ─────────────────────────────────────────────

  /**
   * Verifies that the products currently in the cart match the
   * expected products.
   *
   * The method compares the number of products and validates
   * each product's ID, name, category, price, and quantity.
   *
   * @param products - The expected products to compare against the cart.
   */
  async verifyProducts(products: Product[]) {
    const cartProducts = await this.getCartProducts();

    expect(cartProducts).toHaveLength(products.length);

    for (let i = 0; i < products.length; i++) {
      expect(cartProducts[i].id).toBe(products[i].id);
      expect(cartProducts[i].name).toBe(products[i].name);
      expect(cartProducts[i].category).toBe(products[i].category);
      expect(cartProducts[i].price).toBe(products[i].price);
      expect(cartProducts[i].quantity).toBe(products[i].quantity);
    }
  }

  // ─────────────────────────────────────────────
  // Checkout
  // ─────────────────────────────────────────────

  /**
   * Clicks the Checkout button to begin the checkout process.
   */
  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }

  /**
   * Verifies that the checkout modal is visible.
   */
  async verifyCheckoutModal() {
    await this.verifyVisible(this.checkoutModal);
  }

  /**
   * Closes the checkout modal and continues shopping on the cart page.
   */
  async continueOnCart() {
    await this.click(this.continueCartButton);
  }

  /**
   * Clicks the Register / Login link in the checkout modal.
   */
  async clickLogin() {
    await this.click(this.loginLink);
  }

  // ─────────────────────────────────────────────
  // Cart State
  // ─────────────────────────────────────────────

  /**
   * Verifies that the empty cart message is visible.
   */
  async verifyEmptyCart() {
    await this.verifyVisible(this.emptyCartMessage);
  }
}
