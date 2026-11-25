# Troubleshooting & FAQ - BDD Login Tests

## ❓ Frequently Asked Questions

### Q1: How do I run the tests?
**A:**
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
cd "C:\Users\spali\playwright-project"
npm test
```

### Q2: Can I run a specific test?
**A:**
```powershell
npm test -- --name "Successful login"
npm test -- --tags "@positive"
npm test -- --tags "@negative"
```

### Q3: Where is the test report?
**A:** After running tests, the report is automatically generated:
```powershell
start cucumber-report.html
```

### Q4: How do I add new test scenarios?
**A:**
1. Add scenario to `features/login.feature`
2. Add step definitions to `step-definitions/login.steps.ts`
3. Run: `npm test`

### Q5: My selectors don't work, what should I do?
**A:**
1. Open OpenCart in Chrome: http://opencart.abstracta.us
2. Right-click → Inspect Element
3. Find the HTML element for the field
4. Copy the selector
5. Update in `step-definitions/login.steps.ts` in the `selectors` object

### Q6: Can I run tests headless (no browser window)?
**A:** Yes, edit `step-definitions/login.steps.ts`:
```typescript
browser = await chromium.launch({
  headless: true,  // Change from false to true
});
```

### Q7: How do I update test credentials?
**A:** Edit `support/config.ts`:
```typescript
export const testData = {
  validUser: {
    username: 'your-email@example.com',
    password: 'your-password',
  },
};
```

### Q8: What browsers are supported?
**A:** Chromium (default), Firefox, and WebKit. Change in `step-definitions/login.steps.ts`:
```typescript
// Chromium
browser = await chromium.launch({ headless: false });

// Firefox
browser = await firefox.launch({ headless: false });

// WebKit (Safari)
browser = await webkit.launch({ headless: false });
```

---

## 🐛 Troubleshooting Guide

### Problem: "npm: command not found"

**Solution:**
Add Node.js to PATH:
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
```

Then run your command again.

---

### Problem: "Cannot find module '@cucumber/cucumber'"

**Solution:**
Install dependencies:
```powershell
$env:PATH = "C:\Program Files\nodejs;$env:PATH"
cd "C:\Users\spali\playwright-project"
npm install
```

If still fails, try:
```powershell
npm install --legacy-peer-deps
npm install --save @cucumber/cucumber
```

---

### Problem: Tests run but selectors don't work

**Solution:**

1. **Check if selectors match:**
   - Open: http://opencart.abstracta.us
   - Open DevTools: F12
   - Right-click element → Inspect
   - Note the HTML selector

2. **Update selector in code:**
   - File: `step-definitions/login.steps.ts`
   - Find: `const selectors = { ... }`
   - Update the selector

3. **Example:**
   - Old: `usernameInput: 'input[name="email"]'`
   - New: `usernameInput: 'input#user-email'`

4. **Test the change:**
   - Run: `npm test`

---

### Problem: "Timeout waiting for element"

**Solution 1:** Increase timeout
```typescript
// In step-definitions/login.steps.ts
setDefaultTimeout(60 * 1000);  // 60 seconds instead of 30
```

**Solution 2:** Element might not be on page
- Check if element exists using DevTools
- Verify selector is correct
- Check if element loads dynamically

**Solution 3:** Page might need more navigation time
```typescript
await page.waitForLoadState('networkidle');
await page.waitForTimeout(2000);  // Extra wait
```

---

### Problem: Browser fails to launch

**Solution:**
```powershell
# Install Playwright browsers
npx playwright install

# Verify installation
npx playwright install-deps
```

If still fails:
1. Check if Chrome is installed
2. Try different browser:
   ```typescript
   browser = await firefox.launch({ headless: false });
   ```

---

### Problem: Tests pass locally but fail in CI/CD

**Solution:**

1. **Use headless mode in CI/CD:**
   ```typescript
   const headless = process.env.CI === 'true';
   browser = await chromium.launch({ headless });
   ```

2. **Install dependencies in CI:**
   ```yaml
   - run: npm install
   - run: npx playwright install
   ```

3. **Example CI configuration (see README.md)**

---

### Problem: "No scenarios found"

**Solution:**

1. **Check feature file exists:**
   - File: `features/login.feature`
   - Should be in project root

2. **Verify cucumber.js configuration:**
   ```javascript
   {
     "require": ["step-definitions/**/*.ts"],
     "requireModule": ["ts-node/register"]
   }
   ```

3. **Check step definitions exist:**
   - File: `step-definitions/login.steps.ts`
   - Should have `Given`, `When`, `Then` steps

4. **Verify features have @tags:**
   - Scenarios should start with `@tag` for filtering

---

### Problem: "Cannot read property 'click' of undefined"

**Solution:**

1. **Element not found on page**
   - Verify selector in DevTools
   - Check if element loads dynamically

2. **Element not visible**
   - Add wait condition:
     ```typescript
     const element = page.locator(selector);
     await element.waitFor({ state: 'visible' });
     ```

3. **Element in iframe**
   - Use frameLocator:
     ```typescript
     const frameLocator = page.frameLocator('iframe#login-frame');
     const element = frameLocator.locator(selector);
     await element.click();
     ```

---

### Problem: Tests run very slowly

**Solution 1:** Optimize waits
```typescript
// Bad - waits full timeout
await page.waitForTimeout(30000);

// Good - waits for actual event
await page.waitForLoadState('networkidle');
```

**Solution 2:** Parallel execution
```javascript
// In cucumber.js
{
  "parallel": 2  // Run 2 tests in parallel
}
```

**Solution 3:** Remove unnecessary waits
- Review steps for redundant `waitForTimeout` calls
- Use specific wait conditions only

---

### Problem: Screenshot not saved

**Solution:**

1. **Create screenshots directory:**
   ```powershell
   New-Item -ItemType Directory -Path "screenshots" -Force
   ```

2. **Check permissions:**
   - Ensure write permission to project folder

3. **Verify path in code:**
   ```typescript
   await page.screenshot({ path: 'screenshots/login.png' });
   ```

---

### Problem: HTML report not generated

**Solution:**

1. **Check cucumber.js configuration:**
   ```javascript
   {
     "format": ["html:cucumber-report.html"]
   }
   ```

2. **Verify tests completed:**
   - Report only generates after tests finish
   - Check if tests actually ran

3. **Manual report generation:**
   ```powershell
   npm test -- --format html:report.html
   ```

---

### Problem: Different behavior between local and CI

**Solution:**

1. **Use same environment settings:**
   - Set `headless: false` for local debugging
   - Set `headless: true` for CI/CD

2. **Check environment variables:**
   ```typescript
   const config = getConfig(); // Uses TEST_ENV var
   ```

3. **Verify same OS dependencies:**
   - Local: Windows
   - CI: Might need system font packages
   - See: `npx playwright install-deps`

---

### Problem: Session expires during tests

**Solution:**

1. **Use persistent cookies:**
   ```typescript
   const context = await browser.newContext({
     storageState: 'auth.json'
   });
   ```

2. **Login once and reuse:**
   ```typescript
   Before(async function() {
     // Login once
     await performLogin(...);
     // Save cookies
   });
   ```

3. **Increase timeout:**
   ```typescript
   setDefaultTimeout(60 * 1000);
   ```

---

### Problem: Element selector changes after page update

**Solution:**

1. **Use more stable selectors:**
   - Avoid index-based selectors
   - Use data attributes: `data-testid="login-btn"`
   - Use text content: `a:has-text("Login")`

2. **Create helper function:**
   ```typescript
   function getLoginButton(page) {
     return page.locator('button:has-text("Login"), input[value="Login"], button.login-btn').first();
   }
   ```

3. **Document selector changes:**
   - Keep backup of old selectors
   - Comment when selectors change
   - Version control your selector changes

---

## 🔧 Configuration Issues

### Issue: TypeScript compilation errors

**Solution:**
```powershell
# Check TypeScript version
npx tsc --version

# Recompile
npx tsc --noEmit

# Check for syntax errors in ts files
npm run test -- --profile default
```

---

### Issue: PATH issues on Windows

**Solution:**
```powershell
# Temporarily add to PATH
$env:PATH = "C:\Program Files\nodejs;$env:PATH"

# Or permanently (requires restart):
# Windows Settings → Environment Variables → Edit PATH
```

---

### Issue: Permission denied errors

**Solution:**
```powershell
# Run PowerShell as Administrator
# Then try npm install
npm install

# Or change permissions
icacls "C:\Users\spali\playwright-project" /grant Users:F /T
```

---

## 🆘 Still Having Issues?

### Debug Steps:

1. **Check error message carefully**
   - Look for exact line and file name
   - Search error in documentation

2. **Isolate the problem:**
   - Run single test: `npm test -- --name "test name"`
   - Add logging: `console.log('Debug:', variable)`
   - Use `page.pause()` to inspect manually

3. **Check configuration:**
   - `cucumber.js` - Test settings
   - `tsconfig.json` - TypeScript settings
   - `package.json` - Dependencies

4. **Verify dependencies:**
   ```powershell
   npm list @cucumber/cucumber
   npm list @playwright/test
   npm list typescript
   ```

5. **Try clean install:**
   ```powershell
   Remove-Item node_modules -Recurse -Force
   Remove-Item package-lock.json -Force
   npm install
   ```

---

## 📋 Quick Checklist

Before reporting an issue, verify:

- [ ] Node.js is installed: `node --version`
- [ ] PATH includes Node: `$env:PATH`
- [ ] Dependencies installed: `npm install`
- [ ] Feature file exists: `features/login.feature`
- [ ] Step definitions exist: `step-definitions/login.steps.ts`
- [ ] Selectors are correct (checked in DevTools)
- [ ] Internet connection works
- [ ] OpenCart website is accessible
- [ ] No Windows Defender blocking
- [ ] Latest Playwright browsers: `npx playwright install`

---

## 📚 Additional Resources

| Topic | Resource |
|-------|----------|
| Cucumber | https://cucumber.io/docs/ |
| Playwright | https://playwright.dev/ |
| TypeScript | https://www.typescriptlang.org/docs/ |
| OpenCart | http://opencart.abstracta.us |
| Node.js | https://nodejs.org/docs/ |

---

## 💬 Getting Help

1. **Check this document** - You're reading it!
2. **Review README.md** - Comprehensive guide
3. **Check QUICKSTART.md** - Quick reference
4. **Inspect code comments** - In step definitions
5. **Use console output** - Tests print detailed logs
6. **Enable debug mode** - Add `page.pause()` in steps

---

**Last Updated:** November 2026
**Version:** 1.0
**Status:** ✅ Troubleshooting Guide Complete
