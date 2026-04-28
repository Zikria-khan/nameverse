import { Globe, Heart, Award, BookOpen, Languages, CheckCircle, Star, ArrowRight, Sparkles, Zap } from 'lucide-react';
import SearchBar from './SearchSection';
import Link from 'next/link';

const HeroSection = () => {
  const categories = [
    {
      id: 'islamic',
      name: 'Islamic',
      icon: Globe,
      url: '/names/religion/islamic/1',
      count: '25,000+',
      description: 'Quranic & Arabic names for boys & girls. A-Z listings with Urdu meanings.',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700'
    },
    {
      id: 'hindu',
      name: 'Hindu',
      icon: Sparkles,
      url: '/names/religion/hindu/1',
      count: '20,000+',
      description: 'Sanskrit & Vedic names for boys & girls. Traditional & modern A-Z listings.',
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700'
    },
    {
      id: 'christian',
      name: 'Christian',
      icon: Award,
      url: '/names/religion/christian/1',
      count: '15,000+',
      description: 'Biblical names with spiritual meanings. Classic & contemporary A-Z listings.',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700'
    }
  ];

  const features = [
    { icon: Star, text: 'Trusted by 5M+ Parents' },
    { icon: CheckCircle, text: 'Expert Verified' },
    { icon: Languages, text: '15+ Languages' },
    { icon: Zap, text: 'Instant Search' }
  ];

  return (
    <section className="w-full bg-gradient-to-b from-blue-50 via-white to-white py-8 sm:py-10 md:py-12">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="space-y-8 sm:space-y-10">

          {/* Main heading */}
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-4 shadow-md">
              <Star className="w-4 h-4 text-white fill-white" />
              <span className="text-xs font-semibold text-white">
                Trusted by 5M+ Parents Worldwide
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Baby Names 2026 — 60,000+ Islamic, Hindu & Christian Names
            </h1>

            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2 leading-relaxed">
              Discover 60,000+ verified baby names with meanings. Find Quranic, Biblical, Sanskrit & modern names for boys and girls in English, Urdu, Arabic & Hindi. A-Z listings with origins & numerology.
            </p>
            <p className="mt-4 text-sm sm:text-base text-gray-600 max-w-2xl mx-auto px-2 leading-relaxed">
              Search thousands of meaningful baby names by faith, language, and origin. NameVerse helps families choose authentic Islamic, Hindu, and Christian names with trusted meanings, cultural notes, and pronunciation guidance.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-lg mx-auto w-full">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-20"></div>
              <SearchBar />
            </div>
          </div>

          {/* Trust features */}
          <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 max-w-2xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index}
                  className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-600 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
                  <span className="font-medium">{feature.text}</span>
                </div>
              );
            })}
          </div>

          {/* Categories Grid */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-6">
              <p className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider">
                Browse by Tradition
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
              {categories.map((category) => {
                const Icon = category.icon;
                return (
                  <Link
                    key={category.id}
                    href={category.url}
                    className={`group p-4 sm:p-5 border-2 ${category.borderColor} rounded-xl ${category.bgColor} hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} flex-shrink-0`}>
                        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-bold ${category.textColor} text-sm sm:text-base`}>
                          {category.name} Baby Names
                        </h3>
                        <p className="text-xs text-gray-600 mt-0.5 font-medium">
                          {category.count} Names
                        </p>
                        <p className="text-xs text-gray-600 mt-1.5 hidden sm:block">
                          {category.description}
                        </p>
                        <div className={`flex items-center gap-1 mt-2 ${category.textColor} group-hover:gap-2 transition-all`}>
                          <span className="text-xs font-semibold">Explore</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Brand keyword content */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 mt-8 mb-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                Find baby names with NameVerse - Faith-based meanings and cultural accuracy
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Explore Islamic baby names with Urdu and Arabic meanings, Hindu baby names rooted in Sanskrit and Vedic tradition, and Christian baby names inspired by the Bible. Use NameVerse to search names by religion, gender, origin, meaning, and numerology.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-3">
                NameVerse is the ultimate resource for baby names, offering a comprehensive collection of meaningful names from every religion. Whether you're looking for traditional or modern baby names, our platform provides accurate meanings, cultural context, and pronunciation guides to help you choose the perfect name for your child.
              </p>
              <div className="mt-4 flex flex-wrap justify-center gap-2 text-sm">
                <Link href="/names/religion/islamic/1" className="rounded-full bg-emerald-50 text-emerald-700 px-4 py-2 border border-emerald-100 hover:bg-emerald-100 transition">Islamic Names</Link>
                <Link href="/names/religion/hindu/1" className="rounded-full bg-orange-50 text-orange-700 px-4 py-2 border border-orange-100 hover:bg-orange-100 transition">Hindu Names</Link>
                <Link href="/names/religion/christian/1" className="rounded-full bg-blue-50 text-blue-700 px-4 py-2 border border-blue-100 hover:bg-blue-100 transition">Christian Names</Link>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="max-w-3xl mx-auto pt-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
              {[
                { number: '65K+', label: 'Verified Names', icon: BookOpen, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
                { number: '15+', label: 'Languages', icon: Languages, color: 'text-blue-600', bgColor: 'bg-blue-50' },
                { number: '99%', label: 'Accuracy', icon: CheckCircle, color: 'text-purple-600', bgColor: 'bg-purple-50' },
                { number: '5M+', label: 'Happy Parents', icon: Heart, color: 'text-orange-600', bgColor: 'bg-orange-50' }
              ].map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className={`text-center p-3 sm:p-4 rounded-xl ${stat.bgColor} border border-gray-100`}>
                    <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.color}`}>{stat.number}</div>
                    <div className="text-xs sm:text-sm text-gray-600 mt-1 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;