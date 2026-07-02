// MOBILE-FIRST: see /MOBILE_FIRST.md — this component/page is designed
// and coded for 360px first. Unprefixed Tailwind classes = mobile
// layout; sm:/md:/lg:/xl: add desktop enhancements, they never carry
// the primary layout logic.

import type { Metadata } from 'next'
// 👇 Import them together from the root of the UI package
import { SmoothScroll, CustomCursor } from '@iittnif/ui'
import './globals.css'

export const metadata: Metadata = {
  title: 'IITTNiF — IIT Tirupati Navavishkar I-Hub Foundation',
  description:
    "National Technology Innovation Hub under NM-ICPS, DST, Government of India — anchored at IIT Tirupati. Building India's future in Positioning & Precision Technologies.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  )
}