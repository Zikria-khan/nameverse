"use client";

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Filter, X, Loader2, Heart, Sparkles, BookOpen, Star, Users, Globe, ChevronRight, Zap, Gem, Palette, Tag } from 'lucide-react';
import { fetchFilters, fetchNames } from '@/lib/api/names';

export default function BabyNamesClient({ initialData, initialReligion = 'islamic' }) {
  const router = useRouter();
  const [religion, setReligion] = useState(initialReligion);
  const [filters, setFilters] = useState(initialData?.filters || null);
  const [names, setNames] = useState(initialData?.names || []);
  const [pagination, setPagination] = useState(initialData?.pagination || null);
  const [loading, setLoading] = useState(false);
  const [filtersLoading, setFiltersLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState(new Set());

  const [selectedFilters, setSelectedFilters] = useState({
    origin: '',
    language: '',
    category: '',
    theme: '',
    luckyDay: '',
    luckyColor: '',
    alphabet: '',
    luckyStone: '',
    gender: '',
  });

  const [currentPage, setCurrentPage] = useState(1);

  const deduplicateAndClean = useCallback((items) => {
    if (!items) return [];
    const seen = new Set();
    return items
      .map(item => item.replace(/\s*\([^)]*\)/g, "").trim())
      .filter(item => {
        const lower = item.toLowerCase();
        if (!lower || seen.has(lower)) return false;
        seen.add(lower);
        return true;
      })
      .sort();
  }, []);

  const loadFiltersFromCache = useCallback((religionKey) => {
    if (typeof window === 'undefined') return null;
    try {
      const cached = localStorage.getItem(`filters_${religionKey}`);
      if (cached) {
        const parsed = JSON.parse(cached);
        const cacheAge = Date.now() - (parsed.timestamp || 0);
        if (cacheAge < 24 * 60 * 60 * 1000) {
          return parsed.data;
        }
      }
    } catch (error) {
      
    }
    return null;
  }, []);

  const saveFiltersToCache = useCallback((religionKey, filtersData) => {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(`filters_${religionKey}`, JSON.stringify({
        data: filtersData,
        timestamp: Date.now()
      }));
    } catch (error) {
      
    }
  }, []);

  const fetchFiltersData = useCallback(async () => {
    const cachedFilters = loadFiltersFromCache(religion);
    
    if (cachedFilters) {
      setFilters(cachedFilters);
      setFiltersLoading(false);
    
      try {
        const freshFiltersRaw = await fetchFilters(religion);
        if (freshFiltersRaw) {
          const freshFilters = {
            origins: deduplicateAndClean(freshFiltersRaw.origins),
            languages: deduplicateAndClean(freshFiltersRaw.languages),
            categories: deduplicateAndClean(freshFiltersRaw.categories),
            themes: deduplicateAndClean(freshFiltersRaw.themes),
            lucky_days: deduplicateAndClean(freshFiltersRaw.lucky_days),
            lucky_colors: deduplicateAndClean(freshFiltersRaw.lucky_colors),
            lucky_stones: deduplicateAndClean(freshFiltersRaw.lucky_stones),
            genders: deduplicateAndClean(freshFiltersRaw.genders)
          };
          setFilters(freshFilters);
          saveFiltersToCache(religion, freshFilters);
        }
      } catch (error) {
        
      }
    } else {
      setFiltersLoading(true);
      try {
        const freshFiltersRaw = await fetchFilters(religion);
        if (freshFiltersRaw) {
          const freshFilters = {
            origins: deduplicateAndClean(freshFiltersRaw.origins),
            languages: deduplicateAndClean(freshFiltersRaw.languages),
            categories: deduplicateAndClean(freshFiltersRaw.categories),
            themes: deduplicateAndClean(freshFiltersRaw.themes),
            lucky_days: deduplicateAndClean(freshFiltersRaw.lucky_days),
            lucky_colors: deduplicateAndClean(freshFiltersRaw.lucky_colors),
            lucky_stones: deduplicateAndClean(freshFiltersRaw.lucky_stones),
            genders: deduplicateAndClean(freshFiltersRaw.genders)
          };
          setFilters(freshFilters);
          saveFiltersToCache(religion, freshFilters);
        }
      } catch (error) {
        
      }
      setFiltersLoading(false);
    }
  }, [religion, deduplicateAndClean, loadFiltersFromCache, saveFiltersToCache]);

  const fetchNamesData = useCallback(async (page = 1) => {
    setLoading(true);
    try {
      const namesData = await fetchNames({
        page,
        limit: 20,
        religion,
        ...selectedFilters
      });
    
      if (namesData.success || namesData.data) {
        setNames(namesData.data || []);
        setPagination(namesData.pagination);
        setCurrentPage(page);
      }
    } catch (error) {
      
    }
    setLoading(false);
  }, [religion, selectedFilters]);

  const handleFilterChange = useCallback((filterType, value) => {
    const newFilters = { ...selectedFilters, [filterType]: value };
    setSelectedFilters(newFilters);
    setCurrentPage(1);
  }, [selectedFilters]);

  useEffect(() => {
    fetchNamesData(currentPage);
  }, [selectedFilters, religion, currentPage, fetchNamesData]);

  const handleReligionChange = useCallback((newReligion) => {
    setReligion(newReligion);
    const emptyFilters = {
      origin: '', language: '', category: '', theme: '',
      luckyDay: '', luckyColor: '', alphabet: '', luckyStone: '', gender: ''
    };
    setSelectedFilters(emptyFilters);
    setCurrentPage(1);
  }, []);

  const clearFilters = useCallback(() => {
    const emptyFilters = {
      origin: '', language: '', category: '', theme: '',
      luckyDay: '', luckyColor: '', alphabet: '', luckyStone: '', gender: ''
    };
    setSelectedFilters(emptyFilters);
    setCurrentPage(1);
  }, []);

  const handleNameClick = useCallback((name) => {
    const slug = name.name.toLowerCase().replace(/\s+/g, '-');
    router.push(`/names/${religion}/${slug}`);
  }, [router, religion]);

  const toggleFavorite = useCallback((nameId, e) => {
    if (e) {
      e.stopPropagation();
    }
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(nameId)) {
        newFavorites.delete(nameId);
      } else {
        newFavorites.add(nameId);
      }
      if (typeof window !== 'undefined') {
        localStorage.setItem('favorites', JSON.stringify([...newFavorites]));
      }
      return newFavorites;
    });
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('favorites');
      if (saved) {
        setFavorites(new Set(JSON.parse(saved)));
      }
    }
  }, []);

  useEffect(() => {
    fetchFiltersData();
  }, [fetchFiltersData]);

  const activeFiltersCount = useMemo(() => 
    Object.values(selectedFilters).filter(v => v).length, 
    [selectedFilters]
  );

  // Dynamic page title and subtitle based on religion
  const pageTitle = useMemo(() => {
    const religionTitles = {
      islamic: 'Islamic Baby Names',
      christian: 'Christian Baby Names',
      hindu: 'Hindu Baby Names',
      all: 'All Baby Names'
    };
    return religionTitles[religion] || 'Baby Names';
  }, [religion]);

  const pageSubtitle = useMemo(() => {
    const subtitles = {
      islamic: 'Beautiful Muslim names with meanings',
      christian: 'Biblical & traditional Christian names',
      hindu: 'Sacred Hindu names with origins',
      all: 'Names from all traditions'
    };
    return subtitles[religion] || 'With meanings & origins';
  }, [religion]);

  const LoadingSkeleton = () => (
    <div className="space-y-2">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white rounded-lg border border-gray-100 p-3 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-1.5"></div>
          <div className="h-3 bg-gray-100 rounded w-full mb-1"></div>
          <div className="h-3 bg-gray-100 rounded w-4/5"></div>
        </div>
      ))}
    </div>
  );

  const FilterButton = React.memo(({ label, value, options, onChange, icon: Icon, color = "indigo" }) => {
    const [isOpen, setIsOpen] = useState(false);
    const colorClasses = {
      indigo: "bg-indigo-50 border-indigo-200 text-indigo-700",
      purple: "bg-purple-50 border-purple-200 text-purple-700",
      blue: "bg-blue-50 border-blue-200 text-blue-700",
      pink: "bg-pink-50 border-pink-200 text-pink-700",
      emerald: "bg-emerald-50 border-emerald-200 text-emerald-700",
      orange: "bg-orange-50 border-orange-200 text-orange-700"
    };

    return (
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between gap-1.5 px-3 py-2 rounded-lg border transition-all text-xs ${
            value 
              ? colorClasses[color] + " shadow-sm" 
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300"
          }`}
        >
          <div className="flex items-center gap-1.5 min-w-0">
            {Icon && <Icon className="w-3.5 h-3.5 flex-shrink-0" />}
            <span className="font-semibold truncate">
              {value || label}
            </span>
          </div>
          {value ? (
            <X 
              className="w-3.5 h-3.5 flex-shrink-0" 
              onClick={(e) => {
                e.stopPropagation();
                onChange('');
              }}
            />
          ) : (
            <ChevronRight className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isOpen ? 'rotate-90' : ''}`} />
          )}
        </button>

    {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            <div className="absolute left-0 right-0 top-full mt-1 z-50 bg-white rounded-lg shadow-xl border border-gray-200 max-h-48 overflow-y-auto">
              <div className="p-1">
                <button
                  onClick={() => {
                    onChange('');
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 text-xs font-medium text-gray-600 hover:bg-gray-50 rounded transition-colors"
                >
                  All {label}
                </button>
                {options?.map(opt => (
                  <button
                    key={opt}
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 text-xs font-medium rounded transition-colors ${
                      value === opt 
                        ? colorClasses[color]
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  });

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Breadcrumb Navigation */}
        <nav className="bg-white border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-3">
            <ol className="flex items-center gap-2 text-sm flex-wrap">
              <li>
                <a href="/" className="text-indigo-600 hover:text-indigo-800 font-medium transition-colors">
                  Home
                </a>
              </li>
              <li className="text-gray-400">/</li>
              <li className="text-gray-700 font-semibold">All Baby Names</li>
            </ol>
          </div>
        </nav>

        {/* Enhanced Header with proper H1 */}
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 shadow-sm">
          <div className="max-w-6xl mx-auto px-4 py-4 sm:py-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="p-1.5 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                    {pageTitle} with Meanings & Origins
                  </h1>
                  <p className="text-sm sm:text-base text-gray-600 font-medium hidden sm:block">
                    {pageSubtitle} - Browse 60,000+ verified names
                  </p>
                </div>
              </div>
              
              {pagination?.totalResults && (
                <div className="flex items-center gap-1.5 px-2.5 py-1 bg-indigo-50 rounded-full">
                  <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
                  <span className="text-xs font-bold text-indigo-700">{pagination.totalResults.toLocaleString()}</span>
                </div>
              )}
            </div>

            {/* Optimized Religion Tabs */}
            <nav className="flex gap-2">
              {[
                { value: 'islamic', icon: Star, label: 'Islamic' },
                { value: 'christian', icon: Globe, label: 'Christian' },
                { value: 'hindu', icon: Users, label: 'Hindu' }
              ].map(({ value, icon: Icon, label }) => (
                <button
                  key={value}
                  onClick={() => handleReligionChange(value)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold text-xs transition-all ${
                    religion === value
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* Mobile Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden w-full flex items-center justify-between px-4 py-2.5 bg-white rounded-lg shadow-sm border border-gray-200 mb-4"
          >
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-semibold">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="px-1.5 py-0.5 bg-indigo-600 text-white rounded-full text-[10px] font-bold">
                  {activeFiltersCount}
                </span>
              )}
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-90' : ''}`} />
          </button>

          <div className="flex flex-col lg:flex-row gap-4">
            {/* Optimized Filters Sidebar */}
            <aside className={`${showFilters ? 'block' : 'hidden'} lg:block w-full lg:w-72`}>
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-indigo-600" />
                    <h2 className="text-xs font-bold text-gray-900 uppercase">Filters</h2>
                  </div>
                  {activeFiltersCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="flex items-center gap-1 px-2 py-1 text-xs text-red-600 font-semibold bg-red-50 rounded hover:bg-red-100"
                    >
                      <X className="w-3 h-3" />
                      Clear
                    </button>
                  )}
                </div>

                {filtersLoading ? (
                  <div className="flex flex-col items-center py-6">
                    <Loader2 className="w-5 h-5 animate-spin text-indigo-600 mb-2" />
                    <p className="text-xs text-gray-500">Loading...</p>
                  </div>
                ) : (
                  <div className="space-y-2.5">
                    <FilterButton 
                      label="Gender" 
                      value={selectedFilters.gender} 
                      options={filters?.genders} 
                      onChange={(v) => handleFilterChange('gender', v)} 
                      icon={Users}
                      color="indigo"
                    />
                    <FilterButton 
                      label="Letter" 
                      value={selectedFilters.alphabet} 
                      options={['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z']} 
                      onChange={(v) => handleFilterChange('alphabet', v)} 
                      icon={Search}
                      color="purple"
                    />
                    <FilterButton 
                      label="Origin" 
                      value={selectedFilters.origin} 
                      options={filters?.origins} 
                      onChange={(v) => handleFilterChange('origin', v)} 
                      icon={Globe}
                      color="blue"
                    />
                    <FilterButton 
                      label="Language" 
                      value={selectedFilters.language} 
                      options={filters?.languages} 
                      onChange={(v) => handleFilterChange('language', v)} 
                      icon={BookOpen}
                      color="emerald"
                    />
                    <FilterButton 
                      label="Category" 
                      value={selectedFilters.category} 
                      options={filters?.categories} 
                      onChange={(v) => handleFilterChange('category', v)}
                      icon={Tag}
                      color="pink"
                    />
                    <FilterButton 
                      label="Theme" 
                      value={selectedFilters.theme} 
                      options={filters?.themes} 
                      onChange={(v) => handleFilterChange('theme', v)}
                      icon={Palette}
                      color="orange"
                    />
                    <FilterButton 
                      label="Lucky Day" 
                      value={selectedFilters.luckyDay} 
                      options={filters?.lucky_days} 
                      onChange={(v) => handleFilterChange('luckyDay', v)} 
                      icon={Star}
                      color="indigo"
                    />
                    <FilterButton 
                      label="Lucky Color" 
                      value={selectedFilters.luckyColor} 
                      options={filters?.lucky_colors} 
                      onChange={(v) => handleFilterChange('luckyColor', v)} 
                      icon={Sparkles}
                      color="purple"
                    />
                    <FilterButton 
                      label="Lucky Stone" 
                      value={selectedFilters.luckyStone} 
                      options={filters?.lucky_stones} 
                      onChange={(v) => handleFilterChange('luckyStone', v)}
                      icon={Gem}
                      color="blue"
                    />
                  </div>
                )}
              </div>
            </aside>

            {/* Optimized Main Content */}
            <main className="flex-1 space-y-4">
              {/* Results Header */}
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
                <h2 className="text-xs font-bold text-gray-900 uppercase mb-1">
                  {religion.charAt(0).toUpperCase() + religion.slice(1)} Names
                </h2>
                {pagination?.totalResults && (
                  <p className="text-xs text-gray-600">
                    Showing <strong>{names.length}</strong> of <strong>{pagination.totalResults.toLocaleString()}</strong> names
                  </p>
                )}
              </div>

              {/* Names Grid */}
              {loading ? (
                <LoadingSkeleton />
              ) : names.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                  <Search className="w-10 h-10 text-gray-300 mx-auto mb-2" />
                  <h3 className="text-sm font-bold mb-2 text-gray-700">No names found</h3>
                  <p className="text-xs text-gray-500 mb-3">Try adjusting your filters</p>
                  <button onClick={clearFilters} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-semibold hover:bg-indigo-700">
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {names.map((name) => (
                      <article 
                        key={name._id} 
                        onClick={() => handleNameClick(name)}
                        className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md hover:border-indigo-200 transition-all cursor-pointer group"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-base font-bold text-gray-900 mb-0.5 truncate group-hover:text-indigo-600">{name.name}</h3>
                            <p className="text-sm font-semibold text-indigo-600 mb-1 line-clamp-1">{name.short_meaning}</p>
                            <p className="text-xs text-gray-500">
                              <span className="font-medium">{name.gender}</span> • <span>{name.origin}</span>
                            </p>
                          </div>
                          <button 
                            onClick={(e) => toggleFavorite(name._id, e)} 
                            className="p-1 rounded-full hover:bg-red-50 flex-shrink-0"
                          >
                            <Heart className={`w-5 h-5 ${favorites.has(name._id) ? 'fill-red-500 text-red-500' : 'text-gray-300'}`} />
                          </button>
                        </div>

                        <p className="text-xs text-gray-700 leading-relaxed mb-2 line-clamp-2">{name.long_meaning}</p>

                        {name.themes && name.themes.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {name.themes.slice(0, 3).map((theme, idx) => (
                              <span key={idx} className="px-2 py-0.5 bg-indigo-50 text-indigo-700 rounded text-[10px] font-semibold">
                                {theme}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-gray-100">
                          {name.lucky_day && (
                            <div className="flex items-center gap-1">
                              <Star className="w-3 h-3 text-yellow-500 flex-shrink-0" />
                              <span className="text-[10px] font-semibold text-gray-700 truncate">{name.lucky_day}</span>
                            </div>
                          )}
                          {name.lucky_stone && (
                            <div className="flex items-center gap-1">
                              <Sparkles className="w-3 h-3 text-purple-500 flex-shrink-0" />
                              <span className="text-[10px] font-semibold text-gray-700 truncate">{name.lucky_stone}</span>
                            </div>
                          )}
                        </div>
                      </article>
                    ))}
                  </div>

                  {/* Optimized Pagination */}
                  {pagination?.totalPages > 1 && (
                    <div className="flex items-center justify-center gap-2 mt-4 flex-wrap">
                      <button
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold disabled:opacity-40 hover:bg-gray-50"
                      >
                        First
                      </button>
                      
                      <button
                        onClick={() => setCurrentPage(prev => prev - 1)}
                        disabled={!pagination.hasPrevPage}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold disabled:opacity-40 hover:bg-gray-50"
                      >
                        ← Prev
                      </button>
                      
                      <div className="flex items-center gap-1">
                        {(() => {
                          const totalPages = pagination.totalPages;
                          const current = currentPage;
                          let pages = [];
                          
                          if (totalPages <= 7) {
                            pages = Array.from({ length: totalPages }, (_, i) => i + 1);
                          } else {
                            if (current <= 4) {
                              pages = [1, 2, 3, 4, 5, '...', totalPages];
                            } else if (current >= totalPages - 3) {
                              pages = [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
                            } else {
                              pages = [1, '...', current - 1, current, current + 1, '...', totalPages];
                            }
                          }
                          
                          return pages.map((pageNum, idx) => {
                            if (pageNum === '...') {
                              return (
                                <span key={`ellipsis-${idx}`} className="px-2 text-xs text-gray-400 font-bold">
                                  ...
                                </span>
                              );
                            }
                            
                            return (
                              <button
                                key={pageNum}
                                onClick={() => setCurrentPage(pageNum)}
                                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                                  currentPage === pageNum
                                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                                    : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50'
                                }`}
                              >
                                {pageNum}
                              </button>
                            );
                          });
                        })()}
                      </div>

                      <button
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={!pagination.hasNextPage}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold disabled:opacity-40 hover:bg-gray-50"
                      >
                        Next →
                      </button>
                      
                      <button
                        onClick={() => setCurrentPage(pagination.totalPages)}
                        disabled={currentPage === pagination.totalPages}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-xs font-semibold disabled:opacity-40 hover:bg-gray-50"
                      >
                        Last
                      </button>
                    </div>
                  )}
                </>
              )}
            </main>
          </div>
        </div>
      </div>
    </>
  );
}
