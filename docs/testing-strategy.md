# Testing Strategy

## Test Levels

### UI Tests

Used for validating complete user workflows and application behaviour
through the browser.

Examples:
- Registration
- Login
- Product search
- Cart operations
- Checkout
- Order completion

### API Tests

Used for validating backend endpoints directly.

Examples:
- Account creation
- Account updates
- Account deletion
- Login validation

## Test Isolation

Tests use generated test data to avoid collisions between runs.

Accounts created during tests are cleaned up after completion.

## Cross-Browser Testing

UI tests are executed against Chromium and Firefox.

## Assertions

Assertions are performed at the level appropriate to the test.

For example, cart tests validate the resulting cart contents rather than
simply verifying that a button was clicked.