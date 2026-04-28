import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchNamesWithAdvancedFilters } from '@/lib/api/names';
import { ChevronLeft, ChevronRight, Sparkles, Moon } from 'lucide-react';

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];
const RELIGION_LABELS = {
  islamic: 'Islamic',
  christian: 'Christian',
  hindu: 'Hindu',
};

function normalizeReligion(religion) {
  if (!religion || typeof religion !== 'string') return null;
  const normalized = religion.toLowerCase();
  return VALID_RELIGIONS.includes(normalized) ? normalized : null;
}

function normalizePage(page) {
  const pageNumber = parseInt(page, 10);
  return Number.isInteger(pageNumber) && pageNumber > 0 ? pageNumber : 1;
}

function generateSlug(name) {
  if (!name || typeof name !== 'string') return '';
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export default async function ReligionByPage({ params }) {
  const resolvedParams = await params;
  const religion = normalizeReligion(resolvedParams?.religion);
  const page = normalizePage(resolvedParams?.page);

  if (!religion) {
    return notFound();
  }

  const response = await fetchNamesWithAdvancedFilters({
    religion,
    page,
    limit: 50,
    sort: 'asc',
  });

  if (!response.success) {
    return notFound();
  }

  const names = Array.isArray(response.data) ? response.data : [];
  const pagination = response.pagination || { page: 1, limit: 50, totalCount: 0, totalPages: 1 };
  const { totalPages = 1, totalCount = 0 } = pagination;
  const hasPrev = page > 1;
  const hasNext = page < totalPages;
  const prevUrl = hasPrev ? `/names/religion/${religion}/${page - 1}` : null;
  const nextUrl = hasNext ? `/names/religion/${religion}/${page + 1}` : null;
  const title = `${RELIGION_LABELS[religion]} Names`;

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100">
      <section className="relative py-16 px-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.3)_0%,transparent_52%)]"></div>
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
            <Sparkles className="w-5 h-5 text-white" />
            <span>{RELIGION_LABELS[religion]} Names</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg text-indigo-100 max-w-3xl">
            Browse {totalCount} names from the {RELIGION_LABELS[religion].toLowerCase()} tradition with meanings, origins, and detail pages.
          </p>
          <p className="mt-4 text-sm text-indigo-100/90">
            Page {page} of {totalPages}
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        {names.length === 0 ? (
          <div className="rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">No names found</h2>
            <p className="text-gray-600">No names were returned for this page. Try another page or check the religion value.</p>
          </div>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {names.map((nameItem, index) => {
                const displayName = nameItem.name || nameItem.title || `Name ${index + 1}`;
                const displayMeaning = nameItem.short_meaning || nameItem.meaning || nameItem.long_meaning || 'Meaning not available';
                const slug = nameItem.slug || generateSlug(displayName);

                return (
                  <Link
                    key={`${displayName}-${index}`}
                    href={`/names/${religion}/${slug}`}
                    className="group block rounded-3xl border border-gray-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div>
                        <h2 className="text-2xl font-semibold text-gray-900 group-hover:text-indigo-600">{displayName}</h2>
                        <p className="mt-2 text-sm text-gray-500">{nameItem.origin || 'Unknown origin'}</p>
                      </div>
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-600">
                        <Moon className="w-6 h-6" />
                      </div>
                    </div>
                    <p className="text-sm leading-6 text-gray-600">{displayMeaning}</p>
                  </Link>
                );
              })}
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 sm:flex-row">
              {hasPrev ? (
                <Link
                  href={prevUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </Link>
              ) : (
                <span className="text-sm text-gray-500">No previous page</span>
              )}

              <span className="text-sm text-gray-600">
                Showing page {page} of {totalPages}
              </span>

              {hasNext ? (
                <Link
                  href={nextUrl}
                  className="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </Link>
              ) : (
                <span className="text-sm text-gray-500">No next page</span>
              )}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
