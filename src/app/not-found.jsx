"use client";

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="nv-page">
      <div className="nv-container nv-section">
        <div className="nv-card text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white">
            404
          </div>
          <h1 className="nv-h1">Page not found</h1>
          <p className="nv-lead mx-auto mt-3 max-w-md">
          Sorry, we couldn't find the page you're looking for. It might have been moved or deleted.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Back to home
            </Link>
            <Link
              href="/search"
              className="inline-flex items-center justify-center rounded-full border border-[rgba(15,23,42,0.14)] bg-white/60 px-6 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-white"
            >
              Search names
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
