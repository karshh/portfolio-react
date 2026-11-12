# Portfolio React

Karsh Sharma's portfolio, rebuilt with React 19.3 and React Router framework mode.

## Stack

- React 19.3 with TypeScript
- React Router full-stack framework mode and Vite
- Server-side rendering with a custom Express server
- Leaflet and OpenStreetMap for traffic and detour maps
- Environment and Climate Change Canada weather data
- City of Calgary news, traffic, and detour data
- Cloudflare Turnstile and Resend for private server-side contact delivery

## Local development

Requires Node.js 22.22 or newer.

```bash
npm install
npm run dev
```

The site runs at `http://localhost:4200` by default.

## Validation

```bash
npm run typecheck
npm test
npm run build
npm run test:e2e
```

## Production contact configuration

Set `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`. Contact addresses and provider
credentials stay on the server and are never included in the browser bundle.
