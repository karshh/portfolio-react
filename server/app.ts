import { createRequestHandler } from "@react-router/express";
import express from "express";
import { createContactRouter } from "./contact-api";

export const app = express();

app.set("trust proxy", 1);
app.disable("x-powered-by");
app.use((_request, response, next) => {
  response.set({
    "Content-Security-Policy": "default-src 'self'; img-src 'self' data: https:; style-src 'self' 'unsafe-inline' https://unpkg.com; script-src 'self' 'unsafe-inline' https://challenges.cloudflare.com; frame-src https://challenges.cloudflare.com; connect-src 'self' https://challenges.cloudflare.com https://api.weather.gc.ca https://data.calgary.ca https://*.tile.openstreetmap.org; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
    "Referrer-Policy": "strict-origin-when-cross-origin",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
  });
  next();
});
app.use("/api/contact", express.json({ limit: "12kb", type: "application/json" }), createContactRouter());
app.get("/health", (_request, response) => response.json({ status: "ok" }));

app.use(
  createRequestHandler({
    build: () => import("virtual:react-router/server-build"),
  }),
);
