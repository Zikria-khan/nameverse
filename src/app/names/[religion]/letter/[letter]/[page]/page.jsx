import { validateMetaTitle, validateMetaDescription, generateCanonicalUrl } from '@/lib/seo/meta-helpers';
import { fetchNamesByLetter } from '@/lib/api/names';
import { Sparkles, Moon, ChevronLeft, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import FavoriteButton from '@/components/FavoriteButton';

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];
const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#'.split('');
const NAMES_PER_PAGE = 50;

export const dynamic = 'force-static';
export const revalidate = 86400;
export const dynamicParams = true;

function normalizeReligion(religion) {
  if (!religion || typeof religion !== 'string') return null;
  const normalized = religion.toLowerCase();
  if (normalized === 'islam' || normalized === 'muslim') return 'islamic';
  if (normalized === 'hinduism') return 'hindu';
  if (normalized === 'christianity') return 'christian';
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

function generateSlug(name) {
  if (!name || typeof name !== 'string') return '';
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export async function generateStaticParams() {
  const params = [];
  const religions = ['islamic', 'christian', 'hindu'];
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  for (const religion of religions) {
    for (const letter of letters) {
      params.push({
        religion,
        letter,
        page: '1',
      });
    }
  }
  
  return params;
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

  const response = await fetchNamesByLetter(letter, {
    religion,
    page,
    limit: NAMES_PER_PAGE,
    sort: 'asc',
  });

  const names = (response.data || []).filter(
    (item) => item.name && typeof item.name === 'string'
  );
  const pagination = response.pagination || { totalPages: 1, totalCount: 0 };
  
  const { totalPages = 1, totalCount = 0 } = pagination;
  const currentPage = Math.min(Math.max(page, 1), totalPages);
  const hasPrev = currentPage > 1;
  const hasNext = currentPage < totalPages;
  const createUrl = (newPage) => `/names/${religion}/letter/${letter}/${newPage}`;
  const prevUrl = hasPrev ? createUrl(currentPage - 1) : null;
  const nextUrl = hasNext ? createUrl(currentPage + 1) : null;

  return (
    <main className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-emerald-50">
      <section className="relative py-16 px-4 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full text-sm font-medium mb-8 border border-white/30">
            <Sparkles className="w-4 h-4" />
            <span>{totalCount} Names Found</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
            {religion.charAt(0).toUpperCase() + religion.slice(1)} Names Starting with "{letter}"
          </h1>
          <p className="text-lg md:text-xl text-emerald-100 max-w-4xl mx-auto mb-10 leading-relaxed">
            Page {currentPage} of {totalPages} • Discover beautiful names beginning with {letter}
          </p>
        </div>
      </section>

      <nav className="max-w-7xl mx-auto px-4 py-5" aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm">
          <li>
            <Link href="/" className="text-emerald-600 hover:text-emerald-800 font-medium">
              Home
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href={`/names/${religion}/letter/A/1`} className="text-emerald-600 hover:text-emerald-800 font-medium">
              All Names
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li>
            <Link href={`/names/${religion}/letter/A/1`} className="text-emerald-600 hover:text-emerald-800 font-medium">
              {religion.charAt(0).toUpperCase() + religion.slice(1)}
            </Link>
          </li>
          <li className="text-gray-400">/</li>
          <li className="text-emerald-700 font-semibold">Letter {letter}</li>
          <li className="text-gray-400">/</li>
          <li className="text-emerald-700 font-semibold">Page {currentPage}</li>
        </ol>
      </nav>

      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex flex-wrap justify-center gap-2">
          {ALPHABET.map((l) => (
            <Link
              key={l}
              href={`/names/${religion}/letter/${l}/1`}
              className={`w-10 h-10 flex items-center justify-center rounded-lg font-semibold transition-all ${
                l === letter
                  ? 'bg-emerald-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-emerald-100 border border-emerald-200'
              }`}
            >
              {l}
            </Link>
          ))}
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 pb-16">
        {names.length === 0 ? (
          <div className="text-center py-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No Names Found</h2>
            <p className="text-gray-600">No names starting with "{letter}" found. Try another letter.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
              {names.map((nameItem, index) => (
                <Link
                  key={index}
                  href={`/names/${religion}/${generateSlug(nameItem.name)}`}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-emerald-100 hover:border-emerald-300 group hover:-translate-y-1 block"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors">
                        {nameItem.name || 'Unknown'}
                      </h3>
                      {nameItem.quranicReference && (
                        <span className="inline-block mt-2 bg-emerald-100 text-emerald-700 text-xs px-3 py-1 rounded-full font-medium">
                          Quranic
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <FavoriteButton
                        nameData={{
                          name: nameItem.name,
                          slug: generateSlug(nameItem.name),
                          religion: religion,
                          meaning: nameItem.short_meaning || nameItem.meaning,
                          origin: nameItem.origin
                        }}
                        size="small"
                      />
                      <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                        <Moon className="w-6 h-6 text-emerald-600" />
                      </div>
                    </div>
                  </div>

                  <p className="text-emerald-600 font-semibold text-lg mb-4">
                    "{nameItem.short_meaning || nameItem.meaning || 'No meaning available'}"
                  </p>

                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Origin:</span>
                      <span>
                        {Array.isArray(nameItem.origin)
                          ? nameItem.origin.join(', ')
                          : nameItem.origin || 'Unknown'
                        }
                      </span>
                    </div>
                    {nameItem.luckyNumber && (
                      <div className="flex items-center justify-between">
                        <span className="font-medium">Lucky Number:</span>
                        <span className="inline-flex items-center justify-center w-8 h-8 bg-amber-100 text-amber-700 rounded-full font-bold">
                          {nameItem.luckyNumber || 'N/A'}
                        </span>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-center gap-4">
              {hasPrev && (
                <Link
                  href={prevUrl}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  Previous
                </Link>
              )}

              <span className="text-gray-600">
                Page {currentPage} of {totalPages}
              </span>

              {hasNext && (
                <Link
                  href={nextUrl}
                  className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl hover:bg-emerald-700 transition-colors"
                >
                  Next
                  <ChevronRight className="w-5 h-5" />
                </Link>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}