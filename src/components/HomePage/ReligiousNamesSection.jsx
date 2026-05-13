'use client';

import { Globe, Sparkles, BookOpen } from 'lucide-react';
import Link from 'next/link';

const ReligiousNamesSection = () => {
  const religions = [
    {
      id: 'islamic',
      name: 'Islamic Baby Names',
      icon: Globe,
      color: 'emerald',
      gradient: 'from-emerald-500 to-teal-600',
      count: '25,000+ Names',
      description: 'Quranic and Arabic names with authentic Urdu and English meanings.',
      link: '/names/religion/islamic/1'
    },
    {
      id: 'hindu',
      name: 'Hindu Baby Names',
      icon: Sparkles,
      color: 'orange',
      gradient: 'from-orange-500 to-amber-600',
      count: '20,000+ Names',
      description: 'Sanskrit and Vedic names with clear Hindi and English meaning.',
      link: '/names/religion/hindu/1'
    },
    {
      id: 'christian',
      name: 'Christian Baby Names',
      icon: BookOpen,
      color: 'blue',
      gradient: 'from-blue-500 to-indigo-600',
      count: '15,000+ Names',
      description: 'Biblical and modern Christian names with spiritual context.',
      link: '/names/religion/christian/1'
    }
  ];

  return (
    <section className="py-12 sm:py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-flex rounded-full bg-purple-500 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white mb-4">
            Faith-Based Names
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Islamic, Hindu, and Christian baby names with trusted meaning.
          </h2>
          <p className="max-w-3xl mx-auto text-gray-600 text-base leading-relaxed">
            Find authentic religious names from Quranic, Sanskrit, and Biblical traditions with meaningful origin and cultural accuracy.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-3 mb-10">
          {religions.map((religion) => {
            const Icon = religion.icon;
            return (
              <div key={religion.id} className="rounded-3xl border border-gray-200 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
                <div className={`mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${religion.gradient} text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{religion.name}</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">{religion.description}</p>
                <p className="text-xs text-gray-500 font-semibold mb-6">{religion.count}</p>
                <Link href={religion.link} className="inline-flex items-center gap-2 rounded-full bg-blue-600 px-4 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition">
                  Explore {religion.name}
                  <span aria-hidden="true">→</span>
                </Link>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <p className="max-w-2xl mx-auto text-gray-600 text-base leading-relaxed mb-6">
            Choose the right religious baby names with NameVerse's scholar-approved meanings and clear origin details.
          </p>
          <Link href="/names/religion/islamic/1" className="inline-flex items-center gap-2 rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800 transition">
            Browse all faith-based names
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReligiousNamesSection;
