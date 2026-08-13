import { test } from "../../fixtures/fixtures";

test("footer subscription", async ({ homepage, footer }) => {
  await homepage.goto();
  await footer.verifyLoaded();
  await footer.subscribe("testing@mail.com");
  await footer.verifySubscriptionSuccess();
});
