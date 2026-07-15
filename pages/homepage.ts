import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class Homepage extends BasePage {
  readonly loginButton: Locator;
  readonly deleteAccountButton: Locator;
  readonly logoutButton: Locator;

  constructor(page: Page) {
    super(page);

    this.deleteAccountButton = page.locator("a", {
      hasText: "Delete Account",
    });

    this.loginButton = page.getByRole("link", {
      name: "Signup / Login",
    });

    this.logoutButton = page.getByRole("link", {
      name: " Logout",
    });
  }

  loggedInUser(name: string) {
    return this.page.locator("a", {
      hasText: `Logged in as ${name}`,
    });
  }

  async deleteAccount() {
    await this.click(this.deleteAccountButton);
  }

  async goToLogin() {
    await this.click(this.loginButton);
  }

  async logout() {
    await this.click(this.logoutButton);
  }

  async goto() {
    await super.goto("/");
  }
}
