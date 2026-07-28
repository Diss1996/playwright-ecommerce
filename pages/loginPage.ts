import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { User } from "../test-data/users";

export class LoginPage extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  // Signup
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly newUserHeading: Locator;

  // Login
  readonly loginEmailInput: Locator;
  readonly loginPasswordInput: Locator;
  readonly loginButton: Locator;

  // Error Messages
  readonly errorMessage: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    // Signup
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.newUserHeading = page.locator("h2", {
      hasText: "New User Signup!",
    });

    // Login
    this.loginEmailInput = page.getByTestId("login-email");
    this.loginPasswordInput = page.getByTestId("login-password");
    this.loginButton = page.getByTestId("login-button");

    // Error Messages
    this.errorMessage = page.locator("p", {
      hasText: "Your email or password is incorrect!",
    });
  }

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  /**
   * Navigates to the Login page.
   */
  async goto() {
    await super.goto("/login");
  }

  // ─────────────────────────────────────────────
  // Page Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the Login page has loaded successfully
   * by checking the New User Signup heading.
   */
  async verifyPageLoaded() {
    await this.verifyText(this.newUserHeading, "New User Signup!");
  }

  // ─────────────────────────────────────────────
  // Signup
  // ─────────────────────────────────────────────

  /**
   * Fills in the initial signup form with the user's name
   * and email address, then submits the form to begin registration.
   *
   * @param user - The user data containing the name and email
   * used to begin the signup process.
   */
  async startSignup(user: User) {
    await this.signupNameInput.fill(user.name);
    await this.signupEmailInput.fill(user.email);
    await this.click(this.signupButton);
  }

  // ─────────────────────────────────────────────
  // Login
  // ─────────────────────────────────────────────

  /**
   * Fills in the login form with the user's email and password,
   * then submits the login form.
   *
   * @param user - The user data containing the email and password
   * used to log in.
   */
  async startLogin(user: User) {
    await this.loginEmailInput.fill(user.email);
    await this.loginPasswordInput.fill(user.password);
    await this.click(this.loginButton);
  }
}
