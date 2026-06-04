"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Search, Home, BookOpen, Globe, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search/${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <main className="nv-page min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-full max-w-lg mx-auto px-4 py-16">
        <div className="nv-card text-center">
          {/* 410/404 Status */}
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-white">
            <span className="text-2xl font-black">404</span>
          </div>

          <h1 className="text-3xl font-bold text-slate-900 mb-3">
            Page Not Found
          </h1>
          <p className="text-slate-600 mb-8 max-w-sm mx-auto leading-relaxed">
            This page is no longer available or does not exist. The URL may have been removed, renamed, or never existed.
          </p>

          {/* Search Input */}
          <form onSubmit={handleSearch} className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a name..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 shadow-sm"
                aria-label="Search for a name"
              />
            </div>
          </form>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              <Home className="h-4 w-4" />
              Home
            </Link>
            <Link
              href="/names"
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
            >
              <BookOpen className="h-4 w-4" />
              Name Research
            </Link>
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              <Search className="h-4 w-4" />
              Advanced Search
            </Link>
            <Link
              href="/names/religion/islamic/1"
              className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              <Globe className="h-4 w-4" />
              Browse Names
            </Link>
          </div>

          {/* Popular Research Links */}
          <div className="border-t border-slate-100 pt-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-3">
              Popular Research Categories
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <Link href="/names/religion/islamic/1" className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700 hover:bg-emerald-100 transition">
                Islamic Names
              </Link>
              <Link href="/names/religion/christian/1" className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 hover:bg-blue-100 transition">
                Christian Names
              </Link>
              <Link href="/names/religion/hindu/1" className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700 hover:bg-orange-100 transition">
                Hindu Names
              </Link>
              <Link href="/unique-names" className="inline-flex items-center rounded-full bg-purple-50 px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-100 transition">
                Unique Names
              </Link>
            </div>
          </div>

          {/* SEO Note */}
          <p className="mt-8 text-xs text-slate-400">
            Status: <span className="font-mono">410 Gone</span> · This URL has been permanently removed.
          </p>
        </div>
      </div>
    </main>
  );
}