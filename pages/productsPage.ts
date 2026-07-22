import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProductsPage extends BasePage {
  readonly title: Locator;
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  readonly allProducts: Locator;
  readonly productCards: Locator;
  readonly viewProductButtons: Locator;

  readonly addedModal: Locator;
  readonly addedModalTitle: Locator;
  readonly addedModalMessage: Locator;
  readonly viewCartLink: Locator;
  readonly continueShoppingButton: Locator;

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

    this.addedModal = page.locator(".modal-content");
    this.addedModalTitle = this.addedModal.getByRole("heading", {
      name: "Added!",
    });
    this.addedModalMessage = this.addedModal.getByText(
      "Your product has been added to cart.",
    );
    this.viewCartLink = this.addedModal.getByRole("link", {
      name: "View Cart",
    });
    this.continueShoppingButton = this.addedModal.getByRole("button", {
      name: "Continue Shopping",
    });
  }

  async goto() {
    await super.goto("/products");
  }

  async addProductToCart(productId: string) {
    const button = this.page
      .locator(`a.add-to-cart[data-product-id="${productId}"]`)
      .first();

    await this.click(button);
  }

  async verifyPageLoaded() {
    await this.verifyVisible(this.title);
  }

  async search(product: string) {
    await this.searchInput.fill(product);
    await this.searchButton.click();
  }

  async openProduct(index: number) {
    await this.viewProductButtons.nth(index - 1).click(); //opens by current position in the search
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

  async verifyAddedModalVisible() {
    await this.verifyVisible(this.addedModal);
  }

  async clickViewCart() {
    await this.click(this.viewCartLink);
  }

  async continueShopping() {
    await this.click(this.continueShoppingButton);
  }
}
