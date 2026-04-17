// components/names/NameDetailClientSEO2026.jsx
'use client';

import { useState, useRef, useMemo, useCallback } from 'react';
import Link from 'next/link';
import {
  ChevronDown,
  ChevronUp,
  Volume2,
  Copy,
  Check,
  Share2,
  Heart,
  Star,
  Globe,
  Calendar,
  Palette,
  Gem,
  Hash,
  Users,
  Sparkles,
  TrendingUp,
  MapPin,
  BookOpen,
  Church,
  Scroll,
  Crown,
  Award,
  User,
  Quote,
  Clock,
  MessageCircle,
  ExternalLink,
  ArrowRight,
} from 'lucide-react';

import AdUnit from '@/components/Ads/AdUnit';

/**
 * 2026 SEO-Optimized Name Detail UI
 * - Visible high-value content (no hidden accordions for key data)
 * - Optimized Core Web Vitals (useCallback, memoized sections)
 * - Contextual internal linking
 * - Enhanced LLM/AI discoverability
 * - Mobile-first, accessible design
 */
export default function NameDetailClientSEO2026({ data, initialLanguage = 'english' }) {
  const [activeLang, setActiveLang] = useState(initialLanguage);
  const [copied, setCopied] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [liked, setLiked] = useState(false);
  const [showAllLanguages, setShowAllLanguages] = useState(false);
  const [expandedFaqIndex, setExpandedFaqIndex] = useState(null);
  const [activeFilters, setActiveFilters] = useState({
    letters: [],
    genders: [],
    origins: [],
    themes: [],
    categories: []
  });
  const [filterData, setFilterData] = useState(null);
  const [isFetchingFilters, setIsFetchingFilters] = useState(false);

  // Fetch filter data for the current religion
  useEffect(() => {
    const fetchFilters = async () => {
      setIsFetchingFilters(true);
      try {
        const response = await fetch(`https://namverse-api.vercel.app/api/v1/filters/${data.religion}`);
        if (response.ok) {
          const filters = await response.json();
          setFilterData(filters.data);
        }
      } catch (error) {
        console.error('Error fetching filters:', error);
      } finally {
        setIsFetchingFilters(false);
      }
    };
    fetchFilters();
  }, [data.religion]);

  const audioRef = useRef(null);

  const religion = data.religion || 'islamic';
  const religionTitle = religion.charAt(0).toUpperCase() + religion.slice(1);

  // Memoized handlers for better INP
  const handleCopyUrl = useCallback(() => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data.name} - ${religionTitle} Name Meaning`,
          text: `Discover the meaning of ${data.name}: ${data.short_meaning}`,
          url: window.location.href,
        });
      } catch (err) {
        // User cancelled
      }
    } else {
      handleCopyUrl();
    }
  }, [data.name, data.short_meaning, religionTitle, handleCopyUrl]);

  const handlePlayPronunciation = useCallback(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(data.name);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
          }
        });
      }
      setIsPlaying(!isPlaying);
    }
  }, [data.name, isPlaying]);

  // Memoized language options
  const languageOptions = useMemo(() => {
    const options = [];
    const langMap = {
      english: { label: 'English', lang: 'en' },
      arabic: { label: 'العربية', lang: 'ar' },
      urdu: { label: 'اردو', lang: 'ur' },
      hindi: { label: 'हिन्दी', lang: 'hi' },
      pashto: { label: 'پښتو', lang: 'ps' },
      sanskrit: { label: 'संस्कृत', lang: 'sa' },
      tamil: { label: 'தமிழ்', lang: 'ta' },
      telugu: { label: 'తెలుగు', lang: 'te' },
      marathi: { label: 'मराठी', lang: 'mr' },
      bengali: { label: 'বাংলা', lang: 'bn' },
      hebrew: { label: 'עברית', lang: 'he' },
      greek: { label: 'Ελληνικά', lang: 'el' },
      latin: { label: 'Latina', lang: 'la' },
    };

    for (const [key, value] of Object.entries(data)) {
      if (key.startsWith('in_') && value) {
        const langCode = key.replace('in_', '');
        options.push({
          code: langCode,
          label: langMap[langCode]?.label || langCode,
          lang: langMap[langCode]?.lang || langCode,
          data: value,
        });
      }
    }
    return options;
  }, [data]);

  const currentLangData = languageOptions.find((opt) => opt.code === activeLang)?.data;
  const currentLangMeta = languageOptions.find((opt) => opt.code === activeLang);

  // Helper function to check if filter is active
  const isFilterActive = (type, value) => {
    return activeFilters[type]?.includes(value);
  };

  // Helper function to toggle filter
  const toggleFilter = (type, value) => {
    setActiveFilters(prevFilters => {
      const newFilters = { ...prevFilters };
      if (newFilters[type]?.includes(value)) {
        newFilters[type] = newFilters[type].filter(v => v !== value);
      } else {
        newFilters[type] = [...(newFilters[type] || []), value];
      }
      return newFilters;
    });
  };

  // Helper function to clear all filters
  const clearFilters = () => {
    setActiveFilters({
      letters: [],
      genders: [],
      origins: [],
      themes: [],
      categories: []
    });
  };

  const faqItems = data.seo?.faq || data.seo?.seo?.faq || [];

  // Quick facts for grid
  const quickFacts = useMemo(() => [
    { label: 'Lucky Number', value: data.lucky_number, icon: <Hash className="w-4 h-4" /> },
    { label: 'Lucky Stone', value: data.lucky_stone, icon: <Gem className="w-4 h-4" /> },
    { label: 'Lucky Day', value: data.lucky_day, icon: <Calendar className="w-4 h-4" /> },
    { label: 'Religion', value: data.religion, icon: <Church className="w-4 h-4" /> },
    { label: 'Gender', value: data.gender, icon: <Users className="w-4 h-4" /> },
    { label: 'Origin', value: data.origin, icon: <Globe className="w-4 h-4" /> },
    { label: 'Life Path', value: data.life_path_number, icon: <Sparkles className="w-4 h-4" /> },
  ].filter(f => f.value), [data]);

  // Internal linking: generate related names for contextual anchors
  const contextualLinks = useMemo(() => {
    const links = [];
    if (data.similar_sounding_names?.length) {
      links.push(...data.similar_sounding_names.slice(0, 3).map(name => ({
        name,
        url: `/names/${religion}/${name.toLowerCase()}`,
        type: 'similar'
      })));
    }
    if (data.name_variations?.length) {
      links.push(...data.name_variations.slice(0, 2).map(name => ({
        name,
        url: `/names/${religion}/${name.toLowerCase()}`,
        type: 'variation'
      })));
    }
    return links;
  }, [data, religion]);

  // Generate filtered names based on active filters
  const filteredNames = useMemo(() => {
    if (!filterData) return [];

    let filtered = filterData.total_names;

    // Apply letter filters
    if (activeFilters.letters.length > 0) {
      filtered = filterData.letters.filter(letter => activeFilters.letters.includes(letter)).length;
    }

    // Apply gender filters
    if (activeFilters.genders.length > 0) {
      filtered = filterData.genders.filter(gender => activeFilters.genders.includes(gender)).length;
    }

    // Apply origin filters
    if (activeFilters.origins.length > 0) {
      filtered = filterData.origins.filter(origin => activeFilters.origins.includes(origin)).length;
    }

    // Apply theme filters
    if (activeFilters.themes.length > 0) {
      filtered = filterData.themes.filter(theme => activeFilters.themes.includes(theme)).length;
    }

    // Apply category filters
    if (activeFilters.categories.length > 0) {
      filtered = filterData.categories.filter(category => activeFilters.categories.includes(category)).length;
    }

    return filtered;
  }, [activeFilters, filterData]);

  // Function to insert contextual links into text
  const enhanceTextWithLinks = (text) => {
    if (!text || contextualLinks.length === 0) return text;
    let enhancedText = text;
    contextualLinks.forEach(link => {
      const regex = new RegExp(`\\b${link.name}\\b`, 'gi');
      enhancedText = enhancedText.replace(regex, `<a href="${link.url}" class="text-primary-600 dark:text-primary-400 hover:underline font-medium">${link.name}</a>`);
    });
    return enhancedText;
  };

  // Religious reference renderer
  const ReligiousReference = useMemo(() => {
    if (data.islamic_reference) {
      return (
        <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-5 border border-emerald-200 dark:border-emerald-800">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Islamic Reference</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            {data.islamic_reference.is_quranic ? '📖 Quranic Name' : 'Traditional Islamic Name'} — {data.islamic_reference.note}
          </p>
        </div>
      );
    }
    if (data.vedic_reference) {
      return (
        <div className="bg-orange-50 dark:bg-orange-900/20 rounded-xl p-5 border border-orange-200 dark:border-orange-800">
          <div className="flex items-center gap-2 mb-3">
            <Scroll className="w-5 h-5 text-orange-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Vedic Reference</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            {data.vedic_reference.root_origin} — {data.vedic_reference.note}
          </p>
        </div>
      );
    }
    if (data.biblical_reference) {
      return (
        <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-5 border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="font-semibold text-gray-900 dark:text-white">Biblical Reference</h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">
            {data.biblical_reference.is_biblical ? '📖 Biblical Name' : 'Not directly biblical'} — {data.biblical_reference.note}
          </p>
        </div>
      );
    }
    return null;
  }, [data]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950">
      <audio ref={audioRef} onEnded={() => setIsPlaying(false)} onPause={() => setIsPlaying(false)} />

      {/* Filters Section */}
      {filterData && (
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary-500" /> Filter Names
            </h2>

            {/* Filter Counts */}
            <div className="flex flex-wrap gap-3 mb-4">
              <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded-full">
                {filteredNames} names found
              </span>
              {Object.keys(activeFilters).some(key => activeFilters[key].length > 0) && (
                <button onClick={clearFilters} className="px-3 py-1 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline">
                  Clear filters
                </button>
              )}
            </div>

            {/* Filter Categories */}
            <div className="space-y-4">
              {/* Letters Filter */}
              {filterData.letters && filterData.letters.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Starting Letter</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterData.letters.map(letter => (
                      <button
                        key={letter}
                        onClick={() => toggleFilter('letters', letter)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          isFilterActive('letters', letter)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                        }`}
                      >
                        {letter}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Genders Filter */}
              {filterData.genders && filterData.genders.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Gender</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterData.genders.map(gender => (
                      <button
                        key={gender}
                        onClick={() => toggleFilter('genders', gender)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          isFilterActive('genders', gender)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Origins Filter */}
              {filterData.origins && filterData.origins.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Origin</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterData.origins.map(origin => (
                      <button
                        key={origin}
                        onClick={() => toggleFilter('origins', origin)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          isFilterActive('origins', origin)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                        }`}
                      >
                        {origin}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Filter */}
              {filterData.categories && filterData.categories.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Category</h3>
                  <div className="flex flex-wrap gap-2">
                    {filterData.categories.map(category => (
                      <button
                        key={category}
                        onClick={() => toggleFilter('categories', category)}
                        className={`px-3 py-1.5 text-sm rounded-full transition-all ${
                          isFilterActive('categories', category)
                            ? 'bg-primary-600 text-white'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 hover:bg-primary-50 dark:hover:bg-primary-900/20'
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        {/* Breadcrumb with Schema */}
        <nav className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-6 overflow-x-auto whitespace-nowrap pb-2" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-primary-600 dark:hover:text-primary-400 transition">Home</Link>
          <span>/</span>
          <Link href={`/names/${religion}`} className="hover:text-primary-600 dark:hover:text-primary-400 transition">{religionTitle} Names</Link>
          <span>/</span>
          <span className="text-gray-900 dark:text-white font-medium truncate">{data.name}</span>
        </nav>

        {/* Hero Card */}
        <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden mb-8">
          <div className="p-6 md:p-8 lg:p-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
              <div className="flex-1">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2 mb-4">
                  {data.gender && <span className="px-3 py-1 text-sm font-medium bg-primary-100 text-primary-800 dark:bg-primary-900/30 dark:text-primary-300 rounded-full">{data.gender}</span>}
                  <span className="px-3 py-1 text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 rounded-full">{religionTitle}</span>
                  {data.origin && <span className="px-3 py-1 text-sm font-medium bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300 rounded-full">{data.origin}</span>}
                  {data.category?.slice(0, 2).map(cat => <span key={cat} className="px-3 py-1 text-sm font-medium bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded-full">{cat}</span>)}
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white tracking-tight mb-3">{data.name}</h1>
                <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
                  <span className="font-semibold text-primary-600 dark:text-primary-400">Meaning:</span> {data.short_meaning}
                </p>

                <div className="flex flex-wrap gap-3">
                  <button onClick={handlePlayPronunciation} className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-xl transition-all shadow-sm hover:shadow-md active:scale-95">
                    <Volume2 className="w-5 h-5" /> {isPlaying ? 'Pause' : 'Pronounce'}
                  </button>
                  <button onClick={handleShare} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all">
                    <Share2 className="w-5 h-5" /> Share
                  </button>
                  <button onClick={handleCopyUrl} className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-medium rounded-xl transition-all">
                    {copied ? <Check className="w-5 h-5 text-green-600" /> : <Copy className="w-5 h-5" />} {copied ? 'Copied!' : 'Copy'}
                  </button>
                  <button onClick={() => setLiked(!liked)} className={`inline-flex items-center gap-2 px-5 py-2.5 border font-medium rounded-xl transition-all ${liked ? 'bg-red-50 border-red-300 text-red-600 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400' : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'}`}>
                    <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} /> Save
                  </button>
                </div>
              </div>

              {data.pronunciation && (
                <div className="lg:text-right">
                  <div className="inline-block bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-850 rounded-2xl px-6 py-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Pronunciation</p>
                    {data.pronunciation.ipa && <p className="text-2xl font-mono text-gray-900 dark:text-white">{data.pronunciation.ipa}</p>}
                    {data.pronunciation.english && <p className="text-gray-600 dark:text-gray-400 mt-1">{data.pronunciation.english}</p>}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick Facts Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-gray-200 dark:bg-gray-800">
            {quickFacts.map(fact => (
              <div key={fact.label} className="bg-gray-50 dark:bg-gray-900 p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 text-gray-500 dark:text-gray-400 mb-1">
                  {fact.icon}
                  <p className="text-xs uppercase tracking-wider">{fact.label}</p>
                </div>
                <p className="text-lg font-semibold text-gray-900 dark:text-white">{fact.value}</p>
              </div>
            ))}
            {data.lucky_colors && (
              <div className="bg-gray-50 dark:bg-gray-900 p-4 text-center">
                <div className="flex items-center justify-center gap-1.5 text-gray-500 dark:text-gray-400 mb-1">
                  <Palette className="w-4 h-4" />
                  <p className="text-xs uppercase tracking-wider">Colors</p>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  {data.lucky_colors.map(color => <span key={color} className="inline-block w-5 h-5 rounded-full border border-gray-300 dark:border-gray-600" style={{ backgroundColor: color.toLowerCase() }} title={color} />)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ========== VISIBLE HIGH-VALUE CONTENT (2026 SEO: No accordion hiding) ========== */}
        
        {/* Detailed Meaning - Always Visible */}
        <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-4 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary-500" /> Meaning & Significance
          </h2>
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4" dangerouslySetInnerHTML={{ __html: enhanceTextWithLinks(data.long_meaning) }} />
            {data.spiritual_meaning && <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4"><strong>Spiritual Meaning:</strong> {data.spiritual_meaning}</p>}
            {data.spiritual_symbolism && <p className="text-gray-700 dark:text-gray-300 leading-relaxed"><strong>Symbolism:</strong> {data.spiritual_symbolism}</p>}
          </div>
        </section>

        {/* Strategic Ad Placement - Below primary content but before secondary traits */}
        <AdUnit adId="1606e7870f004d67136f85f2b1698cd3" className="mb-4" />

        {/* Emotional Traits & Numerology - Always Visible */}
        {(data.emotional_traits || data.numerology_meaning) && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-4 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 text-primary-500" /> Personality & Numerology
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {data.emotional_traits && (
                  <>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Emotional Traits</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {data.emotional_traits.map(trait => <span key={trait} className="px-3 py-1.5 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm rounded-full">{trait}</span>)}
                    </div>
                  </>
                )}
                {data.hidden_personality_traits && data.hidden_personality_traits.filter(t => t !== 'V').length > 0 && (
                  <>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Hidden Strengths</p>
                    <div className="flex flex-wrap gap-2">
                      {data.hidden_personality_traits.filter(t => t !== 'V').map(trait => <span key={trait} className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm rounded-full">{trait}</span>)}
                    </div>
                  </>
                )}
              </div>
              <div>
                {data.life_path_number && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Life Path Number</p>
                    <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">{data.life_path_number}</p>
                  </div>
                )}
                {data.numerology_meaning && <p className="text-gray-700 dark:text-gray-300">{data.numerology_meaning}</p>}
              </div>
            </div>
          </section>
        )}

        {/* Religious Reference - Always Visible */}
        {ReligiousReference && (
          <section className="mb-4">
            {ReligiousReference}
          </section>
        )}

        {/* Historical Highlights - Always Visible (first 2 references) */}
        {data.historical_references?.length > 0 && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-4 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-primary-500" /> Historical Significance
            </h2>
            <div className="space-y-4">
              {data.historical_references.slice(0, 2).map((ref, idx) => (
                <div key={idx} className="border-l-4 border-primary-300 dark:border-primary-700 pl-4">
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-2"><Clock className="w-4 h-4" /> {ref.time_period}</p>
                  <p className="text-gray-800 dark:text-gray-200">{ref.reference}</p>
                </div>
              ))}
              {data.historical_references.length > 2 && (
                <details className="mt-4">
                  <summary className="text-primary-600 dark:text-primary-400 cursor-pointer hover:underline">View more historical references</summary>
                  <div className="mt-4 space-y-4">
                    {data.historical_references.slice(2).map((ref, idx) => (
                      <div key={idx} className="border-l-4 border-primary-300 dark:border-primary-700 pl-4">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-1"><Clock className="w-4 h-4 inline mr-1" /> {ref.time_period}</p>
                        <p className="text-gray-800 dark:text-gray-200">{ref.reference}</p>
                      </div>
                    ))}
                  </div>
                </details>
              )}
            </div>
          </section>
        )}

        {/* Multilingual Tabs - Enhanced for SEO */}
        {languageOptions.length > 1 && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-4">
            <div className="p-6">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                <Globe className="w-5 h-5 text-primary-500" /> In Other Languages
              </h2>
              <div className="flex flex-wrap gap-1 mb-6 border-b border-gray-200 dark:border-gray-800">
                {languageOptions.slice(0, showAllLanguages ? undefined : 5).map(opt => (
                  <button
                    key={opt.code}
                    onClick={() => setActiveLang(opt.code)}
                    className={`px-4 py-2.5 text-sm font-medium rounded-t-lg transition-all ${
                      activeLang === opt.code
                        ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 border-b-2 border-primary-600 -mb-px'
                        : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
                {languageOptions.length > 5 && (
                  <button onClick={() => setShowAllLanguages(!showAllLanguages)} className="px-4 py-2.5 text-sm text-primary-600 dark:text-primary-400 hover:underline">
                    {showAllLanguages ? 'Show less' : `+${languageOptions.length - 5} more`}
                  </button>
                )}
              </div>
              {currentLangData && (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Name in {currentLangMeta?.label}</p>
                    <p className="text-3xl font-bold text-gray-900 dark:text-white" lang={currentLangMeta?.lang}>{currentLangData.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Meaning</p>
                    <p className="text-lg text-gray-800 dark:text-gray-200">{currentLangData.meaning}</p>
                  </div>
                  {currentLangData.long_meaning && (
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">Detailed Meaning</p>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{currentLangData.long_meaning}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>
        )}

        {/* Popularity Map */}
        {data.popularity_by_region?.length > 0 && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-4 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary-500" /> Popularity by Region
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {data.popularity_by_region.map(region => (
                <div key={region.region} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                  <span className="font-medium text-gray-900 dark:text-white">{region.region}</span>
                  <div className="flex items-center gap-2">
                    <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className="bg-primary-500 h-2 rounded-full" style={{ width: `${region.score}%` }} />
                    </div>
                    <span className="text-sm font-semibold">{region.score}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQ - Enhanced for LLM with expandable answers */}
        {faqItems.length > 0 && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden mb-4 p-6">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-primary-500" /> Frequently Asked Questions
            </h2>
            <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
              {faqItems.map((item, idx) => (
                <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden" itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
                  <button
                    onClick={() => setExpandedFaqIndex(expandedFaqIndex === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                  >
                    <span className="font-medium text-gray-900 dark:text-white" itemProp="name">{item.q}</span>
                    {expandedFaqIndex === idx ? <ChevronUp className="w-5 h-5 text-gray-500" /> : <ChevronDown className="w-5 h-5 text-gray-500" />}
                  </button>
                  {expandedFaqIndex === idx && (
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700" itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
                      <p className="text-gray-700 dark:text-gray-300" itemProp="text">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Contextual Similar Names & Variations */}
        {(data.similar_sounding_names?.length > 0 || data.name_variations?.length > 0) && (
          <section className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-800 overflow-hidden p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Explore Similar Names</h2>
            <div className="flex flex-wrap gap-3">
              {[...(data.similar_sounding_names || []), ...(data.name_variations || [])].slice(0, 8).map(name => (
                <Link key={name} href={`/names/${religion}/${name.toLowerCase()}`} className="group px-4 py-2 bg-gray-100 dark:bg-gray-800 hover:bg-primary-50 dark:hover:bg-primary-900/20 text-gray-700 dark:text-gray-300 hover:text-primary-700 dark:hover:text-primary-400 rounded-lg transition-all flex items-center gap-1">
                  {name} <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* People Also Search For - SEO keyword expansion */}
        <div className="mt-6 text-sm text-gray-500 dark:text-gray-400">
          <p>People also search for: 
            <Link href={`/names/${religion}`} className="hover:text-primary-600 mx-1">{religionTitle} baby names</Link> • 
            <Link href={`/names/${religion}/${data.gender?.toLowerCase() || ''}`} className="hover:text-primary-600 mx-1">{data.gender} names</Link> • 
            <Link href={`/origin/${data.origin?.toLowerCase() || ''}`} className="hover:text-primary-600 mx-1">{data.origin} origin names</Link> • 
            <Link href={`/lucky-number/${data.lucky_number}`} className="hover:text-primary-600 mx-1">Names with lucky number {data.lucky_number}</Link>
          </p>
        </div>
      </div>
    </div>
  );
}