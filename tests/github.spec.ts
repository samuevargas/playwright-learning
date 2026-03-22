import { test, expect } from "@playwright/test";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";

test("homepage has correct title", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await expect(page).toHaveTitle(/GitHub/);
});

test("Sign in link navigates to login", async ({ page }) => {
  const homePage = new HomePage(page);
  await homePage.goto();
  await expect(homePage.signInLink).toBeVisible();
  await homePage.navigateToLogin();
  await expect(page).toHaveURL(/login/);
});

test("login page elements exist", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.goto();
  await expect(loginPage.usernameInput).toBeVisible();
  await expect(loginPage.passwordInput).toBeVisible();
});