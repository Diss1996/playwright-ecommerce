import { test, expect } from "../../fixtures/fixtures";
import { createUser } from "../../test-data/factories";

test("POST verifyLogin with valid credentials", async ({
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

test("POST verifyLogin with unregistered email", async ({ request }) => {
  const user = createUser();

  const response = await request.post("/api/verifyLogin", {
    form: {
      email: user.email, // createUser() generates a unique email that has not been registered.
      password: user.password,
    },
  });
  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(404);
  expect(body.message).toBe("User not found!");
});

test("POST verifyLogin rejects request with missing email", async ({
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

test("POST verifyLogin rejects request with missing password", async ({
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

test("DELETE verifyLogin returns method-not-supported response", async ({
  request,
}) => {
  const response = await request.delete("/api/verifyLogin");

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(405);
  expect(body.message).toBe("This request method is not supported.");
});
