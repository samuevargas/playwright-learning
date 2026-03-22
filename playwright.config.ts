import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",
  fullyParallel: true,
  retries: process.env.CI ? 2 : 0,   // retry flaky tests only in CI
  workers: process.env.CI ? 2 : undefined,
  reporter: [
    ["html"],
    ["github"]  // annotates PRs with test results
  ],
  use: {
    baseURL: "https://github.com",
    trace: "on-first-retry",          // capture trace on failure
    screenshot: "only-on-failure",    // capture screenshot on failure
    video: "on-first-retry"           // capture video on failure
  }
});