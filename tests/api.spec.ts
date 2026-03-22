import {test, expect} from "@playwright/test"
import { request } from "node:http";

test("Direct API test", async ({ request }) => {
  const response = await request.get("https://api.github.com/users/torvalds")
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body.login).toBe("torvalds");
    expect (body.public_repos).toBeGreaterThan(0);
  });

// Test 1 — Direct API test
// Call https://api.github.com/users/torvalds (no auth needed, it's public)
// Assert:
//   - status is 200
//   - body.login === "torvalds"
//   - body.public_repos is greater than 0


test("Mock test", async ({ page }) => {
  await page.route("https://api.github.com/users/fakeuser", async (route) => {
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({         public_repos: "42", login: "fakeuser", 
        name: "Fake User", 

     })
    });
  });

  // Use page.request — this goes through the browser, so the mock fires
  const response = await page.request.get("https://api.github.com/users/fakeuser");
  expect(response.status()).toBe(200);
  const body = await response.json();
  expect(body.login).toBe("fakeuser");
  expect(body.public_repos).toBe("42");
});

// Test 2 — Mock test
// Mock GET https://api.github.com/users/fakeuser to return:
//   { login: "fakeuser", name: "Fake User", public_repos: 42 }
// Then call that endpoint with { request }
// Assert the mocked values come back correctly