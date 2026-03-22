import { test, expect } from "./fixtures";
import { users } from "./data/users";

test("login page loads", async ({ loginPage }) => {
  await expect(loginPage.usernameInput).toBeVisible();
});

test("homepage title is correct", async ({ homePage }) => {
  await expect(homePage.page).toHaveTitle(/GitHub/);
});

test("login page accepts admin username", async ({ loginPage }) => {
  await loginPage.usernameInput.fill(users.admin.username);
  await expect(loginPage.usernameInput).toHaveValue(users.admin.username);
});