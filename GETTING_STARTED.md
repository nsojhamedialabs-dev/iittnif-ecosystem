# Getting Started — Local Setup

This scaffold is built for `G:\IIT Tirupati\iittnif-ecosystem`. After
extracting the zip into that exact folder, run everything from a
terminal (PowerShell or Git Bash) opened inside it.

## Prerequisites

- Node.js 20+ — https://nodejs.org
- pnpm — install once globally: `npm install -g pnpm`

## First run

```powershell
cd "G:\IIT Tirupati\iittnif-ecosystem"
pnpm install
```

This installs dependencies for every app and package in one pass —
that's the point of the pnpm workspace.

## Run just the IITTNiF site

```powershell
pnpm dev:iittnif
```

Opens at http://localhost:3000. Right now this will render the Home
page hero correctly, but any `[slug]` route (like Core Areas) will
come back empty until the CMS (`apps/cms`) is running locally too,
since those pages fetch live content from Payload.

## Run the CMS

Payload itself (`apps/cms`) isn't wired with real dependencies yet —
that's genuinely the next build step, not something to fake with
placeholder data. Once it's in, `pnpm dev:cms` brings up the admin
panel at http://localhost:3001/admin.

## What's real vs. what's next

**Real, working code right now:**
- Root workspace (pnpm + Turborepo)
- `packages/design-system` — the chromatic spine as typed tokens
- `packages/config` — tsconfig, Tailwind preset, ESLint preset
- `packages/ui` — `Hero` and `TopicPage` components, fully functional
- `packages/cms-client` — typed query functions (will work once CMS exists)
- `apps/iittnif-web` — Next.js app boots, Home page renders, one live
  example route (`/technology-labs/core-areas/[slug]`) proving the
  whole CMS-driven pattern end to end

**Next in sequence:**
- `apps/cms` — actual Payload installation + the `TopicPages` collection
  (content model already drafted in `apps/cms/src/collections/TopicPages.ts`)
- Remaining `packages/ui` components: `Pillars`, `Pipeline`, `Portfolio`,
  `Stories`, `EngageCTA`, `MegaMenu`, `Glossary`, `LanguageToggle`,
  `ImpactCounter`, `Map`
- `apps/dronagiri-web` — same treatment as iittnif-web, once the
  shared `ui` library is further along
