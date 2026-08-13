import { test, expect } from "../../fixtures/fixtures";
import { createUser } from "../../test-data/factories";
import { cleanupAccount } from "../../utils/ui/accountCleanup";

// ─────────────────────────────────────────────
// Registration & Login Tests
// ─────────────────────────────────────────────

test.describe("Registration and Login", () => {
  // ─────────────────────────────────────────────
  // Setup
  // ─────────────────────────────────────────────

  test.beforeEach(async ({ homepage }) => {
    await homepage.goto();
  });

  // ─────────────────────────────────────────────
  // Registration
  // ─────────────────────────────────────────────

  test.describe("Registration", () => {
    test("register and delete user", async ({
      navbar,
      registrationFlow,
      deletedAccountPage,
    }) => {
      const user = createUser();

      await registrationFlow.register(user);

      try {
        await expect(navbar.loggedInUser(user.name)).toBeVisible();
      } finally {
        await cleanupAccount(navbar, deletedAccountPage);
      }
    });

    test("register already existing email", async ({
      navbar,
      loginPage,
      registrationFlow,
      signupPage,
      deletedAccountPage,
    }) => {
      const user = createUser();
      await registrationFlow.register(user);

      try {
        await navbar.logout();
        const user2 = createUser({
          email: user.email,
        });

        await navbar.goToLogin();
        await loginPage.startSignup(user2);
        await expect(signupPage.registrationError).toBeVisible();
      } finally {
        // Log back into the original account so it can be deleted.
        await loginPage.goto();
        await loginPage.startLogin(user);

        await cleanupAccount(navbar, deletedAccountPage);
      }
    });
  });

  // ─────────────────────────────────────────────
  // Login
  // ─────────────────────────────────────────────

  test.describe("Login", () => {
    test("login user with correct credentials", async ({
      navbar,
      loginPage,
      deletedAccountPage,
      registrationFlow,
    }) => {
      const user = createUser();
      await registrationFlow.register(user);
      await navbar.logout();

      try {
        await loginPage.startLogin(user);
        await expect(navbar.loggedInUser(user.name)).toBeVisible();
      } finally {
        await cleanupAccount(navbar, deletedAccountPage);
      }
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
});
