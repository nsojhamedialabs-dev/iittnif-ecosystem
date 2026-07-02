'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export function CustomCursor() {
  const [isCapable, setIsCapable] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  
  // Tightened the physics: less mass and more stiffness = faster, tighter tracking
  const springConfig = { damping: 25, stiffness: 600, mass: 0.3 }
  const cursorX = useSpring(mouseX, springConfig)
  const cursorY = useSpring(mouseY, springConfig)

  useEffect(() => {
    // Strict mobile-first gate: only render on fine pointers
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsCapable(true)
    }
    
    const moveCursor = (e: MouseEvent) => {
      // Offset by 10px to perfectly center the new 20px (h-5 w-5) ring
      mouseX.set(e.clientX - 10) 
      mouseY.set(e.clientY - 10)
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName.toLowerCase() === 'a' || target.tagName.toLowerCase() === 'button' || target.closest('a') || target.closest('button')) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }
    
    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)
    
    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [mouseX, mouseY])

  if (!isCapable) return null

  return (
    <motion.div
      // Smaller size (h-5 w-5), removed mix-blend mode, using a clean neutral border
      className="pointer-events-none fixed left-0 top-0 z-[9999] h-5 w-5 rounded-full border-[1.5px]"
      style={{ x: cursorX, y: cursorY }}
      animate={{
        scale: isHovering ? 1.2 : 1, // Subtler scale on hover
        backgroundColor: isHovering ? 'rgba(16, 24, 43, 0.05)' : 'rgba(0,0,0,0)',
        borderColor: isHovering ? 'rgba(16, 24, 43, 0.8)' : 'rgba(16, 24, 43, 0.3)', // Deep indigo neutral
      }}
      transition={{ duration: 0.15, ease: 'easeOut' }}
    />
  )
}