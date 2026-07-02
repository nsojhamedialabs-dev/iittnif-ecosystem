'use client'

import { ReactLenis } from 'lenis/react'
import { useReducedMotion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const shouldReduceMotion = useReducedMotion()
  const [isMounted, setIsMounted] = useState(false)

  // Prevent hydration mismatch by only enabling after mount
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // If user prefers reduced motion or hasn't mounted, render standard scroll
  if (!isMounted || shouldReduceMotion) {
    return <>{children}</>
  }

  return (
    // SOTA Lerp (Linear Interpolation) value for that heavy, premium glide
    <ReactLenis root options={{ lerp: 0.08, duration: 1.2, smoothWheel: true }}>
      {children}
    </ReactLenis>
  )
}