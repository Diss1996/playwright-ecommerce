import { test as base, expect } from "@playwright/test";

import { Homepage } from "../pages/homepage";
import { LoginPage } from "../pages/loginPage";
import { SignupPage } from "../pages/signupPage";
import { AccountCreatedPage } from "../pages/accountCreatedPage";
import { DeletedAccountPage } from "../pages/deletedAccountPage";

type myFixtures = {
  homepage: Homepage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountCreatedPage: AccountCreatedPage;
  deletedAccountPage: DeletedAccountPage;
};

export const test = base.extend<myFixtures>({
  homepage: async ({ page }, use) => {
    const homepage = new Homepage(page);
    await homepage.goto();

    await use(homepage);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  signupPage: async ({ page }, use) => {
    const signupPage = new SignupPage(page);
    await use(signupPage);
  },

  accountCreatedPage: async ({ page }, use) => {
    const accountCreatedPage = new AccountCreatedPage(page);
    await use(accountCreatedPage);
  },

  deletedAccountPage: async ({ page }, use) => {
    const deletedAccountPage = new DeletedAccountPage(page);
    await use(deletedAccountPage);
  },
});

export { expect };
