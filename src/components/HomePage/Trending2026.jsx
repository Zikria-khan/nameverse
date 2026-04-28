import Link from 'next/link';
import { TrendingUp, Sparkles, BookOpen, Globe, Users, ArrowRight } from 'lucide-react';

const Trending2026 = () => {
  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-600 rounded-full mb-4 shadow-md">
            <TrendingUp className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">2026 Predictions</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Baby Names 2026: Trends, Predictions & Popular Picks
          </h2>

          <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            As we enter 2026, NameVerse data shows shifting trends in baby naming across the globe. 
            Our analysis of millions of searches reveals emerging patterns in Islamic, Hindu, and Christian 
            naming traditions. Discover what&apos;s next for baby names in 2026.
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {/* Islamic Names 2026 */}
          <div className="group p-6 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border-2 border-emerald-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-emerald-700">Islamic Baby Names 2026</h3>
                <p className="text-sm text-gray-600">Trending Muslim names</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Islamic baby names in 2026 are seeing a return to classical Arabic origins with modern 
              simplicity. NameVerse data indicates parents are favoring Quranic names with beautiful 
              meanings like &quot;Zayn&quot; (beauty), &quot;Noor&quot; (light), and &quot;Ibrahim&quot; (father of many). 
              Unique Muslim baby names like &quot;Arham&quot; (most merciful) and &quot;Rayan&quot; (gates of heaven) 
              are climbing the rankings. Modern Islamic names blend tradition with contemporary appeal, 
              making them top picks for 2026.
            </p>

             <div className="flex items-center justify-between">
                <Link
                  href="/names/religion/islamic/1"
                  className="text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Explore Islamic Names
                  <ArrowRight className="w-4 h-4" />
                </Link>
               <span className="text-xs text-emerald-600 font-medium">25,000+ names</span>
             </div>
          </div>

          {/* Hindu Names 2026 */}
          <div className="group p-6 bg-gradient-to-br from-orange-50 to-amber-50 rounded-2xl border-2 border-orange-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-orange-700">Hindu Baby Names 2026</h3>
                <p className="text-sm text-gray-600">Trending Sanskrit names</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Hindu baby names in 2026 reflect a growing interest in authentic Sanskrit origins with 
              deep spiritual meaning. Parents are increasingly choosing names like &quot;Aarav&quot; (peaceful), 
              &quot;Advait&quot; (unique), and &quot;Vihaan&quot; (dawn) for their children. Vedic baby names with 
              connections to Hindu mythology and tradition remain strong. Modern Hindu names balance 
              cultural heritage with global appeal, making them popular baby names 2026 choices for 
              families worldwide.
            </p>

             <div className="flex items-center justify-between">
                <Link
                  href="/names/religion/hindu/1"
                  className="text-sm font-semibold text-orange-700 hover:text-orange-800 flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Explore Hindu Names
                  <ArrowRight className="w-4 h-4" />
                </Link>
               <span className="text-xs text-orange-600 font-medium">20,000+ names</span>
             </div>
          </div>

          {/* Christian Names 2026 */}
          <div className="group p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border-2 border-blue-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-blue-700">Christian Baby Names 2026</h3>
                <p className="text-sm text-gray-600">Trending Biblical names</p>
              </div>
            </div>

            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              Christian baby names for 2026 show a revival of timeless Biblical classics alongside 
              fresh modern choices. Names like &quot;Sophia&quot; (wisdom), &quot;Noah&quot; (rest), and &quot;Emma&quot; 
              (universal) continue to dominate as popular baby names 2026 selections. Biblical names 
              for boys and girls with deep spiritual significance remain in high demand. Unique Christian 
              names with Latin and Hebrew origins offer parents meaningful options that honor faith 
              while feeling fresh for 2026.
            </p>

             <div className="flex items-center justify-between">
                <Link
                  href="/names/religion/christian/1"
                  className="text-sm font-semibold text-blue-700 hover:text-blue-800 flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Explore Christian Names
                  <ArrowRight className="w-4 h-4" />
                </Link>
               <span className="text-xs text-blue-600 font-medium">15,000+ names</span>
             </div>
          </div>
        </div>

        {/* Summary Content */}
        <div className="bg-gradient-to-r from-violet-50 via-purple-50 to-pink-50 rounded-3xl p-6 sm:p-8 border-2 border-purple-200">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-5">
              <div className="p-2 bg-gradient-to-br from-violet-500 to-purple-600 rounded-lg">
                <Users className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">
                What Makes a Name &quot;Trending&quot; in 2026?
              </h3>
            </div>

            <div className="space-y-4 text-gray-700">
              <p className="leading-relaxed">
                Trending baby names 2026 reflect broader cultural shifts. At NameVerse, we analyze 
                search data, user engagement, and cultural movements to predict which names will rise 
                in popularity. Unique baby names 2026 often come from:
              </p>

              <ul className="list-disc list-inside space-y-2 ml-2 text-sm sm:text-base">
                <li>Celebrity influence and pop culture references</li>
                <li>Social media viral trends and TikTok baby name challenges</li>
                <li>Return to traditional roots with modern pronunciation</li>
                <li>International names gaining cross-cultural appeal</li>
                <li>Names with positive meanings for post-pandemic world</li>
              </ul>

              <p className="leading-relaxed">
                Whether you seek popular baby names 2026 or unique baby names 2026, NameVerse provides 
                the most comprehensive database with verified meanings. Explore our trending names 
                section powered by real user searches to stay ahead of the curve.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/names/religion/islamic/1"
                className="px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 flex items-center gap-2"
              >
                Browse All Names
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/guides"
                className="px-5 py-2.5 bg-white border-2 border-purple-200 text-purple-700 rounded-xl font-semibold hover:bg-purple-50 transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Naming Guides
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Trending2026;
