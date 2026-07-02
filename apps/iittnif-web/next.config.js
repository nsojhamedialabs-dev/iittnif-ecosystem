/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Without this, Next.js treats @iittnif/* imports as pre-built
  // external packages and skips its own JSX/TS compiler on them —
  // which breaks the moment any workspace package uses raw JSX
  // (e.g. Framer Motion's <motion.section>). This tells Next: these
  // are our own source, transpile them like app code.
  transpilePackages: [
    '@iittnif/ui',
    '@iittnif/design-system',
    '@iittnif/cms-client',
    '@iittnif/i18n',
  ],
  images: {
    remotePatterns: [
      // Payload CMS media host — update once CMS is deployed
      { protocol: 'https', hostname: 'cms.iittnif.com' },
      { protocol: 'https', hostname: '*.vercel-storage.com' },
    ],
  },
  
}

module.exports = nextConfig
