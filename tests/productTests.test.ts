import { test, expect } from "../fixtures/fixtures";

test.describe("Products", () => {
  // ─────────────────────────────────────────────
  // Setup
  // ─────────────────────────────────────────────

  test.beforeEach(async ({ productsPage, page }) => {
    await productsPage.goto();

    // Prevent Google Ads from opening during tests.
    await page.route(/googleads|doubleclick|googlesyndication/, (route) =>
      route.abort(),
    );
  });

  // ─────────────────────────────────────────────
  // Product Details
  // ─────────────────────────────────────────────

  test("user can view product details", async ({
    productsPage,
    productsDetailsPage,
  }) => {
    await productsPage.openProduct(1);

    await productsDetailsPage.verifyPageLoaded();

    await expect(productsDetailsPage.availability).toContainText("In Stock");
    await expect(productsDetailsPage.productName).toContainText("Blue Top");
    await expect(productsDetailsPage.condition).toContainText("New");
    await expect(productsDetailsPage.brand).toContainText("Polo");
    await expect(productsDetailsPage.price).toContainText("500");
  });

  // ─────────────────────────────────────────────
  // Product Search
  // ─────────────────────────────────────────────

  test("user can search for products", async ({
    productsPage,
    productsDetailsPage,
    page,
  }) => {
    const searchTerm = "dress";

    await productsPage.search(searchTerm);

    const count = await productsPage.productCount();

    for (let i = 0; i < count; i++) {
      await productsPage.openProduct(i);

      expect(await productsDetailsPage.matchesSearch(searchTerm)).toBe(true);

      await page.goBack();
    }
  });

  test("user can search for a product and add it to the cart", async ({
    productsPage,
    cartPage,
  }) => {
    const searchTerm = "V-neck";

    await productsPage.search(searchTerm);
    await productsPage.verifyProductNamesContain(searchTerm);

    await productsPage.addProductToCart("28");
    await productsPage.clickViewCart();

    await cartPage.verifyProductInCart("28");

    // TODO: Complete cart verification: Add way to pull id from search for use
  });

  // ─────────────────────────────────────────────
  // Sidebar Filtering
  // ─────────────────────────────────────────────

  test("user can filter products by category", async ({
    productsPage,
    sidebar,
  }) => {
    await sidebar.verifySidebarLoaded();

    await sidebar.selectCategory("Women", "Dress");
    await productsPage.verifyProductsSearch("Women", "Dress");

    await sidebar.verifySidebarLoaded();

    await sidebar.selectCategory("Men", "Jeans");
    await productsPage.verifyProductsSearch("Men", "Jeans");

    await sidebar.verifySidebarLoaded();

    await sidebar.selectCategory("Kids", "Tops & Shirts");
    await productsPage.verifyProductsSearch("Kids", "Tops & Shirts");
  });

  test("user can filter products by brand", async ({
    productsPage,
    sidebar,
  }) => {
    await sidebar.verifySidebarLoaded();

    await sidebar.selectBrand("Polo");
    await productsPage.verifyProductsSearch("Brand", "Polo");

    await sidebar.verifySidebarLoaded();

    await sidebar.selectBrand("Madame");
    await productsPage.verifyProductsSearch("Brand", "Madame");

    await sidebar.verifySidebarLoaded();
  });
});
