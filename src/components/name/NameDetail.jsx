import NameHero from './NameHero';
import Meaning from './Meaning';
import FAQ from './FAQ';
import RelatedNames from './RelatedNames';

export default function NameDetail({ data, faqData = [], pageUrl }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <NameHero data={data} pageUrl={pageUrl} />

        <main className="space-y-6 pt-8">
          <Meaning data={data} />
          <RelatedNames data={data} />
          <FAQ faqData={faqData} name={data.name} />
        </main>
      </div>
    </div>
  );
}
