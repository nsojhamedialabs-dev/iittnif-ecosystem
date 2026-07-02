// MOBILE-FIRST: see /MOBILE_FIRST.md — base experience is a full-width
// slide-down drawer with an accordion, opened by a tap-friendly hamburger
// button. The horizontal bar + hover/click dropdown panel only exists
// at md: and up. Nothing in the mobile drawer is hidden behind hover —
// every link is reachable by tap, expanded via accordion disclosure.
'use client'

import { useEffect, useRef, useState } from 'react'
import type { NavTree, TopicPageData, Tenant } from '@iittnif/cms-client'

interface BespokeLink {
  label: string
  href: string
}

interface DynamicGroup {
  heading: string
  section: string
  category: string
}

interface NavItem {
  label: string
  href: string
  bespokeChildren?: BespokeLink[]
  dynamicGroups?: DynamicGroup[]
}

/**
 * Static nav skeleton — the ~10 bespoke pages plus WHICH CMS
 * section/category to pull dynamic items from. This is the only part
 * of the mega-menu that's hand-authored; adding a topic item into any
 * dynamicGroups category below happens through the CMS, not here.
 */
const NAV_CONFIG: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'About TIH',
    href: '/about-tih',
    bespokeChildren: [
      { label: 'About Us', href: '/about-tih/about-us' },
      { label: 'Vision & Mission', href: '/about-tih/vision-mission' },
    ],
  },
  {
    label: 'Technology & Labs',
    href: '/technology-labs',
    dynamicGroups: [
      { heading: 'Core Areas', section: 'technology-labs', category: 'core-areas' },
      { heading: 'Applied Areas', section: 'technology-labs', category: 'applied-areas' },
      { heading: 'Technology Development', section: 'technology-labs', category: 'development' },
      { heading: 'Meta Data Resources', section: 'technology-labs', category: 'resources' },
    ],
    bespokeChildren: [{ label: 'Collaborations', href: '/technology-labs/collaborations' }],
  },
  { label: 'Flagship Initiatives', href: '/flagship-initiatives' },
  {
    label: 'Startups & Enablement',
    href: '/startups-enablement',
    bespokeChildren: [
      { label: 'Innovations', href: '/startups-enablement/innovations' },
      { label: 'Grand Challenges', href: '/startups-enablement/grand-challenges' },
    ],
  },
  {
    label: 'HRD',
    href: '/hrd',
    dynamicGroups: [{ heading: 'Pathways', section: 'hrd', category: 'pathways' }],
  },
  { label: 'Newsroom', href: '/newsroom' },
  { label: 'Contact', href: '/contact' },
]

function topicHref(item: TopicPageData) {
  return `/${item.section}/${item.category}/${item.slug}`
}

export interface MegaMenuProps {
  navTree: NavTree
  tenant: Tenant
  siteName?: string
}

export function MegaMenu({ navTree, siteName = 'IITTNiF' }: MegaMenuProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navRef = useRef<HTMLElement>(null)

  // Close the desktop dropdown on outside click — keyboard/mouse users
  // shouldn't need to click a second nav item just to dismiss the first.
  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenIndex(null)
      }
    }
    document.addEventListener('mousedown', onClickOutside)
    return () => document.removeEventListener('mousedown', onClickOutside)
  }, [])

  const hasDropdown = (item: NavItem) => {
    return Boolean(item.dynamicGroups?.length || item.bespokeChildren?.length)
  }

  return (
    <nav ref={navRef} className="relative border-b border-neutral-border bg-neutral-surface">
      <div className="mx-auto flex max-w-wide items-center justify-between px-4 py-4">
        <a href="/" className="font-display text-h3 font-semibold text-neutral-text">
          {siteName}
        </a>

        {/* Mobile: hamburger — 44px+ tap target */}
        <button
          type="button"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="flex h-11 w-11 items-center justify-center rounded-md md:hidden"
        >
          <span className="sr-only">Menu</span>
          {mobileOpen ? (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>

        {/* Desktop: horizontal bar, md: and up */}
        <ul className="hidden md:flex md:items-center md:gap-1">
          {NAV_CONFIG.map((item, i) => (
            <li key={item.label} className="relative">
              <button
                type="button"
                onClick={() => hasDropdown(item) && setOpenIndex(openIndex === i ? null : i)}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-small font-medium text-neutral-text hover:bg-neutral-bg"
              >
                {hasDropdown(item) ? item.label : <a href={item.href}>{item.label}</a>}
                {hasDropdown(item) && (
                  <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden>
                    <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                  </svg>
                )}
              </button>

              {hasDropdown(item) && openIndex === i && (
                <div className="absolute left-0 top-full z-20 mt-1 flex min-w-[32rem] gap-8 rounded-lg border border-neutral-border bg-neutral-surface p-6 shadow-lg">
                  {item.dynamicGroups?.map((group) => {
                    const groupItems = navTree[group.section]?.[group.category] ?? []
                    return (
                      <div key={group.heading}>
                        <p className="mb-2 font-mono text-caption uppercase text-neutral-text-secondary">
                          {group.heading}
                        </p>
                        <ul className="space-y-1">
                          {groupItems.map((topic) => (
                            <li key={topic.slug}>
                              <a
                                href={topicHref(topic)}
                                className="block text-small text-neutral-text hover:underline"
                              >
                                {topic.title}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )
                  })}
                  {item.bespokeChildren && item.bespokeChildren.length > 0 && (
                    <div>
                      {item.dynamicGroups && (
                        <p className="mb-2 font-mono text-caption uppercase text-neutral-text-secondary">
                          More
                        </p>
                      )}
                      <ul className="space-y-1">
                        {item.bespokeChildren.map((child) => (
                          <li key={child.href}>
                            <a
                              href={child.href}
                              className="block text-small text-neutral-text hover:underline"
                            >
                              {child.label}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Mobile drawer: accordion, full width, base experience */}
      {mobileOpen && (
        <div className="max-h-[70vh] overflow-y-auto border-t border-neutral-border px-4 py-4 md:hidden">
          <ul className="space-y-1">
            {NAV_CONFIG.map((item, i) => (
              <li key={item.label}>
                {hasDropdown(item) ? (
                  <>
                    <button
                      type="button"
                      onClick={() => setOpenIndex(openIndex === i ? null : i)}
                      aria-expanded={openIndex === i}
                      className="flex w-full items-center justify-between rounded-md py-3 text-left text-body font-medium text-neutral-text"
                    >
                      {item.label}
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 12 12"
                        aria-hidden
                        className={openIndex === i ? 'rotate-180' : ''}
                      >
                        <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" />
                      </svg>
                    </button>
                    {openIndex === i && (
                      <div className="ml-3 space-y-4 border-l border-neutral-border pl-4 pb-3">
                        {item.dynamicGroups?.map((group) => {
                          const groupItems = navTree[group.section]?.[group.category] ?? []
                          return (
                            <div key={group.heading}>
                              <p className="mb-1 font-mono text-caption uppercase text-neutral-text-secondary">
                                {group.heading}
                              </p>
                              <ul className="space-y-1">
                                {groupItems.map((topic) => (
                                  <li key={topic.slug}>
                                    <a
                                      href={topicHref(topic)}
                                      className="block py-1 text-small text-neutral-text"
                                    >
                                      {topic.title}
                                    </a>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        })}
                        {item.bespokeChildren?.map((child) => (
                          <a
                            key={child.href}
                            href={child.href}
                            className="block py-1 text-small text-neutral-text"
                          >
                            {child.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <a href={item.href} className="block py-3 text-body font-medium text-neutral-text">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
