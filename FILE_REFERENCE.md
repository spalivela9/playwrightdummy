# 📋 File Reference - Quick Lookup

## 🎯 All Created Files

### 🔴 BDD Framework (4 files)
```
features/
└── login.feature                    3,374 B  - 10 Gherkin scenarios

step-definitions/
└── login.steps.ts                   7,299 B  - TypeScript step implementations

support/
├── playwriteUtils.ts                6,206 B  - 15+ helper functions
└── config.ts                        2,330 B  - Configuration & test data
```

### ⚙️ Configuration (3 files)
```
cucumber.js                          271 B    - Test runner configuration
tsconfig.json                        648 B    - TypeScript compilation settings
package.json                         611 B    - Dependencies (UPDATED)
package-lock.json                    78 KB    - Locked dependencies
```

### 📚 Documentation (8 files)
```
START_HERE.md                        10 KB    ⭐ Read this first!
QUICKSTART.md                        9 KB     ⭐ 5-minute setup
README.md                            12 KB    - Complete guide
TROUBLESHOOTING.md                   11 KB    - FAQ & solutions
PROJECT_SUMMARY.md                   10 KB    - Project metrics
ARCHITECTURE.md                      13 KB    - System design
EXAMPLE_STEPS.md                     10 KB    - Code examples
INDEX.md                             11 KB    - Navigation guide

THIS FILE:
FILE_REFERENCE.md                    (you are here)
```

---

## 🗂️ File Organization

### By Purpose

**To Run Tests:**
1. `features/login.feature` - Scenarios
2. `step-definitions/login.steps.ts` - Implementations
3. `cucumber.js` - Configuration
4. `package.json` - Dependencies

**To Understand Setup:**
1. `START_HERE.md` - Overview
2. `QUICKSTART.md` - Quick start
3. `README.md` - Full guide

**To Customize:**
1. `support/config.ts` - Edit credentials
2. `support/playwriteUtils.ts` - Add helper functions
3. `step-definitions/login.steps.ts` - Update selectors
4. `features/login.feature` - Add scenarios
5. `EXAMPLE_STEPS.md` - See patterns

**To Debug:**
1. `TROUBLESHOOTING.md` - Problems & solutions
2. `ARCHITECTURE.md` - System design
3. `step-definitions/login.steps.ts` - Current selectors

---

## 📖 Documentation Map

```
START_HERE.md (10 KB)
├─ Overview of everything
├─ 30-second quick start
├─ Key features highlights
└─ Where to find answers

    ↓

QUICKSTART.md (9 KB)
├─ Full setup instructions
├─ Running tests
├─ Common commands
├─ Basic customization
└─ Quick troubleshooting

    ↓

README.md (12 KB) ← COMPREHENSIVE
├─ Installation details
├─ Feature descriptions
├─ Selector reference
├─ Advanced customization
├─ CI/CD integration
└─ Best practices

    ↓ OR ↓ OR ↓

ARCHITECTURE.md (13 KB)
├─ System diagrams
├─ Execution flow
├─ File dependencies
└─ Performance info

TROUBLESHOOTING.md (11 KB)
├─ 20+ FAQ answers
├─ Problem solutions
├─ Debugging techniques
└─ Configuration help

EXAMPLE_STEPS.md (10 KB)
├─ Advanced patterns
├─ Code examples
├─ Data tables
└─ Custom scenarios

PROJECT_SUMMARY.md (10 KB)
├─ Metrics & stats
├─ Technology stack
├─ Feature list
└─ Support resources

INDEX.md (11 KB)
├─ File descriptions
├─ Learning paths
├─ Quick reference
└─ Documentation index
```

---

## 🔍 Find What You Need

### I Want To...

| Goal | Read This | File |
|------|-----------|------|
| **Get started quickly** | START_HERE.md | 10 KB |
| **Setup in 5 minutes** | QUICKSTART.md | 9 KB |
| **Understand everything** | README.md | 12 KB |
| **Fix a problem** | TROUBLESHOOTING.md | 11 KB |
| **See system design** | ARCHITECTURE.md | 13 KB |
| **Add a new test** | EXAMPLE_STEPS.md | 10 KB |
| **Find project info** | PROJECT_SUMMARY.md | 10 KB |
| **Navigate all docs** | INDEX.md | 11 KB |
| **Lookup file reference** | FILE_REFERENCE.md | (this file) |

---

## 📝 Code Files Reference

### features/login.feature
**Purpose**: Define test scenarios in Gherkin language
**When to Edit**: Adding new test cases
**Contains**: 10 scenarios with Given-When-Then steps
**Edit Example**:
```gherkin
@custom
Scenario: Your new test
  When user enters username "test@example.com"
  Then user should be logged in successfully
```

### step-definitions/login.steps.ts
**Purpose**: Implement Gherkin steps in TypeScript
**When to Edit**: 
- Updating selectors
- Modifying step logic
- Adding new steps
**Key Section**: `const selectors = { ... }` (line ~30)
**Main Functions**:
- Before/After hooks
- 40+ step implementations

### support/playwriteUtils.ts
**Purpose**: Reusable helper functions
**When to Edit**: Adding new helper functions
**Main Classes**: 
- `PlaywrightUtils` (15+ methods)
- `LoginHelper` (login-specific helpers)
**Common Functions**:
- `waitAndClick()`
- `waitAndFill()`
- `verifyErrorMessage()`

### support/config.ts
**Purpose**: Configuration and test data
**When to Edit**: Changing credentials or URLs
**Main Exports**:
- `testData` - Login credentials
- `pageUrls` - Application URLs
- `waitTimes` - Timeout values
- `getConfig()` - Environment-specific config

---

## 🎯 Workflow Reference

### Running Tests
```powershell
# Setup (first time)
npm install

# Run all tests
npm test

# Run specific tests
npm test -- --tags "@positive"
npm test -- --name "Successful login"

# View report
start cucumber-report.html
```

### Adding New Test
1. Edit `features/login.feature` - Add scenario
2. Edit `step-definitions/login.steps.ts` - Add steps
3. Run `npm test`
4. See results in HTML report

### Fixing Broken Selectors
1. Edit `step-definitions/login.steps.ts`
2. Find `const selectors = { ... }`
3. Update selector value
4. Run `npm test`

### Customizing Credentials
1. Edit `support/config.ts`
2. Update `testData.validUser`
3. Run tests with new credentials

---

## 🔐 Security Tests Reference

| Test | Input | Expected |
|------|-------|----------|
| **SQL Injection** | `admin' OR '1'='1` | Error shown, safe handling |
| **XSS Attack** | `<script>alert('xss')</script>` | Error shown, no execution |
| **Empty Email** | (empty) | Validation error |
| **Empty Password** | (empty) | Validation error |

---

## 📊 Statistics Summary

| Metric | Value |
|--------|-------|
| Test Scenarios | 10 |
| Positive Tests | 3 |
| Negative Tests | 7 |
| Step Definitions | 40+ |
| Helper Functions | 15+ |
| Feature Files | 1 |
| TypeScript Files | 3 |
| Config Files | 3 |
| Documentation Files | 8 |
| Total Documentation | 96+ KB |
| Total Code | 19 KB |

---

## 🛠️ Common Tasks

### View Current Selectors
File: `step-definitions/login.steps.ts` (line ~30)

### Update Test Credentials
File: `support/config.ts` (line ~20)

### Add Environment Config
File: `support/config.ts` (line ~1)

### Change Browser
File: `step-definitions/login.steps.ts` (line ~27)

### Add Helper Function
File: `support/playwriteUtils.ts` (end of file)

### Add New Step
File: `step-definitions/login.steps.ts` (end of file)

### Add New Scenario
File: `features/login.feature` (end of file)

---

## 🚀 Important Paths

```
Project Root: C:\Users\spali\playwright-project

Feature Files:
  features/login.feature

Step Definitions:
  step-definitions/login.steps.ts

Support Files:
  support/playwriteUtils.ts
  support/config.ts

Configuration:
  cucumber.js
  tsconfig.json
  package.json

Documentation:
  START_HERE.md
  QUICKSTART.md
  README.md
  ... (5 more)

Reports:
  cucumber-report.html (generated after tests)
```

---

## ⚡ Quick Reference Table

| Action | File | Line | Edit What |
|--------|------|------|-----------|
| View scenarios | login.feature | 1-100 | Gherkin steps |
| Update email selector | login.steps.ts | 30 | usernameInput |
| Update password selector | login.steps.ts | 31 | passwordInput |
| Change test username | config.ts | 20 | username value |
| Change test password | config.ts | 21 | password value |
| Add helper function | playwriteUtils.ts | 100+ | New method |
| Add new test step | login.steps.ts | 300+ | When/Then step |
| Change to Firefox | login.steps.ts | 27 | firefox.launch |
| Enable headless mode | login.steps.ts | 28 | headless: true |
| Add new scenario | login.feature | 100+ | New @tag Scenario |

---

## 📞 Support Reference

### For Quick Help
→ **START_HERE.md** or **QUICKSTART.md**

### For Detailed Info
→ **README.md**

### For Problems
→ **TROUBLESHOOTING.md**

### For Code Examples
→ **EXAMPLE_STEPS.md**

### For System Design
→ **ARCHITECTURE.md**

### For Navigation
→ **INDEX.md**

### For File Details
→ **FILE_REFERENCE.md** (this file)

---

## ✅ Files Checklist

### Essential Files
- [x] features/login.feature
- [x] step-definitions/login.steps.ts
- [x] support/playwriteUtils.ts
- [x] support/config.ts

### Configuration
- [x] cucumber.js
- [x] tsconfig.json
- [x] package.json

### Documentation
- [x] START_HERE.md
- [x] QUICKSTART.md
- [x] README.md
- [x] TROUBLESHOOTING.md
- [x] PROJECT_SUMMARY.md
- [x] ARCHITECTURE.md
- [x] EXAMPLE_STEPS.md
- [x] INDEX.md
- [x] FILE_REFERENCE.md

---

**Last Updated**: November 2026
**Version**: 1.0
**Status**: ✅ Complete
