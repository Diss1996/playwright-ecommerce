import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";

export class Homepage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  async goto() {
    await super.goto("/");
  }
}