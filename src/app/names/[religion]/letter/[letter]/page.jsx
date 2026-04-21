import NamesDatabaseClient from './NameClientComponent';
import React from 'react';
import { notFound } from 'next/navigation';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';

export const revalidate = 2592000; // 1 month ISR (names data is static)

const DEFAULT_OG_IMAGE = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/logo.png`;

// Fallback data for static generation when API is unreachable
const FALLBACK_NAMES = [
  { 
    name: "Aaron", 
    slug: "aaron",
    short_meaning: "Mountain of strength",
    gender: "Male",
    origin: "Hebrew"
  },
  { 
    name: "Abigail", 
    slug: "abigail",
    short_meaning: "Father's joy",
    gender: "Female",
    origin: "Hebrew"
  },
  { 
    name: "Adam", 
    slug: "adam",
    short_meaning: "Man, earth",
    gender: "Male",
    origin: "Hebrew"
  }
];

export async function generateStaticParams() {
  const religions = ['islamic', 'hindu', 'christian'];
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const params = [];
  for (const religion of religions) {
    for (const letter of alphabet) {
      params.push({ religion, letter: letter.toLowerCase() });
    }
  }
  return params;
}

export async function generateMetadata({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const selectedReligion = resolvedParams?.religion || 'islamic';
  const letter = resolvedParams?.letter;

  // Validate letter parameter
  if (!letter || !/^[a-zA-Z]$/.test(letter)) {
    return notFound();
  }

  const selectedLetter = letter.toUpperCase();
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';
  const currentPage = parseInt(resolvedSearchParams?.page || 1);

  const canonicalUrl = `${SITE_URL}/names/${selectedReligion}/letter/${selectedLetter.toLowerCase()}`;
  const ogImage = `${SITE_URL}/logo.png`;

  // Keywords cluster for next-level SEO
  const keywordsArray = [
    // Core letter-specific keywords
    `${selectedReligion} baby names starting with ${selectedLetter}`,
    `baby names starting with ${selectedLetter}`,
    `${selectedReligion} names starting with ${selectedLetter}`,
    `boy names starting with ${selectedLetter}`,
    `girl names starting with ${selectedLetter}`,
    `names beginning with ${selectedLetter}`,
    `${selectedLetter} letter names`,

    // Religion + letter combinations
    `${selectedReligion} ${selectedLetter} names`,
    `${selectedReligion} boy names starting with ${selectedLetter}`,
    `${selectedReligion} girl names starting with ${selectedLetter}`,
    `${selectedReligion} names beginning with ${selectedLetter}`,

    // Popular/unique variations
    `popular ${selectedReligion} names starting with ${selectedLetter}`,
    `unique ${selectedLetter} names`,
    `popular ${selectedLetter} names`,
    `unique ${selectedReligion} ${selectedLetter} names`,
    `best ${selectedLetter} names`,
    `modern ${selectedLetter} names`,

    // General religion keywords
    `${selectedReligion} baby names`,
    `${selectedReligion} names list`,
    `religious baby names`,
    `name meanings ${selectedReligion}`,
    `name origins ${selectedReligion}`,

    // Gender-specific
    `boys names ${selectedLetter}`,
    `girls names ${selectedLetter}`,
    `${selectedLetter} names for boys`,
    `${selectedLetter} names for girls`,

    // Long-tail
    `${selectedLetter} names for babies`,
    `${selectedReligion} baby names with ${selectedLetter}`,
    `${selectedReligion} names that start with ${selectedLetter}`,
    `baby names with letter ${selectedLetter}`
  ];

  const validatedTitle = validateMetaTitle(`${selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1)} Names Starting with "${selectedLetter}" | Baby Names Database`);
  const validatedDescription = validateMetaDescription(`Discover the most popular ${selectedReligion} baby names starting with "${selectedLetter}". Browse meanings, origins, genders, pronunciation, and cultural significance. Perfect names for your baby.`);

  return {
    title: validatedTitle,
    description: validatedDescription,
    keywords: keywordsArray.join(', '),
    alternates: {
      canonical: canonicalUrl,
      languages: { en: canonicalUrl, 'x-default': canonicalUrl }
    },
    openGraph: {
      type: 'website',
      title: validateMetaTitle(`Top ${selectedReligion} Names Starting with "${selectedLetter}"`),
      description: validateMetaDescription(`Explore thousands of ${selectedReligion} baby names starting with "${selectedLetter}" including meanings, origins, and cultural significance.`),
      url: canonicalUrl,
      images: [{ url: ogImage || DEFAULT_OG_IMAGE, width: 1200, height: 630, alt: `${selectedReligion} names starting with ${selectedLetter}` }]
    },
    twitter: {
      card: 'summary_large_image',
      title: validateMetaTitle(`Top ${selectedReligion} Names Starting with "${selectedLetter}"`),
      description: validateMetaDescription(`Explore ${selectedReligion} baby names starting with "${selectedLetter}". Meanings, origins, and more.`),
      images: [ogImage || DEFAULT_OG_IMAGE]
    },
    robots: { index: true, follow: true },
  };
}

export default async function NamesDatabaseServer({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const API_BASE_ROOT = (process.env.NEXT_PUBLIC_API_BASE || 'https://name-meaning-site-backend.vercel.app').replace(/\/+$|\/api\/v1$/i, '');
  const API_BASE = API_BASE_ROOT.endsWith('/api/v1') ? API_BASE_ROOT : `${API_BASE_ROOT}/api/v1`;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

  const selectedReligion = resolvedParams?.religion || 'islamic';
  const letter = resolvedParams?.letter;

  // Validate letter parameter
  if (!letter || !/^[a-zA-Z]$/.test(letter)) {
    notFound();
  }

  const selectedLetter = letter.toUpperCase();
  const currentPage = parseInt(resolvedSearchParams?.page || 1);
  const perPage = parseInt(resolvedSearchParams?.perPage || 100);
  const sortBy = resolvedSearchParams?.sort || 'popularity';

  let names = [];
  let totalResults = 0;
  let isFallback = false;

  try {
    const apiUrlBase = API_BASE.endsWith('/api/v1')
      ? `${API_BASE}/names/${selectedReligion}/letter/${selectedLetter.toUpperCase()}`
      : `${API_BASE}/api/v1/names/${selectedReligion}/letter/${selectedLetter.toUpperCase()}`;
    const apiUrl = `${apiUrlBase}?limit=${perPage}&page=${currentPage}&sort=${sortBy}`;

    const response = await fetch(apiUrl, {
      next: { revalidate: 2592000 }, // 1 month revalidate for data
      signal: AbortSignal.timeout(30000), // 30 second timeout
    });
    
    if (response.ok) {
      const data = await response.json();
      if (data.success || data.data) {
        const payload = data.data || data;
        if (Array.isArray(payload)) {
          names = payload;
          totalResults = payload.length;
        } else {
          names = payload.names || payload || [];
          totalResults = payload.pagination?.totalCount || payload.total || names.length || 0;
        }
      }
    } else {
      // Use fallback data when API returns an error
      names = FALLBACK_NAMES;
      totalResults = FALLBACK_NAMES.length;
      isFallback = true;
    }
  } catch (error) {
    
    // Use fallback data when API is unreachable
    names = FALLBACK_NAMES;
    totalResults = FALLBACK_NAMES.length;
    isFallback = true;
  }

  const canonicalUrl = `${SITE_URL}/names/${selectedReligion}/letter/${selectedLetter.toLowerCase()}?page=${currentPage}&perPage=${perPage}&sort=${sortBy}`;
  const prevPageUrl = currentPage > 1 ? `${SITE_URL}/names/${selectedReligion}/letter/${selectedLetter.toLowerCase()}?page=${currentPage - 1}&perPage=${perPage}&sort=${sortBy}` : null;
  const nextPageUrl = totalResults > currentPage * perPage ? `${SITE_URL}/names/${selectedReligion}/letter/${selectedLetter.toLowerCase()}?page=${currentPage + 1}&perPage=${perPage}&sort=${sortBy}` : null;

  // JSON-LD structured data
  const itemListLD = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1)} Names Starting with ${selectedLetter}`,
    description: `Comprehensive list of ${selectedReligion} baby names beginning with ${selectedLetter}`,
    itemListOrder: "http://schema.org/ItemListOrderAscending",
    numberOfItems: totalResults,
    itemListElement: names.map((name, idx) => ({
      "@type": "ListItem",
      position: idx + 1 + (currentPage - 1) * perPage,
      item: { 
        "@type": "Person", 
        name: name.name, 
        description: name.short_meaning, 
        url: `${SITE_URL}/names/${selectedReligion}/${name.slug || name.name.toLowerCase()}`, 
        gender: name.gender, 
        additionalType: name.origin 
      }
    }))
  };

  const breadcrumbLD = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}` },
      { "@type": "ListItem", position: 2, name: "Names", item: `${SITE_URL}/names` },
      { "@type": "ListItem", position: 3, name: selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1), item: `${SITE_URL}/names/${selectedReligion}` },
      { "@type": "ListItem", position: 4, name: `Letter ${selectedLetter}`, item: canonicalUrl }
    ]
  };

  return (
    <>
      {prevPageUrl && <link rel="prev" href={prevPageUrl} />}
      {nextPageUrl && <link rel="next" href={nextPageUrl} />}

      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLD) }} />
      <script type="application/ld+json" suppressHydrationWarning dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLD) }} />

      <div className="min-h-screen bg-gray-50">
        {/* Server-side rendered header for SEO */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1)} Names Starting with "{selectedLetter}"
              </h1>
              <div className="max-w-3xl mx-auto">
                <p className="text-lg text-gray-700 leading-relaxed">
                  Explore our comprehensive collection of {selectedReligion} baby names that start with the letter "{selectedLetter}".
                  Discover meanings, origins, pronunciations, and cultural significance for {totalResults.toLocaleString()}+ names
                  perfect for your baby, including popular choices and unique finds from {selectedReligion} traditions.
                </p>
              </div>
            </div>
          </div>
        </div>

        <NamesDatabaseClient
          initialNames={names}
          initialTotal={totalResults}
          initialReligion={selectedReligion}
          initialLetter={selectedLetter}
          initialPage={currentPage}
          perPageDefault={perPage}
          initialSort={sortBy}
          isFallback={isFallback}
        />
      </div>
    </>
  );
}