// packages/config/tailwind-preset/index.js

// MOBILE-FIRST: see /MOBILE_FIRST.md — this preset uses Tailwind's default
// min-width breakpoints (mobile-first). Never add max-width overrides
// here without discussing it first — it would flip the whole convention.

// Shared Tailwind preset — consumed by both apps' tailwind.config.ts
// via `presets: [require('@iittnif/config/tailwind-preset')]`
//
// This is what makes the chromatic spine enforceable in code: nobody
// picks a hex value in a component, they use `bg-spine-mandate` etc.

const { spine, neutral } = require('../../design-system/tokens/colors')
const { fontFamily, fontSize } = require('../../design-system/tokens/typography')
const { breakpoints, radius, maxWidth } = require('../../design-system/tokens/spacing')

/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      // --- SOTA EASING & MOTION TOKENS ---
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'in-out-quart': 'cubic-bezier(0.76, 0, 0.24, 1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'base': '350ms',
        'slow': '500ms',
      },
      // --- PREMIUM TYPOGRAPHY TRACKING ---
      letterSpacing: {
        tight: '-0.02em',
        tighter: '-0.03em',
        wide: '0.08em',
        widest: '0.12em',
      },
      colors: {
        spine: {
          research: spine.research.hex,
          mandate: spine.mandate.hex,
          architecture: spine.architecture.hex,
          delivery: spine.delivery.hex,
          impact: spine.nationalImpact.hex,
        },
        neutral: {
          bg: neutral.bg,
          surface: neutral.surface,
          border: neutral.border,
          text: neutral.textPrimary,
          'text-secondary': neutral.textSecondary,
          'dark-panel': neutral.darkPanelBg,
          'dark-panel-text': neutral.darkPanelText,
        },
      },
      fontFamily: {
        display: fontFamily.display.split(',').map((f) => f.trim().replace(/'/g, '')),
        body: fontFamily.body.split(',').map((f) => f.trim().replace(/'/g, '')),
        mono: fontFamily.mono.split(',').map((f) => f.trim().replace(/'/g, '')),
      },
      fontSize: {
        hero: fontSize.hero,
        h1: fontSize.h1,
        h2: fontSize.h2,
        h3: fontSize.h3,
      },
      screens: breakpoints,
      borderRadius: radius,
      maxWidth: {
        content: maxWidth.content,
        wide: maxWidth.wide,
      },
    },
  },
}