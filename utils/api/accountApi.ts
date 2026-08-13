import { APIRequestContext } from "@playwright/test";
import { User } from "../../test-data/users";

/**
 * Creates a user account through the API.
 *
 * @param request - The Playwright API request context.
 * @param user - The user data used to create the account.
 * @returns The API response from the account creation request.
 */
export async function createAccount(request: APIRequestContext, user: User) {
  return request.post("/api/createAccount", {
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
}

/**
 * Deletes a user account through the API.
 *
 * @param request - The Playwright API request context.
 * @param user - The user account to delete.
 * @returns The API response from the account deletion request.
 */
export async function deleteAccount(request: APIRequestContext, user: User) {
  return request.delete("/api/deleteAccount", {
    form: {
      email: user.email,
      password: user.password,
    },
  });
}

/**
 * Updates a user account through the API.
 *
 * @param request - The Playwright API request context.
 * @param user - The updated user data.
 * @returns The API response from the account update request.
 */
export async function updateAccount(request: APIRequestContext, user: User) {
  return request.put("/api/updateAccount", {
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
}

/**
 * Retrieves user account details by email through the API.
 *
 * @param request - The Playwright API request context.
 * @param email - The email address of the account to retrieve.
 * @returns The API response containing the user's account details.
 */
export async function getUserDetailByEmail(
  request: APIRequestContext,
  email: string,
) {
  return request.get("/api/getUserDetailByEmail", {
    params: {
      email,
    },
  });
}
