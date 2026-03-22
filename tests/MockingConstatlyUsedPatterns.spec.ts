import { test } from "@playwright/test";
// 1. Block a request entirely (e.g. analytics, ads)
test("Block a request entirely", async ({ page }) => {
await page.route("**\/analytics/**", route => route.abort());

// 2. Modify a real response — fetch it, then alter it
await page.route("**/api/users", async (route) => {
  const response = await route.fetch();
  const body = await response.json();
  body.role = "admin"; // inject a field
  await route.fulfill({ response, body: JSON.stringify(body) });
});

// 3. Simulate an error
await page.route("**/api/data", route => route.fulfill({
  status: 500,
  body: "Internal Server Error"
}));

// 4. Slow down a request (test loading states)
await page.route("**/api/slow", async (route) => {
  await new Promise(resolve => setTimeout(resolve, 3000));
  await route.continue();
});

});