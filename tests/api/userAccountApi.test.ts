import { test, expect } from "../../fixtures/fixtures";
import { createUser } from "../../test-data/factories";

test("create user account", async ({ request }) => {
  const user = createUser();

  const response = await request.post("/api/createAccount", {
    form: {
      name: user.name,
      email: user.email,
      password: user.password,
      title: user.title,

      birth_date: user.birthDay,
      birth_month: user.birthMonth,
      birth_year: user.birthYear,

      firstname: user.firstName,
      lastname: user.lastName,
      company: user.company ?? "",
      address1: user.address,
      address2: user.address2 ?? "",

      country: user.country,
      zipcode: user.zipcode,
      state: user.state,
      city: user.city,
      mobile_number: user.mobileNumber,
    },
  });

  const body = await response.json();

  expect(response.status()).toBe(200);
  expect(body.responseCode).toBe(201);
  expect(body.message).toBe("User created!");
});

test("delete user account", async ({ request, homepage, registrationFlow }) => {
  await homepage.goto();

  const user = createUser();
  await registrationFlow.register(user);

  const response = await request.delete("/api/deleteAccount", {
    form: {
      email: user.email,
      password: user.password,
    },
  });

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(200);
  expect(body.message).toBe("Account deleted!");
});

test("update user account", async ({
  request,
  homepage,
  registrationFlow,
  navbar,
}) => {
  await homepage.goto();

  const user = createUser();
  await registrationFlow.register(user);

  try {
    const response = await request.put("/api/updateAccount", {
      form: {
        name: "Updated Test User",
        email: user.email,
        password: user.password,
        title: user.title,

        birth_date: user.birthDay,
        birth_month: user.birthMonth,
        birth_year: user.birthYear,

        firstname: user.firstName,
        lastname: user.lastName,
        company: user.company ?? "",
        address1: user.address,
        address2: user.address2 ?? "",

        country: user.country,
        zipcode: user.zipcode,
        state: user.state,
        city: user.city,
        mobile_number: user.mobileNumber,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.responseCode).toBe(200);
    expect(body.message).toBe("User updated!");
  } finally {
    await navbar.deleteAccount();
  }
});

test("get user account details by email", async ({
  request,
  homepage,
  registrationFlow,
  navbar,
}) => {
  await homepage.goto();

  const user = createUser();
  await registrationFlow.register(user);

  try {
    const response = await request.get("/api/getUserDetailByEmail", {
      params: {
        email: user.email,
      },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();

    expect(body.responseCode).toBe(200);

    expect(body.user.email).toBe(user.email);
    expect(body.user.name).toBe(user.name);
  } finally {
    await navbar.deleteAccount();
  }
});
