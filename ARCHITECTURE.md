# BDD Test Flow Diagram & Architecture

## 🏗️ Project Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     BDD Test Framework                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────┐    ┌────────────────────┐    ┌─────────┐ │
│  │  Feature Files   │───→│  Step Definitions  │───→│Playwright│ │
│  │  (Gherkin)       │    │  (TypeScript)      │    │ Browser  │ │
│  │                  │    │                    │    │          │ │
│  │ login.feature    │    │ login.steps.ts     │    │ Chrome   │ │
│  │                  │    │                    │    │ Firefox  │ │
│  │ 10 Scenarios     │    │ 40+ Steps          │    │ Webkit   │ │
│  └──────────────────┘    └────────────────────┘    └─────────┘ │
│          ↓                       ↓                       ↓       │
│         [3 Positive]       [Utilities]            [Automation]  │
│         [7 Negative]       [Configuration]       [Validation]   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Support Utilities (TypeScript)                          │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  • playwriteUtils.ts (15+ helper functions)              │  │
│  │  • config.ts (Test data & configuration)                 │  │
│  │  • Playwright hooks (Before/After setup/teardown)        │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Cucumber Configuration                                  │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │  • cucumber.js (Test runner settings)                    │  │
│  │  • tsconfig.json (TypeScript compilation)                │  │
│  │  • package.json (Dependencies)                           │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Test Execution Flow

```
START
  ↓
npm test
  ↓
Cucumber discovers features/login.feature
  ↓
For each Scenario:
  ├─────────────────────────────────────────
  │ BEFORE HOOK
  │ ├─ Launch Browser (Chromium/Firefox/Webkit)
  │ ├─ Create new page context
  │ └─ Set viewport 1280x720
  │
  ├─────────────────────────────────────────
  │ SCENARIO EXECUTION
  │ ├─ BACKGROUND STEPS:
  │ │  └─ Given: Navigate to URL
  │ │     └─ Wait for page load
  │ │     └─ Click login link
  │ │
  │ ├─ WHEN STEPS:
  │ │  ├─ When: Enter username
  │ │  ├─ When: Enter password
  │ │  └─ When: Click login button
  │ │     └─ Wait for navigation/errors
  │ │
  │ └─ THEN STEPS:
  │    ├─ Then: Verify login success/failure
  │    ├─ Then: Check error messages
  │    ├─ Then: Validate UI elements
  │    └─ Then: Confirm page state
  │
  ├─────────────────────────────────────────
  │ AFTER HOOK
  │ ├─ Close page
  │ └─ Close browser
  │
  └─────────────────────────────────────────
  ↓
Continue with next scenario
  ↓
All scenarios complete
  ↓
Generate cucumber-report.html
  ↓
Display console summary
  ↓
END ✓
```

---

## 📊 Scenario Execution Tree

```
Feature: OpenCart Login Functionality
│
├─ Background (All scenarios)
│  └─ Navigate to http://opencart.abstracta.us
│
├─ Positive Scenarios ✅
│  │
│  ├─ Scenario 1: Successful Login
│  │  ├─ When: Enter valid username
│  │  ├─ When: Enter valid password
│  │  ├─ When: Click login button
│  │  └─ Then: Verify dashboard visible
│  │
│  ├─ Scenario 2: UI Elements
│  │  ├─ Then: Username field visible
│  │  ├─ Then: Password field visible
│  │  ├─ Then: Login button visible
│  │  └─ Then: Forgot password link visible
│  │
│  └─ Scenario 3: Case Insensitive Email
│     ├─ When: Enter uppercase email
│     ├─ When: Enter password
│     ├─ When: Click login button
│     └─ Then: Login successful
│
└─ Negative Scenarios ❌
   │
   ├─ Scenario 4: Invalid Username
   │  ├─ When: Enter non-existent email
   │  ├─ When: Enter valid password
   │  ├─ When: Click login button
   │  └─ Then: Error message shown
   │
   ├─ Scenario 5: Invalid Password
   │  ├─ When: Enter valid email
   │  ├─ When: Enter wrong password
   │  ├─ When: Click login button
   │  └─ Then: Error message shown
   │
   ├─ Scenario 6: Empty Username
   │  ├─ When: Leave username empty
   │  ├─ When: Enter password
   │  ├─ When: Click login button
   │  └─ Then: Validation error shown
   │
   ├─ Scenario 7: Empty Password
   │  ├─ When: Enter username
   │  ├─ When: Leave password empty
   │  ├─ When: Click login button
   │  └─ Then: Validation error shown
   │
   ├─ Scenario 8: Both Fields Empty
   │  ├─ When: Leave both fields empty
   │  ├─ When: Click login button
   │  └─ Then: Validation error shown
   │
   ├─ Scenario 9: SQL Injection
   │  ├─ When: Enter SQL injection payload
   │  ├─ When: Enter password
   │  ├─ When: Click login button
   │  └─ Then: Safely handled with error
   │
   └─ Scenario 10: XSS Protection
      ├─ When: Enter username
      ├─ When: Enter script tag in password
      ├─ When: Click login button
      └─ Then: Safely handled with error
```

---

## 🔀 Step Definition Flow

```
Given "user navigates to OpenCart..."
  │
  └─→ [goto(url)]
      ├─ waitForLoadState('networkidle')
      ├─ findLoginLink()
      ├─ clickLoginLink()
      └─ waitForLoadState('networkidle')
         ✓ Background complete
         ↓
When "user enters username {string}"
  │
  └─→ [locator + fill]
      ├─ findUsernameField()
      ├─ click()
      ├─ clear()
      └─ fill(username)
         ↓
When "user enters password {string}"
  │
  └─→ [locator + fill]
      ├─ findPasswordField()
      ├─ click()
      ├─ clear()
      └─ fill(password)
         ↓
When "user clicks the login button"
  │
  └─→ [locator + click]
      ├─ findLoginButton()
      ├─ click()
      ├─ waitForLoadState('networkidle')
      └─ waitForTimeout(1000)
         ↓
Then "user should be logged in successfully"
  │
  └─→ [assertions]
      ├─ checkUrl()
      ├─ checkNoErrors()
      ├─ checkDashboard()
      └─ ✓ Assertion passed
```

---

## 🎯 Test Data Flow

```
support/config.ts
│
├─ testData
│  ├─ validUser
│  │  ├─ username: 'test@example.com'
│  │  └─ password: 'Test@123'
│  │
│  ├─ invalidUser
│  │  ├─ username: 'invalid@example.com'
│  │  └─ password: 'Test@123'
│  │
│  ├─ invalidPassword
│  │  ├─ username: 'test@example.com'
│  │  └─ password: 'WrongPassword123'
│  │
│  ├─ sqlInjection
│  │  ├─ username: "admin' OR '1'='1"
│  │  └─ password: 'anything'
│  │
│  └─ xssPayload
│     ├─ username: 'test@example.com'
│     └─ password: '<script>alert("xss")</script>'
│
├─ pageUrls
│  ├─ home: 'http://opencart.abstracta.us'
│  ├─ login: 'http://opencart.abstracta.us/index.php?route=account/login'
│  ├─ dashboard: 'http://opencart.abstracta.us/index.php?route=account/account'
│  └─ register: 'http://opencart.abstracta.us/index.php?route=account/register'
│
└─ waitTimes
   ├─ short: 2000ms
   ├─ medium: 5000ms
   ├─ long: 10000ms
   └─ veryLong: 30000ms
   
   ↓
   Used in step definitions
   ↓
   Executed during tests
```

---

## 🔐 Security Test Flow

```
SECURITY TESTS
│
├─ SQL Injection Test
│  ├─ Input: "admin' OR '1'='1"
│  ├─ Expect: Application rejects safely
│  ├─ Verify: Error message shown
│  └─ Result: User stays on login page
│
├─ XSS/Script Injection Test
│  ├─ Input: "<script>alert('xss')</script>"
│  ├─ Expect: Script tags handled safely
│  ├─ Verify: Error message shown
│  └─ Result: No script execution
│
└─ Input Validation Test
   ├─ Empty Fields: Validated before submission
   ├─ Special Characters: Properly escaped
   ├─ Email Format: Validated
   └─ Password Length: Validated (4-20 chars)
```

---

## 📁 File Dependency Tree

```
npm test (command)
  ↓
cucumber.js (config)
  ├─→ features/login.feature (loads scenarios)
  │    ↓
  ├─→ step-definitions/login.steps.ts (runs steps)
  │    ├─→ support/playwriteUtils.ts (utilities)
  │    ├─→ support/config.ts (test data)
  │    └─→ @playwright/test (browser automation)
  │
  ├─→ tsconfig.json (TypeScript compilation)
  │
  └─→ package.json (dependencies installed)
       ├─→ @cucumber/cucumber
       ├─→ @playwright/test
       ├─→ typescript
       └─→ ts-node
```

---

## 🎨 Selector Strategy

```
HTML Element Hierarchy
│
├─ Input Fields
│  ├─ Username: input[name="email"]
│  ├─ Password: input[name="password"]
│  └─ Fallback: input[type="email"], input[type="password"]
│
├─ Buttons
│  ├─ Login: button[type="submit"]
│  ├─ Fallback: button:has-text("Login"), input[value="Login"]
│  └─ Fallback: button.login-btn, .btn-login
│
├─ Links
│  ├─ Forgot: a:has-text("Forgotten Password")
│  ├─ Fallback: a:has-text("Forgot"), a[href*="password"]
│  └─ Fallback: .forgot-password-link
│
├─ Messages
│  ├─ Error: .alert-danger, .alert.alert-error
│  ├─ Success: .alert-success
│  └─ Validation: [role="alert"], .error, .invalid-feedback
│
└─ Dashboard Elements
   ├─ Dashboard: [class*="dashboard"], .page-title
   ├─ Account Name: .navbar .dropdown-toggle, .my-account-link
   └─ Fallback: .user-profile, .account-menu
```

---

## ⚡ Performance Characteristics

```
Test Execution Timeline
│
├─ Scenario 1: 2-3 seconds
│  ├─ Browser startup: 1s
│  ├─ Page navigation: 1s
│  ├─ Interactions: 0.5s
│  └─ Assertions: 0.5s
│
├─ Scenario 2: 2-3 seconds
│  └─ (same pattern)
│
└─ Scenario 10: 2-3 seconds
   └─ (same pattern)

Total Test Duration:
├─ Setup (all scenarios): 1-2 seconds
├─ 10 scenarios × 2.5 seconds: 25 seconds
└─ Report generation: 2-3 seconds
   = ~30-35 seconds total
```

---

## 🔄 Browser Automation Flow

```
Test Step
  ↓
Playwright Command
  ├─ Goto URL
  ├─ Locate Element
  ├─ User Action (click, fill, etc.)
  │  └─ Browser Event
  │     └─ Application Response
  │
  ├─ Wait for State
  │  ├─ waitForNavigation
  │  ├─ waitForLoadState
  │  └─ waitForFunction
  │
  └─ Verify Result
     ├─ Element visible/hidden
     ├─ Text content check
     ├─ URL/navigation check
     └─ Success/Failure assertion
```

---

## 📊 Test Categorization

```
10 Test Scenarios
│
├─ Functionality Tests (3)
│  ├─ Login Success Path
│  ├─ UI Elements Verification
│  └─ Email Case Handling
│
├─ Validation Tests (3)
│  ├─ Empty Username
│  ├─ Empty Password
│  └─ Both Fields Empty
│
├─ Error Handling Tests (2)
│  ├─ Invalid Username
│  └─ Invalid Password
│
└─ Security Tests (2)
   ├─ SQL Injection Protection
   └─ XSS/Script Injection Protection
```

---

## 🎯 Assertion Patterns

```
Common Assertions
│
├─ Visibility Assertions
│  ├─ await expect(element).toBeVisible()
│  ├─ await expect(element).toBeHidden()
│  └─ Count > 0
│
├─ Text Assertions
│  ├─ await expect(element).toContainText('expected text')
│  ├─ await expect(element).toHaveText('exact text')
│  └─ textContent === 'expected'
│
├─ State Assertions
│  ├─ await expect(element).toBeEnabled()
│  ├─ await expect(element).toBeChecked()
│  └─ currentUrl.includes('path')
│
└─ Negation Assertions
   ├─ await expect(errorMessage).not.toBeVisible()
   ├─ Count === 0
   └─ !url.includes('login')
```

---

## 📈 Metrics Collected

```
During Test Execution
│
├─ Test Metrics
│  ├─ Scenario count: 10
│  ├─ Passed: X
│  ├─ Failed: Y
│  ├─ Skipped: Z
│  └─ Duration: XX seconds
│
├─ Performance Metrics
│  ├─ Average step time
│  ├─ Slowest step
│  ├─ Page load time
│  └─ Total runtime
│
├─ Coverage Metrics
│  ├─ Feature coverage
│  ├─ Step definitions coverage
│  └─ Code paths tested
│
└─ Stored In
   └─ cucumber-report.html
```

---

## 🚀 Deployment Architecture

```
Local Development
│
└─→ npm test (Windows)
    ├─ Browser: Chromium (visible)
    ├─ Report: HTML (cucumber-report.html)
    └─ Logs: Console output

CI/CD Pipeline (GitHub Actions/Jenkins)
│
├─→ npm install
├─→ npm test (headless)
├─→ Upload artifact (report)
└─→ Archive results

Production Monitoring
│
└─→ Scheduled execution
    ├─ Nightly tests
    ├─ Performance baseline
    └─ Regression detection
```

---

**Last Updated**: November 2026
**Framework**: Cucumber + Playwright + TypeScript
