'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  ChevronDown,
  Globe,
  Hash,
  Heart,
  Home,
  List,
  Menu,
  Moon,
  Search,
  Sparkles,
  Sun,
  TrendingUp,
  X,
} from 'lucide-react';

const categoryLinks = [
  { name: 'All Baby Names', href: '/names', icon: List, description: 'Browse the full name directory' },
  { name: 'Islamic Names', href: '/islamic/boy-names', icon: BookOpen, description: 'Quranic, Arabic and Urdu names', badge: 'Popular' },
  { name: 'Islamic Boy Names', href: '/islamic/boy-names', icon: BookOpen, description: 'Male Islamic names' },
  { name: 'Islamic Girl Names', href: '/islamic/girl-names', icon: BookOpen, description: 'Female Islamic names' },
  { name: 'Christian Names', href: '/christian/boy-names', icon: BookOpen, description: 'Biblical and modern names', badge: 'Popular' },
  { name: 'Christian Boy Names', href: '/christian/boy-names', icon: BookOpen, description: 'Male Christian names' },
  { name: 'Christian Girl Names', href: '/christian/girl-names', icon: BookOpen, description: 'Female Christian names' },
  { name: 'Hindu Names', href: '/hindu/boy-names', icon: Sparkles, description: 'Sanskrit and Vedic names', badge: 'Popular' },
  { name: 'Hindu Boy Names', href: '/hindu/boy-names', icon: Sparkles, description: 'Male Hindu names' },
  { name: 'Hindu Girl Names', href: '/hindu/girl-names', icon: Sparkles, description: 'Female Hindu names' },
  { name: 'Biblical Names', href: '/names/christian/categories/biblical/1', icon: BookOpen, description: 'Names from the Bible' },
  { name: 'Quranic Names', href: '/names/islamic/categories/quranic/1', icon: BookOpen, description: 'Names from the Quran' },
];

const exploreLinks = [
  { name: 'By Meaning', href: '/names-by-meaning', icon: Heart, description: 'Browse names by their meanings' },
  { name: 'By Origin', href: '/names-by-origin', icon: Globe, description: 'Names by linguistic origin' },
  { name: 'By Letter', href: '/names/islamic/letter/a/1', icon: Hash, description: 'A–Z name browsing' },
  { name: 'Trending Names', href: '/trending-names', icon: TrendingUp, description: 'Names gaining search interest', badge: 'Hot' },
  { name: 'Unique Names', href: '/unique-names', icon: Sparkles, description: 'Distinctive naming ideas' },
  { name: 'Popular Names', href: '/popularity', icon: Heart, description: 'Popularity and discovery tools' },
  { name: 'Name Meanings', href: '/name-meanings', icon: BookOpen, description: 'Meaning-led research' },
  { name: 'Advanced Search', href: '/advanced-search', icon: Search, description: 'Filter by meaning and origin' },
  { name: 'Knowledge Graph', href: '/names-by-meaning', icon: Sparkles, description: 'Entity relationships and connections' },
];

const resourceLinks = [
  { name: 'Blog', href: '/blog', icon: BookOpen, description: 'Expert naming guides' },
  { name: 'Expert Naming Guide', href: '/guides/expert-naming-guide', icon: Sparkles, description: 'Decision framework' },
  { name: 'Popular by State', href: '/popular-by-state', icon: Globe, description: 'US state popularity' },
  { name: 'Saved Names', href: '/my-names', icon: Heart, description: 'Your personal shortlist' },
  { name: 'About NameVerse', href: '/about', icon: BookOpen, description: 'Our mission and team' },
];

const directLinks = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: BookOpen },
];

function normalizePath(pathnameValue) {
  if (!pathnameValue) return '/';
  const withoutQuery = pathnameValue.split('?')[0];
  if (withoutQuery !== '/' && withoutQuery.endsWith('/')) return withoutQuery.slice(0, -1);
  return withoutQuery || '/';
}

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [mobileSection, setMobileSection] = useState(null);
  const [isDark, setIsDark] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('nameverse-theme') : null;
    const prefersDark = typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const nextDark = stored ? stored === 'dark' : prefersDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
    setMobileSection(null);
  }, [pathname]);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (activeDropdown && navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('pointerdown', handlePointerDown);
    return () => document.removeEventListener('pointerdown', handlePointerDown);
  }, [activeDropdown]);

  const currentPath = normalizePath(pathname);
  const isActive = (href) => {
    const target = normalizePath(href);
    if (target === '/') return currentPath === '/';
    return currentPath === target || currentPath.startsWith(`${target}/`);
  };

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    document.documentElement.classList.toggle('dark', nextDark);
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('nameverse-theme', nextDark ? 'dark' : 'light');
    }
  };

  const navItems = useMemo(() => [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Names', href: '/names', dropdown: categoryLinks, icon: List },
    { name: 'Categories', href: '/names', dropdown: exploreLinks, icon: Sparkles },
    { name: 'Blog', href: '/blog', icon: BookOpen },
    { name: 'About', href: '/about', icon: BookOpen },
  ], []);

  if (!mounted) {
    return (
      <nav className="sticky top-0 z-[100] border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="h-8 w-28 rounded-full bg-slate-200" />
          <div className="hidden h-9 w-40 rounded-full bg-slate-200 lg:block" />
        </div>
      </nav>
    );
  }

  return (
    <nav ref={navRef} className="sticky top-0 z-[100] border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5" aria-label="NameVerse home">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-slate-950 text-white shadow-sm">
            <Image src="/logo.png" alt="" width={22} height={22} className="object-contain" priority />
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-black tracking-tight text-slate-950 leading-none">NameVerse</div>
            <div className="text-[10px] font-semibold text-slate-500 leading-tight mt-0.5">Meanings & origins</div>
          </div>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navItems.map((item) => {
            const Icon = item.icon;
            const hasDropdown = Boolean(item.dropdown);
            const active = hasDropdown
              ? item.dropdown.some((link) => isActive(link.href)) || isActive(item.href)
              : isActive(item.href);

            return (
              <div key={item.name} className="relative">
                {hasDropdown ? (
                  <button
                    type="button"
                    onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                    aria-expanded={activeDropdown === item.name}
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${
                      active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                    {item.name}
                    <ChevronDown className={`h-3 w-3 transition ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                  </button>
                ) : (
                  <Link href={item.href} className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition ${active ? 'bg-blue-50 text-blue-700' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'}`}>
                    <Icon className="h-3.5 w-3.5" />
                    {item.name}
                  </Link>
                )}

                {hasDropdown && activeDropdown === item.name && (
                  <div className="absolute left-0 top-full z-50 mt-2 w-[280px] overflow-hidden rounded-2xl border border-slate-200 bg-white p-1.5 shadow-xl">
                    {item.dropdown.map((link) => {
                      const LinkIcon = link.icon;
                      return (
                        <Link
                          key={link.href}
                          href={link.href}
                          onClick={() => setActiveDropdown(null)}
                          className={`flex items-start gap-2.5 rounded-xl p-2.5 transition ${
                            isActive(link.href) ? 'bg-blue-50' : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-100 text-blue-700">
                            <LinkIcon className="h-3.5 w-3.5" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <div className="text-xs font-bold text-slate-950 truncate">{link.name}</div>
                              {link.badge && (
                                <span className="shrink-0 rounded-full bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold text-blue-700 uppercase tracking-wide">
                                  {link.badge}
                                </span>
                              )}
                            </div>
                            <div className="mt-0.5 text-[11px] leading-relaxed text-slate-500 line-clamp-1">{link.description}</div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden items-center gap-2 xl:flex">
          <button
            type="button"
            onClick={toggleTheme}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold text-slate-700 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700" aria-label="Search names">
            <Search className="h-3.5 w-3.5" />
            Search
          </Link>
          <Link href="/search" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-700">
            Start searching
          </Link>
        </div>

        <div className="flex items-center gap-1.5 lg:hidden">
          <Link href="/search" className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-700" aria-label="Search names">
            <Search className="h-4 w-4" />
          </Link>
          <button
            type="button"
            onClick={() => setIsMenuOpen((value) => !value)}
            className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white text-slate-700"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <>
          <div className="fixed inset-0 z-[101] bg-slate-950/40 backdrop-blur-sm lg:hidden" onClick={() => setIsMenuOpen(false)} />
          <div className="fixed inset-x-0 top-14 z-[102] flex max-h-[calc(100vh-3.5rem)] flex-col bg-white shadow-2xl lg:hidden">
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="mb-4 grid grid-cols-2 gap-2">
                <button type="button" onClick={toggleTheme} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-xs font-bold text-slate-700">
                  {isDark ? 'Light mode' : 'Dark mode'}
                </button>
                <Link href="/search" onClick={() => setIsMenuOpen(false)} className="rounded-xl bg-slate-950 px-3 py-2.5 text-center text-xs font-bold text-white">
                  Search
                </Link>
              </div>

              <div className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const hasDropdown = Boolean(item.dropdown);
                  return (
                    <div key={item.name} className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <button
                        type="button"
                        onClick={() => hasDropdown ? setMobileSection(mobileSection === item.name ? null : item.name) : setIsMenuOpen(false)}
                        className="flex w-full items-center justify-between gap-2 px-3 py-3 text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <div className="grid h-8 w-8 place-items-center rounded-lg bg-blue-50 text-blue-700">
                            <Icon className="h-3.5 w-3.5" />
                          </div>
                          <div>
                            <div className="text-sm font-bold text-slate-950">{item.name}</div>
                            <div className="text-[11px] text-slate-500">{hasDropdown ? 'Open section' : 'Open page'}</div>
                          </div>
                        </div>
                        {hasDropdown && <ChevronDown className={`h-4 w-4 text-slate-400 transition ${mobileSection === item.name ? 'rotate-180' : ''}`} />}
                      </button>

                      {hasDropdown && mobileSection === item.name && (
                        <div className="space-y-1 border-t border-slate-100 bg-slate-50 px-2.5 py-2.5">
                          {item.dropdown.map((link) => {
                            const LinkIcon = link.icon;
                            return (
                              <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setIsMenuOpen(false)}
                                className="flex items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-sm font-semibold text-slate-700 hover:bg-white"
                              >
                                <LinkIcon className="h-3.5 w-3.5 text-blue-700" />
                                {link.name}
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}

                {directLinks.map((link) => {
                  const Icon = link.icon;
                  return (
                    <Link key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2.5 rounded-2xl border border-slate-200 bg-white px-3 py-3 text-sm font-bold text-slate-700">
                      <Icon className="h-4 w-4 text-blue-700" />
                      {link.name}
                    </Link>
                  );
                })}
              </div>

              <div className="mt-4 flex gap-2">
                <Link href="/search" onClick={() => setIsMenuOpen(false)} className="flex-1 inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-700">
                  Search names
                </Link>
                <Link href="/search" onClick={() => setIsMenuOpen(false)} className="flex-1 inline-flex items-center justify-center rounded-xl bg-blue-700 px-4 py-3 text-sm font-bold text-white">
                  Get started
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </nav>
  );
}
