import { Page, Locator } from "@playwright/test";
import { Product } from "../test-data/products";
import { BasePage } from "./basePage";

export class ProductDetailsPage extends BasePage {
  //product information
  readonly productName: Locator;
  readonly category: Locator;
  readonly price: Locator;
  readonly availability: Locator;
  readonly condition: Locator;
  readonly brand: Locator;

  //purchase information
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;

  //add to cart modal
  readonly addedModal: Locator;
  readonly viewCartLink: Locator;
  readonly continueShoppingButton: Locator;

  //review form
  readonly reviewNameInput: Locator;
  readonly reviewEmailInput: Locator;
  readonly reviewTextArea: Locator;
  readonly submitReviewButton: Locator;
  readonly reviewSuccessMessage: Locator;

  constructor(page: Page) {
    super(page);

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

    this.quantityInput = page.locator("#quantity");
    this.addToCartButton = page.getByRole("button", {
      name: "Add to cart",
    });

    this.addedModal = page.locator("#cartModal");
    this.viewCartLink = this.addedModal.getByRole("link", {
      name: "View Cart",
    });
    this.continueShoppingButton = this.addedModal.getByRole("button", {
      name: "Continue Shopping",
    });

    this.reviewNameInput = page.locator("#name");
    this.reviewEmailInput = page.locator("#email");
    this.reviewTextArea = page.locator("#review");
    this.submitReviewButton = page.locator("#button-review");
    this.reviewSuccessMessage = page.locator("#review-section");
  }

  async verifyPageLoaded() {
    await this.verifyVisible(this.productName);
  }

  async setQuantity(quantity: number) {
    await this.quantityInput.fill(quantity.toString());
  }

  async openProductById(id: string) {
    await this.goto(`/product_details/${id}`); //opens by id in the url
  }

  async addToCart() {
    await this.click(this.addToCartButton);
  }

  async verifyAddedModalVisible() {
    await this.verifyVisible(this.addedModal);
  }

  async continueShopping() {
    await this.click(this.continueShoppingButton);
  }

  async viewCart() {
    await this.click(this.viewCartLink);
  }

  async submitReview(name: string, email: string, review: string) {
    //need to make review test-data
    await this.reviewNameInput.fill(name);
    await this.reviewEmailInput.fill(email);
    await this.reviewTextArea.fill(review);

    await this.click(this.submitReviewButton);
  }

  async matchesSearch(searchTerm: string): Promise<boolean> {
    const term = searchTerm.toLowerCase();

    const category = ((await this.category.textContent()) ?? "").toLowerCase();
    const productName = (
      (await this.productName.textContent()) ?? ""
    ).toLowerCase();

    return category.includes(term) || productName.includes(term); //returns true if either match
  }

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

  async goBack() {
    await this.page.goBack();
  }
}
