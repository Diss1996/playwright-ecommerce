import { test, expect } from "../fixtures/fixtures";
import { createUser } from "../test-data/factories";

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
