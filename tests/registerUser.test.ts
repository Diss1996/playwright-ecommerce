import { test, expect } from "../fixtures/fixtures";
import { createUser } from "../test-data/factories";

test("register and delete user", async ({
  homepage,
  deletedAccountPage,
  registrationFlow,
}) => {
  const user = createUser();
  await registrationFlow.register(user);

  await expect(homepage.loggedInUser(user.name)).toBeVisible();

  await homepage.deleteAccount();
  await deletedAccountPage.verifyPageLoaded();
  await deletedAccountPage.clickContinue();
});

test("register already existing email", async ({
  homepage,
  loginPage,
  registrationFlow,
  signupPage,
}) => {
  const user = createUser();
  await registrationFlow.register(user);
  await homepage.logout();

  const user2 = createUser({
    email: user.email,
  });
  await homepage.goToLogin();
  await loginPage.startSignup(user2);
  await expect(signupPage.registrationError).toBeVisible();

  await expect(signupPage.registrationError).toBeVisible();

  await loginPage.goto(); //cleaning up first created user
  await loginPage.startLogin(user);
  await homepage.deleteAccount();
});

test("login user with correct credentials", async ({
  homepage,
  loginPage,
  deletedAccountPage,
  registrationFlow,
}) => {
  const user = createUser();
  await registrationFlow.register(user);
  await homepage.logout();

  await loginPage.startLogin(user);
  await expect(homepage.loggedInUser(user.name)).toBeVisible();

  await homepage.deleteAccount();
  await deletedAccountPage.verifyPageLoaded();
  await deletedAccountPage.clickContinue();
});

test("login user with wrong credentials", async ({ homepage, loginPage }) => {
  const user = createUser();
  await homepage.goToLogin();

  const invalidUser = {
    ...user,
    password: "WrongPassword123!",
  };
  await loginPage.startLogin(invalidUser);

  await expect(loginPage.errorMessage).toBeVisible();
});
