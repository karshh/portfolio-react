import { expect, test, type Page } from "@playwright/test";

async function stabilize(page: Page, route: string) {
  await page.addStyleTag({ content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}.leaflet-map{background:#ddd!important}.leaflet-map>*{visibility:hidden!important}" });
  if (route === "home") {
    await page.getByTestId("calgary-clock").evaluate((element) => (element as HTMLElement).style.color = "transparent");
    const temperature = page.getByTestId("temperature");
    if (await temperature.count()) await temperature.evaluate((element) => element.textContent = "12.3 °C");
  }
  if (route === "news") {
    await expect(page.locator(".news-panel")).toHaveCount(11);
    await page.locator(".news-panel").evaluateAll((panels) => panels.forEach((panel, index) => {
      const heading = panel.querySelector("h6"); const date = panel.querySelector("small");
      if (heading) heading.textContent = `Calgary headline ${index + 1}.`;
      if (date) date.textContent = "11/11/2026 12:00 PM";
    }));
  }
  if (route === "contact") await page.locator(".turnstile").evaluate((element) => element.replaceChildren());
}

for (const { name, viewport } of [
  { name: "desktop", viewport: { width: 1440, height: 1000 } },
  { name: "mobile", viewport: { width: 390, height: 844 } },
]) {
  for (const route of ["home", "news", "sait", "contact"]) {
    test(`${route} ${name} visual baseline`, async ({ page }) => {
      await page.setViewportSize(viewport);
      await page.clock.setFixedTime(new Date("2026-11-11T20:30:05Z"));
      if (route === "contact") await page.route("**/api/contact/config", (request) => request.fulfill({ status: 503, json: { error: "unavailable" } }));
      await page.goto(`/${route}`);
      await expect(page.locator(".site-shell")).toHaveAttribute("data-hydrated", "true");
      await stabilize(page, route);
      await expect(page).toHaveScreenshot(`${route}-${name}.png`, { fullPage: true, animations: "disabled", maxDiffPixelRatio: 0.005 });
    });
  }
}
