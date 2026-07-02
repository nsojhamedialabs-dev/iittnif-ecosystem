# dronagiri-web

Operation Dronagiri — standalone site, shares design-system DNA with
iittnif-web but is NOT the same app, NOT the same deploy.

## Routes

| Route                | Purpose |
|-----------------------|---------|
| `/`                    | Hero + vision, real (non-zero) live counters via cms-client |
| `/vision-mission`      | Mandate + National Geospatial Policy 2022 framing |
| `/focus-areas`         | 3 focus area deep-dives |
| `/pilots`               | Interactive India map — replaces the current static photo pair |
| `/startup-challenge`   | Application flow, feeds same Payload backend as iittnif-web's startup portfolio |
| `/partners`            | Real logo grid (no duplicate-DOM marquee hack) |
| `/news` + `/news/[slug]` | Dronagiri-specific newsroom |
| `/contact`             | Dronagiri-specific contact routing |

## API routes

- `/api/pilot-metrics` — live pilot-state counters (fixes the "0 Pilot States" problem)
- `/api/startup-applications` — application intake, shared schema with iittnif-web
