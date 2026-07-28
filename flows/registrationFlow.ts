import { expect } from "@playwright/test";
import { Navbar } from "../components/navbar";
import { LoginPage } from "../pages/loginPage";
import { SignupPage } from "../pages/signupPage";
import { AccountCreatedPage } from "../pages/accountCreatedPage";
import { CartPage } from "../pages/cartPage";
import { User } from "../test-data/users";

export class RegistrationFlow {
  // ─────────────────────────────────────────────
  // Page Objects & Components
  // ─────────────────────────────────────────────

  constructor(
    private navbar: Navbar,
    private loginPage: LoginPage,
    private signupPage: SignupPage,
    private accountCreatedPage: AccountCreatedPage,
    private cartPage: CartPage,
  ) {}

  // ─────────────────────────────────────────────
  // Registration Flows
  // ─────────────────────────────────────────────

  /**
   * Registers a new user starting from the Login page.
   *
   * The flow:
   * 1. Navigates to the Login page using the navigation bar.
   * 2. Verifies that the Login page has loaded.
   * 3. Starts the signup process using the supplied user data.
   * 4. Completes the registration form.
   * 5. Verifies that the Account Created page is displayed.
   * 6. Continues from the account confirmation page.
   * 7. Verifies that the user is logged in.
   *
   * @param user - The user data used to create the new account.
   */
  async register(user: User) {
    await this.navbar.goToLogin();

    await this.loginPage.verifyPageLoaded();

    await this.loginPage.startSignup(user);

    await this.signupPage.completeRegistration(user);

    await this.accountCreatedPage.verifyPageLoaded();

    await this.accountCreatedPage.clickContinue();

    await expect(this.navbar.loggedInUser(user.name)).toBeVisible();
  }

  /**
   * Registers a new user starting from the checkout process.
   *
   * The flow:
   * 1. Opens the Login/Signup page from the checkout modal.
   * 2. Verifies that the Login page has loaded.
   * 3. Starts the signup process using the supplied user data.
   * 4. Completes the registration form.
   * 5. Verifies that the Account Created page is displayed.
   * 6. Continues from the account confirmation page.
   * 7. Verifies that the user is logged in.
   *
   * @param user - The user data used to create the new account.
   */
  async registerFromCheckout(user: User) {
    await this.cartPage.clickLogin();

    await this.loginPage.verifyPageLoaded();

    await this.loginPage.startSignup(user);

    await this.signupPage.completeRegistration(user);

    await this.accountCreatedPage.verifyPageLoaded();

    await this.accountCreatedPage.clickContinue();

    await expect(this.navbar.loggedInUser(user.name)).toBeVisible();
  }
}
