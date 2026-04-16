'use client';
import React, { useState, useMemo, useCallback, useEffect, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, ChevronLeft, ChevronRight, Star, Heart, Globe, Sparkles, BookOpen, Tag, ArrowUp, Loader2, Filter, SlidersHorizontal, X
} from 'lucide-react';

export default function NamesDatabaseClient({
  initialNames = [],
  initialTotal = 0,
  initialReligion = "islamic",
  initialLetter = "A",
  initialPage = 1,
  perPageDefault = 20,
  initialSort = "popularity",
  selectedReligion: propReligion,
  selectedLetter: propLetter,
  totalResults: propTotalResults
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [selectedReligion, setSelectedReligion] = useState(propReligion || initialReligion);
  const [selectedLetter, setSelectedLetter] = useState(propLetter || initialLetter);

  // Sync state with props when they change (for dynamic imports)
  useEffect(() => {
    if (propReligion) setSelectedReligion(propReligion);
  }, [propReligion]);

  useEffect(() => {
    if (propLetter) setSelectedLetter(propLetter);
  }, [propLetter]);
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sortBy, setSortBy] = useState(initialSort);
  const [searchTerm, setSearchTerm] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [favorites, setFavorites] = useState(new Set());
  const [displayedCount, setDisplayedCount] = useState(perPageDefault);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [genderFilter, setGenderFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  const names = initialNames;
  const totalResults = propTotalResults || initialTotal;
  const perPage = perPageDefault;

  const religions = useMemo(() => [
    { value: 'islamic', label: 'Islamic', icon: Star, color: 'from-emerald-500 to-teal-600' },
    { value: 'hindu', label: 'Hindu', icon: Sparkles, color: 'from-orange-500 to-red-600' },
    { value: 'christian', label: 'Christian', icon: Globe, color: 'from-blue-500 to-indigo-600' }
  ], []);

  const alphabet = useMemo(() => 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''), []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleReligionChange = useCallback((religion) => {
    startTransition(() => {
      setSelectedReligion(religion);
      router.push(`/names/${religion}/${selectedLetter.toLowerCase()}`);
    });
  }, [selectedLetter, router, startTransition]);

  const handleLetterChange = useCallback((letter) => {
    startTransition(() => {
      setSelectedLetter(letter);
      router.push(`/names/${selectedReligion}/${letter.toLowerCase()}`);
    });
  }, [selectedReligion, router, startTransition]);

  const handlePageChange = useCallback((number) => {
    setCurrentPage(number);
    scrollToTop();
  }, [scrollToTop]);

  const toggleFavorite = useCallback((nameId, e) => {
    e.stopPropagation();
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(nameId)) {
        newFavorites.delete(nameId);
      } else {
        newFavorites.add(nameId);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('name-favorites', JSON.stringify([...newFavorites]));
      }
      return newFavorites;
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('name-favorites');
      if (saved) setFavorites(new Set(JSON.parse(saved)));
    }
  }, []);

  const filteredNames = useMemo(() => {
    let filtered = names;
    
    // Gender filter
    if (genderFilter !== 'all') {
      filtered = filtered.filter(name => name.gender?.toLowerCase() === genderFilter);
    }
    
    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase().trim();
      filtered = filtered.filter(name =>
        (name.name ?? '').toLowerCase().includes(term) ||
        (name.short_meaning ?? '').toLowerCase().includes(term) ||
        (name.origin ?? '').toLowerCase().includes(term)
      );
    }
    
    return filtered;
  }, [names, searchTerm, genderFilter]);

  // Paginated names with load more
  const displayedNames = useMemo(() => {
    return filteredNames.slice(0, displayedCount);
  }, [filteredNames, displayedCount]);

  const hasMoreToLoad = displayedCount < filteredNames.length;
  const totalPages = Math.ceil(filteredNames.length / perPage);

  const handleLoadMore = useCallback(() => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + perPageDefault, filteredNames.length));
      setIsLoadingMore(false);
    }, 500);
  }, [perPageDefault, filteredNames.length]);

  useEffect(() => {
    setDisplayedCount(perPageDefault);
  }, [selectedReligion, selectedLetter, searchTerm, genderFilter, perPageDefault]);

  const currentReligion = religions.find(r => r.value === selectedReligion);

  const NameCard = React.memo(({ name }) => (
    <article className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 hover:shadow-lg hover:border-indigo-300 transition-all duration-300 cursor-pointer group transform hover:-translate-y-1">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-gray-900 mb-1.5 truncate group-hover:text-indigo-600 transition-colors">
            {name.name}
          </h3>
          <p className="text-sm font-semibold text-indigo-600 mb-2 line-clamp-1">
            {name.short_meaning}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
              name.gender === 'male' ? 'bg-blue-100 text-blue-700 border border-blue-200' :
              name.gender === 'female' ? 'bg-pink-100 text-pink-700 border border-pink-200' :
              'bg-purple-100 text-purple-700 border border-purple-200'
            }`}>
              {name.gender}
            </span>
            <span className="text-xs text-gray-600 flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-full">
              <Globe className="w-3 h-3" />
              {name.origin}
            </span>
          </div>
        </div>
        <button
          onClick={(e) => toggleFavorite(name._id || name.name, e)}
          className="p-2 rounded-full hover:bg-red-50 flex-shrink-0 transition-colors"
          aria-label="Add to favorites"
        >
          <Heart className={`w-5 h-5 transition-all ${favorites.has(name._id || name.name) ? 'fill-red-500 text-red-500 scale-110' : 'text-gray-300 hover:text-red-400'}`} />
        </button>
      </div>

      {name.long_meaning && (
        <p className="text-xs text-gray-600 leading-relaxed mb-3 line-clamp-2">
          {name.long_meaning}
        </p>
      )}

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
            />
          ))}
          <span className="text-xs text-indigo-600 ml-1.5 font-bold">4.0</span>
        </div>
        <button className="px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-xs font-semibold hover:shadow-lg transition-all transform hover:scale-105">
          View Details
        </button>
      </div>
    </article>
  ));

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Enhanced Header */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`p-2 bg-gradient-to-br ${currentReligion?.color} rounded-xl shadow-lg`}>
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className={`text-lg font-bold bg-gradient-to-r ${currentReligion?.color} bg-clip-text text-transparent`}>
                    {selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1)} Names
                  </h1>
                  <p className="text-xs text-gray-600">
                    {filteredNames.length.toLocaleString()} of {totalResults.toLocaleString()} names
                  </p>
                </div>
              </div>

              {/* Desktop Search & Filter */}
              <div className="hidden md:flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="search"
                    placeholder="Search names..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 w-64 text-sm shadow-sm"
                  />
                </div>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-2 rounded-xl border transition-all ${showFilters ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'}`}
                >
                  <SlidersHorizontal className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Religion Tabs */}
            <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {religions.map(({ value, label, icon: Icon, color }) => (
                <button
                  key={value}
                  onClick={() => handleReligionChange(value)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm transition-all whitespace-nowrap ${
                    selectedReligion === value
                      ? `bg-gradient-to-r ${color} text-white shadow-lg transform scale-105`
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        {/* Mobile Search & Filter */}
        <div className="md:hidden px-4 pt-4">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="search"
                placeholder="Search names..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 bg-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 text-sm shadow-sm"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-xl border transition-all ${showFilters ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-white text-gray-600 border-gray-300'}`}
            >
              <SlidersHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Enhanced Filters Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-4">
          <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 transition-all">
            {/* Gender Filter (Always Visible) */}
            {showFilters && (
              <div className="mb-4 pb-4 border-b border-gray-200">
                <label className="text-sm font-bold text-gray-900 mb-3 block flex items-center gap-2">
                  <Filter className="w-4 h-4 text-indigo-600" />
                  Gender Filter
                </label>
                <div className="flex flex-wrap gap-2">
                  {['all', 'male', 'female', 'unisex'].map((gender) => (
                    <button
                      key={gender}
                      onClick={() => setGenderFilter(gender)}
                      className={`px-4 py-2 rounded-xl font-semibold text-sm transition-all ${
                        genderFilter === gender
                          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {gender.charAt(0).toUpperCase() + gender.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Alphabet Filter */}
            <div>
              <label className="text-sm font-bold text-gray-900 mb-3 block flex items-center gap-2">
                <Tag className="w-4 h-4 text-indigo-600" />
                Select Letter
              </label>
              <div className="grid grid-cols-13 sm:grid-cols-13 gap-2">
                {alphabet.map((letter) => (
                  <button
                    key={letter}
                    onClick={() => handleLetterChange(letter)}
                    disabled={isPending}
                    className={`aspect-square rounded-xl font-bold text-sm transition-all transform disabled:opacity-50 ${
                      selectedLetter === letter
                        ? `bg-gradient-to-br ${currentReligion?.color} text-white shadow-lg scale-110`
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                    }`}
                  >
                    {letter}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Filters */}
            {(searchTerm || genderFilter !== 'all') && (
              <div className="mt-4 pt-4 border-t border-gray-200 flex items-center gap-2 flex-wrap">
                <span className="text-xs font-semibold text-gray-600">Active Filters:</span>
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold hover:bg-indigo-200 transition-colors"
                  >
                    Search: {searchTerm}
                    <X className="w-3 h-3" />
                  </button>
                )}
                {genderFilter !== 'all' && (
                  <button
                    onClick={() => setGenderFilter('all')}
                    className="flex items-center gap-1 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold hover:bg-indigo-200 transition-colors"
                  >
                    Gender: {genderFilter}
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        {/* Names Grid */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 pb-6">
          {displayedNames.length === 0 ? (
            <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center shadow-md">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-bold mb-2 text-gray-700">No names found</h3>
              <p className="text-sm text-gray-500 mb-4">
                {searchTerm ? 'Try a different search term' : 'Try selecting a different letter or filter'}
              </p>
              {(searchTerm || genderFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setGenderFilter('all');
                  }}
                  className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all"
                >
                  Clear All Filters
                </button>
              )}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
                {displayedNames.map((name) => (
                  <NameCard key={name._id || name.name} name={name} />
                ))}
              </div>

              {/* Load More or Pagination */}
              <div className="flex flex-col items-center gap-4">
                {hasMoreToLoad ? (
                  <button
                    onClick={handleLoadMore}
                    disabled={isLoadingMore}
                    className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all disabled:opacity-50 flex items-center gap-2 transform hover:scale-105"
                  >
                    {isLoadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Load More Names
                        <span className="bg-white/20 px-3 py-0.5 rounded-full text-xs">
                          {filteredNames.length - displayedCount} remaining
                        </span>
                      </>
                    )}
                  </button>
                ) : (
                  <div className="text-center">
                    <p className="text-sm text-gray-600 mb-2">
                      Showing all {filteredNames.length} names
                    </p>
                  </div>
                )}

                {/* Page Indicator */}
                {totalPages > 1 && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setDisplayedCount(Math.max(perPage, displayedCount - perPage));
                        scrollToTop();
                      }}
                      disabled={displayedCount <= perPage}
                      className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    
                    <span className="text-sm text-gray-600 font-medium px-4">
                      Page {Math.ceil(displayedCount / perPage)} of {totalPages}
                    </span>

                    <button
                      onClick={() => {
                        if (hasMoreToLoad) {
                          handleLoadMore();
                        }
                      }}
                      disabled={!hasMoreToLoad}
                      className="p-2 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </main>

        {/* SEO Content Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 md:p-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Discover {selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1)} Baby Names Starting with {selectedLetter}
            </h2>
            
            <div className="prose prose-sm md:prose-base max-w-none text-gray-700 space-y-6">
              <p className="text-lg leading-relaxed">
                Welcome to our comprehensive collection of {selectedReligion} baby names beginning with the letter {selectedLetter}. 
                Browse through {totalResults.toLocaleString()} carefully curated {selectedReligion} names, each with authentic meanings, 
                origins, and cultural significance. Whether you're looking for traditional {selectedReligion} names or modern variations, 
                our database helps you find the perfect name for your baby boy or baby girl.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                Popular {selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1)} Names with {selectedLetter}
              </h3>
              <p className="leading-relaxed">
                Our database includes the most popular and trending {selectedReligion} baby names that start with {selectedLetter}. 
                Each name entry provides detailed information including meaning in original language, origin country, gender classification, 
                and cultural background. Perfect for parents seeking meaningful {selectedReligion} names for their newborn baby.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1)} Boy Names Starting with {selectedLetter}
              </h3>
              <p className="leading-relaxed">
                Find strong and meaningful {selectedReligion} boy names beginning with {selectedLetter}. Our collection features 
                traditional masculine names with deep spiritual and cultural roots, modern interpretations, and unique variations. 
                Each boy name includes pronunciation guide, meaning, and historical significance in {selectedReligion} tradition.
              </p>

              <h3 className="text-2xl font-bold text-gray-900 mt-8 mb-4">
                {selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1)} Girl Names Starting with {selectedLetter}
              </h3>
              <p className="leading-relaxed">
                Explore beautiful and elegant {selectedReligion} girl names that begin with the letter {selectedLetter}. Discover 
                feminine names with graceful meanings, from classic traditional names to contemporary choices. Each girl name 
                is accompanied by its authentic meaning, origin, and cultural context within {selectedReligion} heritage.
              </p>

              {/* FAQ Section */}
              <div className="mt-10 pt-8 border-t-2 border-gray-200">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
                
                <div className="space-y-6">
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border border-indigo-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      How many {selectedReligion} names starting with {selectedLetter} are available?
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Our database contains {totalResults.toLocaleString()} authentic {selectedReligion} baby names that begin with 
                      the letter {selectedLetter}, including both traditional and modern variations with complete meanings and origins.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      What information is provided for each {selectedReligion} name?
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Each name includes authentic meaning, origin country, gender classification, religious significance, 
                      cultural background, and popularity rating within {selectedReligion} communities worldwide.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Are these {selectedReligion} names authentic and verified?
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Yes, all {selectedReligion} names in our database are carefully researched and verified from authentic 
                      religious texts, scholarly sources, and linguistic experts specializing in {selectedReligion} nomenclature. 
                      We ensure accuracy of meanings and cultural appropriateness.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-6 border border-emerald-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      Can I search for {selectedReligion} names by gender?
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Absolutely! Each {selectedReligion} name is categorized by gender (boy, girl, or unisex). You can easily 
                      browse {selectedReligion} boy names and girl names separately using our gender filter, all starting with the letter {selectedLetter}.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl p-6 border border-orange-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      What makes a good {selectedReligion} baby name?
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      A good {selectedReligion} name typically has positive meaning, cultural significance, easy pronunciation, 
                      and aligns with {selectedReligion} values and traditions. Our database helps you find names that meet 
                      all these criteria while starting with your preferred letter {selectedLetter}.
                    </p>
                  </div>

                  <div className="bg-gradient-to-r from-rose-50 to-pink-50 rounded-xl p-6 border border-rose-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-3">
                      How do I choose between similar {selectedReligion} names?
                    </h4>
                    <p className="text-gray-700 leading-relaxed">
                      Consider the meaning, origin, family traditions, ease of pronunciation, and personal connection. Our detailed 
                      entries for {selectedReligion} names starting with {selectedLetter} provide all information needed to make 
                      an informed decision. You can also save favorites for comparison using the heart icon.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all z-50 transform hover:scale-110"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </>
  );
}