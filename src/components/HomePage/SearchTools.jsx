'use client';

import { Search, Heart, BookOpen, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const SearchTools = () => {
  const tools = [
    {
      icon: Search,
      title: 'Advanced Name Search',
      description: 'Filter baby names by gender, religion, origin, meaning, and popularity.',
      link: '/search',
      linkText: 'Search Names'
    },
    {
      icon: BookOpen,
      title: 'Name Meanings',
      description: 'Explore meanings and linguistic roots with clear cultural context.',
      link: '/name-meanings',
      linkText: 'Explore Meanings'
    },
    {
      icon: Heart,
      title: 'Save Favorite Names',
      description: 'Bookmark names, compare choices, and share your shortlist with family.',
      link: '/my-names',
      linkText: 'Save Favorites'
    }
  ];

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--nv-border)] bg-white/65 px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--nv-ink)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[color:var(--nv-accent-3)]" />
              Smart tools, zero friction
            </div>
            <h2 className="nv-display mt-5 text-3xl font-semibold leading-tight text-[color:var(--nv-ink)] sm:text-4xl">
              Tools built for real decisions.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--nv-muted)] sm:text-lg">
              Every feature is designed to help you go from “maybe” to a confident “yes” — quickly, and on any screen.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.title}
                  href={tool.link}
                  className="group nv-surface rounded-[26px] p-5 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[color:var(--nv-accent-2)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[color:var(--nv-border)] bg-white/60 text-[color:var(--nv-ink)] backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                    <ArrowUpRight className="h-4 w-4 text-[color:var(--nv-muted)] opacity-60 transition group-hover:opacity-100" />
                  </div>
                  <h3 className="mt-4 text-sm font-semibold text-[color:var(--nv-ink)]">{tool.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[color:var(--nv-muted)]">{tool.description}</p>
                  <div className="mt-4 text-xs font-semibold text-[color:var(--nv-accent-2)]">
                    {tool.linkText}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchTools;
