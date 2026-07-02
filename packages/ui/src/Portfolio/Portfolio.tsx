// MOBILE-FIRST: see /MOBILE_FIRST.md — single column at 360px, filter
// pills wrap and stay tap-sized; grid only widens at sm:/lg:.
'use client'

import { useState } from 'react'
import type { SpineStage } from '@iittnif/design-system'

const spineBg: Record<SpineStage, string> = {
  research: 'bg-spine-research',
  mandate: 'bg-spine-mandate',
  architecture: 'bg-spine-architecture',
  delivery: 'bg-spine-delivery',
  nationalImpact: 'bg-spine-impact',
}

export interface PortfolioItem {
  title: string
  description: string
  href?: string
  category?: string
  stage?: SpineStage
}

export interface PortfolioProps {
  items: PortfolioItem[]
  heading?: string
  /** If provided, renders filter pills above the grid. Omit for a simple unfiltered grid (e.g. Home's 4 flagship platforms). */
  filterable?: boolean
}

/**
 * Portfolio — PDR Section 08. Used on: Home (4 flagship platforms,
 * filterable={false}) · Technology & Labs (TDP portfolio, filterable)
 * · Startups (startup portfolio, filterable).
 */
export function Portfolio({ items, heading, filterable = false }: PortfolioProps) {
  const categories = Array.from(new Set(items.map((i) => i.category).filter(Boolean))) as string[]
  const [active, setActive] = useState<string | null>(null)
  const visible = active ? items.filter((i) => i.category === active) : items

  return (
    <section className="py-12 sm:py-16">
      {heading && <h2 className="mb-6 text-h2 font-semibold text-neutral-text">{heading}</h2>}

      {filterable && categories.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setActive(null)}
            className={`rounded-full px-4 py-2 text-small font-medium ${
              active === null ? 'bg-neutral-text text-white' : 'bg-neutral-surface border border-neutral-border text-neutral-text'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-4 py-2 text-small font-medium ${
                active === cat ? 'bg-neutral-text text-white' : 'bg-neutral-surface border border-neutral-border text-neutral-text'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {visible.map((item) => {
          const Tag = item.href ? 'a' : 'div'
          return (
            <Tag
              key={item.title}
              {...(item.href ? { href: item.href } : {})}
              className="block rounded-lg border border-neutral-border bg-neutral-surface p-5"
            >
              <span className={`mb-3 inline-block h-2 w-8 rounded-full ${spineBg[item.stage ?? 'research']}`} />
              <h3 className="text-h3 font-semibold text-neutral-text">{item.title}</h3>
              <p className="mt-2 text-small text-neutral-text-secondary">{item.description}</p>
            </Tag>
          )
        })}
      </div>
    </section>
  )
}
