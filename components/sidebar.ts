import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export class Sidebar extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  // Sidebar Sections
  readonly categorySection: Locator;
  readonly brandSection: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    // Sidebar Sections
    this.categorySection = page.locator(".category-products");
    this.brandSection = page.locator(".brands_products");
  }

  // ─────────────────────────────────────────────
  // Category Navigation
  // ─────────────────────────────────────────────

  /**
   * Selects a product category from the sidebar.
   *
   * If the requested category is not currently visible,
   * the parent category is expanded before selecting it.
   *
   * @param parentCategory - The ID of the parent category
   * containing the requested category.
   * @param category - The name of the category to select.
   */
  async selectCategory(parentCategory: string, category: string) {
    const parentLink = this.page.locator(
      `.category-products a[href="#${parentCategory}"]`,
    );

    const categoryLink = this.page
      .locator(`#${parentCategory}`)
      .getByRole("link", {
        name: category,
        exact: true,
      });

    if (!(await categoryLink.isVisible())) {
      await parentLink.click();
      await expect(categoryLink).toBeVisible();
    }

    await categoryLink.click();
  }

  // ─────────────────────────────────────────────
  // Brand Navigation
  // ─────────────────────────────────────────────

  /**
   * Selects a product brand from the sidebar.
   *
   * @param brand - The name of the brand to select.
   */
  async selectBrand(brand: string) {
    const brandLink = this.page.locator(
      `.brands_products a[href="/brand_products/${brand}"]`,
    );

    await brandLink.click();
  }

  // ─────────────────────────────────────────────
  // Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the Sidebar component is loaded by checking
   * that both the category and brand sections are visible.
   */
  async verifySidebarLoaded() {
    await this.verifyVisible(this.categorySection);
    await this.verifyVisible(this.brandSection);
  }
}
