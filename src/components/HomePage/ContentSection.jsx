import Link from 'next/link';
import { Compass, Sparkles, BookOpenText, ArrowUpRight } from 'lucide-react';
import AdBanner from '@/components/Ads/AdBanner';

const ContentSection = () => {
  const items = [
    {
      icon: Sparkles,
      title: 'NameVerse Meaning Search',
      description: 'Find names that mean peace, strength, faith, love, or light across Islamic, Hindu, and Christian traditions.',
      href: '/names-by-meaning',
      badge: 'Curated'
    },
    {
      icon: BookOpenText,
      title: 'Verified Religious Context',
      description: 'Clear NameVerse-backed Islamic, Hindu, and Christian meaning notes with trusted origin details.',
      href: '/names',
      badge: 'Verified'
    },
    {
      icon: Compass,
      title: 'Fast NameVerse Discovery',
      description: 'Filter by gender, letter, popularity, and origin to narrow your shortlist with NameVerse precision.',
      href: '/advanced-search',
      badge: 'Fast'
    }
  ];

  return (
    <section className="py-12 sm:py-16" id="homepage-content">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm ring-1 ring-slate-200">
              <span className="h-2 w-2 rounded-full bg-indigo-500" />
              Trusted meanings in every result
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Build your shortlist with NameVerse.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
              NameVerse is designed for fast, thoughtful baby name discovery. Search, filter, and compare names while preserving the cultural meaning behind each Islamic, Hindu, and Christian choice.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 rounded-2xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700"
              >
                Start searching
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <Link
                href="/my-names"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50"
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
                  className="group rounded-[26px] border border-slate-200 bg-white p-5 text-slate-900 transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-center justify-between gap-3">
                    <div className="grid h-11 w-11 place-items-center rounded-2xl bg-slate-100 text-slate-900">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-700">
                      {item.badge}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{item.description}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-indigo-700 opacity-80 group-hover:opacity-100">
                    Explore
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Ad — naturally embedded within content section, after feature cards */}
        <div className="mt-10 sm:mt-12 lg:mt-14">
          <AdBanner />
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
