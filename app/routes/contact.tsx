import { useEffect, useRef, useState, type FormEvent } from "react";

declare global { interface Window { turnstile?: { render(element: HTMLElement, options: Record<string, unknown>): string; reset(id?: string): void } } }

export default function Contact() {
  const turnstile = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const [token, setToken] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");
  useEffect(() => {
    let active = true;
    void fetch("/api/contact/config").then(async (response) => {
      if (!response.ok) throw new Error();
      return response.json() as Promise<{ turnstileSiteKey: string }>;
    }).then(({ turnstileSiteKey }) => {
      const render = () => {
        if (!active || !turnstile.current || !window.turnstile || widgetId.current) return;
        widgetId.current = window.turnstile.render(turnstile.current, { sitekey: turnstileSiteKey, theme: "light", size: "flexible", callback: (value: string) => setToken(value), "expired-callback": () => setToken(""), "error-callback": () => { setToken(""); setError("The anti-spam check failed. Please try again."); } });
      };
      if (window.turnstile) return render();
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"; script.async = true; script.defer = true;
      script.addEventListener("load", render, { once: true }); document.head.appendChild(script);
    }).catch(() => setError("The contact form is temporarily unavailable."));
    return () => { active = false; if (window.turnstile && widgetId.current) window.turnstile.reset(widgetId.current); };
  }, []);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setStatus("sending"); setError("");
    const form = event.currentTarget, values = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...values, turnstileToken: token }) });
      const body = await response.json() as { error?: string };
      if (!response.ok) throw new Error(body.error || "Unable to send this message.");
      setStatus("sent"); form.reset(); setToken(""); window.turnstile?.reset(widgetId.current);
    } catch (cause) { setStatus("error"); setError(cause instanceof Error ? cause.message : "Unable to send this message."); }
  }
  return <>
    <section className="jumbotron container"><h1>Reach out to me!</h1></section>
    <section className="contact-links"><div className="container text-center"><h3>Contact Link</h3><br /><div className="row justify-center">
      <div className="col-4"><a className="contact-card" href="https://github.com/karshh"><img className="brand-img" src="/assets/img/GitHub.png" alt="GitHub" /></a></div>
      <div className="col-4"><a className="contact-card" href="#contact-form"><img className="brand-img" src="/assets/img/Mail.png" alt="Contact form" /></a></div>
      <div className="col-4"><a className="contact-card" href="https://www.linkedin.com/in/karshsharma/"><img className="brand-img" src="/assets/img/LinkedIn.png" alt="LinkedIn" /></a></div>
    </div></div></section>
    <section className="form-section"><div className="container"><form className="form" onSubmit={submit}>
      <h4 id="contact-form"><strong>Contact Form</strong></h4><br />
      {["name", "email", "subject"].map((name) => <div className="form-group" key={name}><label htmlFor={name}>{name[0].toUpperCase() + name.slice(1)}</label><input className="form-control" id={name} name={name} type={name === "email" ? "email" : "text"} required maxLength={name === "subject" ? 150 : name === "email" ? 254 : 100} /></div>)}
      <div className="form-group"><label htmlFor="message">Message</label><textarea className="form-control" id="message" name="message" rows={4} required maxLength={5000} /></div>
      <div className="honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" /></div>
      <div ref={turnstile} className="turnstile" aria-label="Anti-spam verification" />
      {error && <p className="error" role="alert">{error}</p>}
      <button className="btn btn-dark" disabled={!token || status === "sending"}>{status === "sending" ? "Sending…" : "Submit"}</button>
      {status === "sent" && <p>✓ Sent.</p>}
    </form></div></section>
  </>;
}
