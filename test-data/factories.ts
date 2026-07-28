import { User } from "./users";
import { ContactMessage } from "./contactMessage";
import { PaymentDetails } from "./paymentDetails";

// ─────────────────────────────────────────────
// User Factory
// ─────────────────────────────────────────────

/**
 * Creates a User object containing default test data.
 *
 * A unique email address is generated using the current timestamp
 * to help prevent conflicts when creating accounts during tests.
 *
 * Individual properties can be overridden by supplying values
 * through the optional overrides parameter.
 *
 * @param overrides - Optional User properties that replace the
 * default test data.
 *
 * @returns A User object containing the default or overridden data.
 *
 * @example
 * const user = createUser();
 *
 * @example
 * const user = createUser({
 *   name: "John Smith",
 *   email: "john@example.com",
 * });
 */
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

// ─────────────────────────────────────────────
// Contact Message Factory
// ─────────────────────────────────────────────

/**
 * Creates a ContactMessage object containing default test data.
 *
 * A unique email address is generated using the current timestamp.
 * The attachment is undefined by default, allowing tests to choose
 * whether to include a file attachment through the overrides parameter.
 *
 * Individual properties can be overridden by supplying values
 * through the optional overrides parameter.
 *
 * @param overrides - Optional ContactMessage properties that replace
 * the default test data.
 *
 * @returns A ContactMessage object containing the default or
 * overridden data.
 *
 * @example
 * const message = createContactMessage();
 *
 * @example
 * const message = createContactMessage({
 *   subject: "Question About My Order",
 *   message: "I have a question about my order.",
 * });
 */
export function createContactMessage(
  overrides: Partial<ContactMessage> = {},
): ContactMessage {
  const id = Date.now();

  const message: ContactMessage = {
    name: "Test User",
    email: `test${id}@example.com`,
    subject: "Test Subject",
    message: "This is a test message.",
    attachment: undefined,
  };

  return {
    ...message,
    ...overrides,
  };
}

// ─────────────────────────────────────────────
// Payment Details Factory
// ─────────────────────────────────────────────

/**
 * Creates a PaymentDetails object containing default test payment data.
 *
 * Individual properties can be overridden by supplying values
 * through the optional overrides parameter.
 *
 * @param overrides - Optional PaymentDetails properties that replace
 * the default test data.
 *
 * @returns A PaymentDetails object containing the default or
 * overridden payment data.
 *
 * @example
 * const payment = createPaymentDetails();
 *
 * @example
 * const payment = createPaymentDetails({
 *   nameOnCard: "John Smith",
 *   expiryYear: "2035",
 * });
 */
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
