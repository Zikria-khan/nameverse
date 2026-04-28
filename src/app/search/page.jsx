import GlobalSearchClient from './GlobalSearchClient';
import { Suspense } from 'react';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

export const metadata = {
  title: validateMetaTitle('Search Baby Names by Meaning, Origin & Letter | NameVerse'),
  description: validateMetaDescription(
    'Search NameVerse to find the perfect baby name. Explore Islamic, Hindu, and Christian names by meaning, origin, gender, lucky number, and pronunciation.'
  ),
  keywords: [
    'search baby names',
    'find baby names',
    'baby name search',
    'search names by meaning',
    'search names by origin',
    'search names by religion',
    'NameVerse search',
    'best baby name search',
    'find name meanings',
    'baby name finder',
    'name search engine',
    'search names with meaning'
  ].join(', '),
  openGraph: {
    title: validateMetaTitle('Search Baby Names by Meaning, Origin & Letter | NameVerse'),
    description: validateMetaDescription(
      'Find the perfect baby name on NameVerse. Search by meaning, origin, gender, lucky number, and pronunciation for Islamic, Hindu, and Christian names.'
    ),
    url: `${SITE_URL}/search`,
    type: 'website',
    siteName: 'NameVerse',
  },
  alternates: {
    canonical: `${SITE_URL}/search`,
    languages: { en: `${SITE_URL}/search`, 'x-default': `${SITE_URL}/search` }
  }
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-600">Loading search…</div>}>
      <GlobalSearchClient />
    </Suspense>
  );
}
