import HeroSection from './HeroSection';
import PopularNamesSection from './PopularNamesSection';
import NameCategories from './NameCategories';
import LatestArticles from './LatestArticles';

export default function HomePageClient({ latestArticles = [] }) {
  return (
    <main role="main" className="min-h-screen flex flex-col bg-slate-50">
      <HeroSection />
      <NameCategories />
      <PopularNamesSection />
      <LatestArticles articles={latestArticles} />
    </main>
  );
}