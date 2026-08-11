import { test, expect } from "../../fixtures/fixtures";
import { createPaymentDetails, createUser } from "../../test-data/factories";
import { cleanupAccount } from "../../utils/ui/accountCleanup";

test.describe("Orders", () => {
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

    try {
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
    } finally {
      // Clean up the test account even if the test fails.
      await cleanupAccount(navbar, deletedAccountPage);
    }
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

    try {
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
    } finally {
      // Clean up the test account even if the test fails.
      await cleanupAccount(navbar, deletedAccountPage);
    }
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

    try {
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
    } finally {
      // Clean up the test account even if the test fails.
      await cleanupAccount(navbar, deletedAccountPage);
    }
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

    try {
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
    } finally {
      // Clean up the test account even if the test fails.
      await cleanupAccount(navbar, deletedAccountPage);
    }
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

    try {
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
    } finally {
      // Clean up the test account even if the test fails.
      await cleanupAccount(navbar, deletedAccountPage);
    }
  });
});
