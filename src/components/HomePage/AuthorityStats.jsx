'use client';

import { BookOpen, Languages, CheckCircle, Heart, Award, Users, Globe, Shield } from 'lucide-react';

const AuthorityStats = () => {
  const stats = [
    {
      number: '65K+',
      label: 'Verified Baby Names',
      description: 'Expert-reviewed names from Islamic, Hindu, Christian, and global traditions',
      icon: BookOpen,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      number: '15+',
      label: 'Languages Supported',
      description: 'Meanings in English, Urdu, Arabic, Hindi, and 11+ more languages',
      icon: Languages,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      number: '99%',
      label: 'Accuracy Rate',
      description: 'Scholar-verified meanings ensuring cultural and religious authenticity',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      number: '5M+',
      label: 'Parents Trusted Worldwide',
      description: 'Families across 120+ countries rely on NameVerse for meaningful names',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  const trustFeatures = [
    {
      icon: Award,
      title: 'Scholar-Verified Meanings',
      description: 'Every name reviewed by Islamic scholars, Hindu pandits, and Christian theologians'
    },
    {
      icon: Users,
      title: '5 Million+ Happy Families',
      description: 'Real parents who found the perfect name on NameVerse'
    },
    {
      icon: Globe,
      title: 'Global Name Database',
      description: 'Names from 100+ cultures, religions, and linguistic traditions'
    },
    {
      icon: Shield,
      title: '100% Free & Accurate',
      description: 'No hidden fees, no fake meanings — just reliable name data'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Why Parents Trust NameVerse — America's #1 Baby Names Website 2026
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            The world's most comprehensive and accurate baby names database with scholar-verified meanings across Islamic, Hindu, Christian, and global traditions.
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div 
                key={index} 
                className={`text-center p-5 sm:p-6 rounded-2xl ${stat.bgColor} border-2 ${stat.borderColor} hover:shadow-lg transition-all hover:-translate-y-1`}
              >
                <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-br ${stat.color.replace('text-', 'from-').replace('600', '500').replace('700', '600')} to-current flex items-center justify-center`}
                     style={{ background: `linear-gradient(135deg, ${stat.color.includes('emerald') ? '#10b981' : stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('purple') ? '#8b5cf6' : stat.color.includes('red') ? '#ef4444' : '#6b7280'}20, ${stat.color.includes('emerald') ? '#10b981' : stat.color.includes('blue') ? '#3b82f6' : stat.color.includes('purple') ? '#8b5cf6' : stat.color.includes('red') ? '#ef4444' : '#6b7280'}40)`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7" style={{ color: stat.color.replace('text-', '').replace('600', '').replace('700', '') }} />
                </div>
                <div className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1`}>{stat.number}</div>
                <div className="text-sm font-bold text-gray-900 mb-1">{stat.label}</div>
                <div className="text-xs text-gray-600 leading-tight">{stat.description}</div>
              </div>
            );
          })}
        </div>

        {/* Trust Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {trustFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index} 
                className="flex items-start gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
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

        {/* Authority Statement */}
        <div className="mt-10 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl shadow-lg">
            <Shield className="w-5 h-5 text-white" />
            <span className="text-sm font-bold text-white">
              ✓ America's #1 Baby Names Database — 99% Accurate, 100% Free
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorityStats;