import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./e2e",
  snapshotPathTemplate: "{testDir}/{testFilePath}-snapshots/{arg}{ext}",
  workers: 1,
  use: {
    baseURL: "http://127.0.0.1:4200",
    screenshot: "only-on-failure",
    launchOptions: { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH },
  },
  webServer: { command: "cross-env PORTFOLIO_E2E_FIXTURES=true npm run dev", url: "http://127.0.0.1:4200/health", reuseExistingServer: true, timeout: 120_000 },
});
