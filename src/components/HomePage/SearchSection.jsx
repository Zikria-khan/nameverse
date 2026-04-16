'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Loader2, User, MapPin, Heart, Sparkles, ChevronRight, TrendingUp, ExternalLink, BookOpen, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { searchNames } from '@/lib/api/names';
import { searchArticles } from '@/lib/api/articles';

const UniversalSearch = () => {
  const [query, setQuery] = useState('');
  const [nameResults, setNameResults] = useState([]);
  const [articleResults, setArticleResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const searchRef = useRef(null);
  const inputRef = useRef(null);
  const debounceRef = useRef(null);
  const router = useRouter();

  // Religion color mapping
  const religionColors = {
    islamic: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', gradient: 'from-emerald-500 to-teal-600' },
    hindu: { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200', gradient: 'from-orange-500 to-red-600' },
    christian: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200', gradient: 'from-blue-500 to-indigo-600' },
    buddhist: { bg: 'bg-yellow-50', text: 'text-yellow-700', border: 'border-yellow-200', gradient: 'from-yellow-500 to-orange-600' },
    jewish: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200', gradient: 'from-purple-500 to-fuchsia-600' },
    default: { bg: 'bg-gray-50', text: 'text-gray-700', border: 'border-gray-200', gradient: 'from-gray-500 to-slate-600' }
  };

  // Gender icon mapping
  const getGenderIcon = (gender) => {
    const genderLower = gender?.toLowerCase();
    if (genderLower === 'male') return { icon: User, color: 'text-blue-600', bg: 'bg-blue-100' };
    if (genderLower === 'female') return { icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100' };
    return { icon: Sparkles, color: 'text-purple-600', bg: 'bg-purple-100' };
  };

  // Fetch names and articles
  const fetchResults = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setNameResults([]);
      setArticleResults([]);
      setIsOpen(false);
      setHasSearched(false);
      setIsLoading(false);
      return;
    }

    setHasSearched(true);
    setError(null);
    setIsLoading(true);

    try {
      // Search both names and articles in parallel
      const [namesResult, articlesResult] = await Promise.all([
        searchNames(searchQuery.trim(), { limit: 5 }),
        searchArticles(searchQuery.trim(), { limit: 5 })
      ]);

      const names = namesResult.success ? (namesResult.data || []) : [];
      const articles = Array.isArray(articlesResult) ? articlesResult : [];

      setNameResults(names);
      setArticleResults(articles);

      if (names.length > 0 || articles.length > 0) {
        setIsOpen(true);
      } else {
        setError('No results found. Try different keywords.');
      }
    } catch (err) {
      console.error('Search error:', err);
      setError('Connection error. Please check your internet.');
      setNameResults([]);
      setArticleResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Debounced search
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    if (query.trim().length >= 2) {
      debounceRef.current = setTimeout(() => {
        fetchResults(query);
      }, 250);
    } else {
      setNameResults([]);
      setArticleResults([]);
      setIsOpen(false);
      setHasSearched(false);
      setIsLoading(false);
      setError(null);
    }

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [query, fetchResults]);

  // Click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const hasResults = nameResults.length > 0 || articleResults.length > 0;
  const totalResults = nameResults.length + articleResults.length;

  // Keyboard navigation
  const handleKeyDown = (e) => {
    if (!isOpen) {
      if (e.key === 'Enter' && query.trim()) {
        handleSearchSubmit(e);
      }
      return;
    }

    const allResults = [...nameResults, ...articleResults];

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < allResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : allResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0 && allResults[selectedIndex]) {
          if (selectedIndex < nameResults.length) {
            handleResultClick(allResults[selectedIndex], 'name');
          } else {
            handleResultClick(allResults[selectedIndex], 'article');
          }
        } else if (query.trim()) {
          handleSearchSubmit(e);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSelectedIndex(-1);
        inputRef.current?.blur();
        break;
      default:
        break;
    }
  };

  // Handle form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  // Handle result selection
  const handleResultClick = (result, type = 'name') => {
    setIsOpen(false);
    setSelectedIndex(-1);

    if (type === 'article') {
      // Navigate to article page
      router.push(`/blog/${result.slug}`);
    } else {
      // Navigate to name page
      // API returns "Islam" but we need "islamic" for the URL
      const religionMap = {
        'islam': 'islamic',
        'islamic': 'islamic',
        'hindu': 'hindu',
        'hinduism': 'hindu',
        'christian': 'christian',
        'christianity': 'christian',
      };
      const religion = religionMap[result.religion?.toLowerCase()] || 'islamic';
      const slug = result.slug || result.name?.toLowerCase().replace(/\s+/g, '-');
      router.push(`/names/${religion}/${slug}`);
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setNameResults([]);
    setArticleResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    setError(null);
    setHasSearched(false);
    setIsLoading(false);
    inputRef.current?.focus();
  };

  // Get religion styling
  const getReligionStyle = (religion) => {
    const religionKey = religion?.toLowerCase();
    return religionColors[religionKey] || religionColors.default;
  };

  // Highlight matching text
  const highlightText = (text, query) => {
    if (!text || !query) return text;
    
    const regex = new RegExp(`(${query.trim()})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) =>
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 font-semibold px-0.5 rounded">
          {part}
        </mark>
      ) : (
        part
      )
    );
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-2xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="relative" role="search" aria-label="Site search">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-200" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => query.trim().length >= 2 && (hasResults || isLoading) && setIsOpen(true)}
            placeholder="Search baby names..."
            className="w-full pl-12 pr-12 py-4 text-base font-medium text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm hover:shadow-md transition-all duration-200"
            aria-label="Search for baby names"
            aria-autocomplete="list"
            aria-controls="search-results"
            aria-expanded={isOpen}
            autoComplete="off"
            name="search"
            id="universal-search-input"
          />

          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            <AnimatePresence mode="wait">
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="p-1.5"
                  aria-label="Searching"
                >
                  <Loader2 className="w-4 h-4 text-indigo-600 animate-spin" aria-hidden="true" />
                </motion.div>
              )}
              {query && !isLoading && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  onClick={clearSearch}
                  type="button"
                  className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                  aria-label="Clear search"
                >
                  <X className="w-4 h-4 text-gray-400 hover:text-gray-600" aria-hidden="true" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        </div>
      </form>

      {/* Results Dropdown */}
      <AnimatePresence>
        {isOpen && (query.trim().length >= 2 || hasSearched) && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            id="search-results"
            role="listbox"
            aria-label="Search results"
            className="absolute top-full left-0 right-0 mt-3 bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-2xl shadow-gray-400/20 overflow-hidden z-50 max-h-[70vh] overflow-y-auto"
          >
            {error && !hasResults && !isLoading ? (
              <div className="p-8 text-center" role="status" aria-live="polite">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-gray-400" aria-hidden="true" />
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">{error}</p>
                <p className="text-xs text-gray-500">Try different keywords or check your connection</p>
              </div>
            ) : !hasResults && !isLoading ? (
              <div className="p-8 text-center" role="status" aria-live="polite">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <Search className="w-6 h-6 text-gray-400" aria-hidden="true" />
                </div>
                <p className="text-sm text-gray-600 font-medium mb-1">No results found</p>
                <p className="text-xs text-gray-500">Try adjusting your search terms</p>
              </div>
            ) : (
              <div>
                {/* Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur-xl border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">
                      {totalResults} Result{totalResults !== 1 ? 's' : ''}
                    </span>
                    {nameResults.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {nameResults.length} Name{nameResults.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    {articleResults.length > 0 && (
                      <span className="text-xs text-gray-500">
                        {articleResults.length} Article{articleResults.length !== 1 ? 's' : ''}
                      </span>
                    )}
                    {isLoading && <Loader2 className="w-3 h-3 animate-spin text-indigo-600" />}
                  </div>
                  <p className="text-xs text-gray-500 hidden sm:block">
                    <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs border border-gray-300">↑↓</kbd> Navigate
                    <span className="mx-1">•</span>
                    <kbd className="px-1.5 py-0.5 bg-gray-100 rounded text-xs border border-gray-300">↵</kbd> Select
                  </p>
                </div>

                {/* Results List */}
                <div className="py-2" role="list">
                  {nameResults.map((result, index) => {
                    const religionStyle = getReligionStyle(result.religion);
                    const genderInfo = getGenderIcon(result.gender);
                    const GenderIcon = genderInfo.icon;
                    const isSelected = selectedIndex === index;

                    return (
                      <motion.button
                        key={result._id}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.02 }}
                        onClick={() => handleResultClick(result, 'name')}
                        onMouseEnter={() => setSelectedIndex(index)}
                        className={`w-full px-4 py-3 flex items-start gap-3 transition-all duration-200 border-l-4 group ${
                          isSelected
                            ? `${religionStyle.bg.replace('50', '100')} ${religionStyle.border} shadow-inner`
                            : 'border-transparent hover:bg-gray-50/80'
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        {/* Name Icon Badge */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br ${religionStyle.gradient} flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200 ${isSelected ? 'scale-110' : ''}`}>
                          <span className="text-white font-bold text-base">
                            {result.name?.charAt(0).toUpperCase()}
                          </span>
                        </div>

                        {/* Name Content */}
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 text-base truncate">
                              {highlightText(result.name, query)}
                            </h3>
                            <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 group-hover:text-gray-600 transition-all duration-200 ${isSelected ? 'translate-x-1' : ''}`} aria-hidden="true" />
                          </div>

                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {highlightText(result.short_meaning || result.meaning, query)}
                          </p>

                          {/* Name Metadata */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className={`inline-flex items-center px-2.5 py-1 ${religionStyle.bg} ${religionStyle.text} text-xs font-semibold rounded-lg border ${religionStyle.border}`}>
                              {result.religion || 'Global'}
                            </span>
                            <span className={`inline-flex items-center gap-1 px-2.5 py-1 ${genderInfo.bg} text-gray-700 text-xs font-semibold rounded-lg`}>
                              <GenderIcon className={`w-3 h-3 ${genderInfo.color}`} aria-hidden="true" />
                              {result.gender || 'Unisex'}
                            </span>
                            {result.origin && (
                              <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                                <MapPin className="w-3 h-3 text-gray-500" aria-hidden="true" />
                                {result.origin}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}

                  {/* Article Results */}
                  {articleResults.map((article, index) => {
                    const articleIndex = nameResults.length + index;
                    const isSelected = selectedIndex === articleIndex;

                    return (
                      <motion.button
                        key={article.id || article.slug}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: articleIndex * 0.02 }}
                        onClick={() => handleResultClick(article, 'article')}
                        onMouseEnter={() => setSelectedIndex(articleIndex)}
                        className={`w-full px-4 py-3 flex items-start gap-3 transition-all duration-200 border-l-4 group ${
                          isSelected
                            ? 'bg-purple-50 border-purple-200 shadow-inner'
                            : 'border-transparent hover:bg-gray-50/80'
                        }`}
                        role="option"
                        aria-selected={isSelected}
                      >
                        {/* Article Icon Badge */}
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center shadow-sm group-hover:shadow-md transition-all duration-200 ${isSelected ? 'scale-110' : ''}`}>
                          <FileText className="w-5 h-5 text-white" aria-hidden="true" />
                        </div>

                        {/* Article Content */}
                        <div className="flex-1 text-left min-w-0">
                          <div className="flex items-start justify-between gap-2 mb-1">
                            <h3 className="font-semibold text-gray-900 text-base truncate">
                              {highlightText(article.title, query)}
                            </h3>
                            <ChevronRight className={`w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5 group-hover:text-gray-600 transition-all duration-200 ${isSelected ? 'translate-x-1' : ''}`} aria-hidden="true" />
                          </div>

                          <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                            {highlightText(article.excerpt || article.subtitle || article.summary, query)}
                          </p>

                          {/* Article Metadata */}
                          <div className="flex flex-wrap items-center gap-1.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-lg border border-purple-200">
                              <BookOpen className="w-3 h-3" aria-hidden="true" />
                              Article
                            </span>
                            {article.category && (
                              <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                                {article.category}
                              </span>
                            )}
                            {article.read_time_minutes && (
                              <span className="inline-flex items-center px-2.5 py-1 bg-gray-100 text-gray-700 text-xs font-medium rounded-lg">
                                {article.read_time_minutes} min read
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>

                {/* View All Footer */}
                {hasResults && (
                  <div className="sticky bottom-0 bg-gradient-to-t from-white via-white to-transparent border-t border-gray-200 px-4 py-3">
                    <button
                      onClick={handleSearchSubmit}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <TrendingUp className="w-4 h-4" aria-hidden="true" />
                      <span>View All Results for "{query}"</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default React.memo(UniversalSearch);
