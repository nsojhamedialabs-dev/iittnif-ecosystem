// MOBILE-FIRST: see /MOBILE_FIRST.md — fontSize.hero/h1/h2/h3 use
// clamp() so type scales correctly from 360px up without a
// separate mobile override.

/**
 * Type System — PDR Section 03
 * Three open-license faces, each earning its role. Not a mood-board pick:
 * Space Grotesk reads as instrument-grade precision hardware, not a
 * startup deck. Public Sans is the U.S. federal government's own
 * public-domain typeface — fitting pedigree for a DST-anchored mission.
 * IBM Plex Mono gives every number on the site engineering-instrument
 * character.
 */

export const fontFamily = {
  display: "'Space Grotesk', system-ui, sans-serif",   // headings, hero statements
  body: "'Public Sans', system-ui, sans-serif",          // body copy, UI text
  mono: "'IBM Plex Mono', 'Courier New', monospace",     // data, counters, labels, captions
} as const

export const fontWeight = {
  regular: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
} as const

/**
 * Type scale — fluid, clamps between mobile (360px) and desktop (1920px)
 * per PDR Section 07 responsive/performance budget.
 */
export const fontSize = {
  hero: 'clamp(2.5rem, 5vw + 1rem, 5.5rem)',
  h1: 'clamp(2rem, 3vw + 1rem, 3.5rem)',
  h2: 'clamp(1.5rem, 2vw + 1rem, 2.5rem)',
  h3: 'clamp(1.25rem, 1.2vw + 1rem, 1.75rem)',
  bodyLg: '1.125rem',
  body: '1rem',
  small: '0.875rem',
  caption: '0.75rem',   // used with mono for data labels
} as const

export const lineHeight = {
  tight: 1.1,
  heading: 1.25,
  body: 1.6,
} as const
