// MOBILE-FIRST: see /MOBILE_FIRST.md — this component/page is designed
// and coded for 360px first. Unprefixed Tailwind classes = mobile
// layout; sm:/md:/lg:/xl: add desktop enhancements, they never carry
// the primary layout logic.

// This layout wraps ALL 8 tabs and every nested [slug] topic page.
// getNavTree runs server-side here (this is a Server Component) and
// the resulting data is handed to the client MegaMenu — the CMS query
// happens once per request/revalidation window, not per-render.

// Imports brought back!
import { MegaMenu, SiteFooter } from '@iittnif/ui'
import { getNavTree } from '@iittnif/cms-client'

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  // We use : any = {} to force TypeScript to accept our safe fallback
  let navTree: any = {}; 

  try {
    navTree = await getNavTree('iittnif');
  } catch (error) {
    console.warn("CMS offline, building layout without nav data.");
  }

  return (
    <>
      <MegaMenu navTree={navTree} tenant="iittnif" siteName="IITTNiF" />
      <main className="mx-auto max-w-wide px-4">{children}</main>
      <SiteFooter siteName="IITTNiF" />
    </>
  )
}