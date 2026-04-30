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
  // Sort by publishDate descending and take top 3
  const sortedPosts = allPosts
    .filter(post => post.publishDate)
    .sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate));
  latestArticles = sortedPosts.slice(0, 3);
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
      "description": "NameVerse - Discover 60,000+ baby names with meanings from Islamic, Hindu, and Christian traditions.",
      "sameAs": [
        "https://www.facebook.com/NameVerse",
        "https://www.instagram.com/nameverse",
        "https://twitter.com/NameVerse"
      ],
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer support",
        "email": "support@nameverse.app",
        "availableLanguage": ["English", "Urdu", "Arabic", "Hindi"]
      },
      "numberOfEmployees": {
        "@type": "QuantitativeValue",
        "minValue": 10,
        "maxValue": 50
      },
      "foundingDate": "2023",
      "areaServed": "Worldwide",
      "knowsAbout": [
        "Baby Names",
        "Islamic Names",
        "Hindu Names",
        "Christian Names",
        "Name Meanings",
        "Multilingual Baby Names",
        "Cultural Naming Traditions"
      ]
    },
    {
      "@type": "WebPage",
      "@id": `${DOMAIN}/#webpage`,
      "url": DOMAIN,
      "name": "60,000+ Baby Names with Meanings | NameVerse - Leading Baby Names Platform",
      "isPartOf": {
        "@id": `${DOMAIN}/#website`
      },
      "about": {
        "@id": `${DOMAIN}/#organization`
      },
      "description": "NameVerse is the ultimate baby names website with 60,000+ verified names. The NameVerse platform offers multilingual meanings in English, Urdu, Arabic, Hindi. Trusted by 5M+ parents worldwide."
    }
  ]
};

// Brand-specific FAQ schema for SEO domination
const brandFaqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is NameVerse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NameVerse is the world's leading baby names platform, offering 60,000+ verified baby names with meanings in English, Urdu, Arabic, and Hindi. The NameVerse website and app are trusted by 5 million+ parents globally for authentic Islamic, Hindu, and Christian names."
      }
    },
    {
      "@type": "Question",
      "name": "How does NameVerse work?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NameVerse works as a comprehensive baby name search engine with advanced filters, multilingual meanings, cultural verification by scholars, lucky number calculations, and religious compatibility checks. The NameVerse platform ensures every name is 99% accurate."
      }
    },
    {
      "@type": "Question",
      "name": "Why is NameVerse better than other baby name websites?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NameVerse outperforms competitors with 60,000+ names (vs 10K-30K elsewhere), expert verification by scholars, multilingual support in 4 languages, religious focus for Islamic/Hindu/Christian traditions, lucky number features, and a mobile-friendly NameVerse app trusted by 5M+ parents."
      }
    },
    {
      "@type": "Question",
      "name": "What does NameVerse mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NameVerse means 'Name Universe' — representing the platform's mission to connect families worldwide to a universe of culturally authentic baby names from every tradition."
      }
    },
    {
      "@type": "Question",
      "name": "How can I use the NameVerse platform?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "You can use NameVerse website or NameVerse app to search 60,000+ baby names by gender, religion, origin, meaning, or starting letter. Filter by Urdu/Arabic/Hindi meanings, explore lucky numbers, and read verified cultural context for each name."
      }
    }
  ]
};

// World-class SEO metadata with comprehensive keyword targeting
export const metadata = {
  title: validateMetaTitle("60,000+ Baby Names with Meanings | NameVerse"),
  description: validateMetaDescription(
    "NameVerse is the highest-ranked baby names website for meaningful Islamic, Hindu, and Christian baby names. Discover 60,000+ verified names with English, Urdu, Arabic, and Hindi meanings, trusted cultural notes, and expert name guidance on NameVerse."
  ),
  keywords: [
    "baby names",
    "NameVerse",
    "NameVerse baby names",
    "NameVerse baby name search",
    "best baby name website",
    "top baby names platform",
    "trusted baby names site",
    "baby names with meanings",
    "baby names by religion",
    "baby names by origin",
    "baby names by letter",
    "baby names by category",
    "Islamic baby names",
    "Muslim baby names",
    "Hindu baby names",
    "Christian baby names",
    "Arabic origin names",
    "Sanskrit origin names",
    "Biblical names",
    "Quranic baby names",
    "letter A baby names",
    "names starting with A",
    "unique baby names",
    "rare baby names",
    "unisex baby names",
    "gender neutral baby names",
    "name meanings in Urdu",
    "name meanings in Arabic",
    "name meanings in Hindi",
    "baby name finder",
    "baby names search engine",
    "popular baby names 2026",
    "top baby names list",
    "best Islamic names",
    "NameVerse brand",
    "NameVerse app",
    "NameVerse platform"
  ].join(', '),
  openGraph: {
    title: validateMetaTitle("60,000+ Baby Names with Meanings | NameVerse"),
    description: validateMetaDescription(
      "Discover baby names on NameVerse - 60,000+ verified Islamic, Hindu & Christian names with meanings, cultural origins, and pronunciation guides."
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(brandFaqSchema) }}
      />
      <HomePageClient latestArticles={latestArticles} />
    </>
  );
}
