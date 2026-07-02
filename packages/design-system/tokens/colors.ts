// MOBILE-FIRST: see /MOBILE_FIRST.md — fontSize.hero/h1/h2/h3 use
// clamp() so type scales correctly from 360px up without a
// separate mobile override.

/**
 * The Chromatic Spine — PDR Section 03
 *
 * Not a picked palette. This IS the Research -> Technology Development ->
 * Prototype -> Validation -> Deployment -> National Impact pipeline,
 * encoded as a color-temperature gradient. Cool/abstract at the
 * conceptual end, warm/tangible at the deployed end.
 *
 * Every page and component derives its accent from its true position
 * on this spine — never picked ad hoc per page.
 */

export const spine = {
  research: {
    name: 'Deep Indigo',
    hex: '#10182B',
    role: 'Institutional trust — the night sky a satellite is tracked against.',
  },
  mandate: {
    name: 'Signal Blue',
    hex: '#1C5C8C',
    role: 'The cool, instrument-panel blue of positioning and navigation systems.',
  },
  architecture: {
    name: 'Geospatial Teal',
    hex: '#0E8C82',
    role: 'The data-and-validation colour of GIS and earth-observation tooling.',
  },
  delivery: {
    name: 'Beacon Amber',
    hex: '#D98A2B',
    role: 'The warm, precision-instrument amber of active deployment.',
  },
  nationalImpact: {
    name: 'Earth Terracotta',
    hex: '#C1502E',
    role: 'Tangible, ground-level — the colour of deployed outcomes.',
  },
} as const

export type SpineStage = keyof typeof spine

/**
 * TRL-stage -> spine-stage mapping.
 * Used by TopicPage and ImpactCounter to auto-derive an accent color
 * from a CMS entry's `trlStage` field, so editors never pick colors by hand.
 */
export const trlToSpine: Record<string, SpineStage> = {
  research: 'research',
  prototype: 'mandate',
  validation: 'architecture',
  deployment: 'delivery',
}

/**
 * Neutral scale — supports both light-default and the narrow,
 * case-by-case dark exception (PDR Section 10: "Light by Default,
 * Dark by Exception"). Dark tokens exist here but are NEVER applied
 * to a full page shell — only to a scoped data-viz/satellite-imagery
 * panel, per the four-part exception clause.
 */
export const neutral = {
  bg: '#FAF7F0',        // warm off-white, matches PDR report background
  surface: '#FFFFFF',
  border: '#E4E0D6',
  textPrimary: '#10182B',   // reuses Research indigo for text — one less color to invent
  textSecondary: '#5A5F6E',
  darkPanelBg: '#0B0F1A',   // ONLY for the scoped dark exception, never page shell
  darkPanelText: '#F4F6F8',
} as const

/**
 * Semantic accent map — Dronagiri inherits this same spine logic but
 * gets its own accent identity so the two sites feel related, not
 * identical. Derived the same way, not copy-pasted.
 */
export const dronagiriSpine = {
  research: { name: 'Dronagiri Indigo', hex: '#141B33' },
  mandate: { name: 'Dronagiri Sky', hex: '#2568A0' },
  architecture: { name: 'Dronagiri Teal', hex: '#12988A' },
  delivery: { name: 'Dronagiri Amber', hex: '#E0932F' },
  nationalImpact: { name: 'Dronagiri Terracotta', hex: '#C85530' },
} as const
