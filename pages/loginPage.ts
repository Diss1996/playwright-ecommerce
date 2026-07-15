import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { User } from "../test-data/users";

export class LoginPage extends BasePage {
  readonly signupNameInput: Locator;
  readonly signupEmailInput: Locator;
  readonly signupButton: Locator;
  readonly newUserHeading: Locator;

  constructor(page: Page) {
    super(page);

    this.signupNameInput = page.locator('[data-qa="signup-name"]');
    this.signupEmailInput = page.locator('[data-qa="signup-email"]');
    this.signupButton = page.locator('[data-qa="signup-button"]');
    this.newUserHeading = page.locator("h2", {
      hasText: "New User Signup!",
    });
  }

  async goto() {
    await super.goto("/login");
  }

  async verifyPageLoaded() {
    await this.verifyText(this.newUserHeading, "New User Signup!");
  }

  async startSignup(user: User) {
    await this.signupNameInput.fill(user.name);
    await this.signupEmailInput.fill(user.email);
    await this.click(this.signupButton);
  }
}