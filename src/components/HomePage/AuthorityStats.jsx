'use client';

import { BookOpen, Languages, CheckCircle, Heart, Award, Users, Globe, Shield } from 'lucide-react';

const AuthorityStats = () => {
  const stats = [
    {
      number: '65K+',
      label: 'Verified Baby Names',
      description: 'Expert-reviewed names from Islamic, Hindu, Christian, and global traditions',
      icon: BookOpen,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200'
    },
    {
      number: '15+',
      label: 'Languages Supported',
      description: 'Meanings in English, Urdu, Arabic, Hindi, and 11+ more languages',
      icon: Languages,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      number: '99%',
      label: 'Accuracy Rate',
      description: 'Scholar-verified meanings ensuring cultural and religious authenticity',
      icon: CheckCircle,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200'
    },
    {
      number: '5M+',
      label: 'Parents Trusted Worldwide',
      description: 'Families across 120+ countries rely on NameVerse for meaningful names',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200'
    }
  ];

  const trustFeatures = [
    {
      icon: Award,
      title: 'Scholar-Verified Meanings',
      description: 'Every name reviewed by Islamic scholars, Hindu pandits, and Christian theologians'
    },
    {
      icon: Users,
      title: '5 Million+ Happy Families',
      description: 'Real parents who found the perfect name on NameVerse'
    },
    {
      icon: Globe,
      title: 'Global Name Database',
      description: 'Names from 100+ cultures, religions, and linguistic traditions'
    },
    {
      icon: Shield,
      title: '100% Free & Accurate',
      description: 'No hidden fees, no fake meanings — just reliable name data'
    }
  ];

  const getStatColors = (colorClass) => {
    if (colorClass.includes('emerald')) return { main: '#10b981', light: '#d1fae5' };
    if (colorClass.includes('blue')) return { main: '#3b82f6', light: '#dbeafe' };
    if (colorClass.includes('purple')) return { main: '#8b5cf6', light: '#ede9fe' };
    if (colorClass.includes('red')) return { main: '#ef4444', light: '#fee2e2' };
    if (colorClass.includes('orange')) return { main: '#f97316', light: '#ffedd5' };
    return { main: '#6b7280', light: '#f3f4f6' };
  };

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--nv-border)] bg-white/65 px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--nv-ink)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[color:var(--nv-accent)]" />
              Accuracy-first database
            </div>
            <h2 className="nv-display mt-5 text-3xl font-semibold leading-tight text-[color:var(--nv-ink)] sm:text-4xl">
              Built on verified meanings, not guesses.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--nv-muted)] sm:text-lg">
              Clear origin notes, readable translations, and faith-aware context — designed to be trusted when it matters.
            </p>

            <div className="mt-7 inline-flex items-center gap-2 rounded-2xl border border-[color:var(--nv-border)] bg-white/60 px-4 py-3 text-sm font-semibold text-[color:var(--nv-ink)] backdrop-blur">
              <Shield className="h-5 w-5 text-[color:var(--nv-accent-2)]" />
              99% accuracy target, continuously reviewed
            </div>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const colors = getStatColors(stat.color);
                return (
                  <div key={index} className="nv-surface rounded-[26px] p-5 text-left">
                    <div
                      className="grid h-11 w-11 place-items-center rounded-2xl"
                      style={{
                        background: `linear-gradient(135deg, ${colors.light} 0%, ${colors.main} 100%)`,
                        color: colors.main
                      }}
                    >
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className={`nv-display mt-4 text-2xl font-semibold ${stat.color}`}>{stat.number}</div>
                    <div className="mt-1 text-xs font-semibold text-[color:var(--nv-ink)]">{stat.label}</div>
                    <div className="mt-2 text-xs leading-relaxed text-[color:var(--nv-muted)]">{stat.description}</div>
                  </div>
                );
              })}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
              {trustFeatures.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="nv-surface rounded-[26px] p-5">
                    <div className="flex items-start gap-3">
                      <div className="grid h-10 w-10 place-items-center rounded-2xl bg-[color:var(--nv-ink)] text-white shadow-[0_18px_45px_-34px_var(--nv-shadow)]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="text-sm font-semibold text-[color:var(--nv-ink)]">{feature.title}</h3>
                        <p className="mt-1 text-xs leading-relaxed text-[color:var(--nv-muted)]">{feature.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AuthorityStats;
