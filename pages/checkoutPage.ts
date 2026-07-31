import { Locator, Page } from "@playwright/test";
import { BasePage } from "./basePage";
import { CartProduct } from "../test-data/products";
import { User } from "../test-data/users";

export class CheckoutPage extends BasePage {
  readonly checkoutInfo: Locator;
  readonly deliveryAddress: Locator;
  readonly billingAddress: Locator;

  // Order
  readonly orderTable: Locator;
  readonly orderRows: Locator;
  readonly totalAmount: Locator;
  readonly orderComment: Locator;
  readonly placeOrderButton: Locator;

  constructor(page: Page) {
    super(page);

    this.checkoutInfo = page.locator('[data-qa="checkout-info"]');
    this.deliveryAddress = page.locator("#address_delivery");
    this.billingAddress = page.locator("#address_invoice");

    // Order
    this.orderTable = page.locator("#cart_info");
    this.orderRows = page.locator('#cart_info tbody tr[id^="product-"]');
    this.totalAmount = page.locator("#cart_info .cart_total_price").last();
    this.orderComment = page.locator('textarea[name="message"]');
    this.placeOrderButton = page.getByRole("link", {
      name: "Place Order",
    });
  }

  // ─────────────────────────────────────────────
  // Page Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the checkout page has loaded successfully
   * by checking that the checkout information section is visible.
   */
  async verifyPageLoaded() {
    await this.verifyVisible(this.checkoutInfo);
  }

  // ─────────────────────────────────────────────
  // Order Information
  // ─────────────────────────────────────────────

  /**
   * Returns the number of products currently displayed
   * in the checkout order.
   *
   * @returns The number of product rows in the order.
   */
  async getProductCount() {
    return await this.orderRows.count();
  }

  /**
   * Returns the names of all products in the checkout order.
   *
   * @returns An array containing the names of the ordered products.
   */
  async getProductNames() {
    return await this.orderRows
      .locator(".cart_description h4")
      .allTextContents();
  }

  /**
   * Returns the categories of all products in the checkout order.
   *
   * @returns An array containing the categories of the ordered products.
   */
  async getProductCategories() {
    return await this.orderRows
      .locator(".cart_description p")
      .allTextContents();
  }

  /**
   * Returns the displayed prices of all products in the checkout order.
   *
   * @returns An array containing the prices of the ordered products.
   */
  async getProductPrices() {
    return await this.orderRows.locator(".cart_price p").allTextContents();
  }

  /**
   * Returns the quantities of all products in the checkout order.
   *
   * @returns An array containing the quantities of the ordered products
   * as displayed text.
   */
  async getProductQuantities() {
    return await this.orderRows
      .locator(".cart_quantity button")
      .allTextContents();
  }

  /**
   * Returns the total price of each product in the checkout order.
   *
   * @returns An array containing the total price for each ordered product.
   */
  async getProductTotals() {
    return await this.orderRows.locator(".cart_total_price").allTextContents();
  }

  // ─────────────────────────────────────────────
  // Address Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that an address displayed on the checkout page
   * matches the expected user information. Can be the billing address 
   * or the Delivery address
   *
   * @param address - The locator for the address section to verify.
   * @param user - The user data containing the expected address information.
   */
  async verifyAddress(address: Locator, user: User) {
    await this.verifyText(
      address.locator(".address_firstname.address_lastname"),
      `${user.title}. ${user.firstName} ${user.lastName}`,
    );

    if (user.company) {
      await this.verifyText(
        address.locator(".address_address1.address_address2").nth(0),
        user.company,
      );
    }

    await this.verifyText(
      address.locator(".address_address1.address_address2").nth(1),
      user.address,
    );

    if (user.address2) {
      await this.verifyText(
        address.locator(".address_address1.address_address2").nth(2),
        user.address2,
      );
    }

    await this.verifyText(
      address.locator(".address_city.address_state_name.address_postcode"),
      `${user.city} ${user.state} ${user.zipcode}`,
    );

    await this.verifyText(
      address.locator(".address_country_name"),
      user.country,
    );

    await this.verifyText(address.locator(".address_phone"), user.mobileNumber);
  }

  /**
   * Verifies that the delivery address matches the expected
   * address information for the specified user.
   *
   * @param user - The user data containing the expected delivery address.
   */
  async verifyDeliveryAddress(user: User) {
    await this.verifyAddress(this.deliveryAddress, user);
  }

  /**
   * Verifies that the billing address matches the expected
   * address information for the specified user.
   *
   * @param user - The user data containing the expected billing address.
   */
  async verifyBillingAddress(user: User) {
    await this.verifyAddress(this.billingAddress, user);
  }

  // ─────────────────────────────────────────────
  // Order Validation
  // ─────────────────────────────────────────────

  /**
   * Verifies that the products displayed in the checkout order
   * match the expected cart products.
   *
   * The method verifies the number of products and compares
   * each product's name, category, price, quantity, and total.
   *
   * @param products - The expected cart products to compare against
   * the checkout order.
   */
  async verifyProducts(products: CartProduct[]) {
    const count = await this.getProductCount();

    if (count !== products.length) {
      throw new Error(
        `Expected ${products.length} products, but found ${count} products on checkout page`,
      );
    }

    for (let i = 0; i < products.length; i++) {
      const row = this.orderRows.nth(i);

      await this.verifyText(
        row.locator(".cart_description h4"),
        products[i].name,
      );

      await this.verifyText(
        row.locator(".cart_description p"),
        products[i].category,
      );

      await this.verifyText(row.locator(".cart_price p"), products[i].price);

      await this.verifyText(
        row.locator(".cart_quantity button"),
        products[i].quantity.toString(),
      );

      await this.verifyText(
        row.locator(".cart_total_price"),
        products[i].total,
      );
    }
  }

  // ─────────────────────────────────────────────
  // Order Actions
  // ─────────────────────────────────────────────

  /**
   * Adds a comment to the order using the order comment field.
   *
   * @param comment - The comment to add to the order.
   */
  async addOrderComment(comment: string) {
    await this.orderComment.fill(comment);
  }

  /**
   * Clicks the Place Order button to proceed with placing the order.
   */
  async placeOrder() {
    await this.click(this.placeOrderButton);
  }
}
