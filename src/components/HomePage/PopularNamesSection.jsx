import Link from 'next/link';
import { Heart, Sparkles, Users, Crown, Flame, Star } from 'lucide-react';

const PopularNamesSection = () => {
  const popularBoyNames = [
    { name: 'Muhammad', meaning: 'Praised one, praiseworthy', religion: 'Islamic', origin: 'Arabic', slug: 'muhammad', color: 'emerald' },
    { name: 'Arjun', meaning: 'Bright, shining, white', religion: 'Hindu', origin: 'Sanskrit', slug: 'arjun', color: 'orange' },
    { name: 'Noah', meaning: 'Rest, comfort, peace', religion: 'Christian', origin: 'Hebrew', slug: 'noah', color: 'blue' },
    { name: 'Ali', meaning: 'Exalted, noble, sublime', religion: 'Islamic', origin: 'Arabic', slug: 'ali', color: 'emerald' },
    { name: 'Aiden', meaning: 'Little fire, fiery one', religion: 'Christian', origin: 'Irish', slug: 'aiden', color: 'blue' },
    { name: 'Aarav', meaning: 'Peaceful, wisdom, melody', religion: 'Hindu', origin: 'Sanskrit', slug: 'aarav', color: 'orange' },
    { name: 'Omar', meaning: 'Long-lived, flourishing', religion: 'Islamic', origin: 'Arabic', slug: 'omar', color: 'emerald' },
    { name: 'Liam', meaning: 'Strong-willed warrior', religion: 'Christian', origin: 'Irish', slug: 'liam', color: 'blue' },
    { name: 'Advait', meaning: 'Unique, unparalleled', religion: 'Hindu', origin: 'Sanskrit', slug: 'advait', color: 'orange' },
    { name: 'Zain', meaning: 'Beauty, grace, excellence', religion: 'Islamic', origin: 'Arabic', slug: 'zain', color: 'emerald' },
  ];

  const popularGirlNames = [
    { name: 'Aisha', meaning: 'Living, prosperous, alive', religion: 'Islamic', origin: 'Arabic', slug: 'aisha', color: 'emerald' },
    { name: 'Priya', meaning: 'Beloved, dear one', religion: 'Hindu', origin: 'Sanskrit', slug: 'priya', color: 'orange' },
    { name: 'Sophia', meaning: 'Wisdom, knowledge', religion: 'Christian', origin: 'Greek', slug: 'sophia', color: 'blue' },
    { name: 'Fatima', meaning: 'Captivating, abstinent', religion: 'Islamic', origin: 'Arabic', slug: 'fatima', color: 'emerald' },
    { name: 'Olivia', meaning: 'Olive tree, peace', religion: 'Christian', origin: 'Latin', slug: 'olivia', color: 'blue' },
    { name: 'Ananya', meaning: 'Unique, matchless, peerless', religion: 'Hindu', origin: 'Sanskrit', slug: 'ananya', color: 'orange' },
    { name: 'Zara', meaning: 'Princess, flower, radiance', religion: 'Islamic', origin: 'Arabic', slug: 'zara', color: 'emerald' },
    { name: 'Ava', meaning: 'Life, bird, voice', religion: 'Christian', origin: 'Latin', slug: 'ava', color: 'blue' },
    { name: 'Maya', meaning: 'Illusion, magic, mother', religion: 'Hindu', origin: 'Sanskrit', slug: 'maya', color: 'orange' },
    { name: 'Layla', meaning: 'Night, dark beauty', religion: 'Islamic', origin: 'Arabic', slug: 'layla', color: 'emerald' },
  ];

  const colorMap = {
    emerald: { bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', badge: 'bg-emerald-100 text-emerald-700' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-700', badge: 'bg-orange-100 text-orange-700' },
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header — High-Intent Keywords */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full mb-4 shadow-md">
            <Flame className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-semibold text-white">Most Popular Baby Names 2026 — Top 100 Trending Names</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Popular Baby Names 2026 — Trending Names with Meanings & Origins
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto mb-4">
            Discover the most popular baby names for 2026 with verified meanings, origins, and religious significance. Explore trending Islamic baby names list, Hindu baby names list, Christian baby names list, and unique names gaining popularity. Find top boy names and top girl names chosen by 5M+ parents worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full font-medium">Most Popular Names 2026</span>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">Trending Names This Year</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">Top Boy & Girl Names</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full font-medium">Popular by Religion</span>
          </div>
        </div>

        {/* Trust Banner */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="font-medium">5M+ Parents Trust Us</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-medium">Expert Verified Meanings</span>
          </div>
        </div>

        {/* Popular Names Grid */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Boys Names */}
          <div className="border-2 border-blue-200 rounded-xl overflow-hidden bg-white shadow-lg">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Crown className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Popular Boy Names</h3>
                  <p className="text-sm text-white/80">Top trending names for baby boys</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {popularBoyNames.map((name) => {
                const colors = colorMap[name.color];
                return (
                  <Link
                    key={name.slug}
                    href={`/names/${name.religion.toLowerCase()}/${name.slug}`}
                    className="block p-3 rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-bold text-gray-900">
                            {name.name}
                          </h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                            {name.religion}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {name.meaning} • {name.origin}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-sm font-semibold text-blue-600">View details</div>
                  </Link>
                );
              })}
            </div>

          </div>

          {/* Girls Names */}
          <div className="border-2 border-pink-200 rounded-xl overflow-hidden bg-white shadow-lg">
            <div className="bg-gradient-to-r from-pink-500 to-rose-600 p-4 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Popular Girl Names</h3>
                  <p className="text-sm text-white/80">Top trending names for baby girls</p>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-2">
              {popularGirlNames.map((name) => {
                const colors = colorMap[name.color];
                return (
                  <Link
                    key={name.slug}
                    href={`/names/${name.religion.toLowerCase()}/${name.slug}`}
                    className="block p-3 rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <h4 className="font-bold text-gray-900">
                            {name.name}
                          </h4>
                          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${colors.badge}`}>
                            {name.religion}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600">
                          {name.meaning} • {name.origin}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 text-sm font-semibold text-blue-600">View details</div>
                  </Link>
                );
              })}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default PopularNamesSection;