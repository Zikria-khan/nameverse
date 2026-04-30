// Use dynamic rendering to avoid static generation for pagination pages
export const dynamic = 'force-dynamic';

import { validateMetaTitle, validateMetaDescription, generateCanonicalUrl } from '@/lib/seo/meta-helpers';
import LetterNamesClient from '@/components/names/LetterNamesClient';

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function normalizeReligion(religion) {
  if (!religion || typeof religion !== 'string') return null;
  const normalized = religion.toLowerCase();
  return VALID_RELIGIONS.includes(normalized) ? normalized : null;
}

function normalizeLetter(letter) {
  if (!letter || typeof letter !== 'string') return 'A';
  return /^[A-Z#]$/i.test(letter) ? letter.toUpperCase() : 'A';
}

function normalizePage(page) {
  const pageNumber = parseInt(page, 10);
  return Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
}

export async function generateMetadata({ params }) {
  const religion = normalizeReligion(params.religion) || 'islamic';
  const letter = normalizeLetter(params.letter);
  const page = normalizePage(params.page);
  const religionLabel = religion.charAt(0).toUpperCase() + religion.slice(1);
  const canonical = generateCanonicalUrl(`/names/${religion}/letter/${letter}/${page}`);

  return {
    title: validateMetaTitle(`${religionLabel} baby names starting with ${letter} | NameVerse`),
    description: validateMetaDescription(
      `Search ${religionLabel} baby names starting with ${letter}. Browse page ${page} of letter-based name lists with meanings, origins, and gender-specific recommendations.`
    ),
    keywords: [
      `${religionLabel} baby names starting with ${letter}`,
      `${letter} letter baby names`,
      `${religionLabel} names by letter`,
      `baby names starting with ${letter}`,
      `search ${letter} names`,
      `find ${letter} baby names`,
      `NameVerse`,
      `baby name search by letter`,
      `top ${letter} baby names`,
      `search baby names by first letter`
    ].join(', '),
    openGraph: {
      title: validateMetaTitle(`${religionLabel} baby names starting with ${letter} | NameVerse`),
      description: validateMetaDescription(
        `Browse ${religionLabel} baby names that begin with ${letter} on NameVerse. Find meanings, origins, and popular names.`
      ),
      url: canonical,
      type: 'website',
      siteName: 'NameVerse',
    },
    alternates: {
      canonical,
      languages: {
        en: canonical,
        'x-default': canonical,
      },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LetterNamesPage({ params }) {
  const rawParams = await params;
  const religion = normalizeReligion(rawParams?.religion) || 'islamic';
  const letter = normalizeLetter(rawParams?.letter);
  const page = normalizePage(rawParams?.page);

  return (
    <LetterNamesClient
      key={`${religion}-${letter}-${page}`}
      selectedReligion={religion}
      letter={letter}
      page={page}
    />
  );
}
