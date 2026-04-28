'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, BookOpen, CheckCircle, MessageCircle, Search, ArrowRight, Sparkles, Zap, Star } from 'lucide-react';

const ComprehensiveFAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'General Questions',
      icon: HelpCircle,
      color: 'from-blue-500 to-indigo-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      textColor: 'text-blue-700',
      questions: [
        {
          q: 'How many baby names does NameVerse have?',
          a: 'NameVerse features over 60,000 verified baby names from Islamic, Hindu, and Christian traditions with complete meanings in multiple languages including English, Urdu, Arabic, and Hindi. Our database includes 25,000+ Islamic baby names, 20,000+ Hindu baby names, and 15,000+ Christian baby names, making it one of the most comprehensive multilingual baby name resources in the world.'
        },
        {
          q: 'Are the baby name meanings verified and authentic?',
          a: 'Yes, absolutely! Every baby name on NameVerse is verified by cultural and religious experts to ensure authentic meanings and accurate origins. Our team includes Islamic scholars for Muslim baby names from Quran, Sanskrit experts for Hindu baby names from Vedas, and theologians for Biblical baby names. We cross-reference multiple authoritative sources including ancient texts, religious scriptures, and academic linguistic databases to guarantee accuracy.'
        },
        {
          q: 'Can I find baby names in languages other than English?',
          a: 'Absolutely! NameVerse provides baby name meanings and pronunciations in English, Urdu, Arabic, Hindi, Pashto, and other languages. Each Islamic baby name includes Arabic script and Urdu translations, Hindu baby names show Devanagari script with Hindi meanings, and Christian baby names include original Hebrew or Greek etymologies. We also provide pronunciation guides in IPA format and audio pronunciations.'
        },
        {
          q: 'What makes NameVerse different from other baby name websites?',
          a: 'NameVerse stands out with four unique advantages: (1) Multilingual verified meanings in Urdu, Arabic, and Hindi - no major competitor offers this; (2) Deep religious and cultural authenticity verified by experts in Islamic, Hindu, and Christian traditions; (3) Comprehensive information including numerology, lucky numbers, spiritual significance, and personality traits; (4) Pronunciation guides in multiple languages with IPA notation.'
        }
      ]
    },
    {
      category: 'Islamic Baby Names',
      icon: BookOpen,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      textColor: 'text-emerald-700',
      questions: [
        {
          q: 'What are Quranic baby names and how are they different from other Islamic names?',
          a: 'Quranic baby names are names that appear directly in the Holy Quran or are derived from Quranic verses and concepts. These include names of Prophets (like Muhammad, Ibrahim, Musa, Isa), names of companions (Sahaba), and names with meanings found in Quranic ayahs. NameVerse features over 8,500+ authentic Quranic baby names for boys and girls with verse references and spiritual significance.'
        },
        {
          q: 'How do I choose the perfect Islamic baby name for my child?',
          a: 'Choosing an Islamic baby name involves several considerations: (1) Meaning - Select a name with beautiful, positive meaning that reflects Islamic values; (2) Pronunciation - Ensure the name is easy to pronounce in your local language; (3) Cultural fit - Consider how the name sounds with your family surname; (4) Spiritual significance - Many parents prefer Quranic names or names of Prophets and Sahaba; (5) Modern appeal - Balance traditional Islamic authenticity with contemporary usability.'
        },
        {
          q: 'What are the most popular Islamic baby names in 2025?',
          a: 'The most popular Islamic baby names in 2025 blend traditional Quranic names with modern appeal. For boys: Muhammad (praised one), Ali (exalted), Omar (long-lived), Zain (beauty), Ibrahim (father of nations), Yusuf (God increases), and Adam (first man). For girls: Aisha (living), Fatima (captivating), Zara (princess), Maryam (beloved), Layla (night beauty), Amira (princess), and Sara (pure).'
        }
      ]
    },
    {
      category: 'Hindu Baby Names',
      icon: BookOpen,
      color: 'from-orange-500 to-amber-600',
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-orange-700',
      questions: [
        {
          q: 'What are Sanskrit baby names and why are they significant?',
          a: 'Sanskrit baby names come from the ancient Sanskrit language, which is the liturgical language of Hinduism and the source of most Hindu baby names. Sanskrit names carry deep philosophical and spiritual meanings rooted in Vedic literature, Hindu scriptures like the Bhagavad Gita and Ramayana, and Indian cultural wisdom spanning thousands of years. Examples include Arjun (bright, warrior), Priya (beloved), Ananya (unique), and Aarav (peaceful wisdom).'
        },
        {
          q: 'Can you explain Hindu baby names inspired by deities?',
          a: 'Many Hindu baby names are inspired by Hindu gods and goddesses, reflecting divine qualities and seeking blessings. Popular deity-inspired names include: From Lord Krishna - Krishna, Govind, Madhav; From Lord Shiva - Shiva, Shankar, Mahadev; From Goddess Lakshmi - Lakshmi, Kamalini; From Lord Vishnu - Vishnu, Hari, Narayana; From Goddess Saraswati - Saraswati, Vani. These names carry the divine attributes of the deities.'
        },
        {
          q: 'What are the trending Hindu baby names for 2025?',
          a: 'Trending Hindu baby names in 2025 include modern Sanskrit names that are easy to pronounce globally while maintaining cultural roots. Popular boy names: Aarav (peaceful), Arjun (bright), Advait (unique), Vihaan (dawn), Reyansh (ray of light), Dhruv (pole star). Popular girl names: Ananya (unique), Aaradhya (worshipped), Diya (lamp), Saanvi (goddess Lakshmi), Kiara (dark haired), Ishani (goddess Parvati).'
        }
      ]
    },
    {
      category: 'Christian Baby Names',
      icon: BookOpen,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      textColor: 'text-purple-700',
      questions: [
        {
          q: 'What are Biblical baby names and where do they come from?',
          a: 'Biblical baby names come directly from the Bible - both the Old Testament (Hebrew Bible) and New Testament (Christian scriptures). These include names of prophets, apostles, saints, and biblical characters. Popular Biblical boy names include Noah (rest), David (beloved), Daniel (God is my judge), Matthew (gift of God), Joshua (God is salvation). Popular Biblical girl names include Sarah (princess), Hannah (grace), Mary (beloved), Elizabeth (God is my oath), Ruth (companion).'
        },
        {
          q: 'What are saint names and why do Christian families choose them?',
          a: 'Saint names are names of Catholic and Orthodox Christian saints who lived holy lives and are venerated in Christian tradition. Choosing a saint name provides a spiritual role model and patron saint for the child. Popular saint names include: Patrick (nobleman - St. Patrick of Ireland), Francis (Frenchman - St. Francis of Assisi), Teresa (harvester - St. Teresa of Avila), Catherine (pure - St. Catherine of Siena), Anthony (priceless - St. Anthony of Padua).'
        },
        {
          q: 'What are popular Christian baby names for 2025?',
          a: 'Popular Christian baby names in 2025 blend Biblical tradition with contemporary style. Trending boy names: Noah (rest, comfort), Liam (strong-willed warrior), Elijah (Yahweh is God), Benjamin (son of right hand), Ethan (strong, enduring), Lucas (light-bringing), Gabriel (God is my strength). Trending girl names: Sophia (wisdom), Olivia (olive tree, peace), Ava (life), Emma (universal), Grace (divine grace), Hannah (favor), Isabella (devoted to God).'
        }
      ]
    },
    {
      category: 'Using NameVerse',
      icon: CheckCircle,
      color: 'from-amber-500 to-orange-600',
      bgColor: 'bg-amber-50',
      borderColor: 'border-amber-200',
      textColor: 'text-amber-700',
      questions: [
        {
          q: 'How do I search for baby names on NameVerse?',
          a: 'NameVerse offers multiple ways to find your perfect baby name: (1) Search Bar - Type any name or keyword to find matches instantly; (2) Browse by Religion - Filter by Islamic, Hindu, or Christian traditions; (3) Browse by Letter (A-Z) - Click any letter to see all names starting with that letter; (4) Gender Filter - Select boy names, girl names, or unisex names; (5) Origin Filter - Search by Arabic, Sanskrit, Hebrew, Greek origins; (6) Meaning Search - Find names by meaning themes.'
        },
        {
          q: 'What information does each baby name page include?',
          a: 'Every baby name detail page on NameVerse provides comprehensive information: (1) Meaning - Complete meaning in English plus translations in Urdu, Arabic, and/or Hindi; (2) Origin - Cultural and linguistic origins; (3) Religion - Islamic, Hindu, Christian, or multicultural; (4) Gender - Boy, girl, or unisex usage; (5) Pronunciation - Audio guide and IPA notation; (6) Spiritual Significance - Religious context, Quranic verses, Vedic references, or Biblical citations; (7) Numerology - Lucky number, lucky day, lucky stone, and lucky colors.'
        },
        {
          q: "How can I find unique baby names that aren't overused?",
          a: "Finding unique baby names while maintaining meaning and cultural authenticity requires strategic searching on NameVerse: (1) Browse less common letters - Try names starting with Q, X, Z, or V; (2) Explore variations - Look at alternate spellings or pronunciations of popular names; (3) Deep religious names - Search lesser-known Quranic names, Vedic names, or Biblical names beyond the top 100; (4) Regional variations - Explore names from specific cultures (Bengali, Tamil, Persian, Aramaic); (5) Meaning-based search - Find names with unique meanings."
        }
      ]
    }
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-8 sm:py-10 md:py-12 bg-gradient-to-b from-white to-amber-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-8 md:mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full mb-4 shadow-md">
            <MessageCircle className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Baby Name FAQ</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Baby Names FAQ: <span className="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">Everything Parents Need to Know</span>
          </h2>
          <p className="text-base text-gray-600 max-w-3xl mx-auto">
            Get answers to common questions about Islamic baby names, Hindu baby names, Christian baby names, meanings, origins, and how to choose the perfect name for your baby.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center justify-center gap-4 md:gap-6 mb-8 flex-wrap">
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Search className="w-4 h-4 text-blue-500" />
            <span className="font-medium">60,000+ Names</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <span className="font-medium">Expert Verified</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600 bg-white px-4 py-2 rounded-full border border-gray-200 shadow-sm">
            <BookOpen className="w-4 h-4 text-emerald-500" />
            <span className="font-medium">15+ Languages</span>
          </div>
        </div>

        {/* FAQ Categories */}
        <div className="space-y-4">
          {faqs.map((category, categoryIndex) => {
            const Icon = category.icon;
            return (
              <div
                key={categoryIndex}
                className="bg-white border-2 border-gray-200 rounded-xl overflow-hidden hover:border-gray-300 transition-colors"
              >
                {/* Category Header */}
                <div className={`${category.bgColor} px-5 py-4 border-b ${category.borderColor}`}>
                  <div className="flex items-center gap-3">
                    <div className={`p-2 bg-white rounded-lg border-2 ${category.borderColor}`}>
                      <Icon className={`w-5 h-5 ${category.textColor}`} />
                    </div>
                    <h3 className={`text-lg font-bold ${category.textColor}`}>{category.category}</h3>
                  </div>
                </div>

                {/* Questions */}
                <div className="divide-y divide-gray-100">
                  {category.questions.map((faq, faqIndex) => {
                    const globalIndex = `${categoryIndex}-${faqIndex}`;
                    const isOpen = openIndex === globalIndex;

                    return (
                      <div key={faqIndex}>
                        <button
                          onClick={() => toggleFAQ(globalIndex)}
                          className="w-full text-left px-5 py-4 hover:bg-gray-50 transition-colors focus:outline-none"
                          aria-expanded={isOpen}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <h4 className="font-semibold text-gray-900 pr-4 flex-1">
                              {faq.q}
                            </h4>
                            <div className={`flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-200 ${isOpen ? `${category.bgColor} rotate-180` : 'bg-gray-100'}`}>
                              <ChevronDown className={`w-5 h-5 ${isOpen ? category.textColor : 'text-gray-500'}`} />
                            </div>
                          </div>
                        </button>

                        {isOpen && (
                          <div className="px-5 pb-5 pt-2">
                            <div className={`${category.bgColor} rounded-xl p-5 border ${category.borderColor}`}>
                              <div className="flex items-start gap-3">
                                <Zap className={`w-5 h-5 ${category.textColor} mt-0.5 flex-shrink-0`} />
                                <p className="text-sm text-gray-700 leading-relaxed">
                                  {faq.a}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-10 text-center bg-gradient-to-r from-gray-900 to-gray-800 rounded-xl p-8 md:p-10 text-white">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full mb-6">
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span className="text-sm font-medium">Find Your Baby's Perfect Name</span>
          </div>

          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Find the Perfect Baby Name?
          </h3>
          <p className="text-base text-gray-300 mb-8 max-w-2xl mx-auto">
            Explore our comprehensive database of 60,000+ verified baby names with meanings in English, Urdu, Arabic, and Hindi.
          </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/names/religion/islamic/1"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors"
              >
               <BookOpen className="w-5 h-5" />
               Browse 25,000+ Islamic Names
             </Link>
              <Link
                href="/names/religion/islamic/1"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-colors"
              >
               <ArrowRight className="w-5 h-5" />
               Explore Hindu & Christian Names
             </Link>
          </div>

          <p className="mt-6 text-sm text-gray-400">
            Trusted by 5M+ parents worldwide • Expert verified meanings • 15+ languages
          </p>
        </div>
      </div>
    </section>
  );
};

export default ComprehensiveFAQ;