import HomePageClient from "../components/HomePage/Homepage";
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';

// ✅ Read domain from .env
const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.vercel.app";

const homepageStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${DOMAIN}/#website`,
      "url": DOMAIN,
      "name": "NameVerse - Baby Names with Meanings",
      "description": "60,000+ verified baby names from Islamic, Hindu & Christian traditions with meanings in English, Urdu, Arabic & Hindi",
      "publisher": {
        "@id": `${DOMAIN}/#organization`
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": {
          "@type": "EntryPoint",
          "urlTemplate": `${DOMAIN}/search?q={search_term_string}`
        },
        "query-input": "required name=search_term_string"
      }
    },
    {
      "@type": "Organization",
      "@id": `${DOMAIN}/#organization`,
      "name": "NameVerse",
      "url": DOMAIN,
      "logo": {
        "@type": "ImageObject",
        "url": `${DOMAIN}/logo.png`,
        "width": 512,
        "height": 512,
        "caption": "NameVerse - Baby Names & Meanings"
      },
      "description": "NameVerse - Discover 60,000+ baby names with meanings from Islamic, Hindu, and Christian traditions."
    },
    {
      "@type": "WebPage",
      "@id": `${DOMAIN}/#webpage`,
      "url": DOMAIN,
      "name": "60,000+ Baby Names with Meanings | NameVerse",
      "isPartOf": {
        "@id": `${DOMAIN}/#website`
      },
      "about": {
        "@id": `${DOMAIN}/#organization`
      },
      "description": "Find 60,000+ baby names with meanings in English, Urdu, Arabic & Hindi. Explore Islamic, Hindu & Christian names with origins and pronunciation guides."
    }
  ]
};

// World-class SEO metadata with comprehensive keyword targeting
export const metadata = {
  title: validateMetaTitle("60,000+ Baby Names with Meanings | NameVerse"),
  description: validateMetaDescription(
    "Find 60,000+ baby names with meanings in English, Urdu, Arabic & Hindi. Explore Islamic, Hindu & Christian names with origins and pronunciation guides."
  ),
  keywords: [
    "baby names with meanings",
    "baby boy names 2026",
    "baby girl names 2026",
    "Islamic baby names",
    "Muslim names with meanings",
    "Hindu baby names",
    "Sanskrit names for boys",
    "Christian baby names",
    "Biblical names with meanings",
    "baby name meanings in Urdu",
    "Arabic baby names",
    "popular baby names 2026",
    "unique baby names",
    "modern baby names",
    "baby name generator"
  ].join(', '),
  openGraph: {
    title: validateMetaTitle("60,000+ Baby Names with Meanings | NameVerse"),
    description: validateMetaDescription(
      "Find your baby's perfect name from verified Islamic, Hindu & Christian names with complete meanings, cultural origins, and pronunciation guides."
    ),
    url: DOMAIN + "/",
    type: "website",
    siteName: "NameVerse",
    images: [{ url: DOMAIN + "/logo.png", width: 1200, height: 630, alt: "NameVerse - Baby Names & Meanings" }],
  },
  twitter: {
    card: "summary_large_image",
    title: validateMetaTitle("60,000+ Baby Names with Meanings | NameVerse"),
    description: validateMetaDescription(
      "Discover your baby's perfect name from verified Islamic, Hindu & Christian traditions with complete meanings and cultural significance."
    ),
    images: [DOMAIN + "/logo.png"],
  },
  alternates: {
    canonical: DOMAIN + "/",
    languages: {
      "x-default": DOMAIN + "/",
      en: DOMAIN + "/",
    },
  },
  robots: { index: true, follow: true },
  authors: [{ name: "Zakriya Khan", url: DOMAIN + "/" }],
};

// ✅ Enhanced SEO Metadata (already defined above, just adding to existing)
// Metadata is already defined above, this section adds enhancements

// ✅ Next.js 14+ themeColor export
export function generateThemeColor() {
  return "#0f766e";
}

// ✅ Next.js 14+ viewport export
export function generateViewport() {
  return {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  };
}

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageStructuredData) }}
      />
      <HomePageClient />
    </>
  );
}
