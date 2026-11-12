import { expect, test, type Page } from "@playwright/test";

const angularBase = process.env.ANGULAR_BASE_URL;
const reactBase = process.env.REACT_BASE_URL ?? "http://127.0.0.1:4200";
const selectors = {
  home: { angular: [".topContent", ".middleContent"], react: [".top-content", ".middle-content"] },
  news: { angular: [".content", ".trafficContent"], react: [".page-content", ".traffic"] },
  sait: { angular: [".contentPanel1", ".contentPanel2"], react: [".light-section", ".dark-section"] },
  contact: { angular: [".jumbotron", ".content", ".form-content"], react: [".jumbotron", ".contact-links", ".form-section"] },
} as const;

async function metrics(page: Page, sectionSelectors: readonly string[]) {
  return page.evaluate((requestedSelectors) => {
    const details = (selector: string) => {
      const element = document.querySelector(selector) as HTMLElement;
      const box = element.getBoundingClientRect(); const style = getComputedStyle(element);
      return { y: Math.round(box.y + scrollY), width: Math.round(box.width), height: Math.round(box.height), background: style.backgroundColor };
    };
    const nav = details("nav"), footer = details("footer, .footer");
    return { nav, footer, font: getComputedStyle(document.body).fontFamily, pageWidth: document.documentElement.scrollWidth, pageHeight: document.documentElement.scrollHeight, sections: requestedSelectors.map(details) };
  }, sectionSelectors);
}

test.describe("Angular and React visual contract", () => {
  test.skip(!angularBase, "Set ANGULAR_BASE_URL to run cross-codebase parity checks");
  for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
    for (const route of Object.keys(selectors) as Array<keyof typeof selectors>) {
      test(`${route} structure matches at ${viewport.width}px`, async ({ browser }) => {
        const context = await browser.newContext({ viewport });
        const angular = await context.newPage(), react = await context.newPage();
        await angular.route("https://api.weather.gc.ca/collections/swob-realtime/items?**", (request) => request.fulfill({ json: { features: [{ properties: { "msc_id-value": "3031094", "air_temp-uom": "°C", air_temp: 12.3, "date_tm-value": new Date().toISOString(), "stn_nam-value": "Calgary International CS" } }] } }));
        await angular.route("https://data.calgary.ca/resource/3x6m-4vs7.json?**", (request) => request.fulfill({ json: Array.from({ length: 11 }, (_, index) => ({ title: `Calgary headline ${index + 1}`, pubdate: "2026-11-11T12:00:00", link: `https://newsroom.calgary.ca/story-${index + 1}/` })) }));
        await angular.route("https://data.calgary.ca/resource/35ra-9556.json?**", (request) => request.fulfill({ json: [{ incident_info: "Traffic incident", description: "Memorial Drive", start_dt_utc: "2026-11-11T19:00:00", modified_dt_utc: "2026-11-12T11:00:00", latitude: "51.057", longitude: "-114.074" }] }));
        await angular.route("https://data.calgary.ca/resource/w8zq-79bq.json?**", (request) => request.fulfill({ json: [{ construction_info: "Construction detour", description: "5 Street SW", start_dt: "2026-11-01T08:00:00", end_dt: "2027-11-01T08:00:00", latitude: "51.045", longitude: "-114.074" }] }));
        await angular.route("https://tile.openstreetmap.org/**", (request) => request.abort());
        await Promise.all([angular.goto(`${angularBase}/${route}`), react.goto(`${reactBase}/${route}`)]);
        const heading = { home: "{ name = Karsh }", news: "Recent Local News", sait: "Technical Summary", contact: "Contact Form" }[route];
        await Promise.all([
          angular.getByRole("heading", { name: heading, exact: true }).waitFor(),
          react.getByRole("heading", { name: heading, exact: true }).waitFor(),
          react.locator(".site-shell[data-hydrated=true]").waitFor(),
        ]);
        if (route === "news") await Promise.all([
          angular.locator('[data-testid="leaflet-map"]').nth(1).waitFor(),
          react.locator('[data-testid="leaflet-map"]').nth(1).waitFor(),
        ]);
        const [a, r] = await Promise.all([metrics(angular, selectors[route].angular), metrics(react, selectors[route].react)]);
        expect(a.nav.background).toBe(r.nav.background); expect(a.footer.background).toBe(r.footer.background);
        expect(Math.abs(a.nav.height - r.nav.height)).toBeLessThanOrEqual(3);
        expect(Math.abs(a.footer.height - r.footer.height)).toBeLessThanOrEqual(2);
        expect(a.font).toContain("LucidaConsole"); expect(r.font).toContain("LucidaConsole");
        expect(a.pageWidth).toBeLessThanOrEqual(viewport.width); expect(r.pageWidth).toBeLessThanOrEqual(viewport.width);
        expect(Math.abs(a.pageHeight - r.pageHeight)).toBeLessThanOrEqual(Math.max(180, Math.round(a.pageHeight * .15)));
        for (let index = 0; index < a.sections.length; index++) {
          expect(a.sections[index].background).toBe(r.sections[index].background);
          expect(Math.abs(a.sections[index].y - r.sections[index].y)).toBeLessThanOrEqual(75);
          expect(Math.abs(a.sections[index].width - r.sections[index].width)).toBeLessThanOrEqual(30);
        }
        await context.close();
      });
    }
  }
});
