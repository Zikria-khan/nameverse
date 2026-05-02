'use client';

import { Steps, Search, Filter, Heart, CheckCircle, Sparkles } from 'lucide-react';
import Link from 'next/link';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      step: '01',
      title: 'Search by Your Preferences',
      description: 'Use our advanced baby name search to filter by gender, religion (Islamic, Hindu, Christian), origin, meaning, starting letter, or name length. Our smart search understands natural language queries.',
      keywords: 'how to search baby names, baby name search tips, find baby names online',
      tip: 'Tip: Try "Islamic boy names meaning victory" or "Hindu girl names starting with A"'
    },
    {
      icon: Filter,
      step: '02',
      title: 'Explore Detailed Meanings',
      description: 'Every name includes verified etymology, cultural significance, religious context, pronunciation guide, numerology calculation, and famous people with that name.',
      keywords: 'name meanings explained, baby name meanings, verify name meaning, name etymology',
      tip: 'Tip: Check the "Verified by Scholars" badge for religious authenticity'
    },
    {
      icon: Heart,
      step: '03',
      title: 'Save & Compare Your Favorites',
      description: 'Create unlimited name lists, compare side-by-side, share with partner and family for feedback, and get AI suggestions based on your taste.',
      keywords: 'save baby names, compare baby names, create name shortlist, family name voting',
      tip: 'Tip: Use our compatibility score to see how names pair with your surname'
    },
    {
      icon: CheckCircle,
      step: '04',
      title: 'Finalize Your Perfect Name',
      description: 'Check popularity rankings, sibling name compatibility, and nickname options. Read our expert guides to ensure you\'ve made the best choice.',
      keywords: 'finalize baby name, choose perfect baby name, baby name decision, name final checklist',
      tip: 'Tip: Try saying the name aloud with your full surname and potential nicknames'
    }
  ];

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    'name': 'How to Find the Perfect Baby Name Using NameVerse',
    'description': 'Complete guide to using NameVerse baby name search and filtering tools to discover meaningful names for your baby',
    'step': steps.map(step => ({
      '@type': 'HowToStep',
      'name': step.title,
      'text': step.description,
      'url': `https://nameverse.app/how-to-find-baby-name#step-${step.step}`
    })),
    'totalTime': 'PT15M'
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      
      <section className="py-12 sm:py-16 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Section Header with Process Keywords */}
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold mb-4">
              How NameVerse Works
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How to Find the Perfect Baby Name in 4 Simple Steps
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Our proven baby name selection process helps thousands of parents daily discover meaningful, culturally authentic names. Learn how to use NameVerse's advanced search and filtering tools to find your baby's perfect name.
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-400 hover:shadow-xl transition-all duration-300"
                >
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-bold text-lg">{step.step}</span>
                  </div>

                  <div className="mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-3">
                      {step.description}
                    </p>
                    <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <p className="text-xs text-blue-700 flex items-start gap-2">
                        <Sparkles className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        <span className="italic">{step.tip}</span>
                      </p>
                    </div>
                  </div>

                  {/* Keywords */}
                  <div className="flex flex-wrap gap-1">
                    {step.keywords.split(', ').map((keyword, i) => (
                      <span key={i} className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Process Summary */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 sm:p-8 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Why NameVerse's Baby Name Selection Process Works
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">87%</div>
                <div className="text-sm text-gray-600">of parents find their top 3 names within first search</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-1">15 min</div>
                <div className="text-sm text-gray-600">average time to choose a name using our process</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 mb-1">98%</div>
                <div className="text-sm text-gray-600">satisfaction rate from parents who followed our steps</div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Link 
              href="/search"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:shadow-xl transition-all text-lg"
            >
              <Search className="w-6 h-6" />
              Start Searching Baby Names Now
            </Link>
            <p className="text-sm text-gray-500 mt-3">
              Free forever • No signup required • 65,000+ names to explore
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default HowItWorks;