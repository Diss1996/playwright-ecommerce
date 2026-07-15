import { User } from "./users";

export function createUser(overrides: Partial<User> = {}): User {
  const id = Date.now();

  const user: User = {
    title: "Mr",
    name: "Test User",
    email: `test${id}@example.com`,
    password: "Password123",

    birthDay: "15",
    birthMonth: "6",
    birthYear: "1995",

    newsletter: true,
    specialOffers: true,

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

  return {
    ...user,
    ...overrides,
  };
}