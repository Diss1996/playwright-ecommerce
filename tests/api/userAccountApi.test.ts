import { test, expect } from "../../fixtures/fixtures";
import { createUser } from "../../test-data/factories";
import {
  deleteAccount,
  updateAccount,
  getUserDetailByEmail,
} from "../../utils/api/accountApi";
import { createTestAccount } from "../../utils/api/accountTestHelpers";

test("create user account", async ({ request }) => {
  const user = createUser();
  try {
    await createTestAccount(request, user);
  } finally {
    await deleteAccount(request, user);
  }
});

test("delete user account", async ({ request }) => {
  const user = createUser();
  await createTestAccount(request, user);

  const deleteResponse = await deleteAccount(request, user);
  expect(deleteResponse.status()).toBe(200);
  const deleteBody = await deleteResponse.json();
  expect(deleteBody.responseCode).toBe(200);
  expect(deleteBody.message).toBe("Account deleted!");
});

test("update user account", async ({ request }) => {
  const user = createUser();
  await createTestAccount(request, user);

  try {
    const updatedUser = {
      ...user,
      name: "Updated Test User",
    };

    const updateResponse = await updateAccount(request, updatedUser);
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
    expect(getBody.user.name).toBe(updatedUser.name);
    expect(getBody.user.email).toBe(user.email);
  } finally {
    await deleteAccount(request, user);
  }
});

test("get user account details by email", async ({ request }) => {
  const user = createUser();
  await createTestAccount(request, user);

  try {
    const getResponse = await getUserDetailByEmail(request, user.email);

    expect(getResponse.status()).toBe(200);
    const body = await getResponse.json();
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
