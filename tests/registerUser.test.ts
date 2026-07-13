import { test, expect } from "../fixtures/fixtures";
import { createUser } from "../test-data/factories";

test("register user", async ({ homepage, loginPage, signupPage, page }) => {
  const user = createUser();
  await homepage.loginButton.click();
  await expect(page.locator("#form")).toContainText("New User Signup!");
  await loginPage.startSignup(user);
  await signupPage.completeRegistration(user);
});
