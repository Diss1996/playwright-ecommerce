import { test, expect } from "../../fixtures/fixtures";
import { createUser } from "../../test-data/factories";

test("verify login with valid credentials", async ({
  request,
  navbar,
  registrationFlow,
  homepage,
}) => {
  await homepage.goto();
  const user = createUser();
  await registrationFlow.register(user);

  try {
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
  } finally {
    // Cleanup
    await navbar.deleteAccount();
  }
});

test("verify login with invalid credentials", async ({ request }) => {
  const response = await request.post("/api/verifyLogin", {
    form: {
      email: "testEmail@123.com",
      password: "12345",
    },
  });
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(404);
  expect(body.message).toBe("User not found!");
});

test("verify login rejects request with missing email", async ({
  request,
  navbar,
  registrationFlow,
  homepage,
}) => {
  await homepage.goto();
  const user = createUser();
  await registrationFlow.register(user);

  try {
    const response = await request.post("/api/verifyLogin", {
      form: {
        password: user.password,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.responseCode).toBe(400);
    expect(body.message).toBe(
      "Bad request, email or password parameter is missing in POST request.",
    );
  } finally {
    // Cleanup
    await navbar.deleteAccount();
  }
});

test("verify login rejects DELETE requests", async ({ request }) => {
  const response = await request.delete("/api/verifyLogin");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(405);
  expect(body.message).toBe("This request method is not supported.");
});
