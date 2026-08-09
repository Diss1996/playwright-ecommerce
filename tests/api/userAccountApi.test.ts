import { test, expect } from "../../fixtures/fixtures";
import { createUser } from "../../test-data/factories";
import { createAccount, deleteAccount } from "../../utils/api/accountApi";

test("create user account", async ({ request }) => {
  const user = createUser();

  try {
    const response = await createAccount(request, user);

    const body = await response.json();

    expect(response.status()).toBe(200);
    expect(body.responseCode).toBe(201);
    expect(body.message).toBe("User created!");
  } finally {
    await deleteAccount(request, user);
  }
});

test("delete user account", async ({ request }) => {
  const user = createUser();

  const createResponse = await createAccount(request, user);

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();

  expect(createBody.responseCode).toBe(201);
  expect(createBody.message).toBe("User created!");

  const deleteResponse = await deleteAccount(request, user);

  expect(deleteResponse.status()).toBe(200);

  const deleteBody = await deleteResponse.json();

  expect(deleteBody.responseCode).toBe(200);
  expect(deleteBody.message).toBe("Account deleted!");
});

test("update user account", async ({ request }) => {
  const user = createUser();

  const createResponse = await createAccount(request, user);

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();

  expect(createBody.responseCode).toBe(201);
  expect(createBody.message).toBe("User created!");

  try {
    const updatedName = "Updated Test User";

    const updateResponse = await request.put("/api/updateAccount", {
      form: {
        name: updatedName,
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

    expect(updateResponse.status()).toBe(200);

    const updateBody = await updateResponse.json();

    expect(updateBody.responseCode).toBe(200);
    expect(updateBody.message).toBe("User updated!");

    // Verify the update actually changed the account
    const getResponse = await request.get("/api/getUserDetailByEmail", {
      params: {
        email: user.email,
      },
    });

    expect(getResponse.status()).toBe(200);

    const getBody = await getResponse.json();

    expect(getBody.responseCode).toBe(200);
    expect(getBody.user.name).toBe(updatedName);
    expect(getBody.user.email).toBe(user.email);
  } finally {
    await deleteAccount(request, user);
  }
});

test("get user account details by email", async ({ request }) => {
  const user = createUser();

  const createResponse = await createAccount(request, user);

  expect(createResponse.status()).toBe(200);

  const createBody = await createResponse.json();

  expect(createBody.responseCode).toBe(201);
  expect(createBody.message).toBe("User created!");

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
    expect(body.user.first_name).toBe(user.firstName);
    expect(body.user.last_name).toBe(user.lastName);
    expect(body.user.company).toBe(user.company);
    expect(body.user.address1).toBe(user.address);
    expect(body.user.country).toBe(user.country);
    expect(body.user.state).toBe(user.state);
    expect(body.user.city).toBe(user.city);
    expect(body.user.zipcode).toBe(user.zipcode);
  } finally {
    await deleteAccount(request, user);
  }
});
