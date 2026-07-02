// MOBILE-FIRST: see /MOBILE_FIRST.md — columns stack single-file at
// 360px; multi-column only from sm: up.

export function SiteFooter({ siteName = 'IITTNiF' }: { siteName?: string }) {
  return (
    <footer className="mt-16 border-t border-neutral-border bg-neutral-surface py-12">
      <div className="mx-auto max-w-wide px-4">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-4">
          <div>
            <p className="font-display text-h3 font-semibold text-neutral-text">{siteName}</p>
            <p className="mt-2 text-small text-neutral-text-secondary">
              National Technology Innovation Hub · NM-ICPS · DST · Government of India · Anchored at IIT Tirupati
            </p>
          </div>
          <div>
            <p className="mb-3 font-mono text-caption uppercase text-neutral-text-secondary">Explore</p>
            <ul className="space-y-2 text-small">
              <li><a href="/about-tih">About TIH</a></li>
              <li><a href="/technology-labs">Technology & Labs</a></li>
              <li><a href="/flagship-initiatives">Flagship Initiatives</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-caption uppercase text-neutral-text-secondary">Engage</p>
            <ul className="space-y-2 text-small">
              <li><a href="/startups-enablement">Startups & Enablement</a></li>
              <li><a href="/hrd">HRD</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          <div>
            <p className="mb-3 font-mono text-caption uppercase text-neutral-text-secondary">Newsroom</p>
            <ul className="space-y-2 text-small">
              <li><a href="/newsroom">Latest Updates</a></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-caption text-neutral-text-secondary">
          © {new Date().getFullYear()} IIT Tirupati Navavishkar I-Hub Foundation.
        </p>
      </div>
    </footer>
  )
}
