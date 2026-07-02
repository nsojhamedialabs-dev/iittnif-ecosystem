// MOBILE-FIRST: see /MOBILE_FIRST.md — on touch devices there is no
// hover, so the tooltip opens on TAP and closes on a second tap or
// tapping elsewhere. Desktop gets hover as a bonus, exactly like the
// Pillars/MegaMenu pattern — never gated behind hover-only.
'use client'

import { useState } from 'react'

export interface GlossaryTermProps {
  term: string
  definition: string
  children: React.ReactNode
}

/**
 * Wraps a technical term (e.g. "GNSS Reflectometry", "GeoAI") with an
 * inline definition. PDR Executive Summary beyond-brief commitment:
 * "so a visiting ministry official isn't lost three sentences into
 * the Technology page."
 */
export function GlossaryTerm({ term, definition, children }: GlossaryTermProps) {
  const [open, setOpen] = useState(false)

  return (
    <span className="group relative inline-block">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={`Definition of ${term}`}
        className="cursor-help border-b border-dotted border-spine-mandate text-inherit"
      >
        {children}
      </button>
      <span
        role="tooltip"
        className={`absolute bottom-full left-1/2 z-30 mb-2 w-64 -translate-x-1/2 rounded-md border border-neutral-border bg-neutral-text p-3 text-small text-white shadow-lg transition-opacity ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        } group-hover:opacity-100 group-hover:pointer-events-auto`}
      >
        <span className="mb-1 block font-mono text-caption uppercase text-white/60">{term}</span>
        {definition}
      </span>
    </span>
  )
}

/**
 * A small starter dictionary of terms used across Technology & Labs
 * content. Extend as real content gets written — this is deliberately
 * NOT CMS-driven (unlike TopicPages) because glossary terms are few,
 * stable, and used inline in prose rather than browsed as a list.
 */
export const GLOSSARY: Record<string, string> = {
  'GNSS Reflectometry': 'A remote-sensing technique that uses reflected satellite navigation signals to measure soil moisture, sea state, and other surface properties.',
  GeoAI: 'The application of artificial intelligence and machine learning to geospatial data — imagery, maps, and location-based datasets.',
  NavIC: "India's own regional satellite navigation system (formerly IRNSS), providing positioning services over India and the surrounding region.",
  TRL: 'Technology Readiness Level — a scale used to assess the maturity of a technology, from early research (low TRL) to field-proven deployment (high TRL).',
  LiDAR: 'Light Detection and Ranging — a remote-sensing method using laser pulses to measure precise distances and generate 3D maps.',
}
