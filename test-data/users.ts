/**
 * Represents the user information required to register and
 * interact with a user account.
 *
 * The interface includes account credentials, personal information,
 * optional marketing preferences, and address information.
 */
export interface User {
  // Account Information
  title: "Mr" | "Mrs";
  name: string;
  email: string;
  password: string;

  // Date of Birth
  birthDay: string;
  birthMonth: string;
  birthYear: string;

  // Marketing Preferences
  newsletter: boolean;
  specialOffers: boolean;

  // Personal Information
  firstName: string;
  lastName: string;
  company?: string;

  // Address Information
  address: string;
  address2?: string;
  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}
