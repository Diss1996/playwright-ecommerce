export interface User {
  title: "Mr" | "Mrs";
  name: string;
  email: string;
  password: string;

  birthDay: string;
  birthMonth: string;
  birthYear: string;

  newsletter: boolean;
  specialOffers: boolean;

  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  address2?: string;

  country: string;
  state: string;
  city: string;
  zipcode: string;
  mobileNumber: string;
}
