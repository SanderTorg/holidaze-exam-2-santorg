import { test, expect, type Page } from "@playwright/test";

const MANAGER_EMAIL = process.env.TEST_MANAGER_EMAIL ?? "";
const MANAGER_PASSWORD = process.env.TEST_MANAGER_PASSWORD ?? "";

async function loginAs(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole("button", { name: /login/i }).click();
  await page.waitForURL((url) => !url.pathname.includes("/login"), {
    timeout: 10000,
  });
}

test.describe("Venue Manager user story", () => {
  test("manager can log in and is redirected to home", async ({ page }) => {
    await loginAs(page, MANAGER_EMAIL, MANAGER_PASSWORD);
    await expect(page).toHaveURL(/\//);
    await expect(page).not.toHaveURL(/\/login/);
  });

  test("manager profile shows Venue Manager badge", async ({ page }) => {
    await loginAs(page, MANAGER_EMAIL, MANAGER_PASSWORD);
    await page.goto("/profile");
    await expect(page.getByText(/venue manager/i)).toBeVisible();
  });

  test("manager sees the venue management dashboard on profile", async ({
    page,
  }) => {
    await loginAs(page, MANAGER_EMAIL, MANAGER_PASSWORD);
    await page.goto("/profile");

    const createVenueBtn = page
      .getByRole("button", { name: /new venue|create venue|add venue/i })
      .or(
        page.getByRole("link", { name: /new venue|create venue|add venue/i }),
      );
    await expect(createVenueBtn.first()).toBeVisible({ timeout: 10000 });
  });

  test("manager can open the create venue form", async ({ page }) => {
    await loginAs(page, MANAGER_EMAIL, MANAGER_PASSWORD);
    await page.goto("/profile");
    const createVenueBtn = page
      .getByRole("button", { name: /new venue|create venue|add venue/i })
      .or(
        page.getByRole("link", { name: /new venue|create venue|add venue/i }),
      );
    await createVenueBtn.first().click();

    await expect(page.getByPlaceholder(/my awesome cabin/i)).toBeVisible({
      timeout: 8000,
    });
  });

  test("manager can browse venues", async ({ page }) => {
    await loginAs(page, MANAGER_EMAIL, MANAGER_PASSWORD);
    await page.goto("/venues");
    await expect(page.getByRole("heading", { name: /venues/i })).toBeVisible();
  });
});
