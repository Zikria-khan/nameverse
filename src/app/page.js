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
      "image": {
        "@type": "ImageObject",
        "url": `${DOMAIN}/create-a-baby-image-for-homeap.png`,
        "width": 1200,
        "height": 800,
        "caption": "NameVerse - Baby Names Platform"
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
        "Cultural Naming Traditions",
        "Quranic Names",
        "Biblical Names",
        "Sanskrit Names",
        "Baby Name Numerology",
        "Name Origins"
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
      "description": "NameVerse is the ultimate baby names website with 60,000+ verified names. The NameVerse platform offers multilingual meanings in English, Urdu, Arabic, Hindi. Trusted by 5M+ parents worldwide.",
      "mainEntity": {
        "@type": "ItemList",
        "name": "Baby Names Collection",
        "description": "Comprehensive collection of baby names from Islamic, Hindu, and Christian traditions",
        "numberOfItems": 60000,
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Islamic Baby Names",
            "url": `${DOMAIN}/names/religion/islamic/1`,
            "description": "25,000+ Quranic and Arabic baby names with Urdu meanings"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Hindu Baby Names",
            "url": `${DOMAIN}/names/religion/hindu/1`,
            "description": "20,000+ Sanskrit and Vedic baby names with Hindi meanings"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Christian Baby Names",
            "url": `${DOMAIN}/names/religion/christian/1`,
            "description": "15,000+ Biblical baby names with spiritual meanings"
          }
        ]
      }
    },
    {
      "@type": "ImageObject",
      "url": `${DOMAIN}/create-a-baby-image-for-homeap.png`,
      "width": 1200,
      "height": 800,
      "caption": "Cute baby - NameVerse baby names platform",
      "description": "Beautiful baby image representing the NameVerse platform for baby names"
    }
  ]
};

// Enhanced Brand-specific FAQ schema for SEO domination - Expanded for GSC ranking
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
    },
    {
      "@type": "Question",
      "name": "Where can I find the best baby names on NameVerse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NameVerse offers the best baby names collection including Quranic baby names, Hindu baby names with Sanskrit meanings, and Christian biblical names. Find top baby names, popular baby names 2026, unique baby names, and rare baby names all on NameVerse."
      }
    },
    {
      "@type": "Question",
      "name": "Does NameVerse have baby names with meanings in Urdu?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, NameVerse is the best source for baby names with meanings in Urdu, Arabic, and Hindi. Search NameVerse for Islamic baby names with Urdu meanings, Hindu names with Hindi translations, and get accurate name meanings in multiple languages."
      }
    },
    {
      "@type": "Question",
      "name": "What makes NameVerse the top baby names website?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "NameVerse is the top baby names website because of 60,000+ verified names, expert scholar verification, multilingual support, religious accuracy, lucky number calculations, and being trusted by 5 million parents. NameVerse baby name search is the most comprehensive."
      }
    },
    {
      "@type": "Question",
      "name": "Can I find Islamic baby names on NameVerse?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, NameVerse has the largest collection of Islamic baby names, Quranic names, Arabic names, and Muslim baby names with meanings. Browse NameVerse for Islamic boy names, Islamic girl names, and traditional Muslim baby names verified by scholars."
      }
    },
    {
      "@type": "Question",
      "name": "Is NameVerse free to use for baby name search?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, NameVerse is completely free. Use NameVerse website or NameVerse app to search baby names, find name meanings, check numerology, and explore cultural origins - all free on the top baby names platform."
      }
    }
  ]
};

// HowTo Schema for baby name search - Rich result for GSC
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Find the Perfect Baby Name on NameVerse",
  "description": "Step-by-step guide to using NameVerse baby name search to find meaningful names for your baby",
  "step": [
    {
      "@type": "HowToStep",
      "name": "1. Search or Browse Names",
      "text": "Use the NameVerse search bar to find baby names by keyword, or browse by religion, letter, or category on the NameVerse platform."
    },
    {
      "@type": "HowToStep",
      "name": "2. Filter by Religion or Origin",
      "text": "Filter results on NameVerse for Islamic baby names, Hindu baby names, or Christian baby names by tradition."
    },
    {
      "@type": "HowToStep",
      "name": "3. Check Name Meanings",
      "text": "Read verified name meanings in English, Urdu, Arabic, and Hindi on NameVerse."
    },
    {
      "@type": "HowToStep",
      "name": "4. Explore Cultural Context",
      "text": "Learn about cultural significance, pronunciation guides, and lucky numbers for each name on NameVerse."
    },
    {
      "@type": "HowToStep",
      "name": "5. Save Your Favorites",
      "text": "Create a list of favorite names on NameVerse to compare and choose the best baby name for your family."
    }
  ]
};

// Q&A Page Schema for additional rich results
const qaPageSchema = {
  "@context": "https://schema.org",
  "@type": "QAPage",
  "mainEntity": {
    "@type": "Question",
    "name": "What are the best baby names for 2026?",
    "acceptedAnswer": {
      "@type": "Answer",
      "text": "NameVerse lists the most popular baby names 2026, including trending Islamic names, Hindu names, and Christian names. Browse NameVerse for top baby names, unique baby names, and modern baby names trending in 2026."
    }
  }
};

// World-class SEO metadata with comprehensive keyword targeting for GSC ranking
export const metadata = {
  title: validateMetaTitle("NameVerse — 60,000+ Baby Names with Meanings | Islamic, Hindu & Christian Names 2026"),
  description: validateMetaDescription(
    "NameVerse is the #1 baby names website with 60,000+ verified Islamic, Hindu & Christian baby names. Find Quranic, Biblical & Sanskrit names with meanings in English, Urdu, Arabic & Hindi. Trusted by 5M+ parents. Use NameVerse baby name search for popular baby names 2026, unique baby names & rare baby names."
  ),
  keywords: [
    // Primary branded keywords
    "NameVerse",
    "NameVerse baby names",
    "NameVerse baby name search",
    "NameVerse app",
    "NameVerse platform",
    "NameVerse brand",
    "NameVerse website",
    "NameVerse homepage",
    "NameVerse name search",
    "NameVerse baby names database",
    
    // Core baby names keywords
    "baby names",
    "baby names 2026",
    "baby names with meanings",
    "best baby names",
    "top baby names",
    "popular baby names 2026",
    "trending baby names",
    "modern baby names",
    "unique baby names",
    "rare baby names",
    "unisex baby names",
    "gender neutral baby names",
    
    // Religious baby names
    "Islamic baby names",
    "Muslim baby names",
    "Quranic baby names",
    "Arabic baby names",
    "Hindu baby names",
    "Sanskrit baby names",
    "Vedic baby names",
    "Christian baby names",
    "Biblical baby names",
    "Bible names",
    
    // Name meaning keywords
    "name meanings",
    "name meanings in Urdu",
    "name meanings in Arabic",
    "name meanings in Hindi",
    "name meanings in English",
    "baby name meanings",
    "name meaning finder",
    "what does my name mean",
    
    // Search and discovery keywords
    "baby name search",
    "baby name finder",
    "baby names search engine",
    "find baby names",
    "search baby names",
    "baby name generator",
    "baby name ideas",
    "baby name suggestions",
    
    // Category keywords
    "baby names by religion",
    "baby names by origin",
    "baby names by letter",
    "baby names by category",
    "baby names A to Z",
    "names starting with A",
    "letter A baby names",
    "boy names",
    "girl names",
    "baby boy names 2026",
    "baby girl names 2026",
    
    // Competitive keywords
    "best baby name website",
    "top baby names platform",
    "trusted baby names site",
    "best baby names website",
    "top baby names list",
    "best Islamic names",
    "best Hindu names",
    "best Christian names",
    
    // Cultural and regional keywords
    "Arabic origin names",
    "Sanskrit origin names",
    "Hebrew names",
    "Indian baby names",
    "Pakistani baby names",
    "Middle Eastern names",
    
    // Numerology and special features
    "baby name numerology",
    "lucky number for names",
    "name numerology calculator",
    "baby names with lucky numbers"
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(qaPageSchema) }}
      />
      <HomePageClient latestArticles={latestArticles} />
    </>
  );
}
