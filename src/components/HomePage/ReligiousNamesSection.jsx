'use client';

import { Globe, Sparkles, BookOpen, ArrowUpRight } from 'lucide-react';
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
    <section className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--nv-border)] bg-white/65 px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--nv-ink)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[color:var(--nv-accent-2)]" />
              Faith-aware browsing
            </div>
            <h2 className="nv-display mt-5 text-3xl font-semibold leading-tight text-[color:var(--nv-ink)] sm:text-4xl">
              Browse by tradition, stay confident in meaning.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--nv-muted)] sm:text-lg">
              Carefully organized Islamic, Hindu, and Christian collections with consistent meanings, origin notes, and usable filters.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/names"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--nv-ink)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-34px_var(--nv-shadow)] transition hover:translate-y-[-1px] hover:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-[color:var(--nv-accent-2)]"
              >
                Browse all religions
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/names/religion/islamic/1"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[color:var(--nv-border)] bg-white/60 px-5 py-3 text-sm font-semibold text-[color:var(--nv-ink)] backdrop-blur transition hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[color:var(--nv-accent-2)]"
              >
                Start with Islamic
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {religions.map((religion) => {
              const Icon = religion.icon;
              return (
                <Link
                  key={religion.id}
                  href={religion.link}
                  className="group nv-surface rounded-[26px] p-6 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[color:var(--nv-accent-2)]"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${religion.gradient} text-white shadow-[0_18px_45px_-34px_var(--nv-shadow)]`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <div className="text-xs font-semibold text-[color:var(--nv-muted)]">{religion.count}</div>
                      <div className="mt-2 inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--nv-ink)] opacity-70 group-hover:opacity-100">
                        Open list
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </div>
                    </div>
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[color:var(--nv-ink)]">{religion.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--nv-muted)]">{religion.description}</p>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReligiousNamesSection;
