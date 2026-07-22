import { test, expect } from "../fixtures/fixtures";

test("footer subscription", async ({ homepage, footer }) => {
  await homepage.goto();
  await footer.verifyLoaded();
  await footer.subscribe("testing@mail.com");
  await footer.verifySubscriptionSuccess();
});

// test("contact form", async ({ homepage, navbar, contactUsPage }) => {
//   //doesnt work in chromium, issues with the confirm prompt
//   const contactUsMessage = createContactMessage();

//   await homepage.goto();
//   await navbar.goToContactUs();

//   await contactUsPage.verifyPageLoaded();

//   await contactUsPage.fillContactForm(contactUsMessage);
//   await contactUsPage.submit();

//   await expect(contactUsPage.successMessage).toBeVisible();
// });
