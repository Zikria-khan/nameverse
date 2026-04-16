'use client';

import { useState, useEffect, useMemo, useCallback, useTransition, memo } from 'react';
import {
  Search, X, Filter, ChevronLeft, ChevronRight, Heart, Globe, Star, BookOpen, User, Hash
} from 'lucide-react';
import { useRouter } from 'next/navigation';

// ==========================================
// CONFIGURATION
// ==========================================

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || 'https://namverse-api.vercel.app';

const RELIGIONS = [
  { 
    id: 'islamic', 
    label: 'Islamic', 
    color: 'blue',
    description: 'Discover authentic Islamic names with deep spiritual meanings rooted in Quranic traditions and Arabic heritage.'
  },
  { 
    id: 'christian', 
    label: 'Christian', 
    color: 'indigo',
    description: 'Explore biblical Christian names inspired by saints, apostles, and sacred scripture with timeless significance.'
  },
  { 
    id: 'hindu', 
    label: 'Hindu', 
    color: 'purple',
    description: 'Find beautiful Hindu names derived from Sanskrit, honoring deities, virtues, and ancient Vedic wisdom.'
  }
];

const GENDERS = [
  { value: '', label: 'All' },
  { value: 'male', label: 'Boys' },
  { value: 'female', label: 'Girls' },
  { value: 'unisex', label: 'Unisex' }
];

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

// ==========================================
// API FUNCTIONS
// ==========================================

async function fetchNames(religion, params) {
  try {
    const queryParams = new URLSearchParams({
      religion,
      ...params
    });
    const response = await fetch(`${API_BASE}/api/v1/names?${queryParams}`);
    return await response.json();
  } catch (error) {
    
    return { success: false, data: [], pagination: {} };
  }
}

function normalizeGender(gender) {
  const g = (gender || '').toLowerCase();
  if (g.includes('male') && !g.includes('female')) return 'male';
  if (g.includes('female') && !g.includes('male')) return 'female';
  if (g.includes('unisex') || g.includes('neutral')) return 'unisex';
  return 'other';
}

// ==========================================
// COMPONENTS
// ==========================================

const NameCard = memo(function NameCard({ name, onFavorite, isFavorite, religion }) {
  const genderColors = {
    male: 'bg-blue-50 text-blue-700 border-blue-200',
    female: 'bg-pink-50 text-pink-700 border-pink-200',
    unisex: 'bg-purple-50 text-purple-700 border-purple-200',
    other: 'bg-gray-50 text-gray-700 border-gray-200'
  };

  const normalized = normalizeGender(name.gender);

  return (
    <article className="bg-white rounded-xl p-4 border border-gray-200 hover:border-gray-400 hover:shadow-xl transition-all duration-300 group">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <a href={`/names/${religion}/${name.slug}`} className="block group-hover:scale-105 transition-transform duration-200">
            <h3 className="text-lg font-bold text-gray-900 mb-1 leading-tight hover:text-blue-600 transition-colors">
              {name.name}
            </h3>
          </a>
          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${genderColors[normalized]}`}>
            <User className="w-3 h-3" />
            {name.gender}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onFavorite(name._id);
          }}
          className={`flex-shrink-0 p-2 rounded-full transition-all ${
            isFavorite
              ? 'bg-red-50 text-red-500'
              : 'bg-gray-50 text-gray-400 hover:bg-red-50 hover:text-red-500'
          }`}
          aria-label="Add to favorites"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-current' : ''}`} />
        </button>
      </div>

      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
        {name.short_meaning || name.meaning || name.long_meaning || 'Meaningful name with deep cultural significance'}
      </p>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-3">
          {name.lucky_number && (
            <div className="flex items-center gap-1" title="Lucky Number">
              <Hash className="w-3.5 h-3.5 text-purple-500" />
              <span className="text-xs font-semibold text-gray-700">
                {name.lucky_number}
              </span>
            </div>
          )}
          {name.origin && (
            <span className="text-xs text-gray-500 font-medium">
              {name.origin}
            </span>
          )}
        </div>
        <a
          href={`/names/${religion}/${name.slug}`}
          className="px-4 py-2 bg-gradient-to-r from-gray-900 to-gray-700 text-white rounded-lg text-xs font-semibold hover:from-gray-800 hover:to-gray-600 transition-all shadow-sm hover:shadow-md"
        >
          Explore →
        </a>
      </div>
    </article>
  );
});

function SkeletonCard() {
  return (
    <div className="bg-white rounded-xl p-4 border border-gray-200 animate-pulse">
      <div className="flex justify-between mb-3">
        <div className="flex-1">
          <div className="h-5 bg-gray-200 rounded w-2/3 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
        </div>
        <div className="w-8 h-8 bg-gray-200 rounded-full" />
      </div>
      <div className="space-y-2 mb-3">
        <div className="h-3 bg-gray-100 rounded" />
        <div className="h-3 bg-gray-100 rounded w-5/6" />
      </div>
      <div className="flex gap-2">
        <div className="h-5 bg-gray-200 rounded-full w-12" />
        <div className="h-5 bg-gray-200 rounded-full w-12" />
      </div>
    </div>
  );
}

function CompactPagination({ current, total, onChange }) {
  if (total <= 1) return null;

  const showPages = [];
  
  if (total <= 5) {
    for (let i = 1; i <= total; i++) showPages.push(i);
  } else {
    showPages.push(1);
    if (current > 3) showPages.push('...');
    
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);
    for (let i = start; i <= end; i++) {
      if (!showPages.includes(i)) showPages.push(i);
    }
    
    if (current < total - 2) showPages.push('...');
    showPages.push(total);
  }

  return (
    <nav className="flex items-center justify-center gap-2 mt-8" aria-label="Pagination">
      <button
        onClick={() => onChange(current - 1)}
        disabled={current === 1}
        className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {showPages.map((page, idx) => (
        page === '...' ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
        ) : (
          <button
            key={page}
            onClick={() => onChange(page)}
            className={`min-w-[36px] h-9 px-3 rounded-lg text-sm font-semibold transition-colors ${
              page === current
                ? 'bg-gray-900 text-white'
                : 'border border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
            aria-label={`Page ${page}`}
            aria-current={page === current ? 'page' : undefined}
          >
            {page}
          </button>
        )
      ))}

      <button
        onClick={() => onChange(current + 1)}
        disabled={current === total}
        className="p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </nav>
  );
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function ReligiousNamesBrowser({ 
  initialReligion = 'islamic',
  initialNames = [],
  initialFilters = {},
  initialTotalPages = 1,
  initialTotalCount = 0
}) {
  const router = useRouter();
  
  const [religion, setReligion] = useState(initialReligion);
  const [names, setNames] = useState(initialNames);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(40);
  const [gender, setGender] = useState('');
  const [sort, setSort] = useState('asc');
  const [search, setSearch] = useState('');
  const [startsWith, setStartsWith] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [totalPages, setTotalPages] = useState(initialTotalPages);
  const [totalCount, setTotalCount] = useState(initialTotalCount);
  const [isPending, startTransition] = useTransition();

  const currentReligion = RELIGIONS.find(r => r.id === religion) || RELIGIONS[0];

  // Load names when filters change with optimized debouncing
  useEffect(() => {
    if (page === 1 && !gender && !search && !startsWith && sort === 'asc' && names.length > 0) {
      return;
    }

    const timer = setTimeout(() => {
      setLoading(true);
      const params = {
        page,
        limit: pageSize,
        sort,
        ...(gender && { gender }),
        ...(search && { search }),
        ...(startsWith && { startsWith })
      };

      fetchNames(religion, params)
        .then(data => {
          if (data.success) {
            setNames(data.data || []);
            setTotalPages(data.pagination?.totalPages || 1);
            setTotalCount(data.pagination?.totalCount || 0);
          }
        })
        .catch(error => {
          console.error('Error fetching names:', error);
          setNames([]);
        })
        .finally(() => setLoading(false));
    }, search ? 500 : 100); // Longer debounce for search

    return () => clearTimeout(timer);
  }, [page, pageSize, sort, gender, search, startsWith, religion, names.length]);

  const handleReligionChange = (newReligion) => {
    setReligion(newReligion);
    setPage(1);
    setGender('');
    setSearch('');
    setStartsWith('');
    router.push(`/names/${newReligion}`);
  };

  const handlePageChange = useCallback((newPage) => {
    startTransition(() => {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  const clearFilters = useCallback(() => {
    setGender('');
    setSearch('');
    setStartsWith('');
    setSort('asc');
    setPage(1);
  }, []);

  const toggleFavorite = useCallback((id) => {
    setFavorites(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const activeFilters = useMemo(
    () => [gender, search, startsWith, sort !== 'asc'].filter(Boolean).length,
    [gender, search, startsWith, sort]
  );

  const filteredNames = useMemo(() => names, [names]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <ol className="flex items-center gap-2 text-sm flex-wrap">
            <li>
              <a href="/" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                Home
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <a href="/names" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                All Names
              </a>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-700 font-semibold">{currentReligion.label} Names</li>
          </ol>
        </div>
      </nav>

      {/* Header - Search and Filters Only */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between gap-4 mb-4">
              {/* Search & Filter */}
              <div className="flex items-center gap-2 w-full justify-end">
                <div className="hidden md:block relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search names..."
                    value={search}
                    onChange={(e) => {
                      setSearch(e.target.value);
                      setPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900 transition-all"
                  />
                  {search && (
                    <button
                      onClick={() => setSearch('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="relative p-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
                  aria-label="Toggle filters"
                >
                  <Filter className="w-5 h-5" />
                  {activeFilters > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-gray-900 text-white text-xs font-bold rounded-full flex items-center justify-center">
                      {activeFilters}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Religion Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {RELIGIONS.map(r => (
                <button
                  key={r.id}
                  onClick={() => handleReligionChange(r.id)}
                  className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-colors ${
                    religion === r.id
                      ? 'bg-gray-900 text-white'
                      : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="search"
                placeholder="Search names..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="w-full pl-10 pr-10 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="pb-4 space-y-4 border-t border-gray-200 pt-4">
              {/* Gender Filter */}
              <div>
                <label className="text-xs font-semibold text-gray-700 mb-2 block">Gender</label>
                <div className="flex flex-wrap gap-2">
                  {GENDERS.map(g => (
                    <button
                      key={g.value || 'all'}
                      onClick={() => {
                        setGender(g.value);
                        setPage(1);
                      }}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${
                        gender === g.value
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {g.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Alphabet Filter */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-semibold text-gray-700">Starting Letter</label>
                  <button
                    onClick={() => {
                      setStartsWith('');
                      setPage(1);
                    }}
                    className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                      !startsWith
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    All
                  </button>
                </div>
                <div className="flex flex-wrap gap-1">
                  {ALPHABET.map(letter => (
                    <button
                      key={letter}
                      onClick={() => {
                        setStartsWith(letter);
                        setPage(1);
                      }}
                      className={`w-9 h-9 rounded-lg text-xs font-semibold transition-colors ${
                        startsWith === letter
                          ? 'bg-gray-900 text-white'
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort & Clear */}
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setSort('asc');
                      setPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      sort === 'asc'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    A → Z
                  </button>
                  <button
                    onClick={() => {
                      setSort('desc');
                      setPage(1);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
                      sort === 'desc'
                        ? 'bg-gray-900 text-white'
                        : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    Z → A
                  </button>
                </div>
                
                {activeFilters > 0 && (
                  <button
                    onClick={clearFilters}
                    className="px-3 py-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:bg-red-700 transition-colors"
                  >
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading || isPending ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: pageSize }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : filteredNames.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredNames.map(name => (
                <NameCard
                  key={name._id}
                  name={name}
                  religion={religion}
                  onFavorite={toggleFavorite}
                  isFavorite={favorites.has(name._id)}
                />
              ))}
            </div>
            <CompactPagination
              current={page}
              total={totalPages}
              onChange={handlePageChange}
            />
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">No names found</h3>
            <p className="text-sm text-gray-600 mb-6">Try adjusting your search or filters</p>
            <button
              onClick={clearFilters}
              className="px-6 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-semibold hover:bg-gray-800 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* SEO Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl p-8 border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            {currentReligion.label} Baby Names
          </h2>
          <div className="prose max-w-none text-gray-700 space-y-4">
            <p className="text-lg leading-relaxed">
              {currentReligion.description}
            </p>
            <p className="leading-relaxed">
              Our comprehensive collection features over <strong>{totalCount.toLocaleString()} authentic {currentReligion.label.toLowerCase()} names</strong>, each carefully researched and verified by cultural experts. Browse names by gender, starting letter, or search by meaning to find the perfect name for your baby.
            </p>
            
            {/* FAQ */}
            <div className="mt-8 space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h3>
              
              <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  How do I choose the right {currentReligion.label.toLowerCase()} name?
                </summary>
                <p className="mt-2 text-sm text-gray-700">
                  Consider the name's meaning, pronunciation, and cultural significance. Use our filters to narrow down options by gender and starting letter.
                </p>
              </details>

              <details className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <summary className="font-semibold text-gray-900 cursor-pointer">
                  Are these names authentic and verified?
                </summary>
                <p className="mt-2 text-sm text-gray-700">
                  Yes, all names are verified by cultural experts and religious scholars to ensure accuracy and authenticity.
                </p>
              </details>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}
