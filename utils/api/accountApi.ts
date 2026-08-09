import { APIRequestContext } from "@playwright/test";
import { User } from "../../test-data/users";

export async function createAccount(
  request: APIRequestContext,
  user: User,
) {
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

export async function deleteAccount(
  request: APIRequestContext,
  user: User,
) {
  return request.delete("/api/deleteAccount", {
    form: {
      email: user.email,
      password: user.password,
    },
  });
}