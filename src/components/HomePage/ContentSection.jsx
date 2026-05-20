import Link from 'next/link';
import { Compass, Sparkles, BookOpenText, ArrowUpRight } from 'lucide-react';

const ContentSection = () => {
  const items = [
    {
      icon: Sparkles,
      title: 'Search by Meaning',
      description: 'Find names that mean peace, strength, faith, love, or light — across traditions.',
      href: '/names-by-meaning',
      badge: 'Curated'
    },
    {
      icon: BookOpenText,
      title: 'Religious Context',
      description: 'Clear Islamic, Hindu, and Christian context with trusted origin notes and translations.',
      href: '/names',
      badge: 'Verified'
    },
    {
      icon: Compass,
      title: 'Fast Discovery',
      description: 'Filter by gender, letter, popularity, origin — then save favorites for later.',
      href: '/advanced-search',
      badge: 'Powerful'
    }
  ];

  return (
    <section className="py-12 sm:py-16" id="homepage-content">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-end">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--nv-border)] bg-white/65 px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--nv-ink)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[color:var(--nv-accent)]" />
              Trusted and readable meanings
            </div>
            <h2 className="nv-display mt-5 text-3xl font-semibold leading-tight text-[color:var(--nv-ink)] sm:text-4xl">
              Your shortlist, built in minutes.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--nv-muted)] sm:text-lg">
              NameVerse is designed for speed: search, filter, and compare without losing cultural depth.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[color:var(--nv-accent-2)] px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_45px_-34px_var(--nv-shadow)] transition hover:translate-y-[-1px] hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-[color:var(--nv-accent-2)]"
              >
                Start searching
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/my-names"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-[color:var(--nv-border)] bg-white/60 px-5 py-3 text-sm font-semibold text-[color:var(--nv-ink)] backdrop-blur transition hover:bg-white/80 focus:outline-none focus:ring-2 focus:ring-[color:var(--nv-accent-2)]"
              >
                View favorites
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {items.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.title}
                  href={item.href}
                  className="group nv-surface rounded-[26px] p-5 transition hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[color:var(--nv-accent-2)]"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[color:var(--nv-border)] bg-white/60 text-[color:var(--nv-ink)] backdrop-blur">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-semibold text-[color:var(--nv-ink)]">
                      {item.badge}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-[color:var(--nv-ink)]">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[color:var(--nv-muted)]">{item.description}</p>
                  </div>
                  <div className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[color:var(--nv-ink)] opacity-75 group-hover:opacity-100">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" />
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

export default ContentSection;
