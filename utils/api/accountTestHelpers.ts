import { APIRequestContext, expect } from "@playwright/test";
import { User } from "../../test-data/users";
import { createAccount } from "./accountApi";

/**
 * Creates and verifies a test user account through the API.
 *
 * The helper sends the account creation request and verifies
 * that the API successfully created the account.
 *
 * @param request - The Playwright API request context.
 * @param user - The user data used to create the test account.
 * @returns The user data for the newly created test account.
 */
export async function createTestAccount(
  request: APIRequestContext,
  user: User,
) {
  const response = await createAccount(request, user);

  expect(response.status()).toBe(200);

  const body = await response.json();

  expect(body.responseCode).toBe(201);
  expect(body.message).toBe("User created!");

  return user;
}
