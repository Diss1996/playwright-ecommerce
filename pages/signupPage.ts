import { Page, Locator } from "@playwright/test";
import { BasePage } from "./basePage";
import { User } from "../test-data/users";

export class SignupPage extends BasePage {
  readonly mrRadio: Locator;
  readonly mrsRadio: Locator;

  readonly name: Locator;
  readonly password: Locator;

  readonly day: Locator;
  readonly month: Locator;
  readonly year: Locator;

  readonly newsletterBox: Locator;
  readonly specialOffersBox: Locator;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly company: Locator;

  readonly address: Locator;
  readonly address2: Locator;

  readonly country: Locator;
  readonly state: Locator;
  readonly city: Locator;
  readonly zipcode: Locator;
  readonly mobileNumber: Locator;

  readonly createAccountButton: Locator;

  constructor(page: Page) {
    super(page);

    this.mrRadio = page.locator("#id_gender1");
    this.mrsRadio = page.locator("#id_gender2");

    this.name = page.locator('[data-qa="name"]');
    this.password = page.locator('[data-qa="password"]');

    this.day = page.locator('[data-qa="days"]');
    this.month = page.locator('[data-qa="months"]');
    this.year = page.locator('[data-qa="years"]');

    this.newsletterBox = page.locator("#newsletter");
    this.specialOffersBox = page.locator("#optin");

    this.firstName = page.locator('[data-qa="first_name"]');
    this.lastName = page.locator('[data-qa="last_name"]');
    this.company = page.locator('[data-qa="company"]');

    this.address = page.locator('[data-qa="address"]');
    this.address2 = page.locator('[data-qa="address2"]');

    this.country = page.locator('[data-qa="country"]');
    this.state = page.locator('[data-qa="state"]');
    this.city = page.locator('[data-qa="city"]');
    this.zipcode = page.locator('[data-qa="zipcode"]');
    this.mobileNumber = page.locator('[data-qa="mobile_number"]');

    this.createAccountButton = page.locator('[data-qa="create-account"]');
  }

  async goto() {
    await super.goto("/signup");
  }

  async completeRegistration(user: User) {
    if (user.title === "Mr") {
      await this.mrRadio.check();
    } else {
      await this.mrsRadio.check();
    }

    await this.password.fill(user.password);

    await this.day.selectOption(user.birthDay);
    await this.month.selectOption(user.birthMonth);
    await this.year.selectOption(user.birthYear);

    if (user.newsletter) {
      await this.newsletterBox.check();
    }

    if (user.specialOffers) {
      await this.specialOffersBox.check();
    }

    await this.firstName.fill(user.firstName);
    await this.lastName.fill(user.lastName);

    if (user.company) {
      await this.company.fill(user.company);
    }

    await this.address.fill(user.address);

    if (user.address2) {
      await this.address2.fill(user.address2);
    }

    await this.country.selectOption(user.country);

    await this.state.fill(user.state);
    await this.city.fill(user.city);
    await this.zipcode.fill(user.zipcode);
    await this.mobileNumber.fill(user.mobileNumber);

    await this.click(this.createAccountButton);
  }
}
