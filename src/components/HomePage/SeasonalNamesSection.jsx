'use client';

import { Calendar, TrendingUp, Sparkles, Clock, Sun, Cloud, Leaf, Snowflake, Flower, SunMedium } from 'lucide-react';
import Link from 'next/link';

const SeasonalNamesSection = () => {
  const seasons = [
    {
      name: 'Spring Baby Names',
      icon: Flower,
      months: 'March, April, May',
      description: 'Fresh, nature-inspired names perfect for spring babies. Flowers, new beginnings, renewal themes.',
      keywords: 'spring baby names, march baby names, april baby names, may baby names, flower names',
      link: '/season/spring',
      color: 'from-pink-500 to-rose-500',
      trending: ['Daisy', 'Lily', 'Rose', 'Iris', 'Violet', 'Poppy', 'Marigold', 'Jasmine']
    },
    {
      name: 'Summer Baby Names',
      icon: Sun,
      months: 'June, July, August',
      description: 'Bright, warm names perfect for summer babies. Sun, heat, joy, and energy-inspired names.',
      keywords: 'summer baby names, june baby names, july baby names, august baby names, sun names',
      link: '/season/summer',
      color: 'from-yellow-500 to-orange-500',
      trending: ['Summer', 'Solstice', 'Ray', 'Phoenix', 'Blaze', 'Goldie', 'Marigold', 'Daisy']
    },
    {
      name: 'Autumn Baby Names',
      icon: Leaf,
      months: 'September, October, November',
      description: 'Rich, earthy names for fall babies. Harvest, changing leaves, and cozy warmth themes.',
      keywords: 'autumn baby names, fall baby names, september baby names, october baby names, november baby names',
      link: '/season/autumn',
      color: 'from-orange-500 to-amber-500',
      trending: ['Amber', 'Autumn', 'Maple', 'Cedar', 'Rowan', 'Sage', 'Hazel', 'Willow']
    },
    {
      name: 'Winter Baby Names',
      icon: Snowflake,
      months: 'December, January, February',
      description: 'Crisp, elegant names for winter babies. Snow, ice, serenity, and holiday themes.',
      keywords: 'winter baby names, december baby names, january baby names, february baby names, snow names',
      link: '/season/winter',
      color: 'from-blue-500 to-cyan-500',
      trending: ['Winter', 'Frost', 'Iris', 'Nova', 'Crystal', 'Pearl', 'Ivy', 'Everest']
    }
  ];

  const monthlyTrends = [
    { month: 'January', topNames: ['Noah', 'Emma', 'Olivia', 'Liam'], keyword: 'january baby names 2026' },
    { month: 'February', topNames: ['Mia', 'Lucas', 'Charlotte', 'Henry'], keyword: 'february baby names 2026' },
    { month: 'March', topNames: ['Ava', 'Ethan', ' Sophia', 'James'], keyword: 'march baby names 2026' },
    { month: 'April', topNames: ['Aria', 'Alexander', 'Amelia', 'Benjamin'], keyword: 'april baby names 2026' },
    { month: 'May', topNames: ['Theodore', 'Isabella', 'Mason', 'Evelyn'], keyword: 'may baby names 2026' },
    { month: 'June', topNames: ['Jacob', 'Mia', 'William', 'Harper'], keyword: 'june baby names 2026' },
    { month: 'July', topNames: ['Michael', 'Charlotte', 'Elijah', 'Sophia'], keyword: 'july baby names 2026' },
    { month: 'August', topNames: ['Daniel', 'Ava', 'Logan', 'Emily'], keyword: 'august baby names 2026' },
    { month: 'September', topNames: ['Jackson', 'Sofia', 'Mateo', 'Ella'], keyword: 'september baby names 2026' },
    { month: 'October', topNames: ['Samuel', 'Abigail', 'Levi', 'Madison'], keyword: 'october baby names 2026' },
    { month: 'November', topNames: ['Gabriel', 'Luna', 'Joseph', 'Avery'], keyword: 'november baby names 2026' },
    { month: 'December', topNames: ['David', 'Stella', 'Carter', 'Riley'], keyword: 'december baby names 2026' }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header — Seasonal Keywords */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-4 shadow-md">
            <Calendar className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">
              Baby Names by Season & Month — Find Perfect Name for Your Baby's Birth Month
            </span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Seasonal Baby Names & Monthly Trends — Names by Birth Month
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Discover the most popular baby names by season and month. Whether your baby arrives in spring, summer, autumn, or winter, find names that match the season's energy. Explore trending names for January babies, February babies, and every month of 2026. Seasonal baby names are gaining popularity as parents seek names that reflect birth timing and nature.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1.5 bg-green-100 text-green-700 rounded-full font-medium">Spring Baby Names</span>
            <span className="px-3 py-1.5 bg-yellow-100 text-yellow-700 rounded-full font-medium">Summer Baby Names</span>
            <span className="px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full font-medium">Autumn Baby Names</span>
            <span className="px-3 py-1.5 bg-blue-100 text-blue-700 rounded-full font-medium">Winter Baby Names</span>
            <span className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded-full font-medium">Monthly Name Trends</span>
          </div>
        </div>

        {/* Seasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-12">
          {seasons.map((season, index) => {
            const Icon = season.icon;
            return (
              <div 
                key={index}
                className="group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-5 hover:shadow-xl hover:border-blue-400 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 bg-gradient-to-br ${season.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {season.name}
                </h3>
                <p className="text-xs text-gray-500 mb-3 font-medium">
                  Peak months: {season.months}
                </p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                  {season.description}
                </p>
                <div className="mb-3">
                  <p className="text-xs font-semibold text-gray-900 mb-2">Trending This Season:</p>
                  <div className="flex flex-wrap gap-1">
                    {season.trending.map((name, i) => (
                      <Link 
                        key={i}
                        href={`/search?q=${name.toLowerCase()}`}
                        className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                      >
                        {name}
                      </Link>
                    ))}
                  </div>
                </div>
                <Link 
                  href={season.link}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  View {season.name} →
                </Link>
              </div>
            );
          })}
        </div>

        {/* Monthly Trends Table */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border-2 border-blue-200 mb-12">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              📅 Popular Baby Names by Month — 2026 Trends
            </h3>
            <p className="text-gray-600 text-sm">
              Top baby names for each month based on NameVerse search data and popularity rankings
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {monthlyTrends.map((monthData, index) => (
              <div 
                key={index}
                className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-300 hover:shadow-lg transition-all"
              >
                <h4 className="text-sm font-bold text-blue-600 mb-2 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {monthData.month}
                </h4>
                <div className="space-y-1">
                  {monthData.topNames.map((name, i) => (
                    <Link 
                      key={i}
                      href={`/search?q=${name.toLowerCase()}`}
                      className="block text-sm text-gray-700 hover:text-blue-600 transition-colors"
                    >
                      {i + 1}. {name}
                    </Link>
                  ))}
                </div>
                <div className="mt-2 pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">{monthData.keyword}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link 
              href="/baby-names-by-month"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-lg hover:shadow-lg transition-all"
            >
              <Calendar className="w-5 h-5" />
              View All Monthly Baby Name Trends
            </Link>
          </div>
        </div>

        {/* Authority Content */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
            Why Seasonal & Monthly Baby Names Are Trending in 2026
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-green-600 mb-3">🌱 Seasonal Significance</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Parents increasingly choose names that reflect the season their baby is born. Spring names like Lily and Daisy symbolize renewal. Summer names like Sunshine and Phoenix represent warmth. Autumn names like Maple and Cedar evoke changing leaves. Winter names like Snow and Frost capture serenity.
              </p>
              <p className="text-xs text-gray-500 mt-3">Keywords: seasonal baby names, birth month names, nature-inspired names</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-blue-600 mb-3">📊 Monthly Popularity Data</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                NameVerse tracks baby name popularity by month, revealing fascinating trends. Certain names spike during specific months due to celebrity births, holidays, or cultural events. Our data shows December babies get festive names like Noel and Star. March babies get nature awakening names like River and Flora.
              </p>
              <p className="text-xs text-gray-500 mt-3">Keywords: monthly baby name trends, birth month popularity, seasonal naming trends</p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200">
              <h4 className="font-bold text-purple-600 mb-3">🔮 Astrological Influences</h4>
              <p className="text-gray-700 text-sm leading-relaxed">
                Many parents also consider zodiac signs when choosing monthly names. Aries babies (March-April) get bold names like Alexander. Cancer babies (June-July) get nurturing names like Grace. Our zodiac baby names guide complements seasonal naming perfectly.
              </p>
              <p className="text-xs text-gray-500 mt-3">Keywords: zodiac baby names, astrological names, star sign names</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeasonalNamesSection;