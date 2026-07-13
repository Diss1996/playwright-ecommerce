import { test as base, expect } from "@playwright/test";

import { Homepage } from "../pages/homepage";
import { LoginPage } from "../pages/loginPage";
import { SignupPage } from "../pages/signupPage";

type myFixtures = {
  homepage: Homepage;
  loginPage: LoginPage;
  signupPage: SignupPage;
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
});

export { expect };
