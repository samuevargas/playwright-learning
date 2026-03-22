import { test as setup } from "@playwright/test";

const authFile = "playwright/.auth/user.json";

setup("authenticate", async ({ page }) => {
  await page.goto("https://github.com/login");
  await page.getByLabel("Username or email address").fill("samuevargas");
  await page.getByLabel("Password").fill("Parangari3*");
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.waitForURL("https://github.com/");

});