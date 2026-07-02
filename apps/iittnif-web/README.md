# iittnif-web

The IITTNiF parent site. 8 tabs, each an isolated route — per PDR Section 04.

## Routes → PDR mapping

| Route                          | PDR Tab                  | Notes |
|---------------------------------|---------------------------|-------|
| `/`                              | Home                      | Triage-first hero, 20-second identity, pathway cards |
| `/about-tih`                     | About TIH                 | Identity, mandate, governance, leadership |
| `/technology-labs`               | Technology & Labs         | Hub page — 3 labs, TRL-aware pipeline, filterable TDP portfolio |
| `/technology-labs/core-areas/[slug]`     | Core Areas (8 items)      | ONE dynamic template, CMS-driven — Quantum Tech, Geospatial Tools, Data Science, RF, Image Processing, Indoor Mapping, Robotics, Defence |
| `/technology-labs/applied-areas/[slug]`  | Applied Areas (7 items)   | ONE dynamic template — Precision Agri, Disaster Mgmt, Smart Cities, Smart Villages, Land Records & Insurance, Navigation, Policy & Legal |
| `/technology-labs/development/[slug]`    | Technology Development (9 items) | ONE dynamic template — Overview, Translational R&D, GNSS, GIS, LiDAR, Quantum Navigation, Computer Vision, AI/ML, Geo-Intel Lab |
| `/technology-labs/resources/[slug]`      | Meta Data Resources (2 items) | ONE dynamic template — NavIC (IRNSS) Community, Nav-i-GIST |
| `/technology-labs/collaborations`        | Collaborations            | Bespoke — single item, own design |
| `/flagship-initiatives`          | Flagship Initiatives      | VIKAS, SPIN Labs, VidyaGIS, Bharath PNT, Dronagiri card (links out to standalone site) |
| `/startups-enablement`           | Startups & Business Enablement | Founder-facing hero, VIKAS Advantage, filterable startup cards |
| `/startups-enablement/innovations`       | Innovations                | Bespoke — only 2 sub-items total, each gets its own design |
| `/startups-enablement/grand-challenges`  | Grand Challenges           | Bespoke |
| `/hrd`                           | Human Resource Development| Hub — 6 learner pathway cards |
| `/hrd/[slug]`                     | HR pathways (8 items)     | ONE dynamic template — Fellowships/Internships, UG, PG, PhD, Postdoc, Skill Development, Nav-i-FOSSEE, Nav-i-GEE |
| `/newsroom` + `/newsroom/[slug]` | Newsroom                  | CMS-driven, kept out of main nav clutter |
| `/contact`                       | Contact                   | Stakeholder-routed enquiry pathways |

## API routes

- `/api/impact-feed` — public counters/outcomes feed (PDR: "open Impact feed" beyond-brief addition)
- `/api/application-status` — login-free, magic-link VIKAS application status check (PDR: "eighth need")

Each route folder is self-contained. Editing `/hrd` cannot break `/contact`.
