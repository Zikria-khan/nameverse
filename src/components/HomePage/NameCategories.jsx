import Link from 'next/link';
import { Star, BookOpen, Sparkles, Award, MapPin, Hash, Layers } from 'lucide-react';

const NameCategories = () => {
  const categories = [
    {
      icon: Star,
      title: 'Quranic Names',
      description: 'Explore our comprehensive Quranic names list featuring authentic Arabic and Islamic baby names derived directly from the Holy Quran. Each name includes Arabic script, English transliteration, and detailed Islamic meaning. Perfect for Muslim parents seeking spiritually significant names with deep religious importance. Find unique Quranic baby names for boys and girls with verified meanings from Islamic scholars.',
      href: '/names/religion/islamic/1',
      keywords: 'Quranic baby names, Quranic names list, Islamic names from Quran, Arabic Quranic names',
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      border: 'border-emerald-200'
    },
    {
      icon: BookOpen,
      title: 'Sanskrit Names',
      description: 'Discover beautiful Sanskrit baby names with meaning drawn from ancient Hindu traditions and Vedic literature. Our Sanskrit names for boys and girls collection includes origins, cultural significance, and pronunciation guides. From classic Vedic names to modern interpretations, find the perfect Hindu baby name with deep roots in Sanskrit language and Hindu culture.',
      href: '/names/religion/hindu/1',
      keywords: 'Sanskrit baby names, Sanskrit names for boys, Vedic names, Hindu baby names with meaning',
      color: 'orange',
      gradient: 'from-orange-500 to-amber-600',
      bgGradient: 'from-orange-50 to-amber-50',
      border: 'border-orange-200'
    },
    {
      icon: Award,
      title: 'Biblical Names',
      description: 'Browse our curated Biblical names for boys and girls with complete meanings and origins. This Biblical names list includes classic Christian baby names from the Old and New Testaments, along with their spiritual significance. Whether you seek traditional Biblical boy names or girl names with Christian heritage, our collection provides accurate meanings and historical context.',
      href: '/names/religion/christian/1',
      keywords: 'Biblical names, Biblical names for boys and girls, Christian baby names, Bible names list',
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      border: 'border-blue-200'
    },
    {
      icon: MapPin,
      title: 'Origin Names',
      description: 'Explore names filtered by origin to discover Arabic, Sanskrit, Hebrew, and cultural baby name collections with deep meaning and tradition.',
      href: '/names/islamic/origin/arabic/1',
      keywords: 'origin baby names, Arabic origin names, cultural origin names, origin filtered names',
      color: 'teal',
      gradient: 'from-teal-500 to-cyan-600',
      bgGradient: 'from-teal-50 to-cyan-50',
      border: 'border-teal-200'
    },
    {
      icon: Hash,
      title: 'Names by Letter',
      description: 'Browse baby names by first letter for a fast alphabetic search. Great when you want names starting with your favorite letter or sound.',
      href: '/names/islamic/letter/a/1',
      keywords: 'names by letter, letter filtered names, alphabet baby names, baby names starting with a',
      color: 'purple',
      gradient: 'from-purple-500 to-pink-600',
      bgGradient: 'from-purple-50 to-pink-50',
      border: 'border-purple-200'
    },
    {
      icon: Layers,
      title: 'Category Names',
      description: 'Discover names organized by category, including traditional, modern, and themed collections for every naming style.',
      href: '/names/christian/categories/traditional/1',
      keywords: 'category baby names, traditional baby names, names by category, category filtered names',
      color: 'pink',
      gradient: 'from-pink-500 to-rose-600',
      bgGradient: 'from-pink-50 to-rose-50',
      border: 'border-pink-200'
    }
  ];

  const colorClasses = {
    emerald: { badge: 'bg-emerald-100 text-emerald-700', hover: 'hover:text-emerald-700' },
    orange: { badge: 'bg-orange-100 text-orange-700', hover: 'hover:text-orange-700' },
    blue: { badge: 'bg-blue-100 text-blue-700', hover: 'hover:text-blue-700' },
    purple: { badge: 'bg-purple-100 text-purple-700', hover: 'hover:text-purple-700' },
    teal: { badge: 'bg-teal-100 text-teal-700', hover: 'hover:text-teal-700' },
    pink: { badge: 'bg-pink-100 text-pink-700', hover: 'hover:text-pink-700' }
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-md">
            <Sparkles className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">By Category & Origin</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Explore Baby Names by Category & Origin
          </h2>

          <p className="text-base text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Dive into our carefully organized baby name categories to find names by tradition, 
            uniqueness, or cultural origin. Each category features expert-curated lists with 
            meanings, origins, and pronunciation guides to help you choose the perfect name.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((category, index) => {
            const Icon = category.icon;
            const colors = colorClasses[category.color];
            return (
              <Link
                key={index}
                href={category.href}
                className={`group block p-5 sm:p-6 bg-gradient-to-br ${category.bgGradient} rounded-2xl border-2 ${category.border} flex flex-col h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                {/* Icon & Title */}
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 bg-gradient-to-br ${category.gradient} rounded-xl shadow-md`}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {category.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-1">
                  {category.description}
                </p>

                <div className="mt-3">
                  <span className={`inline-flex items-center gap-2 text-sm font-semibold ${colors.hover}`}>
                    Explore {category.title}
                    <span aria-hidden="true">→</span>
                  </span>
                </div>

                {/* Keywords (hidden visually but present for SEO context) */}
                <span className="sr-only">{category.keywords}</span>
              </Link>
            );
          })}
        </div>

        {/* Bottom CTA */}
      </div>
    </section>
  );
};

export default NameCategories;
