'use client';

import { Suspense } from 'react';
import HeroSection from './HeroSection';
import AlphabetNavigation from './AlphabetNavigation';
import PopularNamesSection from './PopularNamesSection';
import TrendingNames from './TrendingNames';
import WhyChooseSection from './WhyChooseSection';
import ComprehensiveFAQ from './ComprehensiveFAQ';
export default function HomePageClient() {
  return (
    <>
      <main role="main" className="min-h-screen flex flex-col bg-slate-50">
        {/* Hero Section */}
        <HeroSection />

        {/* A-Z Alphabetical Navigation */}
        <AlphabetNavigation />

        {/* Popular Names Section */}
        <PopularNamesSection />

        {/* Trending Names */}
        <Suspense
          fallback={
            <div className="py-16 text-center bg-gray-50">
              <div className="inline-block w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
              <p className="mt-4 text-gray-600">Loading trending names...</p>
            </div>
          }
        >
          <TrendingNames />
        </Suspense>

        {/* Why Choose NameVerse */}
        <WhyChooseSection />

        {/* Comprehensive FAQ */}
        <ComprehensiveFAQ />
      </main>
    </>
  );
}