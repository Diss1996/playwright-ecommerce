import { test as base, expect } from "@playwright/test";

import { Homepage } from "../pages/homepage";
import { LoginPage } from "../pages/loginPage";
import { SignupPage } from "../pages/signupPage";
import { AccountCreatedPage } from "../pages/accountCreatedPage";
import { DeletedAccountPage } from "../pages/deletedAccountPage";
import { RegistrationFlow } from "../flows/registrationFlow";
import { Navbar } from "../components/navbar";
import { ContactUsPage } from "../pages/contactUsPage";

type myFixtures = {
  homepage: Homepage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountCreatedPage: AccountCreatedPage;
  deletedAccountPage: DeletedAccountPage;
  registrationFlow: RegistrationFlow;
  navbar: Navbar;
  contactUsPage: ContactUsPage;
};

export const test = base.extend<myFixtures>({
  homepage: async ({ page }, use) => {
    const homepage = new Homepage(page);
    await use(homepage);
  },

  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page);
    await use(contactUsPage);
  },

  navbar: async ({ page }, use) => {
    await use(new Navbar(page));
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

  registrationFlow: async (
    { navbar, loginPage, signupPage, accountCreatedPage },
    use,
  ) => {
    const registrationFlow = new RegistrationFlow(
      navbar,
      loginPage,
      signupPage,
      accountCreatedPage,
    );

    await use(registrationFlow);
  },
});

export { expect };
