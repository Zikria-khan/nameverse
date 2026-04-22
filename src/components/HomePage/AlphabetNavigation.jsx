import Link from 'next/link';
import { Search, Sparkles, TrendingUp } from 'lucide-react';

const AlphabetNavigation = () => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
  
  const popularLetters = [
    { letter: 'A', count: '8,500+', color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
    { letter: 'M', count: '7,200+', color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
    { letter: 'S', count: '6,800+', color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
    { letter: 'Z', count: '4,500+', color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', textColor: 'text-orange-700' },
    { letter: 'F', count: '5,100+', color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50', textColor: 'text-pink-700' },
    { letter: 'H', count: '4,800+', color: 'from-teal-500 to-teal-600', bgColor: 'bg-teal-50', textColor: 'text-teal-700' },
  ];

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4 shadow-md">
            <Search className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Baby Names A to Z</span>
          </div>
          
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Browse Baby Names by <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Letter</span>
          </h2>
          
          <p className="text-base text-gray-600 max-w-2xl mx-auto">
            Discover Islamic, Hindu & Christian baby names starting with any letter.
          </p>
        </div>

        {/* Alphabet Grid */}
        <div className="grid grid-cols-4 sm:grid-cols-7 md:grid-cols-9 lg:grid-cols-13 gap-2 sm:gap-3 max-w-4xl mx-auto mb-8 sm:mb-10">
          {alphabet.map((letter, index) => {
            // Add colorful hover effect based on position
            const hue = (index * 15) % 360;
            return (
              <Link
                key={letter}
                href={`/names/islamic/letter/${letter.toLowerCase()}`}
                className="aspect-square flex items-center justify-center bg-white border-2 border-gray-200 rounded-lg font-bold text-lg text-gray-700 hover:border-transparent hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                style={{
                  '--hover-bg': `hsl(${hue}, 70%, 95%)`,
                  '--hover-border': `hsl(${hue}, 70%, 60%)`,
                  '--hover-text': `hsl(${hue}, 70%, 40%)`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `hsl(${hue}, 70%, 95%)`;
                  e.currentTarget.style.borderColor = `hsl(${hue}, 70%, 60%)`;
                  e.currentTarget.style.color = `hsl(${hue}, 70%, 40%)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'white';
                  e.currentTarget.style.borderColor = '#e5e7eb';
                  e.currentTarget.style.color = '#374151';
                }}
                aria-label={`Browse baby names starting with letter ${letter}`}
              >
                {letter}
              </Link>
            );
          })}
        </div>

        {/* Popular Letters */}
        <div className="mt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <h3 className="text-lg font-bold text-gray-900">Most Popular Starting Letters</h3>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 max-w-5xl mx-auto">
            {popularLetters.map((item) => (
              <Link
                key={item.letter}
                href={`/names/islamic/letter/${item.letter.toLowerCase()}`}
                className={`block ${item.bgColor} rounded-xl p-4 border-2 ${item.borderColor || 'border-transparent'} hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center`}
              >
                <div className={`text-2xl font-bold ${item.textColor} mb-1`}>Letter {item.letter}</div>
                <div className="text-sm text-gray-600 font-medium">{item.count} names</div>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Search Hint */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-xl">
            <Sparkles className="w-4 h-4 text-blue-500" />
            <span className="text-sm text-gray-700">
              <strong>Tip:</strong> Use the search bar above for instant name suggestions!
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AlphabetNavigation;