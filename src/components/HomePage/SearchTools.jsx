'use client';

import { Search, Filter, Heart, BookOpen, Globe, Zap, Award, Users } from 'lucide-react';
import Link from 'next/link';

const SearchTools = () => {
  const tools = [
    {
      icon: Search,
      title: 'Advanced Baby Name Search',
      description: 'Find the perfect name with our smart search engine. Filter by gender, religion, origin, meaning, starting letter, and syllable count.',
      keywords: 'baby name search, find baby names, baby name finder, search baby names online',
      link: '/search',
      linkText: 'Search All Names'
    },
    {
      icon: Filter,
      title: 'Smart Name Filters',
      description: 'Narrow down names by popularity trends, lucky numerology numbers, pronunciation difficulty, cultural authenticity, and modern vs traditional style.',
      keywords: 'baby name filters, name finder tool, advanced name search, filter baby names',
      link: '/advanced-search',
      linkText: 'Use Advanced Filters'
    },
    {
      icon: Heart,
      title: 'Save Favorite Names',
      description: 'Create personalized baby name lists. Compare names side-by-side, share with partner and family, and get AI-powered suggestions based on your preferences.',
      keywords: 'save baby names, favorite names list, baby name comparison, name shortlist',
      link: '/my-names',
      linkText: 'Create Your List'
    },
    {
      icon: BookOpen,
      title: 'Detailed Name Meanings',
      description: 'Every name includes etymology, cultural significance, religious context, pronunciation guide, famous namesakes, and numerology calculations.',
      keywords: 'name meanings, baby name meanings, meaning of names, name etymology',
      link: '/name-meanings',
      linkText: 'Explore Meanings'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Accurate translations in Urdu, Arabic, Hindi, English, Persian, Turkish, and more. Authentic meanings verified by language experts.',
      keywords: 'Urdu baby names, Arabic name meanings, Hindi baby names, multilingual names',
      link: '/languages',
      linkText: 'Browse by Language'
    },
    {
      icon: Zap,
      title: 'Instant Popularity Checker',
      description: 'See name popularity rankings, historical trends, and future predictions based on current data. Avoid overly common or too-rare names.',
      keywords: 'baby name popularity, popular names 2026, trending baby names, name rankings',
      link: '/popularity',
      linkText: 'Check Popularity'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with High-Intent Keywords */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Powerful Baby Name Search Tools — Find the Perfect Name in Minutes
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            Use NameVerse's advanced baby name search engine to discover 65,000+ verified names. Our smart filters help you find baby names by meaning, origin, religion, popularity, and numerology. The best baby name finder tool for parents worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">#1 Baby Name Search Tool</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">65,000+ Names in Database</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Scholar-Verified Accuracy</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {tools.map((tool, index) => {
            const Icon = tool.icon;
            return (
              <div 
                key={index}
                className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-xl hover:border-blue-300 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                  {tool.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {tool.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">
                    {tool.keywords.split(', ').slice(0, 2).join(' • ')}
                  </span>
                  <Link 
                    href={tool.link}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 group/link"
                  >
                    {tool.linkText}
                    <span className="group-hover/link:translate-x-1 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-3xl p-8 sm:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Start Your Baby Name Journey Today
          </h3>
          <p className="text-blue-100 max-w-2xl mx-auto mb-6 text-sm sm:text-base">
            Join 5 million+ parents who trust NameVerse for finding meaningful, culturally authentic baby names. Our advanced search tools make it easy to discover the perfect name for your baby.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/search"
              className="px-6 py-3 bg-white text-blue-600 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl"
            >
              Search Baby Names Now
            </Link>
            <Link 
              href="/how-it-works"
              className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              Learn How It Works
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchTools;