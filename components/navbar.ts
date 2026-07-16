import { Locator, Page } from "@playwright/test";
import { BasePage } from "../pages/basePage";

export class Navbar extends BasePage {
  readonly homeLink: Locator;
  readonly productsLink: Locator;
  readonly cartLink: Locator;
  readonly loginLink: Locator;
  readonly logoutLink: Locator;
  readonly deleteAccountLink: Locator;
  readonly testCasesLink: Locator;
  readonly apiTestingLink: Locator;
  readonly videoTutorialsLink: Locator;
  readonly contactUsLink: Locator;

  constructor(page: Page) {
    super(page);

    this.homeLink = page.getByRole("link", { name: "Home" });
    this.productsLink = page.getByRole("link", { name: "Products" });
    this.cartLink = page.getByRole("link", { name: "Cart" });
    this.loginLink = page.getByRole("link", { name: "Signup / Login" });

    //only visible after logging in
    this.logoutLink = page.getByRole("link", { name: "Logout" });
    this.deleteAccountLink = page.getByRole("link", {
      name: "Delete Account",
    });

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

  loggedInUser(name: string) {
    return this.page.locator("a", {
      hasText: `Logged in as ${name}`,
    });
  }

  async goHome() {
    await this.click(this.homeLink);
  }

  async goToProducts() {
    await this.click(this.productsLink);
  }

  async goToCart() {
    await this.click(this.cartLink);
  }

  async goToLogin() {
    await this.click(this.loginLink);
  }

  async goToTestCases() {
    await this.click(this.testCasesLink);
  }

  async goToApiTesting() {
    await this.click(this.apiTestingLink);
  }

  async goToVideoTutorials() {
    await this.click(this.videoTutorialsLink);
  }

  async goToContactUs() {
    await this.click(this.contactUsLink);
  }

  async logout() {
    await this.click(this.logoutLink);
  }

  async deleteAccount() {
    await this.click(this.deleteAccountLink);
  }
}
