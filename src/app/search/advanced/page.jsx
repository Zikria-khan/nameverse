import Link from 'next/link';
import { Suspense } from 'react';
import { Filter, Search, Sparkles, Moon, ChevronRight, Star, Gem, Calendar, Palette } from 'lucide-react';
import { validateMetaTitle, validateMetaDescription } from '@/lib/seo/meta-helpers';
import AdvancedSearchFilters from '@/components/Filters/AdvancedNameFilters';
import { fetchFilters } from '@/lib/api/names';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

export const metadata = {
  title: validateMetaTitle('Advanced Baby Name Search — Find Perfect Name with Filters | NameVerse'),
  description: validateMetaDescription(
    'Use NameVerse advanced baby name search with 18+ powerful filters to find the perfect name. Search by gender, origin, language, category, alphabet, lucky day, color, stone and more.'
  ),
  keywords: [
    'advanced baby name search',
    'baby name filters',
    'name finder tool',
    'search baby names online',
    'baby name search engine',
    'filter baby names',
    'find baby names by meaning',
    'baby name search with filters',
    'advanced name search',
    'baby name selector'
  ].join(', '),
  openGraph: {
    title: validateMetaTitle('Advanced Baby Name Search — Find Perfect Name with Filters | NameVerse'),
    description: validateMetaDescription(
      'Discover the perfect baby name using NameVerse\'s advanced search tool with 18+ filters including gender, origin, language, category, alphabet, lucky attributes and more.'
    ),
    url: `${SITE_URL}/search/advanced`,
    type: 'website',
    siteName: 'NameVerse',
    images: [
      {
        url: `${SITE_URL}/og-advanced-search.png`,
        width: 1200,
        height: 630,
        alt: 'Advanced Baby Name Search - NameVerse'
      }
    ]
  },
  alternates: {
    canonical: `${SITE_URL}/search/advanced`,
    languages: { en: `${SITE_URL}/search/advanced`, 'x-default': `${SITE_URL}/search/advanced` }
  },
  robots: { index: true, follow: true }
};

export default async function AdvancedSearchPage() {
  const filters = await fetchFilters('islamic');

  const popularSearches = [
    'Muhammad', 'Aisha', 'Ali', 'Fatima', 'Omar', 'Yusuf',
    'Ibrahim', 'Maryam', 'Hassan', 'Amina', 'Zain', 'Khadija'
  ];

  const searchExamples = [
    { title: 'Islamic Boy Names Starting with A', filters: { alphabet: 'A', gender: 'Male', religion: 'islamic' } },
    { title: 'Feminine Hindu Names Meaning Love', filters: { gender: 'Female', religion: 'hindu', theme: 'love' } },
    { title: 'Christian Names with Lucky Number 7', filters: { religion: 'christian', luckyNumber: '7' } },
    { title: 'Nature-Inspired Unisex Names', filters: { theme: 'nature', category: 'nature' } }
  ];

  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading Advanced Search…</div>}>
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        {/* Hero Section */}
        <section className="relative py-16 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-[0.03] pointer-events-none"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-12 sm:mb-16">
              <div className="inline-flex items-center justify-center gap-3 mb-6">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl shadow-xl shadow-indigo-500/20">
                  <Filter className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                Advanced Baby Name Search — Find Perfect Name with Filters
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover the perfect baby name using NameVerse's advanced search tool with 18+ powerful filters. 
                Search by gender, origin, language, category, alphabet, lucky day, color, stone and much more to 
                find the ideal name for your little one.
              </p>
            </div>
          </div>
        </section>

        {/* How Advanced Search Works */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white/50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              How Advanced Search Works
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Select Your Filters</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Choose from 18+ filter categories including religion, gender, origin, and language to narrow down your search.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Gem className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Apply Lucky Attributes</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Filter by lucky day, lucky color, and lucky stone based on traditional numerology and cultural beliefs.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Instantly View Results</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  See matching names appear in real-time with detailed meanings, origins, and lucky numbers.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Save Your Favorites</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Save names to your personal list, compare options, and share with family for final decision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Main Search Interface */}
        <section className="py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-6 sm:gap-8">
              {/* Filters Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24">
                  <AdvancedSearchFilters 
                    filters={filters} 
                    onFiltersChange={(activeFilters) => {
                      console.log('Active filters:', activeFilters);
                    }}
                  />
                </div>
              </div>

              {/* Results Section */}
              <div className="lg:col-span-3">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 sm:p-8">
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-100">
                    <Search className="w-6 h-6 text-indigo-600" />
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
                      Search Results
                    </h3>
                  </div>

                  <div className="text-center py-16">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-full mb-6">
                      <Search className="w-10 h-10 text-indigo-600" />
                    </div>
                    <p className="text-gray-600 text-lg mb-4">
                      Select filters from the sidebar to begin your search
                    </p>
                    <p className="text-gray-500 text-sm">
                      Choose from religion, gender, origin, language, category, starting letter, and lucky attributes to find the perfect name
                    </p>
                  </div>

                  {/* Popular Search Examples */}
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">
                      Popular Search Examples
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {searchExamples.map((example, index) => (
                        <Link
                          key={index}
                          href={`/search?q=${encodeURIComponent(example.title)}`}
                          className="flex items-center gap-3 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border-2 border-indigo-100 hover:border-indigo-300 hover:shadow-md transition-all group"
                        >
                          <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                            <ChevronRight className="w-5 h-5 text-indigo-600 group-hover:text-white" />
                          </div>
                          <div className="text-left">
                            <p className="font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                              {example.title}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Popular Quick Searches */}
                  <div className="mt-12 pt-8 border-t border-gray-100">
                    <h4 className="text-lg font-bold text-gray-900 mb-6">
                      Popular Searches
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {popularSearches.map((term) => (
                        <Link
                          key={term}
                          href={`/search?q=${encodeURIComponent(term)}`}
                          className="px-4 py-2 bg-white border-2 border-gray-200 rounded-lg text-gray-700 hover:border-indigo-300 hover:text-indigo-600 transition-all text-sm font-medium"
                        >
                          {term}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

          {/* Expert Tips Section */}
          <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 to-purple-50/30">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              Expert Tips for Using Advanced Search
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                  <Sparkles className="w-6 h-6 text-indigo-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Start Broad, Then Narrow</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Begin with just one or two filters like religion or gender, then gradually add more specific filters to refine your results. 
                  This approach helps you discover names you might not have considered while ensuring you don't miss potential matches.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                  <Palette className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Consider Lucky Attributes</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Use lucky day, color, and stone filters based on your child's birth details for names with positive numerological energy. 
                  These traditional attributes have been valued across cultures for centuries and can add deeper meaning to your choice.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center mb-4">
                  <Moon className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Combine Culture and Meaning</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Use the origin and category filters together to find names that honor your heritage while reflecting your values. 
                  This powerful combination helps you discover names with authentic cultural roots that carry the exact meaning you desire.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                  <Search className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Use Multiple Language Filters</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Don't limit yourself to one language. Many beautiful names exist across Urdu, Arabic, Hindi, and Sanskrit with similar meanings. 
                  Exploring multiple languages can reveal unique options with the exact significance you're looking for.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Check Lucky Numbers</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Consider filtering by lucky numbers that align with birth dates or family traditions. 
                  Many cultures believe names with harmonious numbers bring good fortune and positive energy to the child's life path.
                </p>
              </div>
              <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
                <div className="w-12 h-12 bg-rose-100 rounded-xl flex items-center justify-center mb-4">
                  <Calendar className="w-6 h-6 text-rose-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">Save and Compare Options</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Use our My Saved Names feature to compare multiple options side by side. 
                  This allows you to evaluate meanings, origins, and lucky attributes together to make the most informed decision.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section with Schema */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-12 text-center">
              Frequently Asked Questions
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What makes NameVerse's advanced search unique?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our advanced search offers 18+ filter categories including unique attributes like lucky day, lucky color, and lucky stone based on traditional numerology, plus origin, language, and category filters you won't find on other baby name sites.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  How do I use lucky attributes in my search?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Lucky attributes are based on traditional numerology. Select a lucky day (like Friday for Venus), lucky color, or lucky stone to find names associated with positive energies and fortunate influences for your child.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Can I combine multiple filters?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Yes! You can combine any filters - for example, search for Islamic girl names starting with 'A' that are in the 'nature' category with 'Green' as the lucky color. The more filters you add, the more specific your results.
                </p>
              </div>
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  What if I get too many or no results?
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  If you get too many results, add more filters to narrow down. If you get no results, try removing some filters or using broader categories. Start with just 1-2 filters and build up gradually.
                </p>
              </div>
            </div>

            {/* FAQ Schema */}
            <script
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                  '@context': 'https://schema.org',
                  '@type': 'FAQPage',
                  mainEntity: [
                    {
                      '@type': 'Question',
                      name: 'What makes NameVerse\'s advanced search unique?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Our advanced search offers 18+ filter categories including unique attributes like lucky day, lucky color, and lucky stone based on traditional numerology, plus origin, language, and category filters.'
                      }
                    },
                    {
                      '@type': 'Question',
                      name: 'How do I use lucky attributes in my search?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Lucky attributes are based on traditional numerology. Select a lucky day, lucky color, or lucky stone to find names associated with positive energies and fortunate influences.'
                      }
                    },
                    {
                      '@type': 'Question',
                      name: 'Can I combine multiple filters?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'Yes! You can combine any filters - for example, search for Islamic girl names starting with A that are in the nature category with Green as the lucky color.'
                      }
                    },
                    {
                      '@type': 'Question',
                      name: 'What if I get too many or no results?',
                      acceptedAnswer: {
                        '@type': 'Answer',
                        text: 'If you get too many results, add more filters to narrow down. If you get no results, try removing some filters or using broader categories.'
                      }
                    }
                  ]
                })
              }}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
          <div className="max-w-7xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Find the Perfect Name?
            </h2>
            <p className="text-lg text-indigo-100 mb-8 max-w-2xl mx-auto">
              Start your search now with our advanced filters and discover 60,000+ verified baby names with meanings, origins, and numerology.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="px-8 py-4 bg-white text-indigo-600 rounded-xl font-bold text-lg hover:bg-indigo-50 transition-all shadow-lg hover:shadow-xl"
              >
                Start Basic Search
              </Link>
              <Link
                href="/names/religion/islamic/1"
                className="px-8 py-4 bg-indigo-500 text-white rounded-xl font-bold text-lg hover:bg-indigo-400 transition-all border-2 border-white/20 shadow-lg hover:shadow-xl"
              >
                Browse All Names
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Suspense>
  );
}