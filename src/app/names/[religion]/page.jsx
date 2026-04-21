import { cache } from 'react';
import ReligiousNamesBrowser from './client';
import { notFound } from 'next/navigation';
import { fetchNames as fetchNamesAPI, fetchFilters as fetchFiltersAPI } from '@/lib/api/names';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';

// ==========================================
// ISR CONFIGURATION
// ==========================================
export const revalidate = 2592000; // 1 month ISR (Religion lists are static)

const RELIGIONS = ['islamic', 'christian', 'hindu'];
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

// ==========================================
// GENERATE STATIC PARAMS
// ==========================================
export async function generateStaticParams() {
  return RELIGIONS.map((religion) => ({ religion }));
}

// ==========================================
// METADATA
// ==========================================
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const { religion } = resolvedParams;
  const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1);

  const metadataMap = {
    islamic: {
      title: `25,000+ Islamic Baby Names with Meanings | Muslim Names from Quran | NameVerse`,
      description: `Discover authentic Islamic baby names with Quranic references and verified meanings in English, Urdu & Arabic. Browse 25,000+ Muslim baby names for boys and girls with spiritual significance, pronunciation guides, and lucky traits.`,
      keywords: `Islamic baby names, Muslim baby names, Islamic names, Quranic baby names, Arabic baby names, Muslim boy names, Muslim girl names, Islamic names for boys, Islamic names for girls, baby boy islamic names, islamic names wiki, meaning of islamic names urdu, islamic names urdu pakistan, what are some muslim names, what do muslim names mean, how do muslim names work, Quranic names for boys, Quranic names for girls, Muslim names for newborn, best Islamic names 2025, Quranic names with English meanings, Islamic names with meanings, Muslim names with lucky numbers, Islamic baby names in English, Muslim baby girl names unique, Muslim baby boy names modern, Islamic names from Quran, Prophet Muhammad names, Sahaba names, Muslim names meaning, Arabic names for baby boy, Arabic names for baby girl, Islamic names A to Z, Muslim baby names starting with A`
    },
    christian: {
      title: `15,000+ Christian Baby Names with Meanings | Biblical Names | NameVerse`,
      description: `Explore authentic Christian baby names with Biblical references and saint connections. Browse 15,000+ Christian names for boys and girls with scripture verses, Hebrew/Greek origins, and spiritual significance.`,
      keywords: `Christian baby names, Biblical baby names, Christian names, saint names, Biblical boy names, Biblical girl names, Christian names for boys, Christian names for girls, names from the Bible, Catholic baby names, Protestant baby names, Orthodox Christian names, Hebrew baby names, Greek baby names, Christian names meaning, names of Jesus, Biblical names for twins, Bible names for boys, Bible names for girls, Christian baby boy names, Christian baby girl names, Biblical names with meanings, Old Testament names, New Testament names, Christian saint names, Catholic saint names for girls, Catholic saint names for boys, Biblical names meaning gift from God, Christian names that mean blessing, Hebrew names from Bible, Greek biblical names, Biblical names starting with A, best Christian names 2025`
    },
    hindu: {
      title: `20,000+ Hindu Baby Names with Meanings | Sanskrit Names | NameVerse`,
      description: `Find beautiful Hindu baby names from Sanskrit with Vedic meanings and deity connections. Browse 20,000+ Hindu names for boys and girls inspired by gods, goddesses, and ancient Indian wisdom.`,
      keywords: `Hindu baby names, Sanskrit baby names, Hindu names, Vedic baby names, Indian baby names, Hindu boy names, Hindu girl names, Sanskrit names for boys, Sanskrit names for girls, Lord Krishna names, Lord Shiva names, Goddess Lakshmi names, Tamil baby names, Hindi baby names, Hindu god names, Hindu goddess names, Lord Ganesha names, Goddess Saraswati names, Goddess Durga names, Lord Rama names, Vedic names with meanings, Sanskrit names meaning, Indian baby boy names, Indian baby girl names, Hindu baby names with meanings, Tamil baby boy names, Tamil baby girl names, Telugu baby names, Kannada baby names, Malayalam baby names, Sanskrit names A to Z, best Hindu names 2025, modern Hindu names, traditional Hindu names, Hindu names for twins`
    }
  };

  const metadata = metadataMap[religion] || metadataMap.islamic;

  const validatedTitle = validateMetaTitle(metadata.title);
  const validatedDescription = validateMetaDescription(metadata.description);

  return {
    title: validatedTitle,
    description: validatedDescription,
    keywords: metadata.keywords,
    alternates: {
      canonical: `${SITE_URL}/names/${religion}`,
      languages: { en: `${SITE_URL}/names/${religion}`, 'x-default': `${SITE_URL}/names/${religion}` }
    },
    openGraph: {
      title: validateMetaTitle(`${religionTitle} Baby Names - Complete Database`),
      description: validatedDescription,
      type: 'website',
      url: `${SITE_URL}/names/${religion}`,
      siteName: 'NameVerse',
      images: [
        {
          url: `${SITE_URL}/logo.png`,
          width: 1200,
          height: 630,
          alt: `${religionTitle} Baby Names with Meanings`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: validatedTitle,
      description: validatedDescription,
      images: [`${SITE_URL}/logo.png`],
    },
    robots: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
    authors: [{ name: 'NameVerse Team' }],
  };
}

// ==========================================
// SERVER-SIDE DATA FETCHING - Cached for deduplication
// ==========================================
const fetchNames = cache(async (religion, params = {}) => {
  try {
    return await fetchNamesAPI({
      religion,
      page: '1',
      limit: '40',
      sort: 'asc',
      ...params,
    });
  } catch (error) {
    return { success: false, data: [], pagination: { totalPages: 1, totalCount: 0 } };
  }
});

const fetchFilters = cache(async (religion) => {
  try {
    return await fetchFiltersAPI(religion);
  } catch (error) {
    return { genders: [], origins: [], letters: [] };
  }
});

// ==========================================
// THEME & VIEWPORT
// ==========================================
export function generateThemeColor() {
  return '#0f766e';
}

export function generateViewport() {
  return { width: 'device-width', initialScale: 1 };
}

// ==========================================
// GENERATE JSON-LD SCHEMA
// ==========================================
function generateStructuredData(religion, names, totalCount) {
  const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1);

  const nameItems = (names || []).slice(0, 20).map((n, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: n.name,
    url: `${SITE_URL}/names/${religion}/${n.slug}`,
    description: n.short_meaning || n.long_meaning
  }));

  const religionDescriptions = {
    islamic: 'Authentic Islamic baby names with Quranic references and meanings in English, Urdu & Arabic',
    christian: 'Biblical Christian baby names with scripture verses and saint connections',
    hindu: 'Hindu baby names from Sanskrit with Vedic meanings and deity connections'
  };

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${SITE_URL}/names/${religion}#webpage`,
        "name": `${religionTitle} Baby Names with Meanings`,
        "description": religionDescriptions[religion] || `${religionTitle} baby names with meanings`,
        "url": `${SITE_URL}/names/${religion}`,
        "isPartOf": {
          "@type": "WebSite",
          "@id": `${SITE_URL}/#website`,
          "name": "NameVerse"
        },
        "breadcrumb": {
          "@type": "BreadcrumbList",
          "itemListElement": [
            { "@type": "ListItem", "position": 1, "name": "Home", "item": SITE_URL },
            { "@type": "ListItem", "position": 2, "name": "Names", "item": `${SITE_URL}/names` },
            { "@type": "ListItem", "position": 3, "name": `${religionTitle} Names`, "item": `${SITE_URL}/names/${religion}` }
          ]
        },
        "mainEntity": {
          "@type": "ItemList",
          "name": `${religionTitle} Baby Names Collection`,
          "numberOfItems": totalCount,
          "itemListElement": nameItems
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": `How many ${religionTitle} baby names are available?`,
            "acceptedAnswer": {
              "@type": "Answer",
              "text": `NameVerse features ${totalCount.toLocaleString()}+ verified ${religionTitle} baby names with complete meanings, origins, pronunciations, and cultural significance.`
            }
          }
        ]
      }
    ]
  };
}

// ==========================================
// PAGE COMPONENT
// ==========================================
export default async function ReligionNamesPage({ params }) {
  const resolvedParams = await params;
  const { religion } = resolvedParams;

  if (!RELIGIONS.includes(religion)) {
    notFound();
  }

  const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1);

  // Fetch data in parallel
  const [namesData, filtersData] = await Promise.all([
    fetchNames(religion),
    fetchFilters(religion),
  ]);

  const initialNames = namesData.success ? namesData.data || [] : [];
  const initialTotalPages = namesData.success ? namesData.pagination?.totalPages || 1 : 1;
  
  // Fallback counts for each religion when API data is unavailable
  const fallbackCounts = {
    islamic: 25000,
    christian: 15000,
    hindu: 20000
  };
  
  const initialTotalCount = namesData.success && namesData.pagination?.totalCount > 0 
    ? namesData.pagination.totalCount 
    : fallbackCounts[religion] || 0;
  const initialFilters = filtersData.success ? filtersData.filters || {} : {};

  const seoDescriptions = {
    islamic: 'Discover authentic Islamic baby names inspired by Quranic verses, Arabic heritage, and meaningful spiritual traditions.',
    christian: 'Explore Christian baby names with Biblical roots, saint connections, and timeless meanings for modern families.',
    hindu: 'Find Hindu baby names drawn from Sanskrit, Vedic traditions, and cultural heritage with devotional significance.'
  };

  const seoExamples = {
    islamic: 'Aaliyah, Yusuf, Noor, Ibrahim, Fatima',
    christian: 'Grace, Gabriel, Mary, Joseph, Sophia',
    hindu: 'Aarav, Priya, Aditi, Arjun, Saanvi'
  };

  const structuredData = generateStructuredData(religion, initialNames, initialTotalCount);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gray-50">
        {/* Server-side rendered header for SEO */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {religionTitle} Baby Names with Meanings
              </h1>
              <div className="max-w-3xl mx-auto">
                {religion === 'islamic' && (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Discover authentic Islamic baby names with Quranic references and verified meanings in English, Urdu & Arabic. 
                    Our comprehensive database features {initialTotalCount.toLocaleString()}+ Muslim baby names for boys and girls, 
                    each with spiritual significance, pronunciation guides, lucky traits, and connections to Islamic heritage.
                  </p>
                )}
                {religion === 'christian' && (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Explore authentic Christian baby names with Biblical references and saint connections. 
                    Browse our collection of {initialTotalCount.toLocaleString()}+ Christian names for boys and girls, 
                    featuring scripture verses, Hebrew/Greek origins, and timeless spiritual significance from sacred traditions.
                  </p>
                )}
                {religion === 'hindu' && (
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Find beautiful Hindu baby names from Sanskrit with Vedic meanings and deity connections. 
                    Explore {initialTotalCount.toLocaleString()}+ Hindu names for boys and girls inspired by gods, goddesses, 
                    and ancient Indian wisdom, each with cultural significance and spiritual depth.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="bg-white rounded-3xl border border-gray-200 p-8 shadow-sm">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              {religionTitle} Baby Names for Every Family
            </h2>
            <div className="prose prose-lg max-w-none text-gray-700 space-y-5">
              <p>{seoDescriptions[religion]} Our {religionTitle.toLowerCase()} names collection includes over <strong>{initialTotalCount.toLocaleString()} names</strong> backed by trusted meanings, origins, and heritage notes.</p>
              <p>Use the search tools to filter by gender, starting letter, meaning, or cultural inspiration and find names like {seoExamples[religion]}, all rooted in {religionTitle} tradition.</p>
              <p>Each entry includes clear origins, verified meanings, and cultural context to support your family in choosing a meaningful name.</p>
              <ul>
                <li>Comprehensive Christian name collections for boys, girls, and unisex options</li>
                <li>Verified Biblical, Hebrew, Greek, and saint-inspired names</li>
                <li>Easy search and filtering for meaningful name discovery</li>
              </ul>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2">
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Why choose NameVerse?</h3>
                <p className="text-gray-700 leading-relaxed">Our Christian names are curated for authenticity, spiritual depth, and modern relevance so your child's name carries meaning for years to come.</p>
              </div>
              <div className="bg-gray-50 rounded-2xl p-5 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">How to use this page</h3>
                <p className="text-gray-700 leading-relaxed">Refine your search by gender, alphabet, and meaning; then explore each name profile for scripture connections, pronunciation tips, and origin details.</p>
              </div>
            </div>
          </div>
        </section>

        <ReligiousNamesBrowser
          initialReligion={religion}
          initialNames={initialNames}
          initialFilters={initialFilters}
          initialTotalPages={initialTotalPages}
          initialTotalCount={initialTotalCount}
        />
      </div>
    </>
  );
}
