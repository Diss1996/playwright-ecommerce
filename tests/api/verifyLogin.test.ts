import { test, expect } from "../../fixtures/fixtures";
import { Homepage } from "../../pages/homepage";
import { createUser } from "../../test-data/factories";

test("search products post without search parameter", async ({
  request,
  navbar,
  registrationFlow,
  homepage
}) => {
  await homepage.goto();
  const user = createUser();
  await registrationFlow.register(user);

  const response = await request.post("/api/verifyLogin", {
    form: {
      email: user.email,
      password: user.password,
    },
  });
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(200);
  expect(body.message).toBe("User exists!");

  // Cleanup
  await navbar.deleteAccount();
});

test("s", async ({ request }) => {
  const response = await request.get("/api/verifyLogin");

  expect(response.status()).toBe(200);

  const body = await response.json();
  console.log(body);
});
