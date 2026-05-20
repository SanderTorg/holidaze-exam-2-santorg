import { test, expect, type Page } from "@playwright/test";

const CUSTOMER_EMAIL = process.env.TEST_CUSTOMER_EMAIL ?? "";
const CUSTOMER_PASSWORD = process.env.TEST_CUSTOMER_PASSWORD ?? "";

async function loginAs(page: Page, email: string, password: string) {
  await page.goto("/login");
  await page.getByLabel(/email/i).fill(email);
  await page.getByLabel(/password/i).fill(password);
  await page.getByRole("button", { name: /login/i }).click();

  await page.waitForURL((url) => !url.pathname.includes("/login"), {
    timeout: 10000,
  });
}

test.describe("Customer user story", () => {
  test("customer can log in and is redirected to home", async ({ page }) => {
    await loginAs(page, CUSTOMER_EMAIL, CUSTOMER_PASSWORD);
    await expect(page).toHaveURL(/\//);
    await expect(page).not.toHaveURL(/\/login/);
  });

  test("customer profile shows Customer badge (not Venue Manager)", async ({
    page,
  }) => {
    await loginAs(page, CUSTOMER_EMAIL, CUSTOMER_PASSWORD);
    await page.goto("/profile");
    await expect(page.getByText(/customer/i)).toBeVisible();
    await expect(page.getByText(/venue manager/i)).not.toBeVisible();
  });

  test("customer can view the bookings tab on profile", async ({ page }) => {
    await loginAs(page, CUSTOMER_EMAIL, CUSTOMER_PASSWORD);
    await page.goto("/profile");

    const bookingsHeading = page
      .getByRole("heading", { name: /bookings/i })
      .or(page.getByText(/no bookings yet/i))
      .or(page.getByText(/your bookings/i));
    await expect(bookingsHeading.first()).toBeVisible({ timeout: 10000 });
  });

  test("customer can browse venues and view a venue detail", async ({
    page,
  }) => {
    await loginAs(page, CUSTOMER_EMAIL, CUSTOMER_PASSWORD);
    await page.goto("/venues");
    await page
      .getByRole("button", { name: /view details/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/venues\/.+/);
  });
});
