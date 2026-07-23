import { test as base, expect } from "@playwright/test";

import { Homepage } from "../pages/homepage";
import { LoginPage } from "../pages/loginPage";
import { SignupPage } from "../pages/signupPage";
import { AccountCreatedPage } from "../pages/accountCreatedPage";
import { DeletedAccountPage } from "../pages/deletedAccountPage";
import { RegistrationFlow } from "../flows/registrationFlow";
import { Navbar } from "../components/navbar";
import { ContactUsPage } from "../pages/contactUsPage";
import { ProductsPage } from "../pages/productsPage";
import { ProductDetailsPage } from "../pages/productDetailsPage";
import { Footer } from "../components/footer";
import { CartPage } from "../pages/cartPage";
import { AddProductsToCartFlow } from "../flows/addProductsToCartFlow";
import { CheckoutPage } from "../pages/checkoutPage";
import { PaymentPage } from "../pages/paymentPage";
import { PaymentDonePage } from "../pages/paymentDonePage";

type myFixtures = {
  homepage: Homepage;
  loginPage: LoginPage;
  signupPage: SignupPage;
  accountCreatedPage: AccountCreatedPage;
  deletedAccountPage: DeletedAccountPage;
  registrationFlow: RegistrationFlow;
  navbar: Navbar;
  contactUsPage: ContactUsPage;
  productsPage: ProductsPage;
  productsDetailsPage: ProductDetailsPage;
  footer: Footer;
  cartPage: CartPage;
  addProductsToCartFlow: AddProductsToCartFlow;
  checkoutPage: CheckoutPage;
  paymentPage: PaymentPage;
  paymentDonePage: PaymentDonePage;
};

export const test = base.extend<myFixtures>({
  homepage: async ({ page }, use) => {
    const homepage = new Homepage(page);
    await use(homepage);
  },

  paymentDonePage: async ({ page }, use) => {
    const paymentDonePage = new PaymentDonePage(page);
    await use(paymentDonePage);
  },

  paymentPage: async ({ page }, use) => {
    const paymentPage = new PaymentPage(page);
    await use(paymentPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  cartPage: async ({ page }, use) => {
    const cartPage = new CartPage(page);
    await use(cartPage);
  },

  productsDetailsPage: async ({ page }, use) => {
    const productsDetailsPage = new ProductDetailsPage(page);
    await use(productsDetailsPage);
  },

  footer: async ({ page }, use) => {
    await use(new Footer(page));
  },

  contactUsPage: async ({ page }, use) => {
    const contactUsPage = new ContactUsPage(page);
    await use(contactUsPage);
  },

  productsPage: async ({ page }, use) => {
    const productsPage = new ProductsPage(page);
    await use(productsPage);
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
    { navbar, loginPage, signupPage, accountCreatedPage, cartPage },
    use,
  ) => {
    const registrationFlow = new RegistrationFlow(
      navbar,
      loginPage,
      signupPage,
      accountCreatedPage,
      cartPage,
    );

    await use(registrationFlow);
  },

  addProductsToCartFlow: async ({ productsPage, productsDetailsPage }, use) => {
    const addProductsToCartFlow = new AddProductsToCartFlow(
      productsPage,
      productsDetailsPage,
    );

    await use(addProductsToCartFlow);
  },
});

export { expect };
