import { test, expect } from "../fixtures/fixtures";
import { createUser, createContactMessage } from "../test-data/factories";

test.describe("registration and login", () => {
  test.beforeEach(async ({ homepage }) => {
    await homepage.goto();
  });

  test("register and delete user", async ({
    navbar,
    deletedAccountPage,
    registrationFlow,
  }) => {
    const user = createUser();
    await registrationFlow.register(user);

    await expect(navbar.loggedInUser(user.name)).toBeVisible();

    await navbar.deleteAccount();
    await deletedAccountPage.verifyPageLoaded();
    await deletedAccountPage.clickContinue();
  });

  test("register already existing email", async ({
    navbar,
    loginPage,
    registrationFlow,
    signupPage,
  }) => {
    const user = createUser();
    await registrationFlow.register(user);
    await navbar.logout();

    const user2 = createUser({
      email: user.email,
    });

    await navbar.goToLogin();
    await loginPage.startSignup(user2);
    await expect(signupPage.registrationError).toBeVisible();

    // Clean up the original account
    await loginPage.goto();
    await loginPage.startLogin(user);
    await navbar.deleteAccount();
  });

  test("login user with correct credentials", async ({
    navbar,
    loginPage,
    deletedAccountPage,
    registrationFlow,
  }) => {
    const user = createUser();
    await registrationFlow.register(user);
    await navbar.logout();

    await loginPage.startLogin(user);
    await expect(navbar.loggedInUser(user.name)).toBeVisible();

    await navbar.deleteAccount();
    await deletedAccountPage.verifyPageLoaded();
    await deletedAccountPage.clickContinue();
  });

  test("login user with wrong credentials", async ({ navbar, loginPage }) => {
    const user = createUser();
    await navbar.goToLogin();

    const invalidUser = {
      ...user,
      password: "WrongPassword123!",
    };

    await loginPage.startLogin(invalidUser);
    await expect(loginPage.errorMessage).toBeVisible();
  });
});

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
    await productsPage.openProduct(0);
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

  test("add products to cart", async ({ productsPage, cartPage }) => {
    await productsPage.addProductToCart("1");
    await productsPage.verifyAddedModalVisible();
    await productsPage.continueShopping();
    await productsPage.addProductToCart("2");
    await productsPage.verifyAddedModalVisible();
    await productsPage.clickViewCart();
    //unfinished
  });
});

test("footer subscription", async ({ homepage, footer }) => {
  await homepage.goto();
  await footer.verifyLoaded();
  await footer.subscribe("testing@mail.com");
  await footer.verifySubscriptionSuccess();
});

// test("contact form", async ({ homepage, navbar, contactUsPage }) => {
//   //doesnt work in chromium, issues with the confirm prompt
//   const contactUsMessage = createContactMessage();

//   await homepage.goto();
//   await navbar.goToContactUs();

//   await contactUsPage.verifyPageLoaded();

//   await contactUsPage.fillContactForm(contactUsMessage);
//   await contactUsPage.submit();

//   await expect(contactUsPage.successMessage).toBeVisible();
// });
