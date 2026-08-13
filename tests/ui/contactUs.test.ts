import { test, expect } from "../../fixtures/fixtures";
import { createContactMessage } from "../../test-data/factories";

test.skip("contact form", async ({ homepage, navbar, contactUsPage }) => {
  // Known issue: the site's confirmation prompt behaves
  // inconsistently under Chromium automation.

  const contactUsMessage = createContactMessage();

  await homepage.goto();
  await navbar.goToContactUs();
  await contactUsPage.verifyPageLoaded();
  await contactUsPage.fillContactForm(contactUsMessage);
  await contactUsPage.submit();
  await expect(contactUsPage.successMessage).toBeVisible();
});
