import { test, expect } from "../fixtures/fixtures";
import { createUser } from "../test-data/factories";

test("register and delete user", async ({
  homepage,
  loginPage,
  signupPage,
  accountCreatedPage,
  deletedAccountPage,
}) => {
  const user = createUser();

  await homepage.goToLogin();
  await loginPage.verifyPageLoad();
  await loginPage.startSignup(user);
  await signupPage.completeRegistration(user);
  await accountCreatedPage.verifyPageLoaded();
  await accountCreatedPage.clickContinueButton();
  await expect(homepage.loggedInUser(user.name)).toBeVisible();
  await homepage.deleteAccount();
  await deletedAccountPage.verifyAccountDeletion();
  await deletedAccountPage.clickContinue();
});
