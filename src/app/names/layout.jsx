const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'

export const metadata = {
  title: 'Baby Names with Meanings — 65,000+ Islamic, Hindu & Christian Names A–Z 2026 | NameVerse',
  description: 'Discover 65,000+ baby names with authentic meanings, origins & lucky numbers. Browse 18,000+ Islamic Quranic names, 11,000+ Christian Biblical names & 15,000+ Hindu Sanskrit names A–Z. ✓ 98% verified ✓ Trending 2026 ✓ Boy & girl names by letter incl. rare & unique names.',
  alternates: {
    canonical: `${SITE_URL}/names`,
  },
  openGraph: {
    title: 'Baby Names with Meanings — 65,000+ Islamic, Hindu & Christian Names A–Z 2026',
    description: 'Discover 65,000+ baby names with authentic meanings, origins & lucky numbers. 18,000+ Islamic Quranic, 11,000+ Christian Biblical & 15,000+ Hindu Sanskrit names A–Z, plus rare and global names.',
    url: `${SITE_URL}/names`,
    siteName: 'NameVerse',
    images: [
      {
        url: `${SITE_URL}/api/og?section=names&page=1`,
        width: 1200,
        height: 630,
        alt: 'Baby Names with Meanings — Islamic, Hindu & Christian Names A–Z',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Baby Names with Meanings — 65,000+ Islamic, Hindu & Christian Names A–Z 2026',
    description: 'Discover 65,000+ baby names 2026 with authentic meanings, origins & lucky numbers. 18,000+ Islamic, 11,000+ Christian & 15,000+ Hindu names A–Z plus rare & unique names. ✓ Verified ✓ Trending.',
    images: [`${SITE_URL}/api/og?section=names&page=1`],
  },
  keywords: 'baby names 2026, islamic baby names, christian baby names, hindu baby names, quranic names, biblical names, sanskrit names, gender neutral names, unique baby names, trending baby names 2026',
  robots: 'index, follow',
  other: {
    'googlebot': 'index, follow',
  },
}

export default function NamesLayout({ children }) {
  return (
    <>
      {/* FAQ Schema structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Baby Names with Meanings — Islamic, Hindu & Christian Names A–Z",
            "description": "Discover 65,000+ baby names with authentic meanings, origins & lucky numbers across Islamic Quranic, Christian Biblical, and Hindu Sanskrit traditions.",
            "url": `${SITE_URL}/names`,
            "about": {
              "@type": "Thing",
              "name": "Baby Names by Religion"
            },
            "mainEntity": {
              "@type": "ItemList",
              "itemListElement": [
                { "@type": "ListItem", "position": 1, "name": "Islamic Names", "url": `${SITE_URL}/names/religion/islamic/1` },
                { "@type": "ListItem", "position": 2, "name": "Christian Names", "url": `${SITE_URL}/names/religion/christian/1` },
                { "@type": "ListItem", "position": 3, "name": "Hindu Names", "url": `${SITE_URL}/names/religion/hindu/1` },
              ]
            }
          })
        }}
      />
      {children}
    </>
  )
}