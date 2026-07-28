/**
 * Represents the payment information required to submit an order.
 *
 * The payment details are stored as strings because the values are
 * entered directly into the corresponding payment form fields.
 */
export interface PaymentDetails {
  nameOnCard: string;
  cardNumber: string;
  cvc: string;
  expiryMonth: string;
  expiryYear: string;
}
