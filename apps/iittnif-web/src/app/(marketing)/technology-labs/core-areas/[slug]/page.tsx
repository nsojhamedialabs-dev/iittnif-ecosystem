// MOBILE-FIRST: see /MOBILE_FIRST.md — this component/page is designed
// and coded for 360px first. Unprefixed Tailwind classes = mobile
// layout; sm:/md:/lg:/xl: add desktop enhancements, they never carry
// the primary layout logic.

import { TopicPage } from '@iittnif/ui'
import { getTopicBySlug, getTopicsByCategory } from '@iittnif/cms-client'
import { notFound } from 'next/navigation'

const SECTION = 'technology-labs'
const CATEGORY = 'core-areas'

// Pre-renders every Core Area at build time; ISR revalidates every 5 min
// so a new CMS entry appears without a redeploy.
export async function generateStaticParams() {
  try {
    const items = await getTopicsByCategory('iittnif', SECTION, CATEGORY)
    return items.map((item) => ({ slug: item.slug }))
  } catch (error) {
    // If the CMS is offline, just tell Next.js there are no pages to pre-render right now
    console.error("CMS unreachable during build, returning empty routes.")
    return [] 
  }
}

export default async function CoreAreaPage({ params }: { params: { slug: string } }) {
  // We create a variable to hold the data, starting as null
  let data = null;

  // We wrap the fetch in a try/catch block
  try {
    data = await getTopicBySlug('iittnif', SECTION, CATEGORY, params.slug);
  } catch (error) {
    // If the CMS is offline (like on Vercel), it just logs the error 
    // instead of crashing the whole build.
    console.error("CMS unreachable, proceeding with null data.");
  }

  // If data is still null, we trigger the 404 page gracefully
  if (!data) notFound();

  return (
    <TopicPage
      title={data.title}
      summary={data.summary}
      body={data.body}
      trlStage={data.trlStage}
      relatedLinks={data.relatedLinks}
      breadcrumb={{ label: 'Technology & Labs', href: '/technology-labs' }}
    />
  )
}
