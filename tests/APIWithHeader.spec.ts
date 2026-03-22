import { test, expect } from "@playwright/test";
test("API with headers", async ({ request }) => {
  const response = await request.post("https://api.github.com/repos/owner/repo/issues", {
    headers: {
      "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
      "Accept": "application/vnd.github+json"
    },
    data: {
      title: "Test issue from Playwright",
      body: "Created by an automated test"
    }
  });

  expect(response.status()).toBe(201);
  const issue = await response.json();
  expect(issue.title).toBe("Test issue from Playwright");
});
