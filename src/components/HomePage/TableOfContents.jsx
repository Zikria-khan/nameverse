import Link from 'next/link';
import { List, ChevronRight, BookOpen, Search, Star, Globe, Heart, Award } from 'lucide-react';

/**
 * TableOfContents Component - SEO Optimized
 * Provides a comprehensive navigation structure for the homepage
 * Helps with SEO by creating internal linking structure and keyword-rich content
 */
const TableOfContents = () => {
  const sections = [
    {
      id: 'search',
      title: 'Search Baby Names',
      icon: Search,
      description: 'Find the perfect name using NameVerse search engine',
      href: '/search',
      keywords: 'baby name search, NameVerse search, find names'
    },
    {
      id: 'islamic',
      title: 'Islamic Baby Names',
      icon: Globe,
      description: 'Explore 25,000+ Quranic and Arabic names with Urdu meanings',
      href: '/names/religion/islamic/1',
      keywords: 'Islamic baby names, Muslim names, Quranic names, Arabic names'
    },
    {
      id: 'hindu',
      title: 'Hindu Baby Names',
      icon: Star,
      description: 'Discover 20,000+ Sanskrit and Vedic names with Hindi meanings',
      href: '/names/religion/hindu/1',
      keywords: 'Hindu baby names, Sanskrit names, Vedic names, Indian names'
    },
    {
      id: 'christian',
      title: 'Christian Baby Names',
      icon: Award,
      description: 'Browse 15,000+ Biblical names with spiritual meanings',
      href: '/names/religion/christian/1',
      keywords: 'Christian baby names, Biblical names, Bible names'
    },
    {
      id: 'popular',
      title: 'Popular Names 2026',
      icon: Heart,
      description: 'Trending baby names chosen by millions of parents',
      href: '#popular-names',
      keywords: 'popular baby names 2026, trending names, top names'
    },
    {
      id: 'articles',
      title: 'Expert Guides',
      icon: BookOpen,
      description: 'Naming advice and cultural insights from scholars',
      href: '/blog',
      keywords: 'baby naming guide, name meanings, expert advice'
    }
  ];

  const quickLinks = [
    // Islamic Names
    { label: 'Islamic Boy Names', href: '/islamic/boy-names' },
    { label: 'Islamic Girl Names', href: '/islamic/girl-names' },
    // Hindu Names
    { label: 'Hindu Boy Names', href: '/hindu/boy-names' },
    { label: 'Hindu Girl Names', href: '/hindu/girl-names' },
    // Christian Names
    { label: 'Christian Boy Names', href: '/christian/boy-names' },
    { label: 'Christian Girl Names', href: '/christian/girl-names' },
    // Additional Categories
    { label: 'Unique Names', href: '/names/unique/1' },
    { label: 'Modern Names', href: '/names/modern/1' }
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-white to-blue-50" aria-label="Table of Contents">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mb-4 shadow-md">
            <List className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Navigate NameVerse</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            NameVerse <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Complete Navigation Guide</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto mb-4">
            Master NameVerse's powerful baby name search tools with our complete navigation guide. Find Islamic baby names, Hindu baby names, Christian baby names, unique names, popular names 2026, and expert naming guides — all in one place. Your ultimate baby names website directory.
          </p>
        </div>

        {/* Main Navigation Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <Link
                key={section.id}
                href={section.href}
                className="group flex flex-col items-center text-center p-4 bg-white rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-indigo-600 transition-colors">
                  {section.title}
                </h3>
                <p className="text-xs text-gray-500 hidden sm:block">
                  {section.description}
                </p>
                <span className="sr-only">{section.keywords}</span>
              </Link>
            );
          })}
        </div>

        {/* Quick Links */}
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
            Quick Links on NameVerse
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-700 rounded-full border border-indigo-200 hover:bg-indigo-100 hover:border-indigo-300 transition-all text-sm font-medium"
              >
                <ChevronRight className="w-3.5 h-3.5" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        {/* SEO Content Block */}
        <div className="mt-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl border border-indigo-100 p-6 md:p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
            Why Choose NameVerse for Baby Names?
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-indigo-700 mb-2">NameVerse Features</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• 60,000+ verified baby names with meanings</li>
                <li>• Islamic, Hindu & Christian name collections</li>
                <li>• Meanings in English, Urdu, Arabic & Hindi</li>
                <li>• Expert verification by cultural scholars</li>
                <li>• Lucky number calculations included</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-indigo-700 mb-2">NameVerse Benefits</h4>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Free baby name search engine</li>
                <li>• Trusted by 5M+ parents worldwide</li>
                <li>• Cultural context and pronunciation guides</li>
                <li>• Mobile-friendly NameVerse app</li>
                <li>• Regular updates with trending names</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TableOfContents;