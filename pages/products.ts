import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProductsPage extends BasePage {
  readonly title: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  readonly allProducts: Locator;
  readonly productCards: Locator;
  readonly viewProductButtons: Locator;
  readonly adCloseButton: Locator;

  constructor(page: Page) {
    super(page);

    this.title = page.getByRole("heading", {
      name: "All Products",
    });

    this.searchInput = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");

    this.allProducts = page.locator(".features_items");
    this.productCards = page.locator(".product-image-wrapper");
    this.viewProductButtons = page.getByRole("link", {
      name: "View Product",
    });

    this.adCloseButton = this.page.locator("#dismiss-button-element");
  }

  async goto() {
    await super.goto("/products");
  }

  async verifyPageLoaded() {
    await this.verifyVisible(this.title);
  }

  async search(product: string) {
    await this.searchInput.fill(product);
    await this.searchButton.click();
  }

  async openProduct(index: number) {
    await this.viewProductButtons.nth(index).click();
  }

  async productCount() {
    return await this.productCards.count();
  }

  async verifySearchResultsVisible() {
    await this.verifyVisible(this.productCards.first());
  }

  async verifyProductsDisplayed() {
    await this.verifyVisible(this.allProducts);
  }

  async getProductNames() {
    return await this.page.locator(".productinfo p").allTextContents();
  }

  async closeAdIfPresent() {
  try {
    if (await this.adCloseButton.isVisible({ timeout: 500 })) {
      await this.adCloseButton.click();
    }
  } catch {
    // Ad wasn't present or disappeared before we could click it.
  }
}
}
