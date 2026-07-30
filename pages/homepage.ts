import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class Homepage extends BasePage {
  // ─────────────────────────────────────────────
  // Recommended Items
  // ─────────────────────────────────────────────

  /**
   * Container for the recommended items section.
   */
  readonly recommendedItems: Locator;
  readonly recommendedItemCards: Locator;
  readonly recommendedItemNames: Locator;
  readonly recommendedItemPrices: Locator;
  readonly recommendedItemAddToCartButtons: Locator;
  readonly recommendedItemPreviousButton: Locator;
  readonly recommendedItemNextButton: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    // Recommended Items
    this.recommendedItems = page.locator(".recommended_items");

    this.recommendedItemCards = this.recommendedItems.locator(
      ".product-image-wrapper",
    );

    this.recommendedItemNames = this.recommendedItems.locator(".productinfo p");

    this.recommendedItemPrices =
      this.recommendedItems.locator(".productinfo h2");

    this.recommendedItemAddToCartButtons =
      this.recommendedItems.locator("a.add-to-cart");

    this.recommendedItemPreviousButton = this.recommendedItems.locator(
      "a.recommended-item-control.left",
    );

    this.recommendedItemNextButton = this.recommendedItems.locator(
      "a.recommended-item-control.right",
    );
  }

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  /**
   * Navigates to the application's homepage.
   */
  async goto() {
    await super.goto("/");
  }

  // ─────────────────────────────────────────────
  // Recommended Items
  // ─────────────────────────────────────────────

  /**
   * Verifies that the recommended items section is visible.
   */
  async verifyRecommendedItemsLoaded() {
    await this.verifyVisible(this.recommendedItems);
  }

  /**
   * Returns the number of recommended products currently displayed.
   */
  async getRecommendedItemCount() {
    return await this.recommendedItemCards.count();
  }

  /**
   * Returns the names of all recommended products currently displayed.
   */
  async getRecommendedItemNames() {
    return await this.recommendedItemNames.allTextContents();
  }

  /**
   * Returns the prices of all recommended products currently displayed.
   */
  async getRecommendedItemPrices() {
    return await this.recommendedItemPrices.allTextContents();
  }

  /**
   * Adds a recommended product to the cart using its product ID.
   *
   * @param productId The ID of the product to add to the cart.
   */
  /**
   * Finds a recommended product by its ID and adds it to the cart.
   *
   * The carousel is rotated until the requested product is visible.
   * Throws an error if the product cannot be found after checking
   * all available carousel positions.
   *
   * @param productId The ID of the recommended product to add to the cart.
   */
  async addRecommendedItemToCart(productId: string) {
    const addToCartButton = this.recommendedItems.locator(
      `a.add-to-cart[data-product-id="${productId}"]`,
    );

    const carouselItems = this.recommendedItems.locator(
      "#recommended-item-carousel .item",
    );

    const itemCount = await carouselItems.count();

    for (let i = 0; i < itemCount; i++) {
      if (await addToCartButton.first().isVisible()) {
        await this.click(addToCartButton.first());
        return;
      }

      await this.click(this.recommendedItemNextButton);
    }

    throw new Error(
      `Recommended product with ID "${productId}" could not be found.`,
    );
  }

  /**
   * Displays the next set of recommended products in the carousel.
   */
  async clickRecommendedItemNext() {
    await this.click(this.recommendedItemNextButton);
  }

  /**
   * Displays the previous set of recommended products in the carousel.
   */
  async clickRecommendedItemPrevious() {
    await this.click(this.recommendedItemPreviousButton);
  }
}
