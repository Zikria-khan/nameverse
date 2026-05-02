import HeroSection from './HeroSection';
import AuthorityStats from './AuthorityStats';
import SearchTools from './SearchTools';
import ReligiousNamesSection from './ReligiousNamesSection';
import QuickFiltersGrid from './QuickFiltersGrid';
import NameCategories from './NameCategories';
import AlphabetNavigation from './AlphabetNavigation';
import TableOfContents from './TableOfContents';
import PopularNamesSection from './PopularNamesSection';
import TrendingNames from './TrendingNames';
import WhyNameVerse from './WhyNameVerse';
import PlatformOverview from './PlatformOverview';
import SeasonalNamesSection from './SeasonalNamesSection';
import LatestArticles from './LatestArticles';

export default function HomePageClient({ latestArticles = [] }) {
  return (
    <main role="main" className="min-h-screen flex flex-col bg-slate-50">
      <HeroSection />
      <AuthorityStats />
      <SearchTools />
      <ReligiousNamesSection />
      <QuickFiltersGrid />
      <NameCategories />
      <AlphabetNavigation />
      <TableOfContents />
      <PopularNamesSection />
      <TrendingNames />
      <WhyNameVerse />
      <PlatformOverview />
      <SeasonalNamesSection />
      <LatestArticles articles={latestArticles} />
    </main>
  );
}
