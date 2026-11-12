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

The E2E suite covers secure contact submission, responsive overflow at
390/768/1440px, keyboard navigation, shared design tokens, and desktop/mobile
visual snapshots for every route. It uses deterministic server fixtures.
Only run `npm run test:visual:update` after reviewing an intentional design
change.

For direct cross-codebase parity, run Angular on port 4202 and React on 4200,
then set `ANGULAR_BASE_URL=http://127.0.0.1:4202` when running
`npm run test:e2e`. The parity suite compares navigation, typography, section
geometry, colors, overflow, and page structure at desktop and mobile sizes.

## Production contact configuration

Set `TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, `RESEND_API_KEY`,
`CONTACT_TO_EMAIL`, and `CONTACT_FROM_EMAIL`. Contact addresses and provider
credentials stay on the server and are never included in the browser bundle.
