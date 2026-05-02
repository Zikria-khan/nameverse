import HeroSection from './HeroSection';
import QuickFiltersGrid from './QuickFiltersGrid';
import NameCategories from './NameCategories';
import AlphabetNavigation from './AlphabetNavigation';
import TableOfContents from './TableOfContents';
import PopularNamesSection from './PopularNamesSection';
import LatestArticles from './LatestArticles';

export default function HomePageClient({ latestArticles = [] }) {
  return (
    <main role="main" className="min-h-screen flex flex-col bg-slate-50">
      <HeroSection />
      <QuickFiltersGrid />
      <NameCategories />
      <AlphabetNavigation />
      <TableOfContents />
      <PopularNamesSection />
      <LatestArticles articles={latestArticles} />
    </main>
  );
}
