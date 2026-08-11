import { Navbar } from "../../components/navbar";
import { DeletedAccountPage } from "../../pages/deletedAccountPage";

export async function cleanupAccount(
  navbar: Navbar,
  deletedAccountPage: DeletedAccountPage,
) {
  await navbar.deleteAccount();
  await deletedAccountPage.verifyPageLoaded();
  await deletedAccountPage.clickContinue();
}