# Mobile-First — The Standard, Not a Suggestion

Every screen, every component, every layout in this project is designed
and coded **mobile-first**. This file is the canonical reference —
every code file in the repo carries a short comment pointing back here,
so opening any single file on a fresh machine tells you this rule
immediately, without hunting for a wiki page.

## What "mobile-first" means in this codebase, concretely

1. **Base (unprefixed) Tailwind classes = the 360px mobile layout.**
   `sm:`, `md:`, `lg:`, `xl:`, `2xl:` are *additions* for larger screens,
   never overrides of a desktop-first base. If you write
   `flex-col md:flex-row`, the column layout is mobile; the row layout
   is the enhancement. Never the other way around.

2. **Design and build in this order, every time:**
   360px → 640px → 768px → 1024px → 1440px → 1920px
   (matches `packages/design-system/tokens/spacing.ts` → `breakpoints`).
   Get the 360px version right and *shippable* before touching a
   larger breakpoint.

3. **Touch targets, not hover states, are the default interaction.**
   Every CTA, nav item, and card must work as a tap target (min ~44px)
   before we layer in hover/focus enhancements for desktop pointers.

4. **Images, fonts, and data payloads are sized for the smallest
   viewport and slowest plausible connection first** — this also
   directly serves the PDR's Lighthouse Performance ≥ 90 mobile budget
   (Section 07). Mobile-first isn't just layout — it's the performance
   contract too.

5. **Hero, Pillars, Pipeline, Portfolio, Stories, Engage/CTA** — every
   one of the six PDR component-system modules must have its mobile
   layout designed *first*, before the desktop composition is decided.

## The header comment convention

Every `.ts` / `.tsx` file in `apps/` and `packages/` starts with:

```ts
// MOBILE-FIRST: see /MOBILE_FIRST.md — base styles target 360px;
// sm:/md:/lg: are progressive enhancements, not overrides.
```

If you open a file and this comment is missing, add it — don't assume
an older file is exempt.
