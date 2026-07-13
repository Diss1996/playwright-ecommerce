import { User } from "./users";

export function createUser(): User {
  const id = Date.now();

  return {
    title: "Mr",
    name: "Test User",
    email: `test${Date.now()}@example.com`,
    password: "Password123",

    birthDay: "15",
    birthMonth: "6",
    birthYear: "1995",

    firstName: "Test",
    lastName: "User",
    company: "Test Company",
    address: "123 Test Street",
    address2: "Apartment 1",

    country: "Canada",
    state: "Nova Scotia",
    city: "Halifax",
    zipcode: "B3H1A1",
    mobileNumber: "9025551234",
  };
}
