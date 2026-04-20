'use client';

import { Suspense } from 'react';
import HeroSection from './HeroSection';
import AlphabetNavigation from './AlphabetNavigation';
import PopularNamesSection from './PopularNamesSection';
import TrendingNames from './TrendingNames';
import WhyChooseSection from './WhyChooseSection';
import ComprehensiveFAQ from './ComprehensiveFAQ';
import Link from 'next/link';

export default function HomePageClient() {
  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* JSON-LD structured data for enhanced SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebSite",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/#website`,
                "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app',
                "name": "NameVerse - Baby Names with Meanings",
                "description": "60,000+ verified baby names from Islamic, Hindu & Christian traditions with meanings in English, Urdu, Arabic & Hindi",
                "publisher": {
                  "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/#organization`
                },
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/search?q={search_term_string}`
                  },
                  "query-input": "required name=search_term_string"
                }
              },
              {
                "@type": "Organization",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/#organization`,
                "name": "NameVerse",
                "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app',
                "logo": {
                  "@type": "ImageObject",
                  "url": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/logo.png`,
                  "width": 512,
                  "height": 512
                },
                "sameAs": [
                  "https://www.facebook.com/nameverse",
                  "https://twitter.com/nameverse",
                  "https://www.instagram.com/nameverse"
                ]
              },
              {
                "@type": "WebPage",
                "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/#webpage`,
                "url": process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app',
                "name": "60,000+ Baby Names with Meanings | Islamic, Hindu, Christian Names 2026",
                "isPartOf": {
                  "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/#website`
                },
                "about": {
                  "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/#organization`
                },
                "description": "Find 60,000+ baby names with meanings in English, Urdu, Arabic & Hindi. Explore Islamic, Hindu & Christian names with origins and pronunciation guides."
              },
              {
                "@type": "ItemList",
                "name": "Popular Baby Names Categories",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "item": {
                      "@type": "Thing",
                      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/names/islamic`,
                      "name": "Islamic Baby Names",
                      "description": "25,000+ Islamic baby names with Quranic references and meanings in Urdu & Arabic"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 2,
                    "item": {
                      "@type": "Thing",
                      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/names/hindu`,
                      "name": "Hindu Baby Names",
                      "description": "20,000+ Hindu baby names from Sanskrit with meanings in Hindi & English"
                    }
                  },
                  {
                    "@type": "ListItem",
                    "position": 3,
                    "item": {
                      "@type": "Thing",
                      "@id": `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'}/names/christian`,
                      "name": "Christian Baby Names",
                      "description": "15,000+ Christian baby names with Biblical references and meanings"
                    }
                  }
                ]
              },
              {
                "@type": "FAQPage",
                "mainEntity": [
                  {
                    "@type": "Question",
                    "name": "What are some Muslim names?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Popular Muslim names include Muhammad (praised one), Ali (exalted), Omar (long-lived), Aisha (living), Fatima (captivating), and Zara (princess). NameVerse features 25,000+ authentic Islamic baby names with Quranic references and meanings in Urdu and Arabic."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "What do Muslim names mean?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "Muslim names carry deep spiritual meanings rooted in Arabic language and Islamic tradition. They often reflect virtues like faith, wisdom, beauty, and strength. Each name on NameVerse is verified by Islamic scholars with complete meanings in English, Urdu, and Arabic, plus Quranic verse references where applicable."
                    }
                  },
                  {
                    "@type": "Question",
                    "name": "How many baby names does NameVerse have?",
                    "acceptedAnswer": {
                      "@type": "Answer",
                      "text": "NameVerse features over 60,000 verified baby names including 25,000+ Islamic names, 20,000+ Hindu names, and 15,000+ Christian names with complete meanings in multiple languages."
                    }
                  }
                ]
              },
              {
                "@type": "BreadcrumbList",
                "itemListElement": [
                  {
                    "@type": "ListItem",
                    "position": 1,
                    "name": "Home",
                    "item": process.env.NEXT_PUBLIC_SITE_URL || 'https://nameverse.vercel.app'
                  }
                ]
              }
            ],
          }),
        }}
      />

      <main role="main" className="min-h-screen flex flex-col bg-slate-50">
        {/* Hero Section */}
        <HeroSection />

        {/* A-Z Alphabetical Navigation */}
        <AlphabetNavigation />

        {/* Popular Names Section */}
        <PopularNamesSection />

        {/* Trending Names */}
        <Suspense fallback={
          <div className="py-16 text-center bg-gray-50">
            <div className="inline-block w-8 h-8 border-2 border-gray-300 border-t-gray-600 rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600">Loading trending names...</p>
          </div>
        }>
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