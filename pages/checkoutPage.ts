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

  async verifyPageLoaded() {
    await this.verifyVisible(this.checkoutInfo);
  }

  async getProductCount() {
    return await this.orderRows.count();
  }

  async getProductNames() {
    return await this.orderRows
      .locator(".cart_description h4")
      .allTextContents();
  }

  async getProductCategories() {
    return await this.orderRows
      .locator(".cart_description p")
      .allTextContents();
  }

  async getProductPrices() {
    return await this.orderRows.locator(".cart_price p").allTextContents();
  }

  async getProductQuantities() {
    return await this.orderRows
      .locator(".cart_quantity button")
      .allTextContents();
  }

  async getProductTotals() {
    return await this.orderRows.locator(".cart_total_price").allTextContents();
  }

  async addOrderComment(comment: string) {
    await this.orderComment.fill(comment);
  }

  async placeOrder() {
    await this.click(this.placeOrderButton);
  }

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

  async verifyDeliveryAddress(user: User) {
    await this.verifyAddress(this.deliveryAddress, user);
  }

  async verifyBillingAddress(user: User) {
    await this.verifyAddress(this.billingAddress, user);
  }

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
}
