import { expect, test } from "@playwright/test";

test("core portfolio routes render", async ({ page }) => {
  await page.goto("/home");
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
});
