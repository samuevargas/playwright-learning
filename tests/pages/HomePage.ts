import { Page, Locator } from "@playwright/test";

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly signInLink: Locator;

  constructor(page: Page) {
    this.page = page;
this.searchInput = page.getByRole("searchbox");
    this.signInLink = page.getByRole("link",{name: "Sign in"} );
  }

  async goto() {
    await this.page.goto("https://github.com/");
  }

  async navigateToLogin() {
    await this.signInLink.click();
  }
}