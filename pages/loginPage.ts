import { Page, Locator, expect } from "@playwright/test";
import { User } from "../test-data/users";

export class LoginPage {
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly newUserHeading: Locator;

  constructor(private page: Page) {
    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.newUserHeading = page.locator("h2", {
      hasText: "New User Signup!",
    });
  }

  async goto() {
    await this.page.goto("/login/", {
      waitUntil: "domcontentloaded",
    });
  }

  async verifyPageLoad(){
      await expect(this.newUserHeading).toContainText("New User Signup!");
  }

  async startSignup(user: User) {
    await this.signupNameInput.fill(user.name);
    await this.signupEmailInput.fill(user.email);
    await this.signupButton.click();
  }
}
