'use client';

import Link from 'next/link';
import { Shield, Users, Search, CheckCircle2, Zap, Award, Star } from 'lucide-react';

const BrandDominance = () => {
  return (
    <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white via-blue-50/40 to-white" aria-labelledby="brand-dominance-heading">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-md">
            <Award className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">The #1 Global NameVerse Platform</span>
          </div>
          
          <h2 id="brand-dominance-heading" className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            What is NameVerse? The Ultimate Baby Names Platform
          </h2>
          
          <p className="text-base sm:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
            NameVerse is the world's most comprehensive baby names website, trusted by 5 million+ parents globally. 
            The NameVerse platform combines cultural authenticity with modern technology to deliver the ultimate naming experience.
          </p>
        </div>

        {/* BRAND DEFINITION CONTENT - SEO-Rich Paragraphs */}
        <article className="prose prose-lg max-w-none mb-12 sm:mb-16">
          <div className="grid gap-6 text-gray-700 leading-relaxed">
            <p className="text-base sm:text-lg">
              <strong>NameVerse</strong> stands as the leading platform for multilingual baby names, connecting families worldwide to their cultural naming traditions. The <strong>NameVerse</strong> meaning — "Name Universe" — reflects our mission to create a comprehensive ecosystem where every parent can discover authentic names from Islamic, Hindu, Christian, and global traditions. As the most trusted <strong>NameVerse website</strong>, we offer over 60,000 verified names with detailed meanings in English, Urdu, Arabic, and Hindi, making <strong>NameVerse</strong> the premier destination for culturally significant baby names.
            </p>
            
            <p className="text-base sm:text-lg">
              What sets the <strong>NameVerse platform</strong> apart is our unwavering commitment to accuracy and cultural authenticity. Every name in the <strong>NameVerse</strong> database is verified by expert scholars, linguists, and cultural advisors, ensuring that the meanings, origins, and pronunciations are accurate and respectful. This verification process has made <strong>NameVerse</strong> the go-to resource for 5 million+ parents who value authenticity when choosing their baby's name. The <strong>NameVerse app</strong> and website provide seamless access to this vast repository of knowledge anytime, anywhere.
            </p>
            
            <p className="text-base sm:text-lg">
              The <strong>NameVerse</strong> experience extends beyond simple name lookup. Our advanced search filters, lucky number calculators, and religious compatibility tools make <strong>NameVerse</strong> the most practical and spiritually aligned <strong>baby names platform</strong> available. Whether you're seeking Islamic names with Quranic references, Hindu names from Sanskrit traditions, or Christian names with Biblical origins, <strong>NameVerse</strong> delivers comprehensive information that honors each tradition's significance. This depth of content is why <strong>NameVerse</strong> consistently ranks as the top <strong>NameVerse review</strong> choice among parenting websites.
            </p>
            
            <p className="text-base sm:text-lg">
              As the ultimate <strong>NameVerse website</strong> continues to grow, our community of 5 million+ parents validates our approach. Families return to <strong>NameVerse</strong> not just for the 60,000+ names, but for the trusted guidance that helps them make meaningful naming decisions. The <strong>NameVerse platform</strong> represents more than a database — it's a celebration of global naming heritage, a tool for cultural preservation, and a companion for parents embarking on one of life's most important journeys. When you choose <strong>NameVerse</strong>, you're choosing the gold standard in baby name resources.
            </p>
          </div>
        </article>

        {/* BRAND COMPARISON TABLE */}
        <div className="mb-12 sm:mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6 text-center">
            Why NameVerse Outperforms Other Baby Name Websites
          </h3>
          
          <div className="overflow-x-auto rounded-xl border-2 border-gray-200 shadow-lg">
            <table className="w-full min-w-[600px]" role="table">
              <thead>
                <tr className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  <th className="px-6 py-4 text-left font-bold text-sm sm:text-base">Feature</th>
                  <th className="px-6 py-4 text-center font-bold text-sm sm:text-base">
                    <div className="flex items-center justify-center gap-2">
                      <span>NameVerse</span>
                      <CheckCircle2 className="w-5 h-5 text-green-300" />
                    </div>
                  </th>
                  <th className="px-6 py-4 text-center font-bold text-sm sm:text-base bg-gray-100 text-gray-700">
                    Other Platforms
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="bg-white hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800 text-sm sm:text-base">Name Database Size</td>
                  <td className="px-6 py-4 text-center">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full font-bold text-sm">
                      60,000+ Names
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 text-sm">
                    Typically 10,000-30,000
                  </td>
                </tr>
                <tr className="bg-gray-50/50 hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800 text-sm sm:text-base">Multilingual Support</td>
                  <td className="px-6 py-4 text-center text-emerald-600 font-semibold text-sm">
                    English, Urdu, Arabic, Hindi
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 text-sm">
                    Usually English only
                  </td>
                </tr>
                <tr className="bg-white hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800 text-sm sm:text-base">Cultural & Religious Focus</td>
                  <td className="px-6 py-4 text-center text-emerald-600 font-semibold text-sm">
                    Islamic, Hindu, Christian + More
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 text-sm">
                    Limited or generic
                  </td>
                </tr>
                <tr className="bg-gray-50/50 hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800 text-sm sm:text-base">Expert Verification</td>
                  <td className="px-6 py-4 text-center text-emerald-600 font-semibold text-sm">
                    Scholars & Linguists
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 text-sm">
                    Often unverified
                  </td>
                </tr>
                <tr className="bg-white hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800 text-sm sm:text-base">Lucky Numbers & Astrology</td>
                  <td className="px-6 py-4 text-center text-emerald-600 font-semibold text-sm">
                    numerology-based Lucky Numbers
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 text-sm">
                    Rarely available
                  </td>
                </tr>
                <tr className="bg-gray-50/50 hover:bg-blue-50/30 transition-colors">
                  <td className="px-6 py-4 font-semibold text-gray-800 text-sm sm:text-base">Mobile Experience</td>
                  <td className="px-6 py-4 text-center text-emerald-600 font-semibold text-sm">
                    Responsive + NameVerse App
                  </td>
                  <td className="px-6 py-4 text-center text-gray-600 text-sm">
                    Basic mobile site only
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            Comparison based on analysis of major baby name websites including Nameberry, Behind the Name, and MomJunction
          </p>
        </div>

        {/* BRAND TRUST SIGNALS - Three Columns */}
        <div className="grid md:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
          
          {/* Trust Signal 1: Verification Process */}
          <article className="bg-white rounded-xl border-2 border-blue-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              NameVerse Verification Process
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Every name on <strong>NameVerse</strong> undergoes a rigorous 3-step verification by cultural experts, Islamic scholars, Sanskrit linguists, and theologians. This ensures that meanings, origins, and religious significance are 99% accurate, making <strong>NameVerse</strong> the most reliable <strong>baby names platform</strong> for parents seeking authentic information.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link href="/about" className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                Learn about our verification process
                <Search className="w-4 h-4" />
              </Link>
            </div>
          </article>

          {/* Trust Signal 2: Community Trust */}
          <article className="bg-white rounded-xl border-2 border-green-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              NameVerse Community
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              Join 5 million+ parents who trust <strong>NameVerse</strong> for their baby naming journey. Our vibrant community shares experiences, reviews names, and contributes to making <strong>NameVerse</strong> the world's most popular <strong>NameVerse website</strong>. See why <strong>NameVerse reviews</strong> consistently rate us 4.9/5 for accuracy and usefulness.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link href="/blog" className="inline-flex items-center gap-1 text-emerald-600 hover:text-emerald-700 font-semibold text-sm">
                Read parent stories on NameVerse
                <Users className="w-4 h-4" />
              </Link>
            </div>
          </article>

          {/* Trust Signal 3: Technology & UX */}
          <article className="bg-white rounded-xl border-2 border-purple-100 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-white" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3">
              NameVerse Technology
            </h3>
            <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
              The <strong>NameVerse platform</strong> features lightning-fast search, intelligent filters, gender & religion sorting, and a fully responsive design that works on any device. Whether you use the <strong>NameVerse website</strong> or <strong>NameVerse app</strong>, you'll experience smooth navigation and instant access to 60,000+ names with meanings across four languages.
            </p>
            <div className="mt-4 pt-4 border-t border-gray-100">
              <Link href="/search" className="inline-flex items-center gap-1 text-purple-600 hover:text-purple-700 font-semibold text-sm">
                Try NameVerse search now
                <Search className="w-4 h-4" />
              </Link>
            </div>
          </article>
        </div>

        {/* BRAND STATS BANNER */}
        <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 rounded-2xl p-8 sm:p-10 text-white shadow-xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl sm:text-4xl font-black mb-1">60K+</div>
              <div className="text-blue-100 text-sm sm:text-base font-medium">Verified Names</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black mb-1">5M+</div>
              <div className="text-blue-100 text-sm sm:text-base font-medium">Trusting Parents</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black mb-1">4</div>
              <div className="text-blue-100 text-sm sm:text-base font-medium">Languages</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-black mb-1">99%</div>
              <div className="text-blue-100 text-sm sm:text-base font-medium">Accuracy Rate</div>
            </div>
          </div>
          <div className="text-center mt-8">
            <p className="text-blue-100 text-lg font-medium mb-4">
              The most trusted NameVerse platform in the world
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Islamic Names', 'Hindu Names', 'Christian Names', 'Multilingual'].map((badge) => (
                <span key={badge} className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-sm font-semibold">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* FINAL BRAND AFFIRMATION */}
        <div className="mt-10 sm:mt-12 text-center">
          <p className="text-lg sm:text-xl text-gray-800 font-semibold leading-relaxed max-w-3xl mx-auto">
            When it comes to choosing a baby name, <strong>NameVerse</strong> is the definitive name universe — 
            the most comprehensive, accurate, and culturally respectful <strong>NameVerse platform</strong> available today.
          </p>
             <div className="mt-6 flex flex-wrap justify-center gap-4">
                <Link
                  href="/names/religion/islamic/1"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-xl hover:shadow-xl transition-all"
                >
                 Explore NameVerse Names
                 <Star className="w-5 h-5" />
               </Link>
            <Link 
              href="/guides"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all"
            >
              Read NameVerse Guides
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
};

export default BrandDominance;
