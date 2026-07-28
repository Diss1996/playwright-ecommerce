import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";

export class ProductsPage extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  // Page
  readonly title: Locator;
  readonly allProducts: Locator;
  readonly productCards: Locator;
  readonly viewProductButtons: Locator;

  // Search
  readonly searchInput: Locator;
  readonly searchButton: Locator;

  // Add to Cart Modal
  readonly addedModal: Locator;
  readonly addedModalTitle: Locator;
  readonly addedModalMessage: Locator;
  readonly viewCartLink: Locator;
  readonly continueShoppingButton: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    // Page
    this.title = page.locator("h2.title.text-center");

    this.allProducts = page.locator(".features_items");
    this.productCards = page.locator(".product-image-wrapper");
    this.viewProductButtons = page.getByRole("link", {
      name: "View Product",
    });

    // Search
    this.searchInput = page.locator("#search_product");
    this.searchButton = page.locator("#submit_search");

    // Add to Cart Modal
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

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  /**
   * Navigates to the Products page.
   */
  async goto() {
    await super.goto("/products");
  }

  // ─────────────────────────────────────────────
  // Page Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the Products page has loaded successfully
   * by checking that the page title is visible.
   */
  async verifyPageLoaded() {
    await this.verifyVisible(this.title);
  }

  /**
   * Verifies that the Products page title contains the expected
   * category and product search terms.
   *
   * @param category - The expected product category in the page title.
   * @param product - The expected product search term in the page title.
   */
  async verifyProductsSearch(category: string, product: string) {
    await expect(this.title).toContainText(category);
    await expect(this.title).toContainText(product);
  }

  /**
   * Verifies that product cards are visible on the page.
   *
   * This is used to confirm that search results are displayed.
   */
  async verifySearchResultsVisible() {
    await this.verifyVisible(this.productCards.first());
  }

  /**
   * Verifies that the products section is visible on the page.
   */
  async verifyProductsDisplayed() {
    await this.verifyVisible(this.allProducts);
  }

  /**
   * Verifies that every displayed product name contains the
   * specified search term.
   *
   * The comparison is case-insensitive.
   *
   * @param searchTerm - The text expected to be present in every
   * displayed product name.
   */
  async verifyProductNamesContain(searchTerm: string) {
    const productNames = await this.getProductNames();

    for (const productName of productNames) {
      expect(productName.toLowerCase()).toContain(searchTerm.toLowerCase());
    }
  }

  // ─────────────────────────────────────────────
  // Product Search
  // ─────────────────────────────────────────────

  /**
   * Searches for products using the product search field.
   *
   * @param product - The product name or search term to search for.
   */
  async search(product: string) {
    await this.searchInput.fill(product);
    await this.searchButton.click();
  }

  // ─────────────────────────────────────────────
  // Product Information
  // ─────────────────────────────────────────────

  /**
   * Returns the number of product cards currently displayed.
   *
   * @returns The number of products displayed on the page.
   */
  async productCount() {
    return await this.productCards.count();
  }

  /**
   * Returns the names of all products currently displayed.
   *
   * @returns An array containing the displayed product names.
   */
  async getProductNames() {
    return await this.page.locator(".productinfo p").allTextContents();
  }

  // ─────────────────────────────────────────────
  // Product Actions
  // ─────────────────────────────────────────────

  /**
   * Opens a product details page using its position in the
   * currently displayed product results.
   *
   * The index is 1-based, meaning an index of 1 opens the first
   * product, 2 opens the second product, and so on.
   *
   * @param index - The 1-based position of the product to open.
   */
  async openProduct(index: number) {
    await this.viewProductButtons.nth(index - 1).click();
  }

  /**
   * Adds a product to the cart using its product ID.
   *
   * @param productId - The ID of the product to add to the cart.
   */
  async addProductToCart(productId: string) {
    const button = this.page
      .locator(`a.add-to-cart[data-product-id="${productId}"]`)
      .first();

    await this.click(button);
  }

  // ─────────────────────────────────────────────
  // Add to Cart Modal
  // ─────────────────────────────────────────────

  /**
   * Verifies that the Add to Cart confirmation modal is visible.
   */
  async verifyAddedModalVisible() {
    await this.verifyVisible(this.addedModal);
  }

  /**
   * Clicks the View Cart link in the Add to Cart confirmation modal.
   */
  async clickViewCart() {
    await this.click(this.viewCartLink);
  }

  /**
   * Clicks Continue Shopping in the Add to Cart confirmation modal.
   */
  async continueShopping() {
    await this.click(this.continueShoppingButton);
  }
}
