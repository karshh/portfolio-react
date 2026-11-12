import { Router, type Request } from "express";

const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";
const RESEND_EMAIL_URL = "https://api.resend.com/emails";
const DEVELOPMENT_SITE_KEY = "1x00000000000000000000AA";
const DEVELOPMENT_SECRET_KEY = "1x0000000000000000000000000000000AA";

export interface ContactMessage { name: string; email: string; subject: string; message: string; website: string; turnstileToken: string }
export interface ContactApiOptions { environment?: NodeJS.ProcessEnv; fetch?: typeof fetch; now?: () => number }

export function validateContactMessage(value: unknown): ContactMessage | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const input = value as Record<string, unknown>;
  const fields = ["name", "email", "subject", "message", "website", "turnstileToken"] as const;
  if (fields.some((field) => typeof input[field] !== "string")) return null;
  const contact = Object.fromEntries(fields.map((field) => [field, (input[field] as string).trim()])) as unknown as ContactMessage;
  if (contact.name.length < 1 || contact.name.length > 100 || contact.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact.email) || contact.subject.length < 1 || contact.subject.length > 150 || contact.message.length < 1 || contact.message.length > 5000 || contact.website.length > 0 || contact.turnstileToken.length < 1 || contact.turnstileToken.length > 2048) return null;
  return contact;
}

const escapeHtml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
const clientAddress = (request: Request) => request.ip || request.socket.remoteAddress || "unknown";

export function createContactRouter(options: ContactApiOptions = {}): Router {
  const router = Router(), environment = options.environment ?? process.env, fetchRequest = options.fetch ?? fetch, now = options.now ?? Date.now;
  const production = environment.NODE_ENV === "production";
  const siteKey = environment.TURNSTILE_SITE_KEY || (production ? "" : DEVELOPMENT_SITE_KEY);
  const secretKey = environment.TURNSTILE_SECRET_KEY || (production ? "" : DEVELOPMENT_SECRET_KEY);
  const apiKey = environment.RESEND_API_KEY, recipient = environment.CONTACT_TO_EMAIL, sender = environment.CONTACT_FROM_EMAIL;
  const configured = Boolean(siteKey && secretKey && (!production || (apiKey && recipient && sender)));
  const rateEntries = new Map<string, number[]>();
  router.get("/config", (_request, response) => configured ? response.json({ turnstileSiteKey: siteKey }) : response.status(503).json({ error: "Contact form is unavailable." }));
  router.post("/", async (request, response) => {
    response.set("Cache-Control", "no-store");
    const address = clientAddress(request), timestamp = now();
    const retained = (rateEntries.get(address) ?? []).filter((entry) => timestamp - entry < 60 * 60 * 1000);
    if (retained.filter((entry) => timestamp - entry < 10 * 60 * 1000).length >= 2 || retained.length >= 5) return response.status(429).set("Retry-After", "600").json({ error: "Please wait before sending another message." });
    retained.push(timestamp); rateEntries.set(address, retained);
    const contact = validateContactMessage(request.body);
    if (!contact) return response.status(400).json({ error: "Unable to send this message." });
    if (!configured) return response.status(503).json({ error: "Contact form is unavailable." });
    try {
      const verification = await fetchRequest(TURNSTILE_VERIFY_URL, { method: "POST", body: new URLSearchParams({ secret: secretKey, response: contact.turnstileToken, remoteip: address }) });
      const result = await verification.json() as { success?: boolean };
      if (!verification.ok || result.success !== true) return response.status(400).json({ error: "Please complete the anti-spam check and try again." });
      if (production) {
        const email = await fetchRequest(RESEND_EMAIL_URL, { method: "POST", headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" }, body: JSON.stringify({ from: sender, to: [recipient], reply_to: contact.email, subject: `Portfolio contact: ${contact.subject}`, text: `From: ${contact.name} <${contact.email}>\n\n${contact.message}`, html: `<p><strong>From:</strong> ${escapeHtml(contact.name)} &lt;${escapeHtml(contact.email)}&gt;</p><p>${escapeHtml(contact.message).replaceAll("\n", "<br>")}</p>` }) });
        if (!email.ok) return response.status(502).json({ error: "Unable to send this message right now." });
      }
      return response.status(202).json({ sent: true });
    } catch { return response.status(502).json({ error: "Unable to send this message right now." }); }
  });
  return router;
}
