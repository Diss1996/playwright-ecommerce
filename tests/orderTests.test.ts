import { test, expect } from "../fixtures/fixtures";
import { createPaymentDetails, createUser } from "../test-data/factories";

test.describe("Orders", () => {
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
  // Registration During Checkout
  // ─────────────────────────────────────────────

  test("user can register during checkout and complete an order", async ({
    addProductsToCartFlow,
    cartPage,
    registrationFlow,
    navbar,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    deletedAccountPage,
    addedToCartModal,
  }) => {
    const products = await addProductsToCartFlow.addProducts([
      {
        id: "5",
        quantity: 1,
      },
    ]);

    await addedToCartModal.viewCart();

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

    // Clean up the test account.
    await navbar.deleteAccount();

    await deletedAccountPage.verifyPageLoaded();
    await deletedAccountPage.clickContinue();
  });

  // ─────────────────────────────────────────────
  // Registration Before Checkout
  // ─────────────────────────────────────────────

  test("registered user can complete an order", async ({
    addProductsToCartFlow,
    cartPage,
    registrationFlow,
    navbar,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    deletedAccountPage,
    addedToCartModal,
  }) => {
    const user = createUser();

    await registrationFlow.register(user);

    await expect(navbar.loggedInUser(user.name)).toBeVisible();

    await navbar.goToProducts();

    const products = await addProductsToCartFlow.addProducts([
      {
        id: "12",
        quantity: 1,
      },
      {
        id: "18",
        quantity: 9,
      },
    ]);

    await addedToCartModal.viewCart();

    await cartPage.verifyProducts(products);
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

    // Clean up the test account.
    await navbar.deleteAccount();

    await deletedAccountPage.verifyPageLoaded();
    await deletedAccountPage.clickContinue();
  });

  // ─────────────────────────────────────────────
  // Login Before Checkout
  // ─────────────────────────────────────────────

  test("user can log out, log back in, and complete an order", async ({
    addProductsToCartFlow,
    cartPage,
    registrationFlow,
    navbar,
    checkoutPage,
    paymentPage,
    paymentDonePage,
    deletedAccountPage,
    loginPage,
    addedToCartModal,
  }) => {
    const user = createUser();

    await registrationFlow.register(user);

    await expect(navbar.loggedInUser(user.name)).toBeVisible();

    await navbar.logout();

    await loginPage.startLogin(user);

    await expect(navbar.loggedInUser(user.name)).toBeVisible();

    await navbar.goToProducts();

    const products = await addProductsToCartFlow.addProducts([
      {
        id: "21",
        quantity: 3,
      },
    ]);

    await addedToCartModal.viewCart();

    await cartPage.verifyProducts(products);
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

    // Clean up the test account.
    await navbar.deleteAccount();

    await deletedAccountPage.verifyPageLoaded();
    await deletedAccountPage.clickContinue();
  });

  test("verify address details in checkout", async ({
    addProductsToCartFlow,
    cartPage,
    registrationFlow,
    navbar,
    checkoutPage,
    deletedAccountPage,
    addedToCartModal,
  }) => {
    const user = createUser();
    await registrationFlow.register(user);
    await expect(navbar.loggedInUser(user.name)).toBeVisible();
    await navbar.goToProducts();

    const products = await addProductsToCartFlow.addProducts([
      {
        id: "2",
        quantity: 3,
      },
      {
        id: "4",
        quantity: 1,
      },
    ]);
    await addedToCartModal.viewCart();
    await cartPage.verifyProducts(products);
    await cartPage.proceedToCheckout();

    await checkoutPage.verifyBillingAddress(user);
    await checkoutPage.verifyDeliveryAddress(user);

    // Clean up the test account.
    await navbar.deleteAccount();
    await deletedAccountPage.verifyPageLoaded();
    await deletedAccountPage.clickContinue();
  });

  test("download invoice after purchase order", async ({
    addProductsToCartFlow,
    cartPage,
    registrationFlow,
    navbar,
    checkoutPage,
    deletedAccountPage,
    addedToCartModal,
    checkoutModal,
    paymentPage,
    paymentDonePage,
  }) => {
    await navbar.goToProducts();
    const products = await addProductsToCartFlow.addProducts([
      {
        id: "2",
        quantity: 3,
      },
      {
        id: "4",
        quantity: 1,
      },
    ]);
    await addedToCartModal.viewCart();
    await cartPage.verifyProducts(products);
    await cartPage.proceedToCheckout();
    await checkoutModal.continueOnCart();

    const user = createUser();
    await registrationFlow.register(user);
    await expect(navbar.loggedInUser(user.name)).toBeVisible();

    await navbar.goToCart();
    await cartPage.proceedToCheckout();
    await checkoutPage.verifyBillingAddress(user);
    await checkoutPage.verifyDeliveryAddress(user);
    await checkoutPage.addOrderComment("invoice test");
    await checkoutPage.placeOrder();

    const payment = createPaymentDetails();
    await paymentPage.enterPaymentDetails(payment);
    await paymentPage.payAndConfirmOrder();

    const download = await paymentDonePage.downloadInvoice();
    expect(await download.suggestedFilename()).toContain(".txt");
    await paymentDonePage.continue();

    // Clean up the test account.
    await navbar.deleteAccount();
    await deletedAccountPage.verifyPageLoaded();
    await deletedAccountPage.clickContinue();
  });
});
