import { Link } from 'lucide-react';

const normalizeLink = (name, religion) => {
  const segment = name.toLowerCase().replace(/\s+/g, '-');
  return `/names/${religion}/${segment}`;
};

export default function RelatedNames({ data }) {
  const religionKey = data.religion?.toLowerCase() || 'islamic';
  const hasSimilar = data.similar_sounding_names?.length > 0;
  const hasVariations = data.name_variations?.length > 0 || data.related_names?.length > 0;

  if (!hasSimilar && !hasVariations) {
    return null;
  }

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-5 flex items-center gap-3 text-slate-900">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <Link className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold">Similar & Related Names</h2>
          <p className="text-sm text-slate-500">Explore names with the same feel or origin.</p>
        </div>
      </div>

      <div className="space-y-5">
        {hasSimilar && (
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Similar sounding</h3>
            <div className="flex flex-wrap gap-2">
              {data.similar_sounding_names.slice(0, 10).map((name) => (
                <a
                  key={name}
                  href={normalizeLink(name, religionKey)}
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100"
                >
                  {name}
                </a>
              ))}
            </div>
          </div>
        )}

        {hasVariations && (
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.18em] text-slate-500">Variations & related names</h3>
            <div className="flex flex-wrap gap-2">
              {data.name_variations?.slice(0, 10).map((value) => (
                <span key={value} className="rounded-full bg-amber-50 px-3 py-1 text-sm text-amber-700">
                  {value}
                </span>
              ))}
              {data.related_names?.slice(0, 10).map((value) => (
                <span key={value} className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-700">
                  {value}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
