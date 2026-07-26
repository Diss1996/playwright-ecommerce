import { Locator, Page, expect } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export class Sidebar extends BasePage {
  readonly categorySection: Locator;
  readonly brandSection: Locator;

  constructor(page: Page) {
    super(page);

    this.categorySection = page.locator(".category-products");
    this.brandSection = page.locator(".brands_products");
  }

  async selectCategory(parentCategory: string, category: string) {
    const panel = this.page.locator(`#${parentCategory}`);

    const parentLink = this.page.locator(
      `.category-products a[href="#${parentCategory}"]`,
    );

    if (!(await panel.isVisible())) {
      await parentLink.click();
      await expect(panel).toBeVisible();
    }

    await panel.getByRole("link", { name: category, exact: true }).click();
  }

  async selectBrand(brand: string) {
    const brandLink = this.page.locator(
      `.brands_products a[href="/brand_products/${brand}"]`,
    );

    await brandLink.click();
  }

  async verifySidebarLoaded() {
    await this.verifyVisible(this.categorySection);
    await this.verifyVisible(this.brandSection);
  }
}
