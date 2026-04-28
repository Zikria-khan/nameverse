import Link from 'next/link';
import { Search, Filter, BookOpen, Zap, ArrowRight, CheckCircle } from 'lucide-react';

const QuickSearchTips = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full mb-4 shadow-md">
            <Search className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Name Finding Guide</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            How to Find the Perfect Baby Name on NameVerse
          </h2>

          <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Searching for the ideal baby name can be overwhelming, but NameVerse makes it simple. 
            Our powerful baby name finder tools help you filter names by meaning, religion, origin, 
            gender, and more. Learn how to effectively search baby names and discover your child&apos;s 
            perfect name in minutes.
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {/* Intro */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-3xl p-6 sm:p-8 border-2 border-blue-200 mb-10">
            <p className="text-gray-700 leading-relaxed text-sm sm:text-base">
              Finding the right baby name is one of the most important decisions expectant parents make. 
              With over 60,000 names across Islamic, Hindu, and Christian traditions, NameVerse offers 
              the most comprehensive baby name database online. Our smart search and filtering features 
              let you narrow down choices based on your specific preferences. Whether you want to 
              <em> search baby names by meaning</em>, filter by religion, or browse alphabetically, 
              we provide multiple ways to discover meaningful names that reflect your family&apos;s values and heritage.
            </p>
          </div>

          {/* Step-by-Step Guide */}
          <div className="space-y-6">
            {/* Step 1 */}
            <div className="group flex items-start gap-4 p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md">
                <Search className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Search Baby Names by Meaning
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  One of the most powerful ways to find a baby name is through meaning. Our 
                  <strong> baby name search by meaning </strong>feature lets you explore names based on 
                  qualities you hope your child will embody. Looking for names meaning &quot;light&quot;, 
                  &quot;strength&quot;, or &quot;peace&quot;? Simply type your desired meaning into the search bar and 
                  discover relevant names from all traditions. Each name includes detailed meanings 
                  in English, Urdu, Arabic, and Hindi, helping you understand the full cultural and 
                  religious significance of your choice.
                </p>
                <div className="mt-3">
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm hover:underline"
                  >
                    Try Meaning Search
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="group flex items-start gap-4 p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-emerald-300 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md">
                <Filter className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Filter Baby Names by Religion & Origin
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  If you&apos;re looking for names from a specific faith tradition, use our religion filters 
                  to find exactly what you need. Our <strong>baby names by religion</strong> category includes 
                  dedicated sections for Islamic, Hindu, and Christian names with subcategories for 
                  boys, girls, and gender-neutral options. Each name is verified for cultural and 
                  religious accuracy, ensuring authentic meanings. Whether you want Quranic names, 
                  Sanskrit names, or Biblical names, our filtering system makes it easy to browse 
                  names by your preferred religious or cultural origin.
                </p>
                 <div className="mt-3 flex flex-wrap gap-2">
                    <Link href="/names/religion/islamic/1" className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-lg text-sm font-semibold hover:bg-emerald-200 transition-colors">
                      Islamic Names
                    </Link>
                    <Link href="/names/religion/hindu/1" className="px-3 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-semibold hover:bg-orange-200 transition-colors">
                      Hindu Names
                    </Link>
                    <Link href="/names/religion/christian/1" className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-semibold hover:bg-blue-200 transition-colors">
                      Christian Names
                    </Link>
                 </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="group flex items-start gap-4 p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-orange-300 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Browse A-Z Baby Names Alphabetically
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Our <strong>A-Z baby names</strong> directory makes it easy to explore names starting 
                  with any letter. Whether you&apos;ve decided on an initial or just want to see all 
                  options beginning with a particular letter, our alphabetical listing provides 
                  instant access to thousands of names. Click any letter from A to Z to view 
                  comprehensive lists with meanings, origins, and gender classifications. This 
                  traditional approach to <strong>baby names A-Z</strong> browsing works perfectly 
                  when you have a specific starting letter in mind.
                </p>
                <div className="mt-3">
                  <Link
                    href="/names/islamic/letter/A/1"
                    className="inline-flex items-center gap-1 text-orange-600 font-semibold text-sm hover:underline"
                  >
                    Browse A-Z Names
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Step 4 */}
            <div className="group flex items-start gap-4 p-5 bg-white rounded-2xl border-2 border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all duration-300">
              <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                  Use Advanced Filters for Precision Results
                </h3>
                <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                  Our advanced baby name finder goes beyond basic search. Filter by multiple 
                  criteria including gender, name length, syllable count, numerology number, 
                  and cultural origin simultaneously. This powerful filtering system acts as a 
                  sophisticated <strong>baby name finder</strong> that narrows thousands of options 
                  down to your perfect match. Combine filters to discover unique names that meet 
                  all your criteria—whether you want a short three-letter name, a specific 
                  numerology number, or a name starting and ending with certain letters.
                </p>
                <div className="mt-3">
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-1 text-purple-600 font-semibold text-sm hover:underline"
                  >
                    Try Advanced Search
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Summary */}
          <div className="mt-10 bg-gradient-to-r from-violet-50 via-purple-50 to-fuchsia-50 rounded-3xl p-6 sm:p-8 border-2 border-purple-200">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                <CheckCircle className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                Why Use NameVerse&apos;s Name Finder?
              </h3>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 text-gray-700">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">60,000+ names across all major world religions and cultures</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">Multi-language meanings in English, Urdu, Arabic & Hindi</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">Verified by religious scholars and linguistic experts</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">Instant search results with intuitive filtering</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">Save favorite names to your personal shortlist</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm leading-relaxed">Cultural context, pronunciation help, and name compatibility</p>
              </div>
            </div>

            <div className="mt-6 text-center">
              <Link
                href="/search"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
              >
                <Search className="w-5 h-5" />
                Start Searching Baby Names Now
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickSearchTips;
