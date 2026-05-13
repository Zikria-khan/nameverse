'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, BookOpen, Sparkles, Award, MapPin, Hash, Layers, ChevronDown, ChevronUp } from 'lucide-react';

const NameCategories = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const categories = [
    {
      icon: Star,
      title: 'Quranic Names',
      description: 'Explore Quranic baby names with authentic Arabic meanings, Quranic references, and scholar-verified translations.',
      href: '/names/religion/islamic/1',
      keywords: 'Quranic baby names, Quranic names list, Islamic names from Quran, Arabic Quranic names',
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-200'
    },
    {
      icon: BookOpen,
      title: 'Sanskrit Names',
      description: 'Discover Sanskrit baby names inspired by Vedic tradition, ancient stories, and timeless Hindu meanings.',
      href: '/names/religion/hindu/1',
      keywords: 'Sanskrit baby names, Sanskrit names for boys, Vedic names, Hindu baby names with meaning',
      gradient: 'from-orange-500 to-amber-600',
      bgGradient: 'from-orange-50 to-amber-50',
      border: 'border-orange-200'
    },
    {
      icon: Award,
      title: 'Biblical Names',
      description: 'Browse Biblical baby names with historical context, spiritual meaning, and modern Christian relevance.',
      href: '/names/religion/christian/1',
      keywords: 'Biblical names, Biblical names for boys and girls, Christian baby names, Bible names list',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      border: 'border-blue-200'
    },
    {
      icon: MapPin,
      title: 'Origin Names',
      description: 'Search baby names by origin, including Arabic, Sanskrit, Hebrew, and other cultural name collections.',
      href: '/names/islamic/origin/arabic/1',
      keywords: 'origin baby names, Arabic origin names, cultural origin names, origin filtered names',
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-50 to-cyan-50',
      border: 'border-teal-200'
    },
    {
      icon: Hash,
      title: 'Names by Letter',
      description: 'Browse baby names alphabetically, ideal when you want a name that starts with a specific letter.',
      href: '/names/islamic/letter/a/1',
      keywords: 'names by letter, letter filtered names, alphabet baby names, baby names starting with a',
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      border: 'border-purple-200'
    },
    {
      icon: Layers,
      title: 'Category Names',
      description: 'Discover names organized by category, including traditional, modern, and themed collections for every naming style.',
      href: '/names/christian/categories/traditional/1',
      keywords: 'category baby names, traditional baby names, names by category, category filtered names',
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-50',
      border: 'border-pink-200'
    }
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">By Category & Origin</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Explore Baby Names by Category & Origin
          </h2>

          <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dive into our organized baby name categories to find names by tradition, culture, or style. Expand each category to reveal the best curated collections.
          </p>
        </div>

        <div className="space-y-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const isOpen = openIndex === index;

            return (
              <div
                key={category.title}
                className={`rounded-3xl border-2 ${category.border} bg-white overflow-hidden shadow-sm transition-all duration-300 ${isOpen ? 'ring-2 ring-amber-300' : ''}`}
              >
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-2xl bg-gradient-to-br ${category.gradient} text-white shadow-lg`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{category.title}</h3>
                      <p className="text-sm text-gray-500 max-w-2xl line-clamp-2">{category.description}</p>
                    </div>
                  </div>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600">
                    {isOpen ? 'Hide' : 'Explore'}
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </span>
                </button>

                <div className={`transition-[max-height,opacity] duration-300 ease-out overflow-hidden ${isOpen ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="px-6 pb-6">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between bg-slate-50 rounded-3xl p-4 border border-slate-200">
                      <p className="text-sm text-gray-700 leading-relaxed flex-1">{category.description}</p>
                      <Link
                        href={category.href}
                        className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                      >
                        Explore {category.title}
                      </Link>
                    </div>
                    <span className="sr-only">{category.keywords}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default NameCategories;
