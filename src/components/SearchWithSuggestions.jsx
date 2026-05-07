'use client';

import React, { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

const SearchWithSuggestions = () => {
  const [query, setQuery] = useState('');
  const [names, setNames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const router = useRouter();

  // Load name data from JSON files with localStorage caching - triggered on focus
  const loadNames = async () => {
    if (hasLoaded) return;

    const cacheKey = 'cached_names';
    const cachedData = localStorage.getItem(cacheKey);

    if (cachedData) {
      // Load from cache
      setNames(JSON.parse(cachedData));
      setHasLoaded(true);
      return;
    }

    setLoading(true);
    try {
      const files = ['islamic_names.json', 'hindu_names.json', 'christians_names.json'];
      const allNames = [];
      for (const file of files) {
        const res = await fetch(`/${file}`);
        const data = await res.json();
        allNames.push(...data);
      }
      // Cache the combined data
      localStorage.setItem(cacheKey, JSON.stringify(allNames));
      setNames(allNames);
    } catch (error) {
      console.error('Error loading name data:', error);
    } finally {
      setLoading(false);
      setHasLoaded(true);
    }
  };

  // Handle input focus - load name data on first focus
  const handleFocus = () => {
    if (!hasLoaded) {
      loadNames();
    }
  };

  // Update suggestions based on query
  useEffect(() => {
    if (query.length > 0 && names.length > 0) {
      const filtered = names
        .filter(name =>
          name.toLowerCase().startsWith(query.toLowerCase())
        )
        .slice(0, 10);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [query, names]);

  // Handle form submit
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search/${encodeURIComponent(query.trim())}`);
    }
  };

  // Clear search
  const clearSearch = () => {
    setQuery('');
    setSuggestions([]);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto">
      {/* Search Form */}
      <form onSubmit={handleSearchSubmit} className="relative" role="search" aria-label="Site search">
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors duration-200" aria-hidden="true" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={handleFocus}
            placeholder="Search baby names..."
            className="w-full pl-12 pr-12 py-4 text-base font-medium text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl focus:outline-none focus:ring-3 focus:ring-indigo-500/20 focus:border-indigo-500 shadow-sm hover:shadow-md transition-all duration-200"
            aria-label="Search for baby names"
            name="search"
            id="universal-search-input"
          />

          {/* Right side icons */}
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
            {query && (
              <button
                onClick={clearSearch}
                type="button"
                className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                aria-label="Clear search"
              >
                <X className="w-4 h-4 text-gray-400 hover:text-gray-600" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </form>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-lg mt-1 shadow-lg z-10">
          {suggestions.map((name, index) => (
            <button
              key={index}
              onClick={() => {
                setQuery(name);
                setSuggestions([]);
                router.push(`/search/${encodeURIComponent(name)}`);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchWithSuggestions;