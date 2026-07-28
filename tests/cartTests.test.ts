import { test } from "../fixtures/fixtures";

test.describe("Cart", () => {
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
  // Add Products
  // ─────────────────────────────────────────────

  test("user can add multiple products to the cart", async ({
    productsPage,
    addProductsToCartFlow,
    cartPage,
  }) => {
    const products = await addProductsToCartFlow.addProducts([
      {
        id: "7",
        quantity: 3,
      },
      {
        id: "13",
        quantity: 6,
      },
    ]);

    await productsPage.clickViewCart();

    await cartPage.verifyProducts(products);
  });

  test("user can add a product to the cart with a selected quantity", async ({
    productsPage,
    addProductsToCartFlow,
    cartPage,
  }) => {
    const products = await addProductsToCartFlow.addProducts([
      {
        id: "1",
        quantity: 5,
      },
    ]);

    await productsPage.clickViewCart();

    await cartPage.verifyProducts(products);
  });

  // ─────────────────────────────────────────────
  // Remove Products
  // ─────────────────────────────────────────────

  test("user can remove products from the cart", async ({
    productsPage,
    addProductsToCartFlow,
    cartPage,
  }) => {
    const products = await addProductsToCartFlow.addProducts([
      {
        id: "5",
        quantity: 5,
      },
      {
        id: "1",
        quantity: 1,
      },
      {
        id: "3",
        quantity: 2,
      },
    ]);

    await productsPage.clickViewCart();

    await cartPage.verifyProducts(products);

    await cartPage.removeProduct("1");
    await cartPage.removeProduct("3");

    const idsToRemove = ["1", "3"];

    const remainingProducts = products.filter(
      (product) => !idsToRemove.includes(product.id),
    );

    await cartPage.verifyProducts(remainingProducts);
  });
});
