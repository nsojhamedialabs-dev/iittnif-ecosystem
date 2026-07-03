# cms (Payload)

Single self-hosted Payload instance, multi-tenant — serves both
iittnif-web and dronagiri-web from one editorial login.

## Collections (draft list, per PDR Section 09 content model)

- `Tenants.ts` — scopes every content item to `iittnif` | `dronagiri`
- `Pages.ts` — structured page copy (Hero, About text) — never free-form code
- `News.ts` — weekly cadence, category + date filters, auto-archive
- `Opportunities.ts` — calls/fellowships, deadline-aware, auto-expires
- `StartupPortfolio.ts` — shared schema, filterable by tenant
- `PilotProjects.ts` — Dronagiri-specific, powers the /pilots interactive map
- `Partners.ts` — logo grid, shared or tenant-scoped
- `Leadership.ts` — photo, designation, official email only
- `Publications.ts` — PDF upload + cover image, quarterly cadence
- `ImpactMetrics.ts` — powers both the Impact Feed API and Dronagiri counters

## Hard rule (schema-enforced, per PDR Section 09)

No collection may expose financial, approval, MoU, mobile number, or
disbursement fields to any public-facing API. This is enforced in
`src/access/`, not left to editorial discipline.
