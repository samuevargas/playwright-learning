import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("https://github.com/login");
  await page.getByLabel("Username or email address").fill(process.env.GITHUB_USER!);
  await page.getByLabel("Password").fill(process.env.GITHUB_PASS!);
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("https://github.com/");

  // Save auth state to file
  await page.context().storageState({ path: authFile });
});