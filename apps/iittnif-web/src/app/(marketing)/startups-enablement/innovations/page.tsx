// MOBILE-FIRST: see /MOBILE_FIRST.md — this component/page is designed
// and coded for 360px first. Unprefixed Tailwind classes = mobile
// layout; sm:/md:/lg:/xl: add desktop enhancements, they never carry
// the primary layout logic.

import { Hero } from "@iittnif/ui"

// PLACEHOLDER — real content and layout to be finalized once IIT
// confirms copy/assets. Structure (route, breadcrumb) is final.
export default function Page() {
  return (
    <>
      <a href="/startups-enablement" className="text-small text-neutral-text-secondary underline">← Startups & Enablement</a>
      <Hero title="Innovations" subtitle="Innovations emerging from the IITTNiF ecosystem." stage="mandate" />
    </>
  )
}
