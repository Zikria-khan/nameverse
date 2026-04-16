// ============================================
// FILE: app/names/page.js
// Global Baby Names Page — ISR with Static Generation
// ============================================

import BabyNamesClient from './ClientComponent';
import { fetchFilters, fetchNames } from '@/lib/api/names';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.com';

// ✅ ISR Configuration - Revalidate every 24 hours
export const revalidate = 86400; // 24 hours in seconds

// ✅ Generate Dynamic Metadata (for Google, social, and rich snippets)
export async function generateMetadata({ searchParams }) {
  const resolvedParams = await searchParams;
  // Collect applied filters (like ?gender=boy&origin=arabic)
  const filters = Object.entries(resolvedParams || {})
    .filter(([key, value]) => value && key !== 'page')
    .map(([key, value]) => `${key}: ${value}`)
    .join(', ');

  // Dynamic title and meta
  const baseTitle = `All Baby Names`;
  const title = filters
    ? `${baseTitle} (${filters}) | Meaning, Origins & Lucky Traits`
    : `${baseTitle} with Meanings, Origins & Lucky Traits`;

  const description = filters
    ? `Discover beautiful baby names filtered by ${filters}. Each name includes meaning, origin, numerology, and lucky details.`
    : `Explore thousands of baby names from all religions and cultures with meanings, origins, numerology, and lucky traits. Find unique boy and girl names for your baby.`;

  const keywords = [
    // Core baby name keywords
    'baby names',
    'baby names with meanings',
    'name meaning',
    'names and meanings',
    'baby name generator',
    'what does my name mean',
    'baby boy names',
    'baby girl names',
    'boy names',
    'girl names',
    'unique baby names',
    'modern baby names 2025',
    'baby name meanings',
    'baby name origins',
    'baby name finder',
    'baby name list',
    'popular baby names',
    'trending baby names',
    'best baby names 2025',

    // Gender-specific keywords
    'unisex baby names',
    'gender neutral names',
    'strong boy names',
    'pretty girl names',
    'masculine baby names',
    'feminine baby names',

    // Islamic/Muslim keywords
    'Islamic baby names',
    'Muslim baby names',
    'Islamic names',
    'Quranic baby names',
    'Muslim boy names',
    'Muslim girl names',
    'Arabic baby names',
    'Islamic baby names in Urdu',
    'Muslim names for newborn',
    'Islamic names with meanings',
    'Quranic names with English meanings',

    // Christian/Biblical keywords
    'Christian baby names',
    'Biblical baby names',
    'names from the Bible',
    'Hebrew baby names',
    'Catholic baby names',
    'Christian names meaning',
    'saint names',
    'names of Jesus',
    'Biblical names for twins',
    'Christian boy names',
    'Christian girl names',

    // Hindu/Sanskrit keywords
    'Hindu baby names',
    'Sanskrit baby names',
    'Indian baby names',
    'Vedic baby names',
    'Hindu god names',
    'Hindu goddess names',
    'Lord Krishna names',
    'Goddess Lakshmi names',
    'Tamil baby names',
    'Sanskrit names for boy',
    'Sanskrit names for girl',

    // Question-based keywords
    'what are some baby names',
    'how to choose baby name',
    'what name should I give my baby',
    'how to pick baby name',
    'how to name your baby',
    'what are good baby names',

    // Long-tail keywords
    'baby names with spiritual meaning',
    'baby names that mean blessing',
    'baby names that mean gift from god',
    'baby names that mean love',
    'baby names that mean strength',
    'baby names that mean miracle',
    'baby names with beautiful meanings',

    // Feature keywords
    'baby names with lucky stones',
    'baby names with numerology',
    'baby names by religion',
    'baby names by origin',
    'baby names A to Z',
    'verified baby names',
    'authentic baby names',
    'baby name pronunciation',
    'baby names with lucky numbers'
  ].join(', ');

  const canonicalUrl = `${SITE_URL}/names`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: "NameVerse — Baby Names & Meanings",
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${SITE_URL}/names-image.png`,
          width: 1200,
          height: 630,
          alt: "All Baby Names with Meanings and Origins",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      site: "@NameVerse",
      creator: "@NameVerse",
      images: [`${SITE_URL}/names-image.png`],
    },
    other: {
      "robots": "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
      "author": "NameVerse Team",
    },
  };
}

// ✅ Fetch Data from API (with ISR caching)
async function fetchInitialData(searchParams = {}) {
  try {
    // Get filters with ISR cache - this rarely changes
    const filters = await fetchFilters('islamic');

    const params = {
      page: searchParams?.page || '1',
      limit: '20',
      religion: searchParams?.religion || 'islamic',
      origin: searchParams?.origin || '',
      gender: searchParams?.gender || '',
    };

    // Fetch names with shorter revalidation for fresh data
    const namesData = await fetchNames(params);

    return {
      filters: filters,
      names: namesData.data || [],
      pagination: namesData.pagination || null,
    };
  } catch (error) {
    
    // Return fallback data that allows the page to render
    return { 
      filters: null, 
      names: [], 
      pagination: null 
    };
  }
}

// ✅ Generate static params for popular filter combinations
export async function generateStaticParams() {
  // Pre-build the most common pages for better performance
  const commonPages = [
    {}, // Base page
    { religion: 'islamic' },
    { religion: 'christian' }, 
    { religion: 'hindu' },
    { gender: 'boy' },
    { gender: 'girl' },
    { religion: 'islamic', gender: 'boy' },
    { religion: 'islamic', gender: 'girl' },
    { religion: 'christian', gender: 'boy' },
    { religion: 'christian', gender: 'girl' },
  ];

  return commonPages.map(params => ({
    searchParams: params
  }));
}

// ✅ Rich Structured Data (schema.org for Google Rich Results)
function generateStructuredData(names) {
  const nameItems = (names || []).slice(0, 20).map((n, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: n.name,
    url: `${SITE_URL}/names/${n.religion || 'islamic'}/${n.slug}`,
    description: n.short_meaning || n.long_meaning
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/names#webpage`,
        "name": "60,000+ Baby Names with Meanings | Islamic, Hindu & Christian Names",
        "description": "Browse verified baby names from all cultures with meanings, numerology, origins, and lucky traits. Find unique Islamic, Hindu, and Christian baby names for boys and girls.",
        "url": `${SITE_URL}/names`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "name": "NameVerse",
          "url": SITE_URL
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {
              "@type": "ListItem",
              "position": 1,
              "name": "Home",
              "item": SITE_URL
            },
            {
              "@type": "ListItem",
              "position": 2,
              "name": "All Baby Names",
              "item": `${SITE_URL}/names`
            }
          ]
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": "Baby Names Collection",
          "description": "Comprehensive list of baby names from Islamic, Hindu, and Christian traditions",
          "itemListElement": nameItems
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${SITE_URL}/search?query={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        }
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        "name": "NameVerse",
        "url": SITE_URL,
        "publisher": {
          "@type": "Organization",
          "@id": `${SITE_URL}/#organization`,
          "name": "NameVerse",
          "logo": {
            "@type": "ImageObject",
            "url": `${SITE_URL}/logo.png`
          }
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How many baby names does NameVerse have?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "NameVerse features over 60,000 verified baby names including 25,000+ Islamic names, 20,000+ Hindu names, and 15,000+ Christian names with complete meanings, origins, and lucky traits."
            }
          },
          {
            "@type": "Question",
            "name": "What information is provided for each baby name?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Each baby name includes verified meaning, cultural origin, gender, pronunciation, numerology, lucky day, lucky color, lucky stone, themes, and complete cultural context verified by religious experts."
            }
          },
          {
            "@type": "Question",
            "name": "Can I filter baby names by religion and origin?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes, you can filter baby names by religion (Islamic, Hindu, Christian), gender (boy, girl, unisex), origin (Arabic, Sanskrit, Hebrew, etc.), letter (A-Z), themes, lucky attributes, and many other criteria."
            }
          }
        ]
      }
    ]
  };
}

// ✅ Main Page - Now statically generated with ISR
export default async function AllNamesPage({ searchParams }) {
  const resolvedParams = await searchParams;
  // Fetch data for the initial render
  const initialData = await fetchInitialData(resolvedParams || {});
  const structuredData = generateStructuredData(initialData.names || []);

  return (
    <>
      {/* Inject structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <BabyNamesClient initialData={initialData} initialReligion="islamic" />
    </>
  );
}