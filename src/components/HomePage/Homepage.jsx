import dynamic from 'next/dynamic';
import HeroSection from './HeroSection';
import ContentSection from './ContentSection';
import AuthorityStats from './AuthorityStats';
import SearchTools from './SearchTools';
import ReligiousNamesSection from './ReligiousNamesSection';
import FaqSection from './FaqSection';

const PopularNamesSection = dynamic(() => import('./PopularNamesSection'), {
  loading: () => <div className="py-16 text-center">Loading trending & popular names…</div>,
});
const LatestArticles = dynamic(() => import('./LatestArticles'), {
  loading: () => <div className="py-16 text-center">Loading latest articles…</div>,
});

export default function HomePageClient({ latestArticles = [] }) {
  return (
    <main role="main" className="min-h-screen flex flex-col bg-slate-50">
      <HeroSection />
      <ContentSection />
      <AuthorityStats />
      <SearchTools />
      <ReligiousNamesSection />
      <PopularNamesSection />
      <FaqSection />
      <LatestArticles articles={latestArticles} />
    </main>
  );
}
