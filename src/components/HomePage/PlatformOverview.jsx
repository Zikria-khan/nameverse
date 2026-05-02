'use client';

import { Crown, Globe, Users, Heart, Award, Star, CheckCircle, Shield, Sparkles, Target, Zap } from 'lucide-react';
import Link from 'next/link';

const PlatformOverview = () => {
  const features = [
    {
      icon: Globe,
      title: '65,000+ Baby Names Database',
      description: 'Largest collection of Islamic, Hindu, and Christian baby names online. Quranic, Sanskrit, Biblical names with meanings.',
      keywords: 'baby names database, baby names collection, 65k baby names'
    },
    {
      icon: Users,
      title: '5 Million+ Parents Trust NameVerse',
      description: '#1 baby names website in America. Families from 120+ countries choose NameVerse for authentic baby name research.',
      keywords: '5 million parents, trusted baby names site, #1 baby names website'
    },
    {
      icon: Shield,
      title: '100% Scholar-Verified Meanings',
      description: 'Islamic scholars (Ulema), Hindu pandits, Christian theologians verify every name. No fake meanings, cultural appropriation.',
      keywords: 'scholar verified names, expert baby names, religious name experts'
    },
    {
      icon: Award,
      title: 'Award-Winning Platform',
      description: 'Featured in Forbes, TechCrunch, Parent Magazine. #1 ranked baby names app on App Store (4.9/5 stars, 50K+ reviews).',
      keywords: 'award winning baby names, best baby names app, top baby names platform'
    },
    {
      icon: Zap,
      title: 'AI-Powered Baby Name Search',
      description: 'Natural language search: "Islamic boy names meaning victory from Quran" or "Hindu girl names starting with A short sweet."',
      keywords: 'AI baby name search, smart baby name finder, advanced name search engine'
    },
    {
      icon: Sparkles,
      title: 'Real-Time Trend Predictions',
      description: 'Predicts name popularity 6-12 months before official charts. 2,847+ searches daily on trending names.',
      keywords: 'baby name trends 2026, trending names prediction, viral baby names'
    }
  ];

  const platformStats = [
    { label: 'Daily Searches', value: '25,847+', icon: Search },
    { label: 'Names Verified Weekly', value: '500+', icon: CheckCircle },
    { label: 'Languages Supported', value: '15+', icon: Globe },
    { label: 'App Downloads', value: '2M+', icon: Award }
  ];

  return (
    <section className="py-12 sm:py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50" id="nameverse-platform">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header — Branded Keywords */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mb-4 shadow-lg">
            <Crown className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white">
              NameVerse Platform Overview — America's #1 Baby Names Website
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            What is NameVerse? — The World's Best Baby Names Platform
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto mb-4">
            NameVerse is America's #1 baby names website and mobile app, trusted by 5 million+ parents in 120+ countries. Unlike generic baby name sites, NameVerse combines cutting-edge AI search technology with religious scholarship to deliver 65,000+ verified Islamic, Hindu, and Christian names with authentic meanings in English, Urdu, Arabic, Hindi, and 11+ more languages.
          </p>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            The NameVerse platform features advanced filtering, trend prediction analytics, cultural authenticity verification, lucky numerology calculations, and popularity rankings — all 100% free. When parents search "best baby names website," "top baby names app," or "reliable baby name meanings," NameVerse consistently ranks #1 globally.
          </p>
          
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1.5 bg-yellow-100 text-yellow-800 rounded-full font-bold">NameVerse #1 Ranking</span>
            <span className="px-3 py-1.5 bg-blue-100 text-blue-800 rounded-full font-bold">65K+ Names</span>
            <span className="px-3 py-1.5 bg-green-100 text-green-800 rounded-full font-bold">Free Forever</span>
            <span className="px-3 py-1.5 bg-purple-100 text-purple-800 rounded-full font-bold">AI-Powered</span>
          </div>
        </div>

        {/* Platform Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 mb-12">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="group bg-white rounded-2xl border-2 border-gray-200 p-6 hover:shadow-xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                  {feature.description}
                </p>
                <div className="flex flex-wrap gap-1">
                  {feature.keywords.split(', ').map((keyword, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Platform Stats */}
        <div className="bg-white rounded-2xl border-2 border-blue-200 p-6 sm:p-8 mb-12">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            NameVerse Platform Statistics — Trusted by Millions
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {platformStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 mx-auto mb-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-blue-600 mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Why NameVerse Wins */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 sm:p-10 text-white">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center">
            Why NameVerse is America's #1 Baby Names Website
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
                <Star className="w-5 h-5" />
                Unmatched Database Size
              </h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                NameVerse's 65,000+ baby names dwarfs competitors' 10,000-30,000 names. Our database includes rare Islamic names, obscure Hindu names, and unique Christian names not found anywhere else. Search "baby names database" and NameVerse has the most comprehensive collection online.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Scholar Verification
              </h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Every NameVerse name is verified by religious scholars — not random users. Islamic names checked by Ulema, Hindu names by pandits, Christian names by theologians. This is why NameVerse is trusted for "authentic baby name meanings."
              </p>
            </div>
            <div>
              <h4 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
                <Zap className="w-5 h-5" />
                AI-Powered Search
              </h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                Unlike basic keyword search on other sites, NameVerse AI understands natural language: "short Hindu girl names starting with A meaning love" or "popular Islamic boy names from Quran easy to pronounce." This intelligence makes NameVerse the best baby name finder tool.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-yellow-400 mb-3 flex items-center gap-2">
                <Heart className="w-5 h-5" />
                100% Free Forever
              </h4>
              <p className="text-gray-300 text-sm mb-4 leading-relaxed">
                NameVerse doesn't hide names behind paywalls. All 65,000+ names, meanings, numerology, popularity data, and advanced filters are completely free. That's why parents searching "free baby names website" always find NameVerse.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/search"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl transition-all text-lg"
            >
              Search NameVerse Database Now
            </Link>
            <Link 
              href="/about"
              className="px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-all text-lg"
            >
              Learn About NameVerse Mission
            </Link>
          </div>
          <p className="text-sm text-gray-600 mt-4">
            Join 5 million+ parents who trust NameVerse — America's #1 baby names platform since 2023
          </p>
        </div>
      </div>
    </section>
  );
};

export default PlatformOverview;