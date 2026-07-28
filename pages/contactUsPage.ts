import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "./basePage";
import { ContactMessage } from "../test-data/contactMessage";

export class ContactUsPage extends BasePage {
  // ─────────────────────────────────────────────
  // Locators
  // ─────────────────────────────────────────────

  readonly heading: Locator;

  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly subjectInput: Locator;
  readonly messageInput: Locator;
  readonly fileUploadInput: Locator;

  readonly submitButton: Locator;

  readonly successMessage: Locator;

  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);

    this.heading = page.getByRole("heading", {
      name: "Contact Us",
    });

    this.nameInput = page.locator('[data-qa="name"]');
    this.emailInput = page.locator('[data-qa="email"]');
    this.subjectInput = page.locator('[data-qa="subject"]');
    this.messageInput = page.locator('[data-qa="message"]');
    this.fileUploadInput = page.locator('input[type="file"]');

    this.submitButton = page.locator('[data-qa="submit-button"]');

    this.successMessage = page.locator(".status.alert-success");
  }

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  /**
   * Navigates to the Contact Us page.
   */
  async goto() {
    await super.goto("/contact_us");
  }

  // ─────────────────────────────────────────────
  // Page Verification
  // ─────────────────────────────────────────────

  /**
   * Verifies that the Contact Us page has loaded successfully
   * by checking that the page heading is visible.
   */
  async verifyPageLoaded() {
    await this.verifyVisible(this.heading);
  }

  // ─────────────────────────────────────────────
  // Contact Form
  // ─────────────────────────────────────────────

  /**
   * Fills out the Contact Us form using the supplied contact message data.
   *
   * If an attachment is provided, the file is also uploaded
   * using the file upload input.
   *
   * @param contact - The contact message data used to populate the form.
   */
  async fillContactForm(contact: ContactMessage) {
    await this.nameInput.fill(contact.name);
    await this.emailInput.fill(contact.email);
    await this.subjectInput.fill(contact.subject);
    await this.messageInput.fill(contact.message);

    if (contact.attachment) {
      await this.fileUploadInput.setInputFiles(contact.attachment);
    }
  }

  // ─────────────────────────────────────────────
  // Form Submission
  // ─────────────────────────────────────────────

  /**
   * Submits the Contact Us form and handles the confirmation dialog
   * displayed by the application.
   *
   * The method verifies that the dialog is a confirmation dialog
   * with the expected message before accepting it.
   */
  async submit() {
    this.page.once("dialog", async (dialog) => {
      expect(dialog.type()).toBe("confirm");
      expect(dialog.message()).toBe("Press OK to proceed!");

      await dialog.accept();
    });

    await this.submitButton.click();
  }
}
