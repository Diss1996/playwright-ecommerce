import { APIRequestContext, expect } from "@playwright/test";
import { User } from "../../test-data/users";
import { createAccount } from "./accountApi";

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
