# TopicPage

ONE component. Rendered by every `[slug]/page.tsx` across the site —
Core Areas, Applied Areas, Technology Development, HR pathways, Meta
Data Resources. Roughly 26 menu items today, 1 template.

## How a route uses it

```
// apps/iittnif-web/src/app/(marketing)/technology-labs/core-areas/[slug]/page.tsx

import { TopicPage } from '@iittnif/ui/TopicPage'
import { getTopicBySlug } from '@iittnif/cms-client'

export default async function Page({ params }: { params: { slug: string } }) {
  const data = await getTopicBySlug('technology-labs', 'core-areas', params.slug)
  return <TopicPage {...data} />
}

// generateStaticParams() pulls every entry in this category from
// Payload at build time — new CMS entries get picked up on next build/ISR
// revalidation, no code change required.
```

## Anatomy

Hero (title + summary + optional heroImage) → Body (rich text) →
TRL-stage accent color (pulled from design-system chromatic spine) →
Related Links → back-to-category breadcrumb.

## Why one template instead of 26 files

Because every item in those old-site mega-menus has the identical shape
under the hood — a title, an explainer, maybe related links. Writing 26
near-duplicate page files is the "generic template" trap the PDR warned
against, just distributed across the filesystem instead of visible on
one page. One well-designed template, fed by structured content,
scales to item #27 without a deploy.
