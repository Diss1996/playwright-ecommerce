import { Page, Locator } from "@playwright/test";
import { User } from "../test-data/users";

export class LoginPage {
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;

  constructor(private page: Page) {
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
  }

  async goto() {
    await this.page.goto("/login/", {
      waitUntil: "domcontentloaded",
    });
  }

  async startSignup(user: User) {
    await this.signupNameInput.fill(user.name);
    await this.signupEmailInput.fill(user.email);
    await this.signupButton.click();
  }
}
