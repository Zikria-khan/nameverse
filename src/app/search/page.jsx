import GlobalSearchClient from './GlobalSearchClient';
import { Suspense } from 'react';

export const metadata = {
  title: 'Search - Find Names | NameVerse',
  description: 'Search across our collection of baby names. Find exactly what you are looking for.',
  keywords: ['search', 'find names', 'baby name search'],
};

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="p-6 text-center text-gray-600">Loading search…</div>}>
      <GlobalSearchClient />
    </Suspense>
  );
}
