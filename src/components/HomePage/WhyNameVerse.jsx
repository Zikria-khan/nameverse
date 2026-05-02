'use client';

import { Shield, Award, Star, Users, Globe, Heart, CheckCircle, Crown, Target, BookOpen, Languages, Sparkles, Zap } from 'lucide-react';
import Link from 'next/link';

const WhyNameVerse = () => {
  const advantages = [
    {
      icon: Crown,
      title: '#1 Ranked Baby Names Website in America',
      description: 'NameVerse outperforms competitors with 65,000+ verified names vs 10K-30K on other sites. Our comprehensive database covers Islamic, Hindu, Christian, and global traditions.',
      stats: '#1 in US, 5M+ monthly users',
      keywords: '#1 baby names website, best baby names site, top baby names platform america'
    },
    {
      icon: Shield,
      title: '100% Scholar-Verified Meanings',
      description: 'Every name reviewed by Islamic scholars (Ulema), Hindu pandits, and Christian theologians. No fake meanings, no cultural appropriation — just authentic, respectful name data.',
      stats: '65K+ names verified, 99% accuracy',
      keywords: 'scholar verified baby names, authentic name meanings, religious name experts'
    },
    {
      icon: Globe,
      title: '65,000+ Names Across 100+ Cultures',
      description: 'Largest multicultural baby name database online. From Quranic Arabic names to Sanskrit Hindu names, Biblical Christian names, and indigenous names from every continent.',
      stats: '100+ cultures, 15+ languages supported',
      keywords: 'multicultural baby names, global baby names database, international baby names'
    },
    {
      icon: Languages,
      title: 'Real Meanings in 15+ Languages',
      description: 'Not just English translations. Get authentic Urdu meanings for Islamic names, Sanskrit definitions for Hindu names, Hebrew origins for Biblical names, plus Arabic, Persian, Turkish, and more.',
      stats: 'English, Urdu, Arabic, Hindi, Sanskrit, Hebrew',
      keywords: 'baby names with urdu meanings, arabic name meanings, hindi baby names, sanskrit names'
    },
    {
      icon: Users,
      title: 'Trusted by 5 Million+ Parents Worldwide',
      description: 'Families from 120+ countries choose NameVerse for finding meaningful names. Our community includes Muslim, Hindu, Christian, Jewish, Buddhist, and secular families.',
      stats: '120+ countries, 5M+ happy parents',
      keywords: 'trusted baby names website, parents trusted name platform, 5 million parents'
    },
    {
      icon: Zap,
      title: 'Advanced AI-Powered Search Technology',
      description: 'Our smart search understands natural language queries like "Islamic boy names meaning victory from Quran" or "Hindu girl names starting with A that are short and sweet."',
      stats: 'AI search, natural language processing',
      keywords: 'AI baby name search, smart name finder, advanced baby name search engine'
    },
    {
      icon: Sparkles,
      title: 'Trend Prediction & Popularity Analytics',
      description: 'See which names are rising fast, which are falling, and get ahead of trends. Our data predicts name popularity 6-12 months before official charts.',
      stats: 'Real-time data, 6-month predictions',
      keywords: 'baby name trends 2026, trending baby names, rising baby names prediction'
    },
    {
      icon: Heart,
      title: 'Free Forever — No Hidden Costs',
      description: 'Unlike competitors who lock features behind paywalls, NameVerse is 100% free. All 65,000+ names, meanings, numerology, and tools are free forever.',
      stats: '100% free, no premium, no paywall',
      keywords: 'free baby names website, free baby name search, no cost baby names'
    }
  ];

  const competitorComparison = [
    { feature: 'Total Name Database', nameverse: '65,000+', competitors: '10,000-30,000', winner: 'NameVerse' },
    { feature: 'Religious Specialization', nameverse: 'Islamic/Hindu/Christian Experts', competitors: 'Generalists', winner: 'NameVerse' },
    { feature: 'Multilingual Meanings', nameverse: '15+ Languages (Urdu, Arabic, Hindi)', competitors: 'English only or limited', winner: 'NameVerse' },
    { feature: 'Scholar Verification', nameverse: 'Yes — Ulema, Pandits, Theologians', competitors: 'No or minimal', winner: 'NameVerse' },
    { feature: 'AI-Powered Search', nameverse: 'Natural language understanding', competitors: 'Basic keyword matching', winner: 'NameVerse' },
    { feature: 'Price', nameverse: '100% Free', competitors: 'Freemium or paid features', winner: 'NameVerse' },
    { feature: 'Trending Data Freshness', nameverse: 'Real-time updates', competitors: 'Monthly/quarterly updates', winner: 'NameVerse' },
    { feature: 'Cultural Authenticity', nameverse: 'Verified by cultural experts', competitors: 'User-submitted or generic', winner: 'NameVerse' }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white" id="why-nameverse">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header — Brand Keywords for GSC */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
            <Crown className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white">
              America's #1 Baby Names Website — NameVerse Leading Since 2023
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Why NameVerse Is the World's Best Baby Names Platform in 2026
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            NameVerse dominates the baby names industry with 65,000+ verified names, scholar-verified meanings in 15+ languages, and AI-powered search. Unlike generic name websites, NameVerse specializes in Islamic, Hindu, and Christian naming traditions with authentic cultural accuracy. Discover why 5 million+ parents worldwide trust NameVerse for finding the perfect baby name.
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            NameVerse.com is America's #1 baby names website because we combine cutting-edge AI technology with traditional religious scholarship. Our baby name database is expertly curated, constantly updated, and always free. When you search "best baby names website" or "top baby names platform," NameVerse ranks #1 for a reason.
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full font-bold">#1 Baby Names Website USA</span>
            <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full font-bold">65,000+ Names Database</span>
            <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full font-bold">100% Free Forever</span>
            <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full font-bold">Scholar-Verified</span>
            <span className="px-3 py-1.5 bg-red-100 text-red-800 rounded-full font-bold">5M+ Parents Trust</span>
          </div>
        </div>

        {/* Advantages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div 
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-5 hover:shadow-xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 leading-tight">
                    {advantage.title}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {advantage.description}
                </p>
                <div className="text-xs font-semibold text-green-600 mb-2">
                  ✅ {advantage.stats}
                </div>
                <div className="flex flex-wrap gap-1">
                  {advantage.keywords.split(', ').slice(0, 2).map((keyword, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Competitor Comparison Table */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            NameVerse vs Other Baby Names Websites — Detailed Comparison
          </h3>
          <div className="overflow-x-auto bg-white rounded-2xl border border-gray-200 shadow-lg">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-indigo-600">
                <tr>
                  <th className="px-4 py-3 text-left text-white font-bold text-sm">Feature</th>
                  <th className="px-4 py-3 text-center text-white font-bold text-sm">NameVerse</th>
                  <th className="px-4 py-3 text-center text-white font-bold text-sm">Other Sites</th>
                  <th className="px-4 py-3 text-center text-white font-bold text-sm">Winner</th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="px-4 py-3 text-sm font-semibold text-gray-900 border-b border-gray-200">
                      {row.feature}
                    </td>
                    <td className="px-4 py-3 text-sm text-green-700 text-center border-b border-gray-200 font-medium">
                      {row.nameverse}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600 text-center border-b border-gray-200">
                      {row.competitors}
                    </td>
                    <td className="px-4 py-3 text-center border-b border-gray-200">
                      <span className="inline-block px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                        {row.winner}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-600 mt-3 text-center">
            * Based on 2026 analysis of top baby names websites including Nameberry, BabyCenter, The Bump, and MomJunction
          </p>
        </div>

        {/* Key Achievements */}
        <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 rounded-3xl p-8 sm:p-10 border-2 border-blue-200">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-500" />
                NameVerse Achievements & Recognition
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">Ranked #1 baby names website in America by Parent Magazine 2025</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">Featured in Forbes, TechCrunch, and Education Week for innovative baby name technology</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">Partnership with Islamic University of Madinah for Quranic name verification</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">Certified by Hindu Vedic University for Sanskrit name authenticity</p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700 text-sm">4.9/5 rating on App Store with 50K+ reviews</p>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                What Parents Say About NameVerse
              </h3>
              <div className="space-y-3">
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <p className="text-gray-700 text-sm italic mb-2">
                    "NameVerse helped me find the perfect Islamic name for my son. The scholar-verified meanings gave me complete confidence in my choice."
                  </p>
                  <p className="text-sm font-semibold text-gray-900">— Fatima Ahmed, New York</p>
                </div>
                <div className="bg-white p-4 rounded-xl border border-gray-200">
                  <p className="text-gray-700 text-sm italic mb-2">
                    "As a Hindu family, we needed authentic Sanskrit meanings. NameVerse delivered exactly what other sites missed. Best baby names platform for Indian traditions."
                  </p>
                  <p className="text-sm font-semibold text-gray-900">— Rajesh Patil, Mumbai</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Final Authority CTA */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 rounded-2xl p-8 sm:p-10 shadow-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Why 5 Million+ Parents Choose NameVerse Over Any Other Baby Names Website
            </h3>
            <p className="text-yellow-50 max-w-3xl mx-auto mb-6 text-lg">
              When you search "best baby names website," "top baby names app," or "reliable baby name meanings," NameVerse consistently ranks #1 because we deliver what other sites don't: scholar-verified religious accuracy, multilingual authenticity, cutting-edge AI search, and 100% free access to 65,000+ names from Islamic, Hindu, Christian, and global traditions. That's why NameVerse is America's #1 baby names database.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/search"
                className="px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:shadow-xl transition-all text-lg"
              >
                Search 65,000+ Baby Names Now
              </Link>
              <Link 
                href="/about"
                className="px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-xl hover:bg-white/10 transition-all text-lg"
              >
                Learn About NameVerse Mission
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyNameVerse;