import { Page, Locator } from "@playwright/test";
import { Product } from "../test-data/products";
import { BasePage } from "./basePage";

export class ProductDetailsPage extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  // Product Information
  readonly productName: Locator;
  readonly category: Locator;
  readonly price: Locator;
  readonly availability: Locator;
  readonly condition: Locator;
  readonly brand: Locator;

  // Purchase Information
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  // Add to Cart Modal
  readonly addedModal: Locator;
  readonly viewCartLink: Locator;
  readonly continueShoppingButton: Locator;

  // Review Form
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextArea: Locator;
  readonly submitReviewButton: Locator;
  readonly reviewSuccessMessage: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    // Product Information
    this.productName = page.locator(".product-information h2");
    this.category = page.locator(".product-information p").first();
    this.price = page.locator(".product-information span > span");
    this.availability = page.locator("p", {
      hasText: "Availability:",
    });
    this.condition = page.locator("p", {
      hasText: "Condition:",
    });
    this.brand = page.locator("p", {
      hasText: "Brand:",
    });

    // Purchase Information
    this.quantityInput = page.locator("#quantity");
    this.addToCartButton = page.getByRole("button", {
      name: "Add to cart",
    });

    // Add to Cart Modal
    this.addedModal = page.locator("#cartModal");
    this.viewCartLink = this.addedModal.getByRole("link", {
      name: "View Cart",
    });
    this.continueShoppingButton = this.addedModal.getByRole("button", {
      name: "Continue Shopping",
    });

    // Review Form
    this.reviewNameInput = page.locator("#name");
    this.reviewEmailInput = page.locator("#email");
    this.reviewTextArea = page.locator("#review");
    this.submitReviewButton = page.locator("#button-review");
    this.reviewSuccessMessage = page.locator("#review-section");
  }

  // ─────────────────────────────────────────────
  // Page Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the product details page has loaded successfully
   * by checking that the product name is visible.
   */
  async verifyPageLoaded() {
    await this.verifyVisible(this.productName);
  }

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  /**
   * Navigates directly to a product details page using the
   * product ID in the URL.
   *
   * @param id - The ID of the product to open.
   */
  async openProductById(id: string) {
    await this.goto(`/product_details/${id}`);
  }

  /**
   * Navigates back to the previously visited page.
   */
  async goBack() {
    await this.page.goBack();
  }

  // ─────────────────────────────────────────────
  // Product Information
  // ─────────────────────────────────────────────

  /**
   * Retrieves the product information displayed on the page
   * and returns it as a Product object.
   *
   * @param id - The ID of the product.
   * @param quantity - The quantity associated with the product.
   *
   * @returns A Product object containing the product details
   * displayed on the page.
   */
  async getProductInformation(id: string, quantity: number): Promise<Product> {
    return {
      id,
      name: (await this.productName.textContent()) ?? "",
      category: ((await this.category.textContent()) ?? "")
        .replace("Category:", "")
        .trim(),
      price: (await this.price.textContent()) ?? "",
      availability: ((await this.availability.textContent()) ?? "")
        .replace("Availability:", "")
        .trim(),
      condition: ((await this.condition.textContent()) ?? "")
        .replace("Condition:", "")
        .trim(),
      brand: ((await this.brand.textContent()) ?? "")
        .replace("Brand:", "")
        .trim(),
      quantity,
    };
  }

  /**
   * Checks whether the supplied search term matches either
   * the product name or product category.
   *
   * The comparison is case-insensitive.
   *
   * @param searchTerm - The search term to compare against
   * the product name and category.
   *
   * @returns True if the search term is found in either the
   * product name or category; otherwise, false.
   */
  async matchesSearch(searchTerm: string): Promise<boolean> {
    const term = searchTerm.toLowerCase();

    const category = ((await this.category.textContent()) ?? "").toLowerCase();
    const productName = (
      (await this.productName.textContent()) ?? ""
    ).toLowerCase();

    return category.includes(term) || productName.includes(term);
  }

  // ─────────────────────────────────────────────
  // Purchase
  // ─────────────────────────────────────────────

  /**
   * Sets the quantity of the product to be added to the cart.
   *
   * @param quantity - The number of units to add to the cart.
   */
  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  /**
   * Clicks the Add to Cart button to add the selected product
   * and quantity to the shopping cart.
   */
  async addToCart() {
    await this.click(this.addToCartButton);
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
   * Clicks Continue Shopping in the Add to Cart confirmation modal.
   */
  async continueShopping() {
    await this.click(this.continueShoppingButton);
  }

  /**
   * Clicks View Cart in the Add to Cart confirmation modal
   * to navigate to the shopping cart.
   */
  async viewCart() {
    await this.click(this.viewCartLink);
  }

  // ─────────────────────────────────────────────
  // Product Review
  // ─────────────────────────────────────────────

  /**
   * Fills out and submits the product review form.
   *
   * @param name - The name to submit with the review.
   * @param email - The email address to submit with the review.
   * @param review - The review text to submit.
   */
  async submitReview(name: string, email: string, review: string) {
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextArea.fill(review);

    await this.click(this.submitReviewButton);
  }
}
