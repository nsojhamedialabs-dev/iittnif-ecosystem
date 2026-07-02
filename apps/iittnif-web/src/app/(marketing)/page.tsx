// MOBILE-FIRST: see /MOBILE_FIRST.md — this component/page is designed
// and coded for 360px first. Unprefixed Tailwind classes = mobile
// layout; sm:/md:/lg:/xl: add desktop enhancements, they never carry
// the primary layout logic.

import { Hero, Pillars, Pipeline, Portfolio, Stories, EngageCTA } from '@iittnif/ui'

export default function HomePage() {
  return (
    <>
      <Hero
        eyebrow="National Technology Innovation Hub · NM-ICPS · DST · Government of India"
        title="Building India's Future in Positioning & Precision Technologies"
        subtitle="Anchored at IIT Tirupati — a country-scale mission from research to deployed national impact."
        stage="research"
        variant="cinematic"
        primaryCta={{ label: 'Explore VIKAS', href: '/startups-enablement' }}
        secondaryCta={{ label: 'About TIH', href: '/about-tih' }}
      />

      {/* Placeholder copy below — real lab names/descriptions come from
          IIT once confirmed; structure and component wiring is final. */}
      <Pillars
        heading="Three Laboratories, One Mission"
        items={[
          {
            title: 'Geo-Intel Lab',
            description:
              'GNSS, GIS, LiDAR, and quantum navigation research feeding directly into national positioning infrastructure.',
            href: '/technology-labs',
            stage: 'mandate',
          },
          {
            title: 'AI/ML & Computer Vision Lab',
            description:
              'Applied AI for earth observation, image processing, and precision-technology deployment at scale.',
            href: '/technology-labs',
            stage: 'architecture',
          },
          {
            title: 'Translational R&D Lab',
            description:
              'Taking research from prototype to validated, field-ready technology through structured TDPs.',
            href: '/technology-labs',
            stage: 'delivery',
          },
        ]}
      />

      <Pipeline heading="From Research to National Impact" />

      <Portfolio
        heading="Flagship Initiatives"
        items={[
          {
            title: 'VIKAS',
            description: 'Single-window engagement platform — innovation calls, mentoring, government challenges.',
            href: '/flagship-initiatives',
            stage: 'mandate',
          },
          {
            title: 'SPIN Labs',
            description: 'National network of positioning & navigation infrastructure labs.',
            href: '/flagship-initiatives',
            stage: 'architecture',
          },
          {
            title: 'VidyaGIS',
            description: 'GIS education and skilling platform for students and researchers.',
            href: '/flagship-initiatives',
            stage: 'delivery',
          },
          {
            title: 'Bharath PNT',
            description: 'National positioning, navigation & timing deployment initiative.',
            href: '/flagship-initiatives',
            stage: 'nationalImpact',
          },
        ]}
      />

      <Stories
        heading="From the Ecosystem"
        items={[
          {
            name: 'Placeholder Founder',
            role: 'Startup, VIKAS Cohort',
            outcome: 'Took a GNSS positioning prototype from lab to pilot deployment in 8 months.',
            quote: 'Real founder stories to be sourced from IIT — structure is final.',
          },
        ]}
      />

      <EngageCTA
        items={[
          { label: 'Startup', description: 'Get a prototype to pilot.', href: '/startups-enablement' },
          { label: 'Industry', description: 'Validate, license, deploy at scale.', href: '/startups-enablement' },
          { label: 'Government', description: 'Mission-grade partnership for national infrastructure.', href: '/contact' },
          { label: 'Faculty / Researcher', description: 'Lab access, funded TDPs.', href: '/technology-labs' },
          { label: 'Student', description: 'Fellowships, hackathons, internships.', href: '/hrd' },
          { label: 'International Partner', description: 'Collaboration and MoU pathway.', href: '/contact' },
        ]}
      />
    </>
  )
}
