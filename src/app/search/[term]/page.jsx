import SearchResultsClient from './ClientComponent';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';

const DOMAIN = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

// Use static rendering with ISR for popular search terms
export const dynamic = 'force-static';
export const revalidate = 604800;
export const dynamicParams = true;

// ---------------- Metadata ----------------
export const generateMetadata = async ({ params }) => {
  const resolvedParams = await params;
  const { term } = resolvedParams;
  const decodedTerm = decodeURIComponent(term || '');
  const canonicalUrl = `${DOMAIN}/search/${encodeURIComponent(decodedTerm)}`;

  return {
    title: validateMetaTitle(`${decodedTerm} - Names | NameVerse`),
    description: validateMetaDescription(`Search NameVerse for ${decodedTerm} and discover baby names, meanings, origins, and pronunciation details.`),
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
      description: validateMetaDescription(`Search NameVerse for ${decodedTerm} and discover baby names, meanings, and cultural origins.`),
      type: 'website',
      url: canonicalUrl,
      siteName: 'NameVerse',
    },
    twitter: {
      card: 'summary_large_image',
      title: validateMetaTitle(`${decodedTerm} - Names`),
      description: validateMetaDescription(`Search NameVerse for ${decodedTerm} and discover baby names, meanings, and cultural origins.`),
    },
    robots: { index: false, follow: true },
    alternates: { canonical: canonicalUrl, languages: { en: canonicalUrl, 'x-default': canonicalUrl } },
  };
};

// ---------------- ISR Static Pre-render ----------------
export async function generateStaticParams() {
  const popular = [
    'muhammad', 'fatima', 'ali', 'aisha', 'omar', 'maryam', 'ibrahim', 'zahra',
    'yusuf', 'khadija', 'salman', 'hassan', 'hussein', 'zainab', 'ayesha', 'abdullah',
    'umar', 'abdul', 'noor', 'sara', 'mariam', 'aiman', 'ahmed', 'bilal', 'farah',
    'noah', 'sophia', 'james', 'mary', 'david', 'sarah', 'matthew', 'elizabeth',
    'joseph', 'anna', 'john', 'emma', 'michael', 'olivia', 'william', 'ava',
    'alexander', 'isabella', 'daniel', 'mia', 'lucas', 'charlotte', 'henry', 'amelia',
    'aarav', 'saanvi', 'vihaan', 'ananya', 'arjun', 'diya', 'krishna', 'priya',
    'rohan', 'meera', 'rahul', 'isha', 'aditya', 'sneha', 'vikram', 'kavya',
    'dev', 'lila', 'raj', 'maya', 'sanjay', 'nisha', 'amit', 'priya',
    'strong', 'beautiful', 'peace', 'love', 'light', 'grace', 'victory', 'noble',
    'arabic', 'hebrew', 'sanskrit', 'greek', 'latin', 'persian',
  ];
  return [...new Set(popular)].map((term) => ({ term: encodeURIComponent(term) }));
}

export default function SearchPage({ params }) {
  const { term } = params;
  const decodedTerm = decodeURIComponent(term || '');

  return (
    <SearchResultsClient searchTerm={decodedTerm} />
  );
}
