# Debugging and Troubleshooting

## Playwright Trace Viewer

Traces are used to investigate failed tests by reviewing:

- Actions performed
- Locator resolution
- Network activity
- Screenshots
- DOM state
- Timing

## Screenshots

Screenshots are captured for failed tests to determine whether failures
originate from the test framework or the application.

## Cross-Browser Investigation

Tests are run against Chromium and Firefox to identify browser-specific
behaviour.

## Application Instability

The application under test occasionally experiences slow loading and
network failures. These issues can result in failures unrelated to the
test implementation.

When investigating failures, tests are reproduced across multiple runs
and browsers to determine whether the failure is deterministic or
environmental.