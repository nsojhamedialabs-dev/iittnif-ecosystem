// MOBILE-FIRST: see /MOBILE_FIRST.md — single-column stacked stories at
// 360px; horizontal photo+text pairing only from md: up.

export interface StoryItem {
  name: string
  role: string
  outcome: string
  quote?: string
  imageSrc?: string
}

export interface StoriesProps {
  items: StoryItem[]
  heading?: string
}

/**
 * Stories — PDR Section 08. Real journeys, not stats. Used on:
 * Startups, HRD, Ecosystem/Flagship pages, Newsroom preview.
 */
export function Stories({ items, heading }: StoriesProps) {
  return (
    <section className="py-12 sm:py-16">
      {heading && <h2 className="mb-8 text-h2 font-semibold text-neutral-text">{heading}</h2>}
      <div className="space-y-8">
        {items.map((story) => (
          <div
            key={story.name}
            className="flex flex-col gap-4 rounded-lg border border-neutral-border bg-neutral-surface p-6 md:flex-row md:items-center md:gap-8"
          >
            <div className="h-16 w-16 flex-shrink-0 rounded-full bg-spine-mandate/10 md:h-20 md:w-20" aria-hidden />
            <div>
              {story.quote && (
                <p className="text-body italic text-neutral-text">&ldquo;{story.quote}&rdquo;</p>
              )}
              <p className="mt-3 font-medium text-neutral-text">
                {story.name} <span className="font-normal text-neutral-text-secondary">— {story.role}</span>
              </p>
              <p className="mt-1 text-small text-neutral-text-secondary">{story.outcome}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
