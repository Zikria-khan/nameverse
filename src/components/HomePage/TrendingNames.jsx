'use client';

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Heart, BookOpen, ArrowRight, Star, Search, RefreshCw, Sparkles, Zap, Crown, Flame } from 'lucide-react';
import toast from 'react-hot-toast';

const religionFilters = [
  { value: "islamic", label: "Islamic", color: "from-emerald-500 to-teal-600", bgColor: "bg-emerald-50", textColor: "text-emerald-700" },
  { value: "hindu", label: "Hindu", color: "from-orange-500 to-amber-600", bgColor: "bg-orange-50", textColor: "text-orange-700" },
  { value: "christian", label: "Christian", color: "from-blue-500 to-indigo-600", bgColor: "bg-blue-50", textColor: "text-blue-700" },
];

// Manually curated trending/famous names for each religion
const TRENDING_NAMES = {
  islamic: [
    { _id: '1', name: 'Aisha', slug: 'aisha', religion: 'islamic', gender: 'Female', origin: 'Arabic', short_meaning: 'Living, prosperous', long_meaning: 'Aisha means living, prosperous, and full of life. It is a popular name in Islamic cultures.', lucky_number: 7, lucky_colors: ['#4CAF50', '#8BC34A', '#CDDC39'] },
    { _id: '2', name: 'Omar', slug: 'omar', religion: 'islamic', gender: 'Male', origin: 'Arabic', short_meaning: 'Long-lived, flourishing', long_meaning: 'Omar means long-lived and flourishing. A strong name with historical significance.', lucky_number: 4, lucky_colors: ['#2196F3', '#1976D2', '#1565C0'] },
    { _id: '3', name: 'Fatima', slug: 'fatima', religion: 'islamic', gender: 'Female', origin: 'Arabic', short_meaning: 'Captivating, enchanting', long_meaning: 'Fatima means captivating and enchanting. One of the most revered names in Islam.', lucky_number: 3, lucky_colors: ['#E91E63', '#F48FB1', '#F8BBD0'] },
    { _id: '4', name: 'Ali', slug: 'ali', religion: 'islamic', gender: 'Male', origin: 'Arabic', short_meaning: 'High, exalted, noble', long_meaning: 'Ali means high, exalted, and noble. A name of great historical and spiritual significance.', lucky_number: 1, lucky_colors: ['#FF9800', '#F57C00', '#E65100'] },
    { _id: '5', name: 'Zainab', slug: 'zainab', religion: 'islamic', gender: 'Female', origin: 'Arabic', short_meaning: 'Fragrant flower, beauty', long_meaning: 'Zainab means fragrant flower and represents beauty and grace.', lucky_number: 6, lucky_colors: ['#9C27B0', '#7B1FA2', '#6A1B9A'] },
    { _id: '6', name: 'Yusuf', slug: 'yusuf', religion: 'islamic', gender: 'Male', origin: 'Arabic', short_meaning: 'God increases, handsome', long_meaning: 'Yusuf means God increases. The name of a beloved prophet known for his beauty and wisdom.', lucky_number: 2, lucky_colors: ['#00BCD4', '#0097A7', '#00838F'] },
    { _id: '7', name: 'Maryam', slug: 'maryam', religion: 'islamic', gender: 'Female', origin: 'Arabic', short_meaning: 'Devout, pious, beloved', long_meaning: 'Maryam means devout and pious. The name of the mother of Prophet Isa (Jesus).', lucky_number: 9, lucky_colors: ['#E91E63', '#C2185B', '#AD1457'] },
    { _id: '8', name: 'Ibrahim', slug: 'ibrahim', religion: 'islamic', gender: 'Male', origin: 'Arabic', short_meaning: 'Father of many nations', long_meaning: 'Ibrahim means father of many nations. The name of a great prophet and patriarch.', lucky_number: 5, lucky_colors: ['#3F51B5', '#303F9F', '#1A237E'] },
  ],
  hindu: [
    { _id: '9', name: 'Aarav', slug: 'aarav', religion: 'hindu', gender: 'Male', origin: 'Sanskrit', short_meaning: 'Peaceful, wise', long_meaning: 'Aarav means peaceful and wise. A popular modern Hindu name.', lucky_number: 6, lucky_colors: ['#9C27B0', '#7B1FA2', '#6A1B9A'] },
    { _id: '10', name: 'Diya', slug: 'diya', religion: 'hindu', gender: 'Female', origin: 'Sanskrit', short_meaning: 'Lamp, light', long_meaning: 'Diya means lamp or light, symbolizing knowledge and prosperity.', lucky_number: 2, lucky_colors: ['#FFEB3B', '#FFC107', '#FF9800'] },
    { _id: '11', name: 'Vihaan', slug: 'vihaan', religion: 'hindu', gender: 'Male', origin: 'Sanskrit', short_meaning: 'Dawn, morning', long_meaning: 'Vihaan means dawn or morning, representing new beginnings.', lucky_number: 5, lucky_colors: ['#00BCD4', '#0097A7', '#00838F'] },
    { _id: '12', name: 'Ananya', slug: 'ananya', religion: 'hindu', gender: 'Female', origin: 'Sanskrit', short_meaning: 'Unique, matchless', long_meaning: 'Ananya means unique and matchless, without equal.', lucky_number: 9, lucky_colors: ['#E91E63', '#C2185B', '#AD1457'] },
    { _id: '13', name: 'Arjun', slug: 'arjun', religion: 'hindu', gender: 'Male', origin: 'Sanskrit', short_meaning: 'Bright, shining, white', long_meaning: 'Arjun means bright and shining. The name of the great warrior from Mahabharata.', lucky_number: 1, lucky_colors: ['#FF9800', '#F57C00', '#E65100'] },
    { _id: '14', name: 'Priya', slug: 'priya', religion: 'hindu', gender: 'Female', origin: 'Sanskrit', short_meaning: 'Beloved, dear one', long_meaning: 'Priya means beloved and dear one. A classic and timeless name.', lucky_number: 3, lucky_colors: ['#E91E63', '#F48FB1', '#F8BBD0'] },
    { _id: '15', name: 'Krishna', slug: 'krishna', religion: 'hindu', gender: 'Male', origin: 'Sanskrit', short_meaning: 'Dark, attractive, all-attractive', long_meaning: 'Krishna means dark and attractive. The name of the beloved deity known for wisdom and love.', lucky_number: 8, lucky_colors: ['#3F51B5', '#303F9F', '#1A237E'] },
    { _id: '16', name: 'Saanvi', slug: 'saanvi', religion: 'hindu', gender: 'Female', origin: 'Sanskrit', short_meaning: 'Goddess Lakshmi, graceful', long_meaning: 'Saanvi represents Goddess Lakshmi and signifies grace and prosperity.', lucky_number: 7, lucky_colors: ['#4CAF50', '#8BC34A', '#CDDC39'] },
  ],
  christian: [
    { _id: '17', name: 'Noah', slug: 'noah', religion: 'christian', gender: 'Male', origin: 'Hebrew', short_meaning: 'Rest, comfort', long_meaning: 'Noah means rest and comfort. A biblical name of great significance.', lucky_number: 8, lucky_colors: ['#3F51B5', '#303F9F', '#1A237E'] },
    { _id: '18', name: 'Grace', slug: 'grace', religion: 'christian', gender: 'Female', origin: 'Latin', short_meaning: "God's grace, elegance", long_meaning: "Grace represents God's grace and divine elegance.", lucky_number: 3, lucky_colors: ['#FFFFFF', '#F5F5F5', '#E0E0E0'] },
    { _id: '19', name: 'David', slug: 'david', religion: 'christian', gender: 'Male', origin: 'Hebrew', short_meaning: 'Beloved', long_meaning: 'David means beloved. The name of the great biblical king.', lucky_number: 4, lucky_colors: ['#795548', '#5D4037', '#4E342E'] },
    { _id: '20', name: 'Mary', slug: 'mary', religion: 'christian', gender: 'Female', origin: 'Hebrew', short_meaning: 'Beloved, wished for child', long_meaning: 'Mary means beloved. The name of the mother of Jesus Christ.', lucky_number: 6, lucky_colors: ['#2196F3', '#1976D2', '#1565C0'] },
    { _id: '21', name: 'James', slug: 'james', religion: 'christian', gender: 'Male', origin: 'Hebrew', short_meaning: 'Supplanter, follower of Christ', long_meaning: 'James means supplanter. The name of several apostles and saints.', lucky_number: 1, lucky_colors: ['#FF9800', '#F57C00', '#E65100'] },
    { _id: '22', name: 'Sophia', slug: 'sophia', religion: 'christian', gender: 'Female', origin: 'Greek', short_meaning: 'Wisdom', long_meaning: 'Sophia means wisdom. A name representing divine wisdom and knowledge.', lucky_number: 7, lucky_colors: ['#9C27B0', '#7B1FA2', '#6A1B9A'] },
    { _id: '23', name: 'Michael', slug: 'michael', religion: 'christian', gender: 'Male', origin: 'Hebrew', short_meaning: 'Who is like God?', long_meaning: 'Michael means "who is like God?". The name of the archangel and protector.', lucky_number: 9, lucky_colors: ['#2196F3', '#1976D2', '#1565C0'] },
    { _id: '24', name: 'Emma', slug: 'emma', religion: 'christian', gender: 'Female', origin: 'Germanic', short_meaning: 'Universal, whole', long_meaning: 'Emma means universal and whole. A timeless and elegant name.', lucky_number: 5, lucky_colors: ['#E91E63', '#F48FB1', '#F8BBD0'] },
  ],
};

export default function TrendingNames() {
  const router = useRouter();
  const [selectedReligion, setSelectedReligion] = useState("islamic");
  const [favorites, setFavorites] = useState([]);

  // Get names for selected religion
  const names = TRENDING_NAMES[selectedReligion] || TRENDING_NAMES.islamic;

  const toggleFavorite = (nameId) => {
    setFavorites(prev => 
      prev.includes(nameId) 
        ? prev.filter(id => id !== nameId)
        : [...prev, nameId]
    );
  };

  const handleViewDetails = (name) => {
    const religionMap = {
      'islam': 'islamic',
      'islamic': 'islamic',
      'hindu': 'hindu',
      'hinduism': 'hindu',
      'christian': 'christian',
      'christianity': 'christian',
    };
    const religion = religionMap[name.religion?.toLowerCase()] || selectedReligion || 'islamic';
    router.push(`/names/${religion}/${name.slug}`);
  };

  const activeFilter = religionFilters.find(f => f.value === selectedReligion) || religionFilters[0];

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-full mb-4 shadow-md">
            <Flame className="w-4 h-4 text-white fill-white" />
            <span className="text-sm font-semibold text-white">Trending Now 2026</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Trending Baby Names <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">2026</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Discover the most popular Islamic, Hindu & Christian baby names trending in 2026. Find unique and modern baby names with verified meanings.
          </p>
        </div>

        {/* Filter Pills - Colorful */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {religionFilters.map((filter) => {
            const isSelected = selectedReligion === filter.value;
            
            return (
              <button
                key={filter.value}
                onClick={() => setSelectedReligion(filter.value)}
                className={`
                  px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-300
                  ${isSelected
                    ? `bg-gradient-to-r ${filter.color} text-white shadow-lg scale-105`
                    : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-400 hover:shadow-md'
                  }
                `}
              >
                {filter.label} Names
                {isSelected && <Star className="w-3.5 h-3.5 inline ml-1 fill-current" />}
              </button>
            );
          })}
        </div>

        {/* Names Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {names.map((name, index) => {
            const isFavorite = favorites.includes(name._id);
            
            return (
              <div
                key={name._id}
                onClick={() => handleViewDetails(name)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleViewDetails(name);
                  }
                }}
                role="button"
                tabIndex={0}
                className="bg-white rounded-xl border-2 border-gray-200 hover:border-transparent hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-2 group cursor-pointer"
                style={{
                  animationDelay: `${index * 50}ms`
                }}
              >
                <div className="p-5">
                  {/* Header with gradient top border */}
                  <div className="relative">
                    <div className="absolute -top-2 left-4 right-4 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl font-bold text-gray-900 truncate group-hover:text-blue-600 transition-colors">
                          {name.name}
                        </h3>
                        <p className="text-sm text-gray-500 mt-0.5">{name.origin}</p>
                      </div>
                      <button
                        onClick={(event) => {
                          event.stopPropagation();
                          toggleFavorite(name._id);
                        }}
                        className={`
                          p-2 rounded-lg transition-all flex-shrink-0
                          ${isFavorite 
                            ? 'text-red-500 bg-red-50 scale-110' 
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                          }
                        `}
                        aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
                      </button>
                    </div>
                  </div>

                  {/* Gender Badge */}
                  <div className="mb-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full ${
                      name.gender === 'Male' ? 'bg-blue-100 text-blue-700' : 
                      name.gender === 'Female' ? 'bg-pink-100 text-pink-700' : 
                      'bg-purple-100 text-purple-700'
                    }`}>
                      {name.gender === 'Male' ? <Crown className="w-3 h-3" /> : 
                       name.gender === 'Female' ? <Sparkles className="w-3 h-3" /> : 
                       <Star className="w-3 h-3" />}
                      {name.gender}
                    </span>
                  </div>

                  {/* Meaning */}
                  <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg p-4 mb-4 border border-gray-100">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {name.short_meaning || name.long_meaning || 'Beautiful meaning'}
                    </p>
                  </div>

                  {/* Lucky Number & Colors */}
                  <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-100">
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-500 font-medium">Lucky #</span>
                      <span className="font-bold text-xl text-gray-900 bg-white px-2 py-1 rounded-lg shadow-sm">
                        {name.lucky_number}
                      </span>
                    </div>
                    <div className="flex gap-1.5">
                      {name.lucky_colors?.slice(0, 3).map((color, i) => (
                        <div
                          key={i}
                          className="w-7 h-7 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleViewDetails(name)}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-3.5 text-sm transition-all duration-300 hover:from-blue-700 hover:to-purple-700 flex items-center justify-center gap-2 hover:shadow-lg"
                >
                  <Zap className="w-4 h-4" />
                  View Full Details
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-8 text-center">
          <Link
            href={`/names/religion/${selectedReligion}/1`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <BookOpen className="w-5 h-5" />
            Explore All {selectedReligion.charAt(0).toUpperCase() + selectedReligion.slice(1)} Names
            <ArrowRight className="w-5 h-5" />
          </Link>
          <p className="mt-3 text-sm text-gray-500">
            Browse 60,000+ verified baby names with meanings
          </p>
        </div>
      </div>
    </section>
  );
}