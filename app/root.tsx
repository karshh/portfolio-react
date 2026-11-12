import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  NavLink,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import { useEffect, useState } from "react";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "icon", href: "/favicon.png" },
];

export const meta: Route.MetaFunction = () => [
  { title: "Karsh Sharma | Full-stack Developer" },
  { name: "description", content: "Karsh Sharma's full-stack development portfolio." },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return (
    <div className="site-shell" data-hydrated={hydrated}>
      <nav className="navbar">
        <div className="container nav-inner">
          <NavLink className="brand" to="/">usharma</NavLink>
          <button className="nav-toggle" type="button" aria-expanded={menuOpen} aria-controls="primary-navigation" aria-label="Toggle navigation" onClick={() => setMenuOpen((open) => !open)}><span /></button>
          <div id="primary-navigation" className={`nav-links${menuOpen ? " open" : ""}`} aria-label="Primary navigation">
            {["home", "news", "sait", "contact"].map((item) => (
              <NavLink key={item} className={({ isActive }) => `nav-link${isActive ? " active" : ""}`} to={`/${item}`} onClick={() => setMenuOpen(false)}>{item}</NavLink>
            ))}
          </div>
        </div>
      </nav>
      <main><Outlet /></main>
      <footer className="footer"><div className="container">Copyright © Karsh Sharma {new Date().getFullYear()}</div></footer>
    </div>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="container error-page">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
