import { Page, Locator } from "@playwright/test";

export class Homepage {
  readonly loginButton: Locator;
  constructor(private page: Page) {
    this.loginButton = page.getByRole("link", {
      name: "Signup / Login",
    });
  }

  async goto() {
    await this.page.goto("/", {
      waitUntil: "domcontentloaded",
    });
  }
}
