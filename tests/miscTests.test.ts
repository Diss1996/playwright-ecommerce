import { test, expect } from "../fixtures/fixtures";
import { createContactMessage } from "../test-data/factories";

test("footer subscription", async ({ homepage, footer }) => {
  await homepage.goto();
  await footer.verifyLoaded();
  await footer.subscribe("testing@mail.com");
  await footer.verifySubscriptionSuccess();
});

// test("contact form", async ({ homepage, navbar, contactUsPage, page }) => {
//   //inconsisently works in chromium, issues with the confirm prompt
// test change


//   const contactUsMessage = createContactMessage();

//   await homepage.goto();
//   await navbar.goToContactUs();

//   await contactUsPage.verifyPageLoaded();

//   await contactUsPage.fillContactForm(contactUsMessage);
//   await contactUsPage.submit();

//   await expect(contactUsPage.successMessage).toBeVisible();
// });
