import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export class Navbar extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  // Main Navigation
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;

  // Account Navigation
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;

  // Resources & Information
  readonly testCasesLink: Locator;
  readonly apiTestingLink: Locator;
  readonly videoTutorialsLink: Locator;
  readonly contactUsLink: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    // Main Navigation
    this.homeLink = page.getByRole("link", {
      name: "Home",
    });

    this.productsLink = page.getByRole("link", {
      name: "Products",
    });

    this.cartLink = page.locator('ul.navbar-nav > li > a[href="/view_cart"]');

    this.loginLink = page.getByRole("link", {
      name: "Signup / Login",
    });

    // Account Navigation
    // These links are only visible after logging in.
    this.logoutLink = page.getByRole("link", {
      name: "Logout",
    });

    this.deleteAccountLink = page.getByRole("link", {
      name: "Delete Account",
    });

    // Resources & Information
    this.testCasesLink = page.getByRole("link", {
      name: "Test Cases",
    });

    this.apiTestingLink = page.getByRole("link", {
      name: "API Testing",
    });

    this.videoTutorialsLink = page.getByRole("link", {
      name: "Video Tutorials",
    });

    this.contactUsLink = page.getByRole("link", {
      name: "Contact us",
    });
  }

  // ─────────────────────────────────────────────
  // User Status
  // ─────────────────────────────────────────────

  /**
   * Returns a locator for the navigation bar's logged-in user
   * indicator containing the supplied username.
   *
   * @param name - The name of the logged-in user.
   *
   * @returns A locator for the logged-in user indicator.
   */
  loggedInUser(name: string) {
    return this.page.locator("a", {
      hasText: `Logged in as ${name}`,
    });
  }

  // ─────────────────────────────────────────────
  // Main Navigation
  // ─────────────────────────────────────────────

  /**
   * Navigates to the homepage.
   */
  async goHome() {
    await this.click(this.homeLink);
  }

  /**
   * Navigates to the Products page.
   */
  async goToProducts() {
    await this.click(this.productsLink);
  }

  /**
   * Navigates to the shopping cart.
   */
  async goToCart() {
    await this.click(this.cartLink);
  }

  /**
   * Navigates to the Login / Signup page.
   */
  async goToLogin() {
    await this.click(this.loginLink);
  }

  // ─────────────────────────────────────────────
  // Account Navigation
  // ─────────────────────────────────────────────

  /**
   * Logs the current user out of the application.
   */
  async logout() {
    await this.click(this.logoutLink);
  }

  /**
   * Deletes the currently logged-in user's account.
   */
  async deleteAccount() {
    await this.click(this.deleteAccountLink);
  }

  // ─────────────────────────────────────────────
  // Resources & Information
  // ─────────────────────────────────────────────

  /**
   * Navigates to the Test Cases page.
   */
  async goToTestCases() {
    await this.click(this.testCasesLink);
  }

  /**
   * Navigates to the API Testing page.
   */
  async goToApiTesting() {
    await this.click(this.apiTestingLink);
  }

  /**
   * Navigates to the Video Tutorials page.
   */
  async goToVideoTutorials() {
    await this.click(this.videoTutorialsLink);
  }

  /**
   * Navigates to the Contact Us page.
   */
  async goToContactUs() {
    await this.click(this.contactUsLink);
  }
}
