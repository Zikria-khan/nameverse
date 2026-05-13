import Link from 'next/link';

const ContentSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-slate-50" id="homepage-content">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <span className="inline-flex rounded-full bg-teal-600 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white mb-4">
            Verified & trusted baby names
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted baby names with clear meanings, origins, and religious context.
          </h2>
          <p className="mx-auto max-w-3xl text-base sm:text-lg text-gray-600 leading-relaxed">
            NameVerse helps parents find Islamic, Hindu, and Christian baby names with accurate meaning, pronunciation, and cultural background. Search names by religion, origin, gender, and meaning to discover the perfect choice.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Search by Meaning</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Find names that mean peace, strength, faith, or love. Every entry shows name meaning, origin, and whether it is Islamic, Hindu, or Christian.
            </p>
            <Link href="/names-by-meaning" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Browse meaning categories →
            </Link>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Deep religious context</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Every name includes trusted Islamic, Hindu, or Christian context so families can choose names with confidence and meaning.
            </p>
            <Link href="/names/religion/islamic/1" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Explore Islamic names →
            </Link>
          </div>

          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Fast name discovery</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Use the search tool to filter names by gender, origin, popularity, and meaning. Save favorites and compare strong candidates in one place.
            </p>
            <Link href="/search" className="text-sm font-semibold text-blue-600 hover:text-blue-700">
              Start searching names →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContentSection;
