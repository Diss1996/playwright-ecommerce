import { expect } from "@playwright/test";
import { Navbar } from "../components/navbar";
import { LoginPage } from "../pages/loginPage";
import { SignupPage } from "../pages/signupPage";
import { AccountCreatedPage } from "../pages/accountCreatedPage";
import { CartPage } from "../pages/cartPage";
import { User } from "../test-data/users";

export class RegistrationFlow {
  constructor(
    private navbar: Navbar,
    private loginPage: LoginPage,
    private signupPage: SignupPage,
    private accountCreatedPage: AccountCreatedPage,
    private cartPage: CartPage,
  ) {}

  async register(user: User) {
    await this.navbar.goToLogin();
    await this.loginPage.verifyPageLoaded();
    await this.loginPage.startSignup(user);
    await this.signupPage.completeRegistration(user);
    await this.accountCreatedPage.verifyPageLoaded();
    await this.accountCreatedPage.clickContinue();
    await expect(
      this.navbar.loggedInUser(user.name)
    ).toBeVisible();
  }

  async registerFromCheckout(user: User){
    await this.cartPage.clickLogin();
    await this.loginPage.verifyPageLoaded();
    await this.loginPage.startSignup(user);
    await this.signupPage.completeRegistration(user);
    await this.accountCreatedPage.verifyPageLoaded();
    await this.accountCreatedPage.clickContinue();
    await expect(
      this.navbar.loggedInUser(user.name)
    ).toBeVisible();
  }
}