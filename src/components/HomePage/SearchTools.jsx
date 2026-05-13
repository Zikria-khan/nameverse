'use client';

import { Search, Heart, BookOpen } from 'lucide-react';
import Link from 'next/link';

const SearchTools = () => {
  const tools = [
    {
      icon: Search,
      title: 'Advanced Name Search',
      description: 'Filter baby names by gender, religion, origin, meaning, and popularity.',
      link: '/search',
      linkText: 'Search Names'
    },
    {
      icon: Heart,
      title: 'Save Favorite Names',
      description: 'Bookmark names, compare choices, and share your shortlist with family.',
      link: '/my-names',
      linkText: 'Save Favorites'
    },
    {
      icon: BookOpen,
      title: 'Detailed Meanings',
      description: 'See etymology, cultural context, and religious significance for every name.',
      link: '/name-meanings',
      linkText: 'Explore Meanings'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Search and discover meaningful baby names.</h2>
          <p className="mx-auto max-w-3xl text-gray-600 text-base leading-relaxed">
            Use NameVerse to search names by religion, meaning, origin, gender, and popularity. Find trusted Islamic, Hindu, and Christian baby names with clear context in one place.
          </p>
        </div>
      </div>
    </section>
  );
};

export default SearchTools;
