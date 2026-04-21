import GlobalSearchClient from './GlobalSearchClient';
import { Suspense } from 'react';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

export const metadata = {
  title: validateMetaTitle('Search - Find Names | NameVerse'),
  description: validateMetaDescription('Search across our collection of baby names. Find exactly what you are looking for.'),
  keywords: ['search', 'find names', 'baby name search'],
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
