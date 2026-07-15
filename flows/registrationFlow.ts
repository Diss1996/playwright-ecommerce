import { expect } from "@playwright/test";
import { Homepage } from "../pages/homepage";
import { LoginPage } from "../pages/loginPage";
import { SignupPage } from "../pages/signupPage";
import { AccountCreatedPage } from "../pages/accountCreatedPage";
import { User } from "../test-data/users";

export class RegistrationFlow {
  constructor(
    private homepage: Homepage,
    private loginPage: LoginPage,
    private signupPage: SignupPage,
    private accountCreatedPage: AccountCreatedPage,
  ) {}

  async register(user: User) {
    await this.homepage.goToLogin();
    await this.loginPage.verifyPageLoaded();
    await this.loginPage.startSignup(user);
    await this.signupPage.completeRegistration(user);
    await this.accountCreatedPage.verifyPageLoaded();
    await this.accountCreatedPage.clickContinue();
    await expect(
      this.homepage.loggedInUser(user.name)
    ).toBeVisible();
  }
}