import { Navbar } from "../../components/navbar";
import { DeletedAccountPage } from "../../pages/deletedAccountPage";

// ─────────────────────────────────────────────
// Account Cleanup
// ─────────────────────────────────────────────

/**
 * Deletes the currently logged-in user account and
 * verifies that the account deletion was completed.
 *
 * The cleanup process:
 *
 * 1. Deletes the current user account.
 * 2. Verifies that the account deletion page is displayed.
 * 3. Continues back to the homepage.
 *
 * @param navbar - The Navbar component used to delete the account.
 * @param deletedAccountPage - The page object used to verify the account deletion.
 */
export async function cleanupAccount(
  navbar: Navbar,
  deletedAccountPage: DeletedAccountPage,
) {
  await navbar.deleteAccount();
  await deletedAccountPage.verifyPageLoaded();
  await deletedAccountPage.clickContinue();
}
