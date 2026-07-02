# IITTNiF Ecosystem — Monorepo

Two standalone, independently-deployed websites sharing one design system
and one CMS. Built per the NS OJAS Media Labs Project Design Report (July 2026).

## Structure

- `apps/iittnif-web` — the IITTNiF parent site (8 tabs, single-page-per-section)
- `apps/dronagiri-web` — Operation Dronagiri, standalone flagship-initiative site
- `apps/cms` — Payload CMS, multi-tenant, serves content to both apps above
- `packages/design-system` — the chromatic spine, type scale, spacing tokens
- `packages/ui` — the six reusable PDR modules (Hero, Pillars, Pipeline, Portfolio, Stories, Engage/CTA) + extras
- `packages/cms-client` — typed query layer both apps use to fetch from Payload
- `packages/i18n` — EN/HI dictionaries (bilingual-by-default requirement)
- `packages/config` — shared eslint/tsconfig/tailwind presets
- `infra/docker` — containers for eventual migration to IIT's own servers
- `infra/vercel` — staging deploy config (current, pre-approval phase)
- `docs/weekly-updates` — Friday changelog archive for stakeholder review

## Why this structure

Each of the 8 IITTNiF tabs and 7 Dronagiri tabs lives as its own isolated
route file. No shared page templates that could create merge conflicts —
each section can be redesigned or rebuilt without touching a neighbor.
Shared visual language and content logic live one level up, in `packages/`,
so both sites stay visually related without being welded together.

## Hosting

- **Now**: Vercel preview deployments (both apps) — shareable HTTPS links,
  no local setup required for stakeholder review.
- **Post-approval**: Docker containers migrate as-is to IIT Tirupati's own
  infrastructure. No rebuild — same containers, new host.
