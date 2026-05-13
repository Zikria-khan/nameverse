import ShareButtons from './ShareButtons';
import { Crown, Volume2, Globe, Star, Hash, Calendar } from 'lucide-react';

const statItems = (data) => [
  data.lucky_number && { label: 'Lucky #', value: data.lucky_number, icon: Hash },
  data.lucky_day && { label: 'Lucky Day', value: data.lucky_day, icon: Calendar },
  data.origin && { label: 'Origin', value: data.origin, icon: Globe },
  data.gender && { label: 'Gender', value: data.gender, icon: Star },
].filter(Boolean);

export default function NameHero({ data, pageUrl }) {
  const subtitle = data.short_meaning || data.meaning || 'Beautiful name';

  return (
    <section className="rounded-3xl bg-gradient-to-br from-white via-slate-50 to-slate-100 px-4 py-6 shadow-sm sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-gradient-to-r from-amber-50 via-white to-slate-50 p-6 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-amber-700 shadow-sm">
              <Crown className="h-4 w-4" /> NameVerse
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">{data.name}</h1>
            <p className="mt-3 max-w-2xl text-lg leading-8 text-slate-700">{subtitle}</p>
            {data.pronunciation?.english && (
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-600">
                <Volume2 className="h-4 w-4" /> {data.pronunciation.english}
                {data.pronunciation?.ipa ? <span className="ml-2 text-slate-500">{data.pronunciation.ipa}</span> : null}
              </p>
            )}
          </div>
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-4 shadow-sm sm:w-auto">
            <ShareButtons
              name={data.name}
              pageUrl={pageUrl}
              description={`Discover the meaning and origin of ${data.name}.`}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {statItems(data).map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.label} className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 text-center shadow-sm">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="text-base font-semibold text-slate-900">{item.value}</div>
                <div className="mt-1 text-sm text-slate-500">{item.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
