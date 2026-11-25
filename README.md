# BDD Login Tests - OpenCart Application

This project contains BDD (Behavior-Driven Development) tests for the OpenCart login functionality using Cucumber and Playwright with TypeScript.

## Project Structure

```
playwright-project/
├── features/
│   └── login.feature                 # Gherkin BDD scenarios
├── step-definitions/
│   └── login.steps.ts               # TypeScript step implementations
├── support/
│   └── (Hooks and configuration)
├── cucumber.js                       # Cucumber configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Project dependencies
└── README.md                         # This file
```

## Features Covered

### Positive Scenarios
1. **Successful login with valid credentials** - Tests successful authentication
2. **Login page elements** - Verifies all UI elements are present and visible
3. **Case-insensitive email** - Tests that email login works with uppercase characters

### Negative Scenarios
1. **Invalid username** - Tests login failure with non-existent user
2. **Invalid password** - Tests login failure with wrong password
3. **Empty username field** - Tests validation for empty email field
4. **Empty password field** - Tests validation for empty password
5. **Both fields empty** - Tests validation when both fields are empty
6. **SQL Injection attempt** - Tests security against SQL injection
7. **Special characters/XSS** - Tests security against script injection

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn package manager
- Chrome/Chromium browser (for Playwright)

## Installation

1. Navigate to the project directory:
```bash
cd C:\Users\spali\playwright-project
```

2. Install dependencies:
```bash
npm install
```

The installation will automatically install:
- `@cucumber/cucumber` - BDD testing framework
- `@playwright/test` - Browser automation
- `playwright` - Playwright core library
- `typescript` - TypeScript compiler
- `ts-node` - TypeScript execution for Node.js

## Running Tests

### Run all tests:
```bash
npm test
```

### Run tests with specific tags:
```bash
# Run only positive tests
npx cucumber-js --tags @positive

# Run only negative tests
npx cucumber-js --tags @negative

# Run login tests only
npx cucumber-js --tags @login

# Run invalid credentials tests
npx cucumber-js --tags @invalid-credentials

# Run empty fields tests
npx cucumber-js --tags @empty-fields
```

### Run tests in debug mode:
```bash
npm run test:debug
```

### Run tests headless mode (no browser UI):
```bash
npx cucumber-js --tags @login
```

To run in headless mode, modify the `launch` options in `step-definitions/login.steps.ts`:
```typescript
browser = await chromium.launch({
  headless: true,  // Change from false to true
});
```

## Test Scenarios in Detail

### Feature: OpenCart Login Functionality

#### Background
- **Given**: User navigates to OpenCart application at "http://opencart.abstracta.us"
  - Automatically navigates to the OpenCart website
  - Finds and clicks the login link
  - Waits for the page to load

#### Positive Scenarios

**Scenario 1: Successful login with valid credentials**
```gherkin
When user enters username "test@example.com"
And user enters password "Test@123"
And user clicks the login button
Then user should be logged in successfully
And user dashboard should be visible
And the My Account heading should be displayed
```
- **Purpose**: Verifies that valid credentials allow successful login
- **Expected Result**: User is redirected to dashboard

**Scenario 2: Login page elements**
```gherkin
Then login page should display username field
And login page should display password field
And login page should display login button
And login page should display forget password link
```
- **Purpose**: Validates that all required UI elements are present
- **Expected Result**: All form elements are visible and functional

**Scenario 3: Case-insensitive email**
```gherkin
When user enters username "TEST@EXAMPLE.COM"
And user enters password "Test@123"
And user clicks the login button
Then user should be logged in successfully
```
- **Purpose**: Tests that email validation is case-insensitive
- **Expected Result**: Login succeeds with uppercase email

#### Negative Scenarios

**Scenario 1: Invalid username**
```gherkin
When user enters username "invaliduser@example.com"
And user enters password "Test@123"
And user clicks the login button
Then user should see error message
And error message should contain "Invalid login attempt"
And user should remain on login page
```
- **Purpose**: Verifies login fails with non-existent user
- **Expected Result**: Error message shown, user stays on login page

**Scenario 2: Invalid password**
```gherkin
When user enters username "test@example.com"
And user enters password "WrongPassword123"
And user clicks the login button
Then user should see error message
And error message should contain "Invalid login attempt"
And user should remain on login page
```
- **Purpose**: Verifies login fails with wrong password
- **Expected Result**: Error message shown, user stays on login page

**Scenario 3: Empty username**
```gherkin
When user leaves username field empty
And user enters password "Test@123"
And user clicks the login button
Then validation error should be displayed
And error message should contain "E-Mail Address does not appear to be valid"
```
- **Purpose**: Tests form validation for empty email
- **Expected Result**: Validation error message displayed

**Scenario 4: Empty password**
```gherkin
When user enters username "test@example.com"
And user leaves password field empty
And user clicks the login button
Then validation error should be displayed
And error message should contain "Password must be between 4 and 20 characters"
```
- **Purpose**: Tests form validation for empty password
- **Expected Result**: Validation error message displayed

**Scenario 5: Both fields empty**
```gherkin
When user leaves username field empty
And user leaves password field empty
And user clicks the login button
Then validation error should be displayed
```
- **Purpose**: Tests validation when both fields are empty
- **Expected Result**: Validation error shown

**Scenario 6: SQL Injection attempt**
```gherkin
When user enters username "admin' OR '1'='1"
And user enters password "anything"
And user clicks the login button
Then user should see error message
And user should remain on login page
```
- **Purpose**: Tests security against SQL injection attacks
- **Expected Result**: Application safely handles malicious input

**Scenario 7: XSS attempt**
```gherkin
When user enters username "test@example.com"
And user enters password "<script>alert('xss')</script>"
And user clicks the login button
Then user should see error message
And user should remain on login page
```
- **Purpose**: Tests security against XSS attacks
- **Expected Result**: Application safely handles script tags

## Step Definitions Overview

All step definitions are implemented in `step-definitions/login.steps.ts` using Playwright and Cucumber.

### Key Step Implementations

#### Setup Hooks
- **Before**: Launches Chromium browser and creates a new page
- **After**: Closes browser and page after each scenario

#### Given Steps
- Navigate to OpenCart URL
- Handle automatic login page navigation

#### When Steps
- Enter username in email field
- Enter password in password field
- Leave fields empty
- Click login button
- Wait for page navigation/errors

#### Then Steps
- Verify successful login
- Check dashboard visibility
- Verify error messages
- Validate form elements
- Confirm navigation state

## Selector Reference

The selectors used for OpenCart login page elements:

```typescript
const selectors = {
  usernameInput: 'input[name="email"]',
  passwordInput: 'input[name="password"]',
  errorAlert: '.alert-danger, .alert.alert-error',
  successMessage: '.alert-success',
};
```

The login button is located with `page.getByRole('button', { name: 'Login', exact: true })`.
The forgotten-password link is located inside `#content` by its link role and name.
The account page is checked using its `My Account` heading inside `#content`.

**Note**: If selectors don't work, inspect the OpenCart website to find the actual element identifiers.

## Test Report

After running tests, a detailed HTML report is generated:
```
cucumber-report.html
```

Open this file in a web browser to see:
- Test execution summary
- Passed/Failed scenarios
- Step-by-step logs
- Screenshots (if implemented)

## Customization

### Adding New Scenarios

1. Add a new scenario to `features/login.feature`:
```gherkin
@custom
Scenario: Your test scenario
  When user enters username "test@example.com"
  And user enters password "Test@123"
  Then your assertion here
```

2. Add corresponding step definitions to `step-definitions/login.steps.ts`:
```typescript
When('your when step {string}', async (parameter: string) => {
  // Implementation
});

Then('your then step here', async () => {
  // Implementation
});
```

### Updating Selectors

If selectors need updating:
1. Use Chrome DevTools to inspect the OpenCart website
2. Update selectors in the `selectors` object in `login.steps.ts`
3. Test the changes

### Running Specific Tags

Tag scenarios in the feature file and run with:
```bash
npx cucumber-js --tags "@your-tag-name"
```

## Troubleshooting

### "Module not found" error
```bash
npm install
npm install --save-dev ts-node @types/node
```

### Selectors not working
1. Check if the website structure has changed
2. Use `page.pause()` in step definitions to debug
3. Inspect elements with Chrome DevTools
4. Update selectors accordingly

### Tests timing out
- Increase timeout in `cucumber.js` or via `setDefaultTimeout()`
- Check internet connection
- Verify URL is accessible

### Browser not launching
- Ensure Playwright browsers are installed: `npx playwright install`
- Check if Chrome/Chromium is installed
- Try running with `headless: false` to see browser

## CI/CD Integration

To integrate with CI/CD pipelines:

1. Update `headless` mode in `login.steps.ts`:
```typescript
headless: true
```

2. Add to your CI script:
```bash
npm install
npm test
```

3. Configure report generation in `cucumber.js` for your CI/CD tool

## Best Practices

1. **Keep scenarios independent** - Each scenario should run independently
2. **Use meaningful descriptions** - Scenario names should clearly describe what's being tested
3. **Avoid hard-coded waits** - Use proper wait conditions
4. **Tag scenarios appropriately** - Use tags for filtering and organization
5. **Keep selectors maintainable** - Centralize selectors in the `selectors` object
6. **Document custom steps** - Add comments explaining complex step logic
7. **Regular selector updates** - Maintain selectors as the application changes

## Support and Resources

- [Cucumber.js Documentation](https://cucumber.io/docs/cucumber/)
- [Playwright Documentation](https://playwright.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [OpenCart](http://opencart.abstracta.us)

## Author

Generated with Copilot SDK in VS Code

## License

ISC

---

**Last Updated**: November 2026
