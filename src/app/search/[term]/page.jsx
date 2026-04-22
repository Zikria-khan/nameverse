import { cache } from 'react';
import { notFound } from 'next/navigation';
import SearchResultsClient from './ClientComponent';
import { searchNames } from '@/lib/api/names';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

// Fetch search results from API - Cached for single-request deduplication
const fetchSearchResults = cache(async (term) => {
  try {
    const namesResult = await searchNames(term.trim(), { limit: 50 });
    const names = namesResult.data || [];

    return {
      names,
      totalNames: names.length,
      totalResults: names.length,
    };
  } catch (error) {
    console.error('Search fetch error:', error);
    return { names: [], totalNames: 0, totalResults: 0 };
  }
});

// ---------------- Metadata ----------------
export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const { term } = resolvedParams;
  const decodedTerm = decodeURIComponent(term);
  const { totalResults } = await fetchSearchResults(decodedTerm);

  const canonicalUrl = `${DOMAIN}/search/${encodeURIComponent(decodedTerm)}`;

  return {
    title: validateMetaTitle(`${decodedTerm} - Names | NameVerse`),
    description: validateMetaDescription(`Discover ${totalResults} results for ${decodedTerm}. Expert meanings and origins for your search.`),
    keywords: [
      decodedTerm,
      `${decodedTerm} names`,
      `${decodedTerm} meanings`,
      'name meanings',
      'name origins',
      'baby names',
      'name inspiration',
      `${decodedTerm} etymology`,
    ].join(', '),
    authors: [{ name: 'NameVerse' }],
    openGraph: {
      title: validateMetaTitle(`${decodedTerm} - Names`),
      description: validateMetaDescription(`Discover ${totalResults} results for ${decodedTerm}`),
      type: 'website',
      url: canonicalUrl,
      siteName: 'NameVerse',
    },
    twitter: {
      card: 'summary_large_image',
      title: validateMetaTitle(`${decodedTerm} - Names`),
      description: validateMetaDescription(`Discover ${totalResults} results for ${decodedTerm}`),
    },
    robots: { index: false, follow: true },
    alternates: { canonical: canonicalUrl, languages: { en: canonicalUrl, 'x-default': canonicalUrl } },
  };
};

// ---------------- ISR Static Pre-render ----------------
export async function generateStaticParams() {
  const popular = ['muhammad', 'fatima', 'ali', 'aisha', 'omar'];
  return popular.map((term) => ({ term: encodeURIComponent(term) }));
}

export const revalidate = 86400; // 24 hours ISR (Search terms are mostly stable)

// ---------------- Main Search Page ----------------
export default async function SearchPage({ params }) {
  const resolvedParams = await params;
  const { term } = resolvedParams;
  const decodedTerm = decodeURIComponent(term);
  const { names, totalNames, totalResults } = await fetchSearchResults(decodedTerm);

  if (!names.length) {
    return notFound();
  }

  // Structured Data
  const searchSchema = {
    '@context': 'https://schema.org',
    '@type': 'SearchResultsPage',
    name: `Results for ${decodedTerm}`,
    url: `${DOMAIN}/search/${encodeURIComponent(decodedTerm)}`,
    description: `${totalResults} results for "${decodedTerm}"`,
  };

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    numberOfItems: totalResults,
    itemListElement: [
      ...names.map((name, idx) => ({
        '@type': 'Thing',
        position: idx + 1,
        name: name.name || name.title,
        description: name.short_meaning || '',
        url: `${DOMAIN}/${name.slug || `names/${name._id}`}`,
      })),
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: DOMAIN },
      { '@type': 'ListItem', position: 2, name: 'Search', item: `${DOMAIN}/search` },
      { '@type': 'ListItem', position: 3, name: decodedTerm, item: `${DOMAIN}/search/${encodeURIComponent(decodedTerm)}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(searchSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <SearchResultsClient
        initialNames={names}
        searchTerm={decodedTerm}
        totalNames={totalNames}
      />
    </>
  );
}
