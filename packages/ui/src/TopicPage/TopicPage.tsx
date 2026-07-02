// MOBILE-FIRST: see /MOBILE_FIRST.md — this component/page is designed
// and coded for 360px first. Unprefixed Tailwind classes = mobile
// layout; sm:/md:/lg:/xl: add desktop enhancements, they never carry
// the primary layout logic.

import type { SpineStage } from '@iittnif/design-system'
import { trlToSpine } from '@iittnif/design-system'
import { Hero } from '../Hero'

export interface TopicPageProps {
  title: string
  summary?: string
  body?: string // rendered rich text HTML from Payload; swap for RichText renderer later
  heroImage?: string
  trlStage?: keyof typeof trlToSpine
  relatedLinks?: { label: string; href: string }[]
  breadcrumb?: { label: string; href: string }
}

/**
 * TopicPage — renders EVERY item from Core Areas, Applied Areas,
 * Technology Development, HR pathways, and Meta Data Resources.
 * One template, driven entirely by CMS data. See
 * packages/ui/src/TopicPage/README.md for the full rationale.
 */
export function TopicPage({
  title,
  summary,
  body,
  trlStage,
  relatedLinks,
  breadcrumb,
}: TopicPageProps) {
  const stage: SpineStage = trlStage ? trlToSpine[trlStage] : 'research'

  return (
    <article>
      {breadcrumb && (
        <a href={breadcrumb.href} className="text-small text-neutral-text-secondary underline">
          ← {breadcrumb.label}
        </a>
      )}
      <Hero title={title} subtitle={summary} stage={stage} />
      {body && (
        <div
          className="prose max-w-3xl text-body text-neutral-text"
          dangerouslySetInnerHTML={{ __html: body }}
        />
      )}
      {relatedLinks && relatedLinks.length > 0 && (
        <nav className="mt-12 border-t border-neutral-border pt-6">
          <p className="mb-3 font-mono text-caption uppercase text-neutral-text-secondary">
            Related
          </p>
          <ul className="space-y-2">
            {relatedLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="text-body underline">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </article>
  )
}
