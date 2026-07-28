/**
 * Represents the data required to submit a Contact Us form.
 *
 * The attachment property is optional because a contact message
 * can be submitted with or without a file attachment.
 */
export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
  attachment?: string;
}
