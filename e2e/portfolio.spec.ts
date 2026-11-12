import { expect, test } from "@playwright/test";

test("core portfolio routes render", async ({ page }) => {
  await page.goto("/home");
  await expect(page.locator('.site-shell')).toHaveAttribute('data-hydrated', 'true');
  await expect(page.getByRole("heading", { name: "{ name = Karsh }" })).toBeVisible();
  await expect(page.getByTestId("calgary-clock")).not.toBeEmpty();
  await page.goto("/sait");
  await expect(page.getByRole("heading", { name: "Technical Summary" })).toBeVisible();
  await page.goto("/contact");
  await expect(page.getByRole("heading", { name: "Contact Form" })).toBeVisible();
});

test("news and map panels render", async ({ page }) => {
  await page.goto("/news");
  await expect(page.getByRole("heading", { name: "Recent Local News" })).toBeVisible();
  await expect(page.getByTestId("leaflet-map")).toHaveCount(2);
  await expect(page.locator(".news-panel")).toHaveCount(11);
  await expect(page.getByText("City of Calgary Newsroom.", { exact: true })).toHaveCount(0);
});

test("mobile navigation collapses, opens, and closes after navigation", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/home");
  await expect(page.locator('.site-shell')).toHaveAttribute('data-hydrated', 'true');
  const toggle = page.getByRole("button", { name: "Toggle navigation" });
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(page.getByRole("navigation").getByRole("link", { name: "NEWS" })).toBeHidden();
  await toggle.click();
  await expect(toggle).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("navigation").getByRole("link", { name: "NEWS" }).click();
  await expect(page).toHaveURL(/\/news$/);
  await expect(page.getByRole("heading", { name: "Recent Local News" })).toBeVisible();
  await expect(page.getByRole("button", { name: "Toggle navigation" })).toHaveAttribute("aria-expanded", "false");
});
