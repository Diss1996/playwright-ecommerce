import { test, expect } from "../fixtures/fixtures";
import { createUser } from "../test-data/factories";
import { createPaymentDetails } from "../test-data/factories";

test.describe("products and cart", () => {
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

  test("add products to cart and change quantity", async ({
    productsPage,
    addProductsToCartFlow,
    cartPage,
  }) => {
    const products = await addProductsToCartFlow.addProducts([
      { id: "1", quantity: 5 },
    ]);
    await productsPage.clickViewCart();
    await cartPage.verifyProducts(products);
  });
});

test.describe("orders", () => {
  test.beforeEach(async ({ productsPage, page }) => {
    await productsPage.goto();

    await page.route(
      /googleads|doubleclick|googlesyndication/,
      (
        route, //prevents googleads from opening
      ) => route.abort(),
    );
  });

  test("register while in checkout and complete an order", async ({
    productsPage,
    addProductsToCartFlow,
    cartPage,
    registrationFlow,
    navbar,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    deletedAccountPage,
  }) => {
    const products = await addProductsToCartFlow.addProducts([
      { id: "5", quantity: 1 },
    ]);
    await productsPage.clickViewCart();
    await cartPage.verifyProducts(products);
    await cartPage.proceedToCheckout();

    const user = createUser();
    await registrationFlow.registerFromCheckout(user);

    await expect(navbar.loggedInUser(user.name)).toBeVisible();
    await navbar.goToCart();
    await cartPage.proceedToCheckout();

    await checkoutPage.verifyBillingAddress(user);
    await checkoutPage.verifyDeliveryAddress(user);
    await checkoutPage.addOrderComment("Leave at the door");
    await checkoutPage.placeOrder();

    const payment = createPaymentDetails();
    await paymentPage.enterPaymentDetails(payment);
    await paymentPage.payAndConfirmOrder();
    await paymentDonePage.verifyPageLoaded();
    await paymentDonePage.continue();

    await navbar.deleteAccount();
    await deletedAccountPage.verifyPageLoaded();
    await deletedAccountPage.clickContinue();
  });
});
