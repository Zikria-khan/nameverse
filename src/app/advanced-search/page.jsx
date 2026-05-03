'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Filter, ChevronDown, ChevronUp, X, Search, Heart, Globe, Star, Zap } from 'lucide-react';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app';

const filterCategories = {
  basic: {
    title: 'Basic Filters', icon: Filter,
    filters: [
      { id: 'gender', label: 'Gender', type: 'radio', options: ['Boy', 'Girl', 'Unisex'] },
      { id: 'startingLetter', label: 'Starting Letter', type: 'alphabet' },
      { id: 'nameLength', label: 'Name Length', type: 'select', options: ['2-3 letters', '4-5 letters', '6-7 letters', '8+ letters'] },
      { id: 'syllables', label: 'Syllables', type: 'select', options: ['1 syllable', '2 syllables', '3 syllables', '4+ syllables'] }
    ]
  },
  religious: {
    title: 'Religious & Cultural', icon: Heart,
    filters: [
      { id: 'islamic', label: 'Islamic', type: 'checkbox' },
      { id: 'hindu', label: 'Hindu', type: 'checkbox' },
      { id: 'christian', label: 'Christian', type: 'checkbox' },
      { id: 'jewish', label: 'Jewish', type: 'checkbox' },
      { id: 'buddhist', label: 'Buddhist', type: 'checkbox' },
      { id: 'sikh', label: 'Sikh', type: 'checkbox' },
      { id: 'jain', label: 'Jain', type: 'checkbox' }
    ]
  },
  linguistic: {
    title: 'Linguistic Details', icon: Globe,
    filters: [
      { id: 'origin', label: 'Origin Language', type: 'select', options: ['Arabic', 'Sanskrit', 'Hebrew', 'Greek', 'Latin', 'English', 'Urdu', 'Persian', 'Turkish', 'Spanish', 'French', 'Italian'] },
      { id: 'meaningKeywords', label: 'Meaning Keywords', type: 'text', placeholder: 'e.g., love, strength, peace' },
      { id: 'contains', label: 'Contains Letters', type: 'text', placeholder: 'e.g., ah, in, an' },
      { id: 'excludes', label: 'Excludes Letters', type: 'text', placeholder: 'letters to avoid' }
    ]
  },
  numerology: {
    title: 'Numerology & Personality', icon: Star,
    filters: [
      { id: 'luckyNumber', label: 'Lucky Number', type: 'select', options: ['1', '2', '3', '4', '5', '6', '7', '8', '9'] },
      { id: 'personalityType', label: 'Personality Type', type: 'select', options: ['Leader', 'Peacemaker', 'Creative', 'Stable', 'Adventurer'] }
    ]
  },
  advanced: {
    title: 'Advanced Options', icon: Zap,
    filters: [
      { id: 'popularityTier', label: 'Popularity Tier', type: 'select', options: ['Top-100', 'Top-1000', 'Mid-tier', 'Rare', 'Unique'] },
      { id: 'theme', label: 'Theme', type: 'select', options: ['Nature', 'Love', 'Strength', 'Wisdom', 'Peace', 'Royal', 'Celestial', 'Seasonal'] },
      { id: 'soundPattern', label: 'Sound Pattern', type: 'select', options: ['Soft', 'Strong', 'Flowing', 'Crisp', 'Musical'] },
      { id: 'rhymesWith', label: 'Rhymes With', type: 'text', placeholder: 'Enter a name' },
      { id: 'similarTo', label: 'Similar To', type: 'text', placeholder: 'Name to find matches for' }
    ]
  }
};

export default function AdvancedSearchPage() {
  const router = useRouter();
  const [activeFilters, setActiveFilters] = useState({});
  const [expandedSections, setExpandedSections] = useState({ basic: true, religious: true, linguistic: false, numerology: false, advanced: false });

  const handleFilterChange = (filterId, value) => setActiveFilters(prev => ({ ...prev, [filterId]: value }));
  const toggleSection = (section) => setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  const clearAllFilters = () => setActiveFilters({});
  const getActiveFilterCount = () => Object.keys(activeFilters).filter(k => activeFilters[k]).length;

  const handleSearch = () => {
    const params = new URLSearchParams();
    Object.entries(activeFilters).forEach(([key, value]) => { if (value) params.append(key, value); });
    router.push(`/search?${params.toString()}`);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'HowTo', name: 'How to Use Advanced Baby Name Search',
        step: [
          { '@type': 'HowToStep', name: 'Choose Gender', text: 'Select your preferred gender: Boy, Girl, or Unisex.' },
          { '@type': 'HowToStep', name: 'Select Religion', text: 'Filter by Islamic, Hindu, Christian, Jewish, Buddhist, Sikh, or Jain.' },
          { '@type': 'HowToStep', name: 'Set Linguistic Filters', text: 'Choose origin language and meaning keywords.' },
          { '@type': 'HowToStep', name: 'Apply Numerology', text: 'Apply lucky number and personality type filters.' },
          { '@type': 'HowToStep', name: 'Advanced Options', text: 'Fine-tune with popularity tier and theme.' },
          { '@type': 'HowToStep', name: 'View Results', text: 'Click Search to view matching names.' }
        ]
      })}} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: [
          { '@type': 'Question', name: 'What filters are available?', acceptedAnswer: { '@type': 'Answer', text: 'Our advanced search offers 18+ filters including gender, starting letter, name length, syllables, religious traditions, origin, meaning keywords, numerology, popularity tier, themes, and sound patterns.' }},
          { '@type': 'Question', name: 'How do I combine multiple filters?', acceptedAnswer: { '@type': 'Answer', text: 'Simply select multiple options across different filter categories. The search will return names matching ALL selected criteria.' }},
          { '@type': 'Question', name: 'Can I search for names by meaning?', acceptedAnswer: { '@type': 'Answer', text: 'Yes! Use the meaning keywords filter to find names containing words like love, strength, or nature.' }},
          { '@type': 'Question', name: 'What does popularity tier filter?', acceptedAnswer: { '@type': 'Answer', text: 'Filter by popularity tier to find Top-100 trending names, unique rare names, or mid-tier options.' }}
        ]
      })}} />

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
              <Filter className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Advanced Baby Name Search — Find Perfect Name with Smart Filters | NameVerse</h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Discover the perfect baby name using our comprehensive advanced search tool with 18+ powerful filters.</p>
          </div>
          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-4">
              <div className="sticky top-24">
                <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div><h2 className="text-xl font-bold text-gray-900">Filters</h2>{getActiveFilterCount() > 0 && <p className="text-sm text-indigo-600 mt-1">{getActiveFilterCount()} active</p>}</div>
                    {getActiveFilterCount() > 0 && <button onClick={clearAllFilters} className="flex items-center gap-1 text-sm text-red-600 hover:bg-red-50 px-3 py-1 rounded-lg"><X size={14} /> Clear All</button>}
                  </div>
                  {Object.entries(filterCategories).map(([key, category]) => {
                    const Icon = category.icon;
                    return (
                      <div key={key} className="mb-6 border-b border-gray-100 last:border-0 pb-4 last:pb-0">
                        <button onClick={() => toggleSection(key)} className="flex items-center justify-between w-full mb-3 text-left">
                          <div className="flex items-center gap-2"><Icon className="w-5 h-5 text-indigo-600" /><h3 className="font-semibold text-gray-800">{category.title}</h3></div>
                          {expandedSections[key] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                        </button>
                        {expandedSections[key] && <div className="space-y-4 pl-2">
                          {category.filters.map(filter => (
                            <div key={filter.id}>
                              <label className="block text-sm font-medium text-gray-700 mb-2">{filter.label}</label>
                              {filter.type === 'radio' && <div className="flex gap-2">{filter.options.map(opt => <button key={opt} onClick={() => handleFilterChange(filter.id, opt)} className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition ${activeFilters[filter.id] === opt ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}>{opt}</button>)}</div>}
                              {filter.type === 'checkbox' && <label className="flex items-center cursor-pointer"><input type="checkbox" checked={!!activeFilters[filter.id]} onChange={(e) => handleFilterChange(filter.id, e.target.checked ? 'yes' : '')} className="mr-2" /><span className="text-sm text-gray-700">{filter.label}</span></label>}
                              {filter.type === 'select' && <select value={activeFilters[filter.id] || ''} onChange={(e) => handleFilterChange(filter.id, e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500"><option value="">Select...</option>{filter.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}</select>}
                              {filter.type === 'text' && <input type="text" value={activeFilters[filter.id] || ''} onChange={(e) => handleFilterChange(filter.id, e.target.value)} placeholder={filter.placeholder} className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500" />}
                              {filter.type === 'alphabet' && <div className="grid grid-cols-7 gap-1">{'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => <button key={letter} onClick={() => handleFilterChange(filter.id, letter)} className={`w-8 h-8 text-xs font-bold rounded border transition ${activeFilters[filter.id] === letter ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'}`}>{letter}</button>)}</div>}
                            </div>
                          ))}
                        </div>}
                      </div>
                    );
                  })}
                  <button onClick={handleSearch} className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition shadow-md flex items-center justify-center gap-2"><Search className="w-4 h-4" /> Search Names</button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-8">
              <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
                <article>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">How to Use NameVerse Advanced Search Filters</h2>
                  <p className="text-gray-700 mb-4">Finding the perfect baby name can feel overwhelming with thousands of options available. Our <strong>advanced baby name search</strong> transforms this challenge into an exciting discovery journey through 18+ intelligently organized filter categories.</p>
                  <p className="text-gray-700 mb-4">The advanced search interface works in three simple steps. First, select your basic preferences like gender and starting letter. Second, refine by religious tradition, linguistic origin, or cultural background. Finally, apply detailed filters for meaning, numerology, and special characteristics.</p>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Complete Filter Categories for Baby Names</h3>
                  <p className="text-gray-700 mb-4">Our comprehensive filter system organizes 18+ criteria into logical groups. The <strong>Basic Filters</strong> include gender selection, starting letter from A to Z, name length ranges, and syllable count.</p>
                  <p className="text-gray-700 mb-4">The <strong>Religious & Cultural</strong> section covers seven major traditions: Islamic, Hindu, Christian, Jewish, Buddhist, Sikh, and Jain with thousands of names each.</p>
                  <p className="text-gray-700 mb-4">The <strong>Linguistic Details</strong> category allows filtering by origin language including Arabic, Sanskrit, Hebrew, Greek, Latin, English, Urdu, Persian, Turkish, Spanish, French, and Italian.</p>
                  <p className="text-gray-700 mb-4">The <strong>Numerology & Personality</strong> filters connect names to birth numbers and character traits. Choose lucky numbers 1-9 or select personality types.</p>
                  <p className="text-gray-700 mb-4">The <strong>Advanced Options</strong> provide specialized filters: Popularity Tier, Theme, Sound Pattern, plus Rhymes With and Similar To text inputs.</p>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Popular Search Examples & Combinations</h3>
                  <ol className="space-y-2 text-gray-700">
                    <li><strong>Islamic Boy Names Starting with A</strong> - Filter: Gender=Boy, Religious=Islamic, Starting Letter=A. Perfect for parents seeking Quranic names.</li>
                    <li><strong>Hindu Girl Names Meaning Love</strong> - Filter: Gender=Girl, Religious=Hindu, Meaning Keywords="love". Discover names like Priya and Sonal.</li>
                    <li><strong>Christian Names with Lucky Number 7</strong> - Filter: Religious=Christian, Lucky Number=7.</li>
                    <li><strong>Nature-Inspired Unisex Names</strong> - Filter: Gender=Unisex, Theme=Nature. Find names like River and Sage.</li>
                    <li><strong>Short Royal Names (4-5 letters)</strong> - Filter: Name Length="4-5 letters", Theme=Royal.</li>
                    <li><strong>Musical-Sounding Names</strong> - Filter: Sound Pattern=Musical, Popularity Tier=Rare.</li>
                  </ol>
                  <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">Expert Tips for Finding Unique Names</h3>
                  <p className="text-gray-700 mb-4">Pro Tip #1: Start broad, then narrow. Begin with just 1-2 filters like gender and religion, then gradually add more specific criteria.</p>
                  <p className="text-gray-700 mb-4">Pro Tip #2: Use meaning keywords creatively. Instead of "strength," try "brave," "courage," or "warrior."</p>
                  <p className="text-gray-700 mb-4">Pro Tip #3: Combine origin with theme. Arabic + Nature gives names like "Nur" and "Samir."</p>
                  <div className="mt-10 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl">
                    <h4 className="text-xl font-bold text-gray-900 mb-3">Ready to Find Your Perfect Name?</h4>
                    <p className="text-gray-700">Use the filter panel on the left to begin your personalized search. Each selection instantly refines results to match your exact preferences.</p>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white border-t">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions About Name Search</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-xl p-6"><h3 className="font-bold text-gray-900 mb-2">Can I save my favorite searches?</h3><p className="text-gray-600 text-sm">Yes! Once you find names you love, save them to your personal collection for comparison.</p></div>
            <div className="bg-gray-50 rounded-xl p-6"><h3 className="font-bold text-gray-900 mb-2">How often is the name database updated?</h3><p className="text-gray-600 text-sm">We update our database monthly with new names and updated popularity rankings.</p></div>
          </div>
        </div>
      </section>
      <section className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto flex flex-wrap gap-6 text-sm">
          <Link href="/search" className="text-indigo-600 hover:underline">Main Search</Link>
          <Link href="/name-meanings" className="text-indigo-600 hover:underline">Name Meanings</Link>
          <Link href="/languages" className="text-indigo-600 hover:underline">Languages</Link>
          <Link href="/popularity" className="text-indigo-600 hover:underline">Popularity</Link>
        </div>
      </section>
    </main>
  );
}
