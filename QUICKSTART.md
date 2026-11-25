# Quick Start Guide - BDD Login Tests

## Project Setup ✓

Your BDD test framework for OpenCart login is now ready to use!

### What's Included

✅ **Feature File** (`features/login.feature`)
- 10 comprehensive test scenarios (positive and negative)
- Proper BDD format with Given-When-Then syntax
- Security-focused test cases

✅ **Step Definitions** (`step-definitions/login.steps.ts`)
- TypeScript implementation of all Gherkin steps
- Playwright integration for browser automation
- Hooks for setup/teardown

✅ **Utilities** (`support/`)
- Common helper functions
- Configuration management
- Test data

✅ **Configuration Files**
- `cucumber.js` - Test runner configuration
- `tsconfig.json` - TypeScript settings
- `package.json` - Dependencies

---

## Running Tests

### Setup Node.js PATH (First Time Only)

```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
```

### Run All Tests

```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
cd "C:\Users\spali\playwright-project"
npm test
```

### Run Specific Test Tags

```powershell
# Positive tests only
npm test -- --tags "@positive"

# Negative tests only
npm test -- --tags "@negative"

# Invalid credentials tests
npm test -- --tags "@invalid-credentials"

# Empty fields tests
npm test -- --tags "@empty-fields"

# Security tests
npm test -- --tags "@sql-injection or @special-characters"
```

### Run Single Scenario

```powershell
npm test -- --name "Successful login with valid credentials"
```

### Generate HTML Report

Report is automatically generated at: `cucumber-report.html`

Open in browser:
```powershell
start cucumber-report.html
```

---

## Test Scenarios Overview

### Positive Scenarios (3 tests)
1. ✓ Successful login with valid credentials
2. ✓ Login page displays all required elements
3. ✓ Case-insensitive email login

### Negative Scenarios (7 tests)
1. ✗ Invalid username fails
2. ✗ Invalid password fails
3. ✗ Empty username validation
4. ✗ Empty password validation
5. ✗ Both fields empty validation
6. ✗ SQL injection protection
7. ✗ XSS/Script injection protection

---

## File Structure

```
playwright-project/
├── features/
│   └── login.feature                 # BDD scenarios in Gherkin
├── step-definitions/
│   └── login.steps.ts               # TypeScript step implementations
├── support/
│   ├── playwriteUtils.ts            # Helper utilities
│   └── config.ts                    # Configuration & test data
├── cucumber.js                       # Cucumber configuration
├── tsconfig.json                     # TypeScript configuration
├── package.json                      # Project dependencies
├── QUICKSTART.md                     # This file
└── README.md                         # Detailed documentation
```

---

## Customization Guide

### 1. Update Test Credentials

Edit `support/config.ts`:

```typescript
export const testData = {
  validUser: {
    username: 'your-email@example.com',
    password: 'your-password',
  },
  // ... other test data
};
```

### 2. Add New Test Scenario

**Step 1:** Add to `features/login.feature`

```gherkin
@custom @new
Scenario: Your new test scenario
  When user enters username "test@example.com"
  And user enters password "Test@123"
  Then your assertion here
```

**Step 2:** Add step definition to `step-definitions/login.steps.ts`

```typescript
When('user enters username {string}', async (username: string) => {
  // Implementation
});

Then('your assertion here', async () => {
  // Implementation
});
```

**Step 3:** Run the test

```powershell
npm test -- --name "Your new test scenario"
```

### 3. Update Element Selectors

If OpenCart website changes its HTML structure:

Edit selectors in `step-definitions/login.steps.ts`:

```typescript
const selectors = {
  usernameInput: 'input[name="email"]',  // Update here
  passwordInput: 'input[name="password"]',
  // ...
};
```

**Find selectors:**
1. Open OpenCart in Chrome
2. Right-click → Inspect Element
3. Find the element in DevTools
4. Copy the selector

### 4. Change Browser

Edit `step-definitions/login.steps.ts` in the `Before` hook:

```typescript
browser = await chromium.launch({ headless: false });  // chromium
// or
browser = await firefox.launch({ headless: false });   // firefox
// or
browser = await webkit.launch({ headless: false });    // webkit
```

### 5. Run Headless (No Browser UI)

Edit `step-definitions/login.steps.ts`:

```typescript
browser = await chromium.launch({
  headless: true,  // Change to true
});
```

---

## Troubleshooting

### "Cannot find module '@cucumber/cucumber'"

```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
cd "C:\Users\spali\playwright-project"
npm install
```

### "No scenarios found"

Verify `cucumber.js` path configuration:

```javascript
// cucumber.js
{
  "require": ["step-definitions/**/*.ts"],  // Check path
  "requireModule": ["ts-node/register"]
}
```

### Selectors not working

1. Check if website structure changed
2. Use Chrome DevTools to find new selectors
3. Pause execution to debug:

```typescript
When('user enters username {string}', async (username: string) => {
  await page.pause();  // Pauses execution - inspect manually
  // ...
});
```

### Browser not launching

```powershell
# Install Playwright browsers
npx playwright install
```

### Tests timing out

Increase timeout in `step-definitions/login.steps.ts`:

```typescript
setDefaultTimeout(60 * 1000);  // 60 seconds instead of 30
```

---

## Best Practices

### ✅ DO:
- Use clear, descriptive scenario names
- Keep scenarios independent
- Use proper wait conditions
- Centralize selectors
- Tag scenarios appropriately
- Keep step definitions small and focused

### ❌ DON'T:
- Use hard-coded sleep/wait times
- Create dependencies between scenarios
- Mix multiple concerns in one scenario
- Hard-code test data
- Skip tags or naming
- Make steps too complex

---

## Example Commands

### Run everything and see report
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
cd "C:\Users\spali\playwright-project"
npm test
start cucumber-report.html
```

### Run only positive tests
```powershell
npm test -- --tags "@positive"
```

### Run only security tests
```powershell
npm test -- --tags "@sql-injection or @special-characters or @xss"
```

### Debug a single test
```powershell
npm test -- --name "Successful login" --debug
```

---

## CI/CD Integration

### For GitHub Actions

Create `.github/workflows/test.yml`:

```yaml
name: BDD Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: windows-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
      - uses: actions/upload-artifact@v3
        with:
          name: cucumber-report
          path: cucumber-report.html
```

### For Jenkins

```groovy
pipeline {
    agent any
    stages {
        stage('Install') {
            steps {
                bat 'npm install'
            }
        }
        stage('Test') {
            steps {
                bat 'npm test'
            }
        }
        stage('Report') {
            steps {
                publishHTML([
                    reportDir: '.',
                    reportFiles: 'cucumber-report.html',
                    reportName: 'BDD Test Report'
                ])
            }
        }
    }
}
```

---

## Next Steps

1. ✅ Install dependencies: `npm install` ✓ Already done
2. 📝 Customize test data in `support/config.ts`
3. 🔍 Verify selectors match current OpenCart site
4. ▶️ Run tests: `npm test`
5. 📊 View report: `cucumber-report.html`
6. ➕ Add custom scenarios as needed

---

## Support

- **Detailed README**: See `README.md` for complete documentation
- **Feature File**: `features/login.feature` - All BDD scenarios
- **Step Definitions**: `step-definitions/login.steps.ts` - Implementation details
- **Configuration**: `support/config.ts` - Test data and settings

---

## Key Files Reference

| File | Purpose | Edit when |
|------|---------|-----------|
| `features/login.feature` | Test scenarios | Adding new test cases |
| `step-definitions/login.steps.ts` | Step implementation | Changing selectors or logic |
| `support/config.ts` | Config & test data | Updating credentials or URLs |
| `support/playwriteUtils.ts` | Helper functions | Adding utility methods |
| `cucumber.js` | Test runner config | Changing report format |
| `tsconfig.json` | TypeScript config | Changing TypeScript settings |

---

**Last Updated**: November 2026
**Framework**: Cucumber + Playwright + TypeScript
**URL**: http://opencart.abstracta.us
