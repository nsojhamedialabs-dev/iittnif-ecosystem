// MOBILE-FIRST: see /MOBILE_FIRST.md — breakpoints below are consumed
// min-width-up (Tailwind default), i.e. mobile-first. Do not flip this
// to max-width without updating every consumer in packages/ui.

/**
 * Spacing scale — 4px base unit, consistent across both apps.
 */
export const space = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
} as const

/**
 * Breakpoints — PDR Section 07: "Responsive targets 360px -> 1920px,
 * tested at 5 breakpoints."
 */
export const breakpoints = {
  xs: '360px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1440px',
  '2xl': '1920px',
} as const

export const radius = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '1rem',
  full: '9999px',
} as const

export const maxWidth = {
  content: '1280px',
  wide: '1440px',
} as const
