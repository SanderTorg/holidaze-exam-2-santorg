import { test, expect } from "@playwright/test";

test.describe("Guest user story", () => {
  test("home page has correct title", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Holidaze/);
  });

  test("guest can navigate to the venues listing page", async ({ page }) => {
    await page.goto("/");
    await page
      .getByRole("link", { name: /venues/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/venues/);
    await expect(page.getByRole("heading", { name: /venues/i })).toBeVisible();
  });

  test("guest can open a venue detail page", async ({ page }) => {
    await page.goto("/venues");
    await page.getByRole("button", { name: /view details/i }).first().click();
    await expect(page).toHaveURL(/\/venues\/.+/);
  });

  test("guest is redirected to login when accessing profile", async ({
    page,
  }) => {
    await page.goto("/profile");
    await expect(page).toHaveURL(/\/login/);
  });

  test("guest can navigate to the login page", async ({ page }) => {
    await page.goto("/login");
    await expect(
      page.getByRole("heading", { name: /welcome back/i }),
    ).toBeVisible();
    await expect(page.getByLabel(/email/i)).toBeVisible();
    await expect(page.getByLabel(/password/i)).toBeVisible();
  });

  test("guest can navigate to the register page", async ({ page }) => {
    await page.goto("/register");
    await expect(page.getByRole("heading", { name: /create/i })).toBeVisible();
  });
});
