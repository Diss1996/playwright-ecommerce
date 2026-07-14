import { Page, Locator } from "@playwright/test";

export class Homepage {
  readonly loginButton: Locator;
  readonly deleteAccountButton: Locator;

  constructor(private page: Page) {
    this.deleteAccountButton = page.locator("a", {
      hasText: "Delete Account",
    });

    this.loginButton = page.getByRole("link", {
      name: "Signup / Login",
    });
  }

  loggedInUser(name: string) {
    return this.page.locator("a", {
      hasText: `Logged in as ${name}`,
    });
  }

  async deleteAccount() {
    await this.deleteAccountButton.click();
  }

  async goToLogin() {
    await this.loginButton.click();
  }

  async goto() {
    await this.page.goto("/", {
      waitUntil: "domcontentloaded",
    });
  }
}
