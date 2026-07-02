# design-system

The chromatic spine (PDR Section 03) as code, not a mood board.

- `tokens/colors.ts` — Research (Deep Indigo #10182B) → Mandate (Signal Blue #1C5C8C)
  → Architecture (Geospatial Teal #0E8C82) → Delivery (Beacon Amber #D98A2B)
  → National Impact (Earth Terracotta #C1502E). Every page's accent color
  is derived from its position on this gradient — not picked ad hoc.
- `tokens/typography.ts` — Space Grotesk (display), Public Sans (body), IBM Plex Mono (data)
- `tokens/spacing.ts` — shared spacing/breakpoint scale, 360px → 1920px per PDR perf budget

Dronagiri consumes these same tokens but applies its own accent mapping —
same DNA, distinct skin, per the Stripe/Stripe Press model.
