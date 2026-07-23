import { User } from "./users";
import { ContactMessage } from "./contactMessage";
import { PaymentDetails } from "./paymentDetails";

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

export function createContactMessage(
  overrides: Partial<ContactMessage> = {},
): ContactMessage {
  const message: ContactMessage = {
    name: "Test User",
    email: `test${Date.now()}@example.com`,
    subject: "Test Subject",
    message: "This is a test message.",
    attachment: undefined,
  };

  return {
    ...message,
    ...overrides,
  };
}

export function createPaymentDetails(
  overrides: Partial<PaymentDetails> = {},
): PaymentDetails {
  const paymentDetails: PaymentDetails = {
    nameOnCard: "Test User",
    cardNumber: "4111111111111111",
    cvc: "311",
    expiryMonth: "12",
    expiryYear: "2030",
  };

  return {
    ...paymentDetails,
    ...overrides,
  };
}
