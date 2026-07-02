// packages/ui/src/Hero/CinematicBackground.tsx

// MOBILE-FIRST: see /MOBILE_FIRST.md — the visual is pure SVG (cheap to
// paint on any device), and respects prefers-reduced-motion by freezing
// all rotation/twinkle animation entirely rather than just slowing it.
// Parallax effects are strictly gated to pointer (mouse) devices.
'use client'

import { motion, useReducedMotion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useEffect } from 'react'

// Enhanced Stars: Deterministic, but now assigned a specific "depth" layer (1=Far, 2=Mid, 3=Near)
// to drive both their visual weight (size/opacity) and their parallax travel distance.
const STARS = [
  [80, 60], [220, 140], [340, 40], [420, 200], [540, 90], [610, 250],
  [720, 60], [780, 180], [900, 120], [980, 260], [1080, 70], [1150, 200],
  [1250, 100], [1320, 240], [140, 260], [260, 320], [460, 330], [640, 340],
  [850, 320], [1040, 340], [1200, 320], [60, 200], [380, 300], [960, 60],
].map(([x, y], i) => {
  const depthLayer = (i % 3) + 1 
  return { 
    x, 
    y, 
    depth: depthLayer,
    r: depthLayer === 3 ? 1.5 : 1, // Near stars are slightly larger
    baseOpacity: depthLayer === 3 ? 0.6 : (depthLayer === 2 ? 0.3 : 0.15) // Near stars are brighter
  }
})

// Enhanced Orbits: Now with depth properties to create authentic camera focus.
// The furthest ring is whisper-thin; the nearest ring is thicker and brighter.
const ORBITS = [
  { rx: 260, ry: 90, duration: 40, dotOffset: 0, depth: 1, strokeWidth: 0.5, opacity: 0.08, satR: 2.5, haloR: 6 },
  { rx: 380, ry: 140, duration: 60, dotOffset: 120, depth: 2, strokeWidth: 1, opacity: 0.15, satR: 3.5, haloR: 9 },
  { rx: 500, ry: 200, duration: 85, dotOffset: 240, depth: 3, strokeWidth: 1.5, opacity: 0.25, satR: 4.5, haloR: 12 },
]

export function CinematicBackground() {
  const shouldReduceMotion = useReducedMotion()
  const cx = 800
  const cy = 300

  // 1. Mouse Tracking for Parallax (Hardware accelerated, strictly decoupled from React state)
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Smooth the raw mouse input into a fluid spring
  const smoothX = useSpring(mouseX, { stiffness: 40, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 40, damping: 20 })

  useEffect(() => {
    // Escape hatch: No parallax on mobile touch screens or for reduced-motion users
    if (shouldReduceMotion || !window.matchMedia('(pointer: fine)').matches) return

    const handlePointerMove = (e: MouseEvent) => {
      // Normalize pointer coordinates to a -1 to 1 range from center screen
      const xPct = (e.clientX / window.innerWidth) * 2 - 1
      const yPct = (e.clientY / window.innerHeight) * 2 - 1
      mouseX.set(xPct)
      mouseY.set(yPct)
    }

    window.addEventListener('mousemove', handlePointerMove)
    return () => window.removeEventListener('mousemove', handlePointerMove)
  }, [mouseX, mouseY, shouldReduceMotion])

  // 2. Depth Multipliers: Calculate how far each layer should move based on mouse position
  const parallaxX1 = useTransform(smoothX, [-1, 1], [-5, 5])
  const parallaxY1 = useTransform(smoothY, [-1, 1], [-5, 5])
  
  const parallaxX2 = useTransform(smoothX, [-1, 1], [-15, 15])
  const parallaxY2 = useTransform(smoothY, [-1, 1], [-15, 15])
  
  const parallaxX3 = useTransform(smoothX, [-1, 1], [-30, 30])
  const parallaxY3 = useTransform(smoothY, [-1, 1], [-30, 30])

  const getParallaxX = (depth: number) => depth === 3 ? parallaxX3 : depth === 2 ? parallaxX2 : parallaxX1
  const getParallaxY = (depth: number) => depth === 3 ? parallaxY3 : depth === 2 ? parallaxY2 : parallaxY1

  // The premium SOTA arrival curve we defined earlier
  const arrivalEase = [0.16, 1, 0.3, 1]

  return (
    <svg
      viewBox="0 0 1600 600"
      className="absolute inset-0 h-full w-full"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden
    >
      {/* Stars — Fade in on load, gentle twinkle, reactive parallax */}
      {STARS.map((star, i) => (
        <motion.circle
          key={`star-${i}`}
          cx={star.x}
          cy={star.y}
          r={star.r}
          fill="white"
          style={{ x: getParallaxX(star.depth), y: getParallaxY(star.depth) }}
          initial={{ opacity: 0 }}
          animate={{ opacity: shouldReduceMotion ? star.baseOpacity : [star.baseOpacity * 0.5, star.baseOpacity * 1.5, star.baseOpacity * 0.5] }}
          transition={{
            opacity: shouldReduceMotion 
              ? { duration: 1.5 } 
              : { duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.05 }
          }}
        />
      ))}

      {/* Orbit rings — Draw themselves in on load, reactive parallax */}
      {ORBITS.map((orbit, i) => (
        <motion.ellipse
          key={`orbit-${i}`}
          cx={cx}
          cy={cy}
          rx={orbit.rx}
          ry={orbit.ry}
          fill="none"
          stroke="white"
          strokeOpacity={orbit.opacity}
          strokeWidth={orbit.strokeWidth}
          style={{ x: getParallaxX(orbit.depth), y: getParallaxY(orbit.depth) }}
          initial={shouldReduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: arrivalEase, delay: i * 0.2 }}
        />
      ))}

      {/* Orbiting "satellites" — Scale/fade in, rotate, reactive parallax */}
      {ORBITS.map((orbit, i) => (
        <motion.g
          key={`sat-${i}`}
          style={{ 
            originX: `${cx}px`, 
            originY: `${cy}px`,
            x: getParallaxX(orbit.depth),
            y: getParallaxY(orbit.depth)
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            rotate: shouldReduceMotion ? orbit.dotOffset : [orbit.dotOffset, orbit.dotOffset + 360] 
          }}
          transition={{
            opacity: { duration: 1, delay: 0.5 + (i * 0.2) },
            scale: { duration: 1, ease: arrivalEase, delay: 0.5 + (i * 0.2) },
            rotate: shouldReduceMotion ? undefined : { duration: orbit.duration, repeat: Infinity, ease: 'linear' }
          }}
        >
          <circle cx={cx + orbit.rx} cy={cy} r={orbit.satR} fill="white" fillOpacity={0.9} />
          <circle cx={cx + orbit.rx} cy={cy} r={orbit.haloR} fill="white" fillOpacity={0.15} />
        </motion.g>
      ))}
    </svg>
  )
}