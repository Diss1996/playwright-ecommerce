import { Page, Locator, expect } from "@playwright/test";

export class DeletedAccountPage {
  readonly accountDeletedHeading: Locator;
  readonly continueButton: Locator;

  constructor(private page: Page) {
    this.accountDeletedHeading = page.getByTestId("account-deleted");
    this.continueButton = page.getByTestId("continue-button");
  }

  async verifyAccountDeletion(){
     await expect(this.accountDeletedHeading).toHaveText(
        "Account Deleted!",
      );
  }

  async clickContinue(){
    await this.continueButton.click();
  }

}