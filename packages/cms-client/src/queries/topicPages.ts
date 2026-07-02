// MOBILE-FIRST: see /MOBILE_FIRST.md — data returned here should stay
// lean (avoid over-fetching heavy fields like heroImage at full res)
// since mobile networks are the primary target, not an afterthought.

// Typed fetch layer over the Payload REST/GraphQL API.
// CMS_API_URL will point at Vercel-hosted Payload during staging,
// then the IIT-hosted Docker instance post-approval — this file is
// the ONLY place that URL is read from, so migration is a one-line change.

const CMS_API_URL = process.env.NEXT_PUBLIC_CMS_API_URL ?? 'http://localhost:3001'

export type Tenant = 'iittnif' | 'dronagiri'

export interface TopicPageData {
  title: string
  summary?: string
  body?: string
  heroImage?: string
  trlStage?: 'research' | 'prototype' | 'validation' | 'deployment'
  relatedLinks?: { label: string; href: string }[]
  slug: string
  section: string
  category: string
  order: number
}

/** Fetch a single topic item by tenant + section + category + slug. */
export async function getTopicBySlug(
  tenant: Tenant,
  section: string,
  category: string,
  slug: string
): Promise<TopicPageData | null> {
  const params = new URLSearchParams({
    'where[tenant][equals]': tenant,
    'where[section][equals]': section,
    'where[category][equals]': category,
    'where[slug][equals]': slug,
    limit: '1',
  })
  const res = await fetch(`${CMS_API_URL}/api/topic-pages?${params}`, {
    next: { revalidate: 300 }, // ISR — 5 min, tune per PDR performance budget
  })
  if (!res.ok) return null
  const data = await res.json()
  return data.docs?.[0] ?? null
}

/** Fetch every item in a category — powers both static-param generation and the mega-menu. */
export async function getTopicsByCategory(
  tenant: Tenant,
  section: string,
  category: string
): Promise<TopicPageData[]> {
  const params = new URLSearchParams({
    'where[tenant][equals]': tenant,
    'where[section][equals]': section,
    'where[category][equals]': category,
    sort: 'order',
    limit: '100',
  })
  const res = await fetch(`${CMS_API_URL}/api/topic-pages?${params}`, {
    next: { revalidate: 300 },
  })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs ?? []
}

/** Full nav tree for the MegaMenu — grouped by section, then category. */
export type NavTree = Record<string, Record<string, TopicPageData[]>>

export async function getNavTree(tenant: Tenant): Promise<NavTree> {
  const params = new URLSearchParams({
    'where[tenant][equals]': tenant,
    sort: 'section,category,order',
    limit: '200',
  })
  const res = await fetch(`${CMS_API_URL}/api/topic-pages?${params}`, {
    next: { revalidate: 300 },
  })
  if (!res.ok) return {}
  const data = await res.json()
  const docs: TopicPageData[] = data.docs ?? []

  return docs.reduce<NavTree>((tree, item) => {
    const sectionGroup = tree[item.section] ?? (tree[item.section] = {})
    const categoryGroup = sectionGroup[item.category] ?? (sectionGroup[item.category] = [])
    categoryGroup.push(item)
    return tree
  }, {})
}
