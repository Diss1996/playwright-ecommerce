import { Page } from "@playwright/test";
import { BasePage } from "./basePage";

export class Homepage extends BasePage {
  // ─────────────────────────────────────────────
  // Constructor
  // ─────────────────────────────────────────────

  constructor(page: Page) {
    super(page);
  }

  // ─────────────────────────────────────────────
  // Navigation
  // ─────────────────────────────────────────────

  /**
   * Navigates to the application's homepage.
   */
  async goto() {
    await super.goto("/");
  }
}
