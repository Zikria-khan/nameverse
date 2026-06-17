'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, History, Search, X } from 'lucide-react';
import { createSafeSlug } from '@/lib/utils/createSafeSlug';

const NAME_FILES = [
  { filename: 'islamic_names.json', religion: 'islamic' },
  { filename: 'hindu_names.json', religion: 'hindu' },
  { filename: 'christians_names.json', religion: 'christian' },
  { filename: 'data/islamic-boy-names.json', religion: 'islamic' },
  { filename: 'data/islamic-girl-names.json', religion: 'islamic' },
  { filename: 'data/hindu-boy-names.json', religion: 'hindu' },
  { filename: 'data/hindu-girl-names.json', religion: 'hindu' },
  { filename: 'data/christian-boy-names.json', religion: 'christian' },
  { filename: 'data/christian-girl-names.json', religion: 'christian' },
];

function normalize(value = '') {
  return String(value).toLowerCase().trim();
}

function scoreName(item, query) {
  const q = normalize(query);
  const name = normalize(item.name);
  if (!q || !name) return 0;

  let score = 0;
  if (name === q) score += 100;
  if (name.startsWith(q)) score += 70;
  if (name.includes(q)) score += 40;
  score -= Math.max(0, name.length - q.length) * 0.15;
  return score;
}

function getStoredRecentSearches() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem('nameverse_recent_searches');
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.slice(0, 6) : [];
  } catch {
    return [];
  }
}

function saveStoredRecentSearches(items) {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem('nameverse_recent_searches', JSON.stringify(items.slice(0, 6)));
  } catch {
    return;
  }
}

export default function HomePageSearch() {
  const router = useRouter();
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    setRecentSearches(getStoredRecentSearches());
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 160);

    return () => window.clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const loadNames = async () => {
      if (hasLoaded) return;

      setLoading(true);

      try {
        const allNames = [];

        await Promise.all(
          NAME_FILES.map(async ({ filename, religion }) => {
            try {
              const response = await fetch(`/${filename}`);
              if (!response.ok) return;
              const json = await response.json();
              if (!Array.isArray(json)) return;

              allNames.push(
                ...json
                  .map((item) => {
                    const rawName = typeof item === 'string' ? item : item.name;
                    const name = String(rawName || '').trim();
                    const slug = createSafeSlug(name);

                    if (!name || !slug) return null;

                    return {
                      name,
                      religion,
                      slug,
                      meaning: typeof item === 'string' ? '' : String(item.meaning || item.short_meaning || ''),
                      origin: typeof item === 'string' ? '' : String(item.origin || ''),
                    };
                  })
                  .filter(Boolean)
              );
            } catch {
              return null;
            }
          })
        );

        const uniqueNames = Array.from(
          new Map(allNames.map((item) => [`${item.religion}:${item.slug}`, item])).values()
        );

        setNames(uniqueNames);
      } finally {
        setLoading(false);
        setHasLoaded(true);
      }
    };

    loadNames();
  }, [hasLoaded]);

  const popularNames = useMemo(() => names.slice(0, 8), [names]);

  const nameSuggestions = useMemo(() => {
    const q = normalize(debouncedQuery);
    if (!q || names.length === 0) return [];

    return names
      .map((item) => ({ item, score: scoreName(item, q) }))
      .filter(({ score }) => score > 12)
      .sort((a, b) => b.score - a.score || a.item.name.localeCompare(b.item.name))
      .slice(0, 10)
      .map(({ item }) => item);
  }, [debouncedQuery, names]);

  const suggestions = useMemo(() => {
    if (!query.trim()) return popularNames;
    return nameSuggestions;
  }, [nameSuggestions, popularNames, query]);

  const exactName = useMemo(() => {
    const q = normalize(query);
    if (!q) return null;
    return names.find((item) => normalize(item.name) === q);
  }, [names, query]);

  const addRecentSearch = (value) => {
    const next = [value, ...recentSearches.filter((item) => item !== value)].slice(0, 6);
    setRecentSearches(next);
    saveStoredRecentSearches(next);
  };

  const navigateToSuggestion = (item) => {
    router.push(`/names/${item.religion}/${item.slug}`);
    addRecentSearch(item.name);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;

    addRecentSearch(trimmed);

    if (exactName) {
      router.push(`/names/${exactName.religion}/${exactName.slug}`);
      return;
    }

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  const clearRecentSearch = (value) => {
    const next = recentSearches.filter((item) => item !== value);
    setRecentSearches(next);
    saveStoredRecentSearches(next);
  };

  const shouldShowSuggestions = suggestions.length > 0 || loading || (query && hasLoaded);

  return (
    <section aria-label="NameVerse baby name search" className="relative">
      <div className="mx-auto max-w-5xl">
        <form onSubmit={handleSearch} role="search" className="relative">
          <div className="group nv-surface rounded-[2rem] p-2 sm:p-3">
            <div className="flex flex-col gap-3 rounded-[1.5rem] border border-[rgba(15,23,42,0.08)] bg-white/82 px-3 py-2 sm:px-4 sm:py-3">
              <div className="flex items-center gap-3">
                <Search className="h-5 w-5 shrink-0 text-[color:var(--nv-accent-2)]" aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Search any baby name"
                  className="min-h-12 flex-1 bg-transparent text-base font-semibold text-[color:var(--nv-ink)] placeholder:text-slate-400 focus:outline-none sm:text-lg"
                  aria-label="Search baby names"
                  aria-controls="nameverse-home-search-suggestions"
                  aria-expanded={suggestions.length > 0}
                  autoComplete="off"
                />
                {query && (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                    aria-label="Clear search"
                  >
                    <X className="h-4 w-4" />
                  </button>
                )}
                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--nv-ink)] px-4 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-[color:var(--nv-accent-2)]"
                >
                  {loading ? 'Loading' : 'Search'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </form>

        {shouldShowSuggestions && (
          <div
            id="nameverse-home-search-suggestions"
            role="listbox"
            aria-label="Search suggestions"
            className="nv-surface mt-3 max-h-[min(70vh,560px)] overflow-y-auto rounded-[1.75rem] p-2"
          >
            {recentSearches.length > 0 && !query && (
              <div className="px-2 pb-2 pt-1">
                <div className="mb-2 flex items-center justify-between px-3 py-2">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                    <History className="h-3.5 w-3.5" />
                    Recent searches
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setRecentSearches([]);
                      saveStoredRecentSearches([]);
                    }}
                    className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                  >
                    Clear
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((item) => (
                    <div key={item} className="group flex items-center gap-1 rounded-full bg-slate-100 px-3 py-2">
                      <button
                        type="button"
                        onClick={() => {
                          setQuery(item);
                          inputRef.current?.focus();
                        }}
                        className="text-sm font-semibold text-slate-700"
                      >
                        {item}
                      </button>
                      <button
                        type="button"
                        onClick={() => clearRecentSearch(item)}
                        className="rounded-full p-1 text-slate-400 opacity-0 transition group-hover:opacity-100 hover:bg-white hover:text-slate-900"
                        aria-label={`Remove ${item} from recent searches`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="grid gap-2 sm:grid-cols-2">
              {debouncedQuery && query !== debouncedQuery && (
                <div className="col-span-full px-4 py-3 text-xs font-semibold text-slate-500">
                  Refining name suggestions…
                </div>
              )}

              {!query && loading && (
                <div className="col-span-full px-4 py-3 text-sm font-semibold text-slate-500">
                  Loading available names…
                </div>
              )}

              {query && loading && !hasLoaded && (
                <div className="col-span-full px-4 py-3 text-sm font-semibold text-slate-500">
                  Loading available names…
                </div>
              )}

              {query && !loading && nameSuggestions.length === 0 && (
                <div className="col-span-full px-4 py-3 text-sm font-semibold text-slate-500">
                  No matching names found. Try another spelling.
                </div>
              )}

              {suggestions.map((item, index) => (
                <button
                  key={`${item.religion}-${item.slug}-${index}`}
                  type="button"
                  role="option"
                  onClick={() => navigateToSuggestion(item)}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-[rgba(15,23,42,0.08)] bg-white/72 p-4 text-left transition hover:-translate-y-0.5 hover:border-[color:var(--nv-accent-2)]/40 hover:bg-white"
                >
                  <span className="text-base font-bold text-[color:var(--nv-ink)]">{item.name}</span>
                  <ArrowRight className="h-4 w-4 shrink-0 text-slate-400" />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
