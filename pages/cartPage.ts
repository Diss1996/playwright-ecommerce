import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { CartProduct } from "../test-data/products";
import { Product } from "../test-data/products";

export class CartPage extends BasePage {
  readonly cartTable: Locator;
  readonly cartRows: Locator;

  readonly checkoutButton: Locator;

  readonly checkoutModal: Locator;
  readonly continueCartButton: Locator;
  readonly loginLink: Locator;

  readonly emptyCartMessage: Locator;

  constructor(page: Page) {
    super(page);

    this.cartTable = page.locator("#cart_info_table");
    this.cartRows = page.locator("#cart_info_table tbody tr");
    this.checkoutButton = page.locator(".check_out");
    this.checkoutModal = page.locator("#checkoutModal");
    this.continueCartButton = this.checkoutModal.getByRole("button", {
      name: "Continue On Cart",
    });
    this.loginLink = this.checkoutModal.getByText("Register / Login");
    this.emptyCartMessage = page.locator("#empty_cart");
  }

  async gotoCart() {
    await this.goto("/view_cart");
  }

  async verifyCartLoaded() {
    await this.verifyVisible(this.cartTable);
  }

  async getProductCount() {
    return await this.cartRows.count();
  }

  async getProductNames() {
    return await this.cartRows
      .locator(".cart_description h4")
      .allTextContents();
  }

  async getProductPrices() {
    return await this.cartRows.locator(".cart_price p").allTextContents();
  }

  async getProductQuantities() {
    return await this.cartRows
      .locator(".cart_quantity button")
      .allTextContents();
  }

  async removeProduct(productId: string) {
    const deleteButton = this.page.locator(
      `.cart_quantity_delete[data-product-id="${productId}"]`,
    );

    await this.click(deleteButton);
  }

  async proceedToCheckout() {
    await this.click(this.checkoutButton);
  }

  async verifyCheckoutModal() {
    await this.verifyVisible(this.checkoutModal);
  }

  async continueOnCart() {
    await this.click(this.continueCartButton);
  }

  async clickLogin() {
    await this.click(this.loginLink);
  }

  async verifyEmptyCart() {
    await this.verifyVisible(this.emptyCartMessage);
  }

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
}
