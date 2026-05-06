'use client';

import { Globe, BookOpen, Sparkles, Award, Heart, Users, Shield, Languages, Star, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const ReligiousNamesSection = () => {
  const religions = [
    {
      id: 'islamic',
      name: 'Islamic Baby Names',
      icon: Globe,
      color: 'emerald',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      gradient: 'from-emerald-500 to-teal-600',
      count: '25,000+ Names',
      description: 'Quranic names with Urdu & Arabic meanings. Scholar-verified Islamic names for boys and girls.',
      keywords: 'islamic baby names, quranic names, muslim baby names, arabic names, urdu baby names, islamic boy names, islamic girl names',
      popularNames: ['Muhammad', 'Fatima', 'Aisha', 'Ali', 'Yusuf', 'Maryam', 'Ibrahim', 'Zainab'],
      link: '/names/religion/islamic/1'
    },
    {
      id: 'hindu',
      name: 'Hindu Baby Names',
      icon: Sparkles,
      color: 'orange',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      gradient: 'from-orange-500 to-amber-600',
      count: '20,000+ Names',
      description: 'Sanskrit & Vedic names with Hindi meanings. Traditional and modern Hindu names for babies.',
      keywords: 'hindu baby names, sanskrit names, vedic names, indian baby names, hindi baby names, hindu boy names, hindu girl names',
      popularNames: ['Aarav', 'Ananya', 'Krishna', 'Priya', 'Arjun', 'Diya', 'Vihaan', 'Saanvi'],
      link: '/names/religion/hindu/1'
    },
    {
      id: 'christian',
      name: 'Christian Baby Names',
      icon: BookOpen,
      color: 'blue',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      gradient: 'from-blue-500 to-indigo-600',
      count: '15,000+ Names',
      description: 'Biblical & Christian names with deep spiritual meaning. Classic and contemporary Christian baby names.',
      keywords: 'christian baby names, biblical names, bible names, christian boy names, christian girl names, biblical girl names, biblical boy names',
      popularNames: ['Noah', 'Sophia', 'James', 'Mary', 'John', 'Elizabeth', 'David', 'Sarah'],
      link: '/names/religion/christian/1'
    }
  ];

  const faithFeatures = [
    {
      icon: Shield,
      title: 'Scholar-Verified',
      description: 'Every religious name reviewed by Islamic scholars, Hindu pandits, and Christian theologians ensuring authentic meaning and cultural respect.'
    },
    {
      icon: Languages,
      title: 'Original Language Meanings',
      description: 'Arabic, Sanskrit, Hebrew meanings alongside English translations. Accurate transliteration and pronunciation guides included.'
    },
    {
      icon: Heart,
      title: 'Cultural Authenticity',
      description: 'Names include historical context, scripture references, and cultural significance from original religious texts.'
    },
    {
      icon: Users,
      title: 'Community Trusted',
      description: 'Used by 5M+ families from Islamic, Hindu, and Christian communities worldwide to choose authentic faith-based names.'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header with Religious Keywords */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full text-sm font-semibold mb-4">
            Faith-Based Name Selection
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Religious Baby Names — Islamic, Hindu & Christian Names with Meanings
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover authentic religious baby names from Islamic, Hindu, and Christian traditions. Our scholar-verified database includes Quranic names with Urdu meanings, Sanskrit names with Hindi translations, and Biblical names with spiritual significance.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Quranic Names</span>
            <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full font-medium">Sanskrit Names</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Biblical Names</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">Urdu Meanings</span>
            <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-medium">Hindi Translations</span>
          </div>
        </div>

        {/* Religion Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 mb-12">
          {religions.map((religion) => {
            const Icon = religion.icon;
            return (
              <div 
                key={religion.id}
                className={`group relative bg-white rounded-2xl border-2 ${religion.borderColor} p-6 sm:p-8 hover:shadow-2xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-2 overflow-hidden`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${religion.gradient} opacity-0 group-hover:opacity-5 transition-opacity`} />
                
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${religion.gradient}`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${religion.textColor}`}>
                      {religion.name}
                    </h3>
                    <p className="text-sm text-gray-500 font-semibold">
                      {religion.count}
                    </p>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed">
                  {religion.description}
                </p>

                {/* Popular Names */}
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-gray-900 mb-3">Popular Names</h4>
                  <div className="flex flex-wrap gap-2">
                    {religion.popularNames.map((name, i) => (
                      <Link 
                        key={i}
                        href={`/names/${religion.id}/${name.toLowerCase()}`}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-full ${religion.bgColor} ${religion.textColor} border ${religion.borderColor} hover:bg-opacity-80 transition-colors`}
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Keywords */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1">
                    {religion.keywords.split(', ').slice(0, 3).map((keyword, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-500 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <Link 
                  href={religion.link}
                  className={`inline-flex items-center gap-2 w-full justify-center px-4 py-3 bg-gradient-to-r ${religion.gradient} text-white font-bold rounded-lg hover:shadow-lg transition-all group/btn`}
                >
                  Explore {religion.name}
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </div>
            );
          })}
        </div>

        {/* Faith Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {faithFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 rounded-xl bg-white border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-xs text-gray-600 leading-tight">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Authority Banner */}
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-6 sm:p-8 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
            The World's Most Comprehensive Religious Baby Names Database - Quranic, Sanskrit & Biblical Names
          </h3>
          <p className="text-gray-300 max-w-3xl mx-auto mb-6">
            Unlike generic baby name sites, NameVerse specializes in authentic religious naming traditions. Our Islamic baby names include Quranic references, Arabic etymology, and Urdu meanings. Hindu names feature Vedic context, Sanskrit roots, and Hindi translations. Christian names include Biblical citations, saint histories, and faith heritage. Discover spiritual baby names with deep cultural and religious significance.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {religions.map((religion) => (
              <Link
                key={religion.id}
                href={religion.link}
                className={`px-5 py-2.5 rounded-lg border-2 ${religion.borderColor} ${religion.textColor} hover:bg-white transition-all font-semibold text-sm`}
              >
                Browse {religion.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReligiousNamesSection;