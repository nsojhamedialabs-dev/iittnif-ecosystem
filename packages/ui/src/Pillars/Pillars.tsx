// MOBILE-FIRST: see /MOBILE_FIRST.md — all cards are single-column and
// fully visible (no hidden-behind-hover content) at 360px. The grid
// only becomes multi-column at sm:/lg:, and "hover reveal" is added as
// a pointer-device bonus via CSS, never a mobile requirement — there is
// no hover on a touchscreen, so touch users must never be gated behind it.
'use client'

import type { SpineStage } from '@iittnif/design-system'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

const spineBorder: Record<SpineStage, string> = {
  research: 'hover:border-spine-research',
  mandate: 'hover:border-spine-mandate',
  architecture: 'hover:border-spine-architecture',
  delivery: 'hover:border-spine-delivery',
  nationalImpact: 'hover:border-spine-impact',
}

export interface PillarItem {
  title: string
  description: string
  href?: string
  stage?: SpineStage
}

export interface PillarsProps {
  items: PillarItem[]
  heading?: string
}

/**
 * Pillars — PDR Section 08 component system.
 * Used on: Home (3 major labs) · HRD (6 learner pathways) ·
 * Flagship Initiatives (4 platform cards).
 */
export function Pillars({ items, heading }: PillarsProps) {
  const shouldReduceMotion = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.1 } },
  }
  const card: Variants = {
    hidden: shouldReduceMotion ? {} : { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  }

  return (
    <section className="py-12 sm:py-16">
      {heading && (
        <h2 className="mb-8 text-h2 font-semibold text-neutral-text">{heading}</h2>
      )}
      <motion.div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {items.map((item) => {
          const CardTag = item.href ? motion.a : motion.div
          return (
            <CardTag
              key={item.title}
              variants={card}
              {...(item.href ? { href: item.href } : {})}
              className={`group block rounded-lg border border-neutral-border bg-neutral-surface p-6 transition-colors ${
                spineBorder[item.stage ?? 'research']
              }`}
            >
              <h3 className="text-h3 font-semibold text-neutral-text">{item.title}</h3>
              <p className="mt-3 text-body text-neutral-text-secondary">
                {item.description}
              </p>
              {item.href && (
                <span className="mt-4 inline-block text-small font-medium text-neutral-text underline decoration-neutral-border underline-offset-4 group-hover:decoration-current">
                  Learn more →
                </span>
              )}
            </CardTag>
          )
        })}
      </motion.div>
    </section>
  )
}
