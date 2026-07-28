# Page Object Documentation

## Overview

This project uses the Page Object Model (POM) to organize interactions with the application under test.

Each page of the application is represented by a Page Object class. Page Objects contain:

- Locators for elements on the page
- Methods that perform actions on the page
- Methods that verify page state or application behaviour

Tests use these methods to interact with the application instead of directly interacting with Playwright locators.

## Page Object Structure

Page Objects generally follow this structure:

```text
Page Object
│
├── Imports
│
├── Locators
│   ├── Page elements
│   ├── Form elements
│   └── Modal elements
│
├── Constructor
│
└── Methods
    ├── Navigation
    ├── Page Verification
    ├── Data Retrieval
    ├── Actions
    └── Validation
```

The exact sections used by each Page Object depend on the functionality of the page.

## Base Page

All Page Objects extend the `BasePage` class.

```ts
export class ProductsPage extends BasePage
```

`BasePage` contains reusable functionality that can be shared across Page Objects.

Current shared methods include:

- `click()` — Clicks a specified locator.
- `verifyText()` — Verifies that a locator contains the expected text.
- `verifyVisible()` — Verifies that an element is visible.
- `goto()` — Navigates to a specified URL path.

This allows individual Page Objects to reuse common functionality without duplicating the implementation.

## Locators

Locators are defined as properties of the Page Object.

For example:

```ts
readonly searchInput: Locator;
readonly searchButton: Locator;
```

The locators are initialized in the constructor:

```ts
this.searchInput = page.locator("#search_product");
this.searchButton = page.locator("#submit_search");
```

Locators are grouped according to the functionality they belong to when this improves readability.

Examples include:

- Page elements
- Search
- Product information
- Forms
- Navigation
- Modals

## Methods

Page Object methods represent actions, validations, or data retrieval operations that can be performed on the page.

### Actions

Actions interact with the application.

Examples:

```ts
search();
addProductToCart();
continueShopping();
completeRegistration();
```

### Verification

Verification methods validate the state or behaviour of the application.

Examples:

```ts
verifyPageLoaded();
verifyProductsDisplayed();
verifyProductNamesContain();
verifyOrderPlaced();
```

### Data Retrieval

Data retrieval methods return information from the application.

Examples:

```ts
getProductNames();
getProductCount();
getCartProducts();
getProductInformation();
```

### Navigation

Navigation methods move between pages or application states.

Examples:

```ts
goto();
openProductById();
goBack();
```

## Method Documentation

Methods are documented using JSDoc when additional information is useful.

Parameters should be documented when their purpose or expected value is not immediately obvious.

For example:

```ts
/**
 * Sets the quantity of the product to be added to the cart.
 *
 * @param quantity - The number of units to add to the cart.
 */
async setQuantity(quantity: number) {
  await this.quantityInput.fill(quantity.toString());
}
```

Methods that return values can document the expected return value.

```ts
/**
 * Returns the number of product cards currently displayed.
 *
 * @returns The number of products displayed on the page.
 */
async productCount() {
  return await this.productCards.count();
}
```

Simple methods with self-explanatory names do not necessarily require extensive documentation.

## Naming Conventions

### Page Objects

Page Objects use PascalCase and end with `Page`.

```text
ProductsPage
CartPage
CheckoutPage
PaymentPage
```

### Locators

Locators use camelCase and should describe the element they represent.

```text
searchInput
checkoutButton
productCards
successMessage
```

### Methods

Methods use camelCase and should describe the action or validation they perform.

```text
search()
addProductToCart()
verifyPageLoaded()
getProductNames()
```

### Test Data

Test data objects are passed to Page Object methods when a workflow requires multiple related values.

Examples include:

```ts
User;
Product;
CartProduct;
PaymentDetails;
ContactMessage;
```

This keeps test data separate from page interaction logic and allows the same data structures to be reused across tests.
