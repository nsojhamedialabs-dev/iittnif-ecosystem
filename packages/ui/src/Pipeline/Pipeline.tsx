// MOBILE-FIRST: see /MOBILE_FIRST.md — renders as a VERTICAL timeline
// at 360px (a horizontal 6-node diagram is illegible or scroll-locked
// on a narrow screen). The horizontal flow layout only activates at
// md: and up — it is an enhancement, not the base experience.
'use client'

import type { SpineStage } from '@iittnif/design-system'
import { spine } from '@iittnif/design-system'
import { motion, useReducedMotion, type Variants } from 'framer-motion'

export interface PipelineStage {
  label: string
  stage: SpineStage
  description?: string
}

export interface PipelineProps {
  stages?: PipelineStage[]
  heading?: string
}

/**
 * The PDR's signature diagram (Section 03): Research -> Technology
 * Development -> Prototype -> Validation -> Deployment -> National
 * Impact, run as an actual colour-temperature gradient rather than a
 * decorative flowchart. Reused on every major page, re-scoped per page
 * (PDR Section 08).
 */
const DEFAULT_STAGES: PipelineStage[] = [
  { label: 'Research', stage: 'research' },
  { label: 'Technology Development', stage: 'mandate' },
  { label: 'Prototype', stage: 'architecture' },
  { label: 'Validation', stage: 'architecture' },
  { label: 'Deployment', stage: 'delivery' },
  { label: 'National Impact', stage: 'nationalImpact' },
]

const dotBg: Record<SpineStage, string> = {
  research: 'bg-spine-research',
  mandate: 'bg-spine-mandate',
  architecture: 'bg-spine-architecture',
  delivery: 'bg-spine-delivery',
  nationalImpact: 'bg-spine-impact',
}

const hexFor: Record<SpineStage, string> = {
  research: spine.research.hex,
  mandate: spine.mandate.hex,
  architecture: spine.architecture.hex,
  delivery: spine.delivery.hex,
  nationalImpact: spine.nationalImpact.hex,
}

/**
 * Builds a CSS linear-gradient with a hard colour stop pinned to each
 * node's exact position — the line under "Technology Development" is
 * now genuinely Signal Blue at that pixel, not an interpolated blend
 * on its way to teal. Matches PDR Section 03: colour does information
 * work, it doesn't just decorate.
 */
function buildGradient(stages: PipelineStage[], direction: 'to right' | 'to bottom') {
  const n = stages.length - 1
  const stops = stages
    .map((s, i) => `${hexFor[s.stage]} ${n === 0 ? 0 : (i / n) * 100}%`)
    .join(', ')
  return `linear-gradient(${direction}, ${stops})`
}

export function Pipeline({ stages = DEFAULT_STAGES, heading }: PipelineProps) {
  const shouldReduceMotion = useReducedMotion()

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: shouldReduceMotion ? 0 : 0.12 } },
  }
  const node: Variants = {
    hidden: shouldReduceMotion ? {} : { opacity: 0, x: -12 },
    show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  }
  // The connecting line grows to reveal itself, tracing the gradient
  // as the visitor scrolls — this is the "pipeline" actually feeling
  // like a pipeline, not just a row of static dots.
  const line: Variants = {
    hidden: { scaleX: shouldReduceMotion ? 1 : 0 },
    show: { scaleX: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
  }
  const lineVertical: Variants = {
    hidden: { scaleY: shouldReduceMotion ? 1 : 0 },
    show: { scaleY: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
  }

  return (
    <section className="py-12 sm:py-16">
      {heading && (
        <h2 className="mb-8 text-h2 font-semibold text-neutral-text">{heading}</h2>
      )}

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* MOBILE (base): vertical timeline, connecting line runs top-to-bottom */}
        <div className="relative flex flex-col gap-8 md:hidden">
          <motion.div
            variants={lineVertical}
            style={{ transformOrigin: 'top', backgroundImage: buildGradient(stages, 'to bottom') }}
            className="absolute left-[7px] top-2 h-[calc(100%-1rem)] w-0.5"
            aria-hidden
          />
          {stages.map((s) => (
            <motion.div key={s.label} variants={node} className="relative flex gap-4 pl-0">
              <span
                className={`z-10 mt-1 h-4 w-4 flex-shrink-0 rounded-full ring-4 ring-neutral-bg ${dotBg[s.stage]}`}
                aria-hidden
              />
              <div>
                <p className="font-mono text-small font-medium text-neutral-text">{s.label}</p>
                {s.description && (
                  <p className="mt-1 text-small text-neutral-text-secondary">{s.description}</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* DESKTOP (md: and up): horizontal flow — enhancement, not base */}
        <div className="relative hidden md:flex md:items-start md:justify-between">
          <motion.div
            variants={line}
            style={{ transformOrigin: 'left', backgroundImage: buildGradient(stages, 'to right') }}
            className="absolute left-0 top-2 h-0.5 w-full"
            aria-hidden
          />
          {stages.map((s) => (
            <motion.div
              key={s.label}
              variants={node}
              className="relative z-10 flex max-w-[10rem] flex-col items-center text-center"
            >
              <span
                className={`h-4 w-4 flex-shrink-0 rounded-full ring-4 ring-neutral-bg ${dotBg[s.stage]}`}
                aria-hidden
              />
              <p className="mt-3 font-mono text-small font-medium text-neutral-text">
                {s.label}
              </p>
              {s.description && (
                <p className="mt-1 text-small text-neutral-text-secondary">{s.description}</p>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
