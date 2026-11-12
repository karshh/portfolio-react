import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.turnstile = {
      render: (_element: HTMLElement, options: Record<string, unknown>) => {
        (options.callback as (token: string) => void)("XXXX.DUMMY.TOKEN.XXXX");
        return "test-widget";
      },
      reset: () => undefined,
    };
  });
  await page.route("**/api/contact/config", (route) => route.fulfill({ json: { turnstileSiteKey: "1x00000000000000000000AA" } }));
});

test("submits through the same-origin API without exposing a recipient", async ({ page }) => {
  let submitted: Record<string, string> | undefined;
  await page.route("**/api/contact", async (route) => {
    submitted = route.request().postDataJSON();
    await route.fulfill({ status: 202, json: { sent: true } });
  });
  await page.goto("/contact");
  expect(await page.content()).not.toContain("mailto:");
  await page.getByLabel("Name").fill("Playwright Visitor");
  await page.getByLabel("Email").fill("visitor@example.com");
  await page.getByLabel("Subject").fill("E2E contact");
  await page.getByLabel("Message").fill("This verifies the secure contact flow.");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByText("✓ Sent.")).toBeVisible();
  expect(submitted).toMatchObject({ name: "Playwright Visitor", email: "visitor@example.com", subject: "E2E contact", message: "This verifies the secure contact flow.", website: "", turnstileToken: "XXXX.DUMMY.TOKEN.XXXX" });
});

test("shows a safe delivery error and preserves entered values", async ({ page }) => {
  await page.route("**/api/contact", (route) => route.fulfill({ status: 502, json: { error: "Unable to send this message right now." } }));
  await page.goto("/contact");
  await page.getByLabel("Name").fill("Playwright Visitor");
  await page.getByLabel("Email").fill("visitor@example.com");
  await page.getByLabel("Subject").fill("E2E contact");
  await page.getByLabel("Message").fill("Please keep this message.");
  await page.getByRole("button", { name: "Submit" }).click();
  await expect(page.getByRole("alert")).toHaveText("Unable to send this message right now.");
  await expect(page.getByLabel("Message")).toHaveValue("Please keep this message.");
});
