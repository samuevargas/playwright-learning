import { test, expect } from "@playwright/test";
test("shows user profile from API", async ({ page }) => {
  // Intercept the API call before navigating
  await page.route("https://api.github.com/users/github", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        login: "github",
        name: "GitHub",
        public_repos: 999
      })
    });
  });
    
    const response = await page.request.get("https://github.com/github");
  // The page thinks it got a real API response
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.login).toBe("github");
    expect(body.public_repos).toBe(999);

});