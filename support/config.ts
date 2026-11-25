/**
 * Test Configuration
 * Different environments and browser configurations
 */

export interface TestConfig {
  baseUrl: string;
  browser: 'chromium' | 'firefox' | 'webkit';
  headless: boolean;
  viewport: {
    width: number;
    height: number;
  };
  timeout: number;
  retries: number;
}

// Development environment
export const devConfig: TestConfig = {
  baseUrl: 'http://opencart.abstracta.us',
  browser: 'chromium',
  headless: false,
  viewport: {
    width: 1280,
    height: 720,
  },
  timeout: 30000,
  retries: 1,
};

// CI/CD environment
export const ciConfig: TestConfig = {
  baseUrl: 'http://opencart.abstracta.us',
  browser: 'chromium',
  headless: true,
  viewport: {
    width: 1280,
    height: 720,
  },
  timeout: 30000,
  retries: 2,
};

// Local testing environment
export const localConfig: TestConfig = {
  baseUrl: 'http://localhost:8080',
  browser: 'chromium',
  headless: false,
  viewport: {
    width: 1920,
    height: 1080,
  },
  timeout: 60000,
  retries: 0,
};

// Get configuration based on environment
export function getConfig(): TestConfig {
  const env = process.env.TEST_ENV || 'dev';

  switch (env.toLowerCase()) {
    case 'ci':
      return ciConfig;
    case 'local':
      return localConfig;
    case 'dev':
    default:
      return devConfig;
  }
}

// Test data
export const testData = {
  validUser: {
    username: 'test@example.com',
    password: 'Test@123',
  },
  invalidUser: {
    username: 'invaliduser@example.com',
    password: 'Test@123',
  },
  invalidPassword: {
    username: 'test@example.com',
    password: 'WrongPassword123',
  },
  sqlInjection: {
    username: "admin' OR '1'='1",
    password: 'anything',
  },
  xssPayload: {
    username: 'test@example.com',
    password: '<script>alert("xss")</script>',
  },
};

// Page URLs
export const pageUrls = {
  home: 'http://opencart.abstracta.us',
  login: 'http://opencart.abstracta.us/index.php?route=account/login',
  dashboard: 'http://opencart.abstracta.us/index.php?route=account/account',
  register: 'http://opencart.abstracta.us/index.php?route=account/register',
};

// Wait times
export const waitTimes = {
  short: 2000,
  medium: 5000,
  long: 10000,
  veryLong: 30000,
};
