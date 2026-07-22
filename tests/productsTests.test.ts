import { test, expect } from "../fixtures/fixtures";

test.describe("products page", () => {
  test.beforeEach(async ({ productsPage, page }) => {
    await productsPage.goto();

    await page.route(
      /googleads|doubleclick|googlesyndication/,
      (
        route, //prevents googleads from opening
      ) => route.abort(),
    );
  });

  test("navigate to products page and view products", async ({
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

  test("search products", async ({
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

  test("add products to cart", async ({
    productsPage,
    addProductsToCartFlow,
    cartPage,
  }) => {
    const products = await addProductsToCartFlow.addProducts(["2", "7", "4"]);
    await productsPage.clickViewCart();
    await cartPage.verifyProducts(products);
  });
});
