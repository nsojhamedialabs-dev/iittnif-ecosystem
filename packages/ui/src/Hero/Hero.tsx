// packages/ui/src/Hero/Hero.tsx

// MOBILE-FIRST: see /MOBILE_FIRST.md — this component/page is designed
// and coded for 360px first. Unprefixed Tailwind classes = mobile
// layout; sm:/md:/lg:/xl: add desktop enhancements, they never carry
// the primary layout logic.
'use client'

import type { SpineStage } from '@iittnif/design-system'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { CinematicBackground } from './CinematicBackground'

const spineBg: Record<SpineStage, string> = {
  research: 'bg-spine-research',
  mandate: 'bg-spine-mandate',
  architecture: 'bg-spine-architecture',
  delivery: 'bg-spine-delivery',
  nationalImpact: 'bg-spine-impact',
}

const spineShadow: Record<SpineStage, string> = {
  research: 'shadow-spine-research/20',
  mandate: 'shadow-spine-mandate/20',
  architecture: 'shadow-spine-architecture/20',
  delivery: 'shadow-spine-delivery/20',
  nationalImpact: 'shadow-spine-impact/20',
}

// Zero-dependency SVG noise for filmic/satellite texture
const NOISE_SVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E")`

export interface HeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  primaryCta?: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  stage?: SpineStage
  variant?: 'light' | 'cinematic'
  children?: React.ReactNode 
}

export function Hero({
  eyebrow,
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  stage = 'research',
  variant = 'light',
  children,
}: HeroProps) {
  const shouldReduceMotion = useReducedMotion()
  const isCinematic = variant === 'cinematic'

  // SOTA Arrival Choreography: slightly slower duration, premium out-expo curve
  const container: Variants = {
    hidden: {},
    show: {
      transition: { staggerChildren: shouldReduceMotion ? 0 : 0.15 },
    },
  }
  
  const item: Variants = {
    hidden: shouldReduceMotion ? {} : { opacity: 0, y: 24, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      },
    },
  }

  return (
    <motion.section
      className={`relative overflow-hidden py-16 md:py-24 ${
        isCinematic ? 'bg-spine-research left-1/2 right-1/2 -mx-[50vw] w-screen px-4 sm:px-8' : ''
      }`}
      variants={container}
      initial="hidden"
      animate="show"
    >
      {isCinematic && (
        <>
          {/* 1. Video Layer: Gated by reduced motion, faded in slowly */}
          {!shouldReduceMotion && (
            <motion.video
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.35 }} // Dimmed so the text and SVG stay crisp
              transition={{ duration: 2, ease: 'easeOut' }}
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 z-0 h-full w-full object-cover"
              src="/videos/hero-sota.mp4"
            />
          )}

          {/* 2. Filmic Grain Overlay: Sits over the video to blend it */}
          <div 
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.04] mix-blend-overlay"
            style={{ backgroundImage: NOISE_SVG }}
            aria-hidden
          />
          
          {/* 3. The Interactive SVG Parallax Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none">
            <CinematicBackground />
          </div>
        </>
      )}

      {/* 4. The Content Layer */}
      <div className={`relative z-30 ${isCinematic ? 'mx-auto max-w-wide' : ''}`}>
        <div className={`mb-3 h-1 w-24 ${spineBg[stage]}`} aria-hidden />
        {eyebrow && (
          <motion.p
            variants={item}
            className={`mb-3 font-mono text-small uppercase tracking-wide ${
              isCinematic ? 'text-white/70' : 'text-neutral-text-secondary'
            }`}
          >
            {eyebrow}
          </motion.p>
        )}
        <motion.h1
          variants={item}
          className={`max-w-4xl text-hero font-semibold leading-tight tracking-tight ${
            isCinematic ? 'text-white' : 'text-neutral-text'
          }`}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            variants={item}
            className={`mt-6 max-w-2xl text-bodyLg ${isCinematic ? 'text-white/80' : 'text-neutral-text-secondary'}`}
          >
            {subtitle}
          </motion.p>
        )}

        <motion.div variants={item} className="mt-8 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
          {primaryCta && (
            <a
              href={primaryCta.href}
              className={`w-full rounded-md px-6 py-3 text-center font-medium transition-all duration-base ease-out-expo hover:-translate-y-0.5 sm:w-auto ${
                isCinematic 
                  ? 'bg-white text-spine-research hover:shadow-[0_8px_30px_rgb(255,255,255,0.12)]' 
                  : `text-white ${spineBg[stage]} hover:shadow-xl hover:${spineShadow[stage]}`
              }`}
            >
              {primaryCta.label}
            </a>
          )}
          {secondaryCta && (
            <a
              href={secondaryCta.href}
              className={`w-full rounded-md border px-6 py-3 text-center font-medium transition-all duration-base ease-out-expo hover:-translate-y-0.5 sm:w-auto ${
                isCinematic 
                  ? 'border-white/40 text-white hover:border-white/60 hover:bg-white/5' 
                  : 'border-neutral-border text-neutral-text hover:bg-neutral-bg hover:shadow-sm'
              }`}
            >
              {secondaryCta.label}
            </a>
          )}
        </motion.div>
        {children && (
          <motion.div variants={item} className="mt-12">
            {children}
          </motion.div>
        )}
      </div>
    </motion.section>
  )
}