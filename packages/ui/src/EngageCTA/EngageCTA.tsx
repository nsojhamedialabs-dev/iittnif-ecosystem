// MOBILE-FIRST: see /MOBILE_FIRST.md — single column stakeholder cards
// at 360px, full-width tap targets; grid widens at sm:/lg:.

export interface StakeholderCta {
  label: string
  description: string
  href: string
}

export interface EngageCTAProps {
  items: StakeholderCta[]
  heading?: string
}

/**
 * Engage/CTA — PDR Section 08. "Choose your pathway" — routes every
 * stakeholder type (Startup, Industry, Government, Faculty, Student,
 * Mentor, International Partner) into VIKAS. Used on: Home, Ecosystem,
 * Contact.
 */
export function EngageCTA({ items, heading = 'Choose Your Pathway' }: EngageCTAProps) {
  return (
    <section className="py-12 sm:py-16">
      <h2 className="mb-8 text-h2 font-semibold text-neutral-text">{heading}</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="block rounded-lg border border-neutral-border bg-neutral-surface p-6 transition-colors hover:border-spine-mandate"
          >
            <h3 className="text-h3 font-semibold text-neutral-text">{item.label}</h3>
            <p className="mt-2 text-small text-neutral-text-secondary">{item.description}</p>
            <span className="mt-4 inline-block text-small font-medium underline">Get started →</span>
          </a>
        ))}
      </div>
    </section>
  )
}
