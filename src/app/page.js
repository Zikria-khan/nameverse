import HomePageClient from "../components/HomePage/Homepage";
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';
import fs from 'fs';
import path from 'path';

// ✅ Read domain from .env
const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || "https://nameverse.vercel.app";

// Read blog posts data server-side
const blogPostsPath = path.join(process.cwd(), 'public', 'data', 'blog-posts.json');
let latestArticles = [];
try {
  const fileContents = fs.readFileSync(blogPostsPath, 'utf8');
  const allPosts = JSON.parse(fileContents);
  // Sort by publishDate descending and take top 6 for homepage
  const sortedPosts = allPosts
    .filter(post => post.publishDate)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  latestArticles = sortedPosts.slice(0, 6);
} catch (error) {
}

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
    }
  ]
};







// World-class SEO metadata with comprehensive keyword targeting for GSC ranking — optimized for "NameVerse" keyword dominance
export const metadata = {
  title: {
    default: validateMetaTitle("NameVerse — #1 Best Baby Names Website 2026 | 65K+ Islamic Hindu Christian Names with Meanings"),
    template: "%s | NameVerse — America's #1 Baby Names Database"
  },
  description: validateMetaDescription(
    "NameVerse is America's #1 baby names website — the best baby names platform with 65,000+ verified Islamic, Hindu & Christian names. Find Quranic, Biblical & Sanskrit names with meanings in English, Urdu, Arabic & Hindi. NameVerse platform is scholar-verified, 100% free, and trusted by 5M+ parents worldwide for baby name search, meaning verification, trend predictions, and cultural authenticity. Search 'NameVerse' — the top baby names database online."
  ),
  keywords: [
    "NameVerse",
    "baby names",
    "baby names with meanings",
    "Islamic baby names",
    "Hindu baby names",
    "Christian baby names",
    "name meanings",
    "baby name search",
    "Quranic baby names",
    "Arabic baby names",
    "Sanskrit baby names",
    "Biblical baby names",
    "boy names",
    "girl names",
    "baby names 2026",
    "popular baby names",
    "unique baby names",
    "Muslim baby names",
    "Urdu name meanings",
    "Arabic name meanings"
  ].join(', '),
  openGraph: {
    title: validateMetaTitle("NameVerse — #1 Best Baby Names Website 2026 | 65K+ Islamic Hindu Christian Names with Meanings"),
    description: validateMetaDescription(
      "NameVerse is America's #1 baby names website with 65,000+ verified Islamic, Hindu & Christian names. Find authentic meanings in Urdu, Arabic, Hindi, English. Scholar-verified, 100% free. Trusted by 5M+ parents. Search the NameVerse platform for baby names with meanings, trends 2026, popular names, and unique names."
    ),
    url: DOMAIN + "/",
    type: "website",
    siteName: "NameVerse",
    images: [{ 
      url: `${DOMAIN}/logo.png`, 
      width: 1200, 
      height: 630, 
      type: "image/png", 
      alt: "NameVerse — America's #1 Baby Names Website with 65,000+ names" 
    }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: validateMetaTitle("NameVerse — Best Baby Names 2026 | #1 Baby Names Website in America"),
    description: validateMetaDescription(
      "NameVerse: America's #1 baby names website with 65,000+ verified names. Find Islamic, Hindu, Christian names with meanings. Free, scholar-verified, 5M+ parents trust NameVerse platform."
    ),
    images: [`${DOMAIN}/logo.png`],
    creator: "@NameVerseOfficial",
    site: "@NameVerseOfficial",
  },
  twitter: {
    card: "summary_large_image",
    title: validateMetaTitle("60,000+ Baby Names with Meanings | NameVerse"),
    description: validateMetaDescription(
      "Find baby names on NameVerse - 60,000+ verified Islamic, Hindu & Christian names with meanings and cultural significance."
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

      <HomePageClient latestArticles={latestArticles} />
    </>
  );
}
