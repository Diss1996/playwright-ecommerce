import { test } from "../../fixtures/fixtures";

test.describe("Cart", () => {
  // ─────────────────────────────────────────────
  // Setup
  // ─────────────────────────────────────────────

  test.beforeEach(async ({ productsPage, page }) => {
    // Prevent Google Ads from opening during tests.
    await page.route(/googleads|doubleclick|googlesyndication/, (route) =>
      route.abort(),
    );

    await productsPage.goto();
  });

  // ─────────────────────────────────────────────
  // Add Products
  // ─────────────────────────────────────────────

  test("user can add multiple products to the cart", async ({
    addProductsToCartFlow,
    cartPage,
    addedToCartModal,
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

    await addedToCartModal.viewCart();
    await cartPage.verifyProducts(products);
  });

  test("user can add a product to the cart with a selected quantity", async ({
    addProductsToCartFlow,
    cartPage,
    addedToCartModal,
  }) => {
    const products = await addProductsToCartFlow.addProducts([
      {
        id: "1",
        quantity: 5,
      },
    ]);

    await addedToCartModal.viewCart();
    await cartPage.verifyProducts(products);
  });

  // ─────────────────────────────────────────────
  // Remove Products
  // ─────────────────────────────────────────────

  test("user can remove products from the cart", async ({
    addProductsToCartFlow,
    cartPage,
    addedToCartModal,
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

    await addedToCartModal.viewCart();

    await cartPage.verifyProducts(products);

    await cartPage.removeProduct("1");
    await cartPage.removeProduct("3");

    const idsToRemove = ["1", "3"];

    const remainingProducts = products.filter(
      (product) => !idsToRemove.includes(product.id),
    );

    await cartPage.verifyProducts(remainingProducts);
  });

  test("user can add a product to the cart from recommended on homepage", async ({
    homepage,
    addedToCartModal,
    cartPage,
  }) => {
    await homepage.goto();
    await homepage.verifyRecommendedItemsLoaded();

    const productId = "6";
    await homepage.addRecommendedItemToCart(productId);
    await addedToCartModal.viewCart();

    await cartPage.verifyProductInCart(productId);
  });
});
