import Link from 'next/link';
import { Shield, Globe, BookCheck, Users, CheckCircle2, ArrowRight, Trophy, Zap } from 'lucide-react';

const WhyChooseSection = () => {
  const features = [
    {
      icon: Shield,
      title: '99% Verified Accuracy',
      description: 'Every baby name is verified by cultural and religious experts including Islamic scholars, Sanskrit linguists, and theologians to ensure authentic meanings.',
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      textColor: 'text-emerald-700',
      iconBg: 'bg-emerald-100'
    },
    {
      icon: Globe,
      title: 'Multilingual Support',
      description: 'Unique translations in English, Urdu, Arabic, and Hindi with pronunciation guides. No other baby name site offers this comprehensive language support.',
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-700',
      iconBg: 'bg-blue-100'
    },
    {
      icon: BookCheck,
      title: '60,000+ Verified Names',
      description: 'Comprehensive database covering 25,000+ Islamic names, 20,000+ Hindu names, and 15,000+ Christian names with complete cultural context and origins.',
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-700',
      iconBg: 'bg-purple-100'
    },
    {
      icon: Users,
      title: 'Trusted by 5M+ Parents',
      description: 'Join millions of parents worldwide who have found their baby\'s perfect name through our expert-curated, culturally authentic database.',
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50',
      textColor: 'text-orange-700',
      iconBg: 'bg-orange-100'
    }
  ];

  const stats = [
    { number: '60,000+', label: 'Verified Names', icon: BookCheck, color: 'text-emerald-600', bgColor: 'bg-emerald-50' },
    { number: '5M+', label: 'Happy Parents', icon: Users, color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { number: '15+', label: 'Languages', icon: Globe, color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { number: '99%', label: 'Accuracy', icon: Shield, color: 'text-orange-600', bgColor: 'bg-orange-50' }
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-md">
            <Trophy className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">#1 Trusted Baby Name Website</span>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 leading-tight">
            Why Parents Choose <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">NameVerse</span>
          </h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto leading-relaxed">
            Join 5 million+ parents worldwide who trust NameVerse for authentic Islamic, Hindu & Christian baby names with verified meanings and cultural origins.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-8 sm:mb-10">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className={`p-4 sm:p-5 border-2 ${feature.bgColor.replace('bg-', 'border-').replace('-50', '-200')} rounded-xl bg-white hover:shadow-lg transition-all duration-300 hover:-translate-y-1`}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-12 h-12 sm:w-14 sm:h-14 ${feature.iconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 sm:w-7 sm:h-7 ${feature.textColor}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-sm sm:text-base font-bold ${feature.textColor} mb-1.5 leading-snug`}>
                      {feature.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto mb-8 sm:mb-10">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className={`text-center p-3 sm:p-4 ${stat.bgColor} rounded-xl border-2 border-transparent hover:border-gray-200 transition-all`}
              >
                <div className={`text-xl sm:text-2xl md:text-3xl font-bold ${stat.color} mb-0.5 sm:mb-1`}>
                  {stat.number}
                </div>
                <div className="text-xs sm:text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA */}
         <div className="text-center">
            <Link
              href="/names/religion/islamic/1"
              className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm sm:text-base font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1 w-full sm:w-auto"
            >
             <Zap className="w-4 h-4 sm:w-5 sm:h-5" />
             Start Exploring 60,000+ Baby Names
             <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
           </Link>
         </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;