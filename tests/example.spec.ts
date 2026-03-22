import { test, expect } from "@playwright/test";

test("homepage has correct title", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link works", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await page.getByRole("link", { name: "Get started" }).click();
  await expect(page).toHaveURL(/intro/);
});

test("search on playwright docs", async ({ page }) => {
  await page.goto("https://playwright.dev");
  await page.getByLabel("Search (Ctrl+K)").click();
  await page.getByPlaceholder("Search docs").fill("locator");
  await expect(page.locator("#docsearch-hits0-item-0")).toBeVisible();
  await page.keyboard.press("Enter");
  await expect(page).toHaveTitle("Locators | Playwright");
});