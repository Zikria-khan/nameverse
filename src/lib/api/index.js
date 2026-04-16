/**
 * API Services Index - Unified Export
 * World-class API layer for NameVerse frontend
 *
 * Usage:
 * import { namesAPI, storiesAPI, articlesAPI, searchAPI } from '@/lib/api';
 * OR
 * import { fetchTrendingNames } from '@/lib/api/names';
 */

// Export API client
export { apiClient, clearCache, getCacheStats, prefetch } from './client';

// Export Names API
export { default as namesAPI } from './names';
export {
  fetchFilters,
  fetchNames,
  fetchNameDetail,
  searchNames,
  fetchNamesByLetter,
  fetchNamesByCategory,
  fetchNamesByGender,
  fetchNamesByOrigin,
  fetchNamesByLanguage,
  fetchTrendingNames,
  fetchAllFilters,
  fetchReligionFilters,
  fetchNamesWithAdvancedFilters,
  fetchRelatedNames,
  fetchSimilarNames,
} from './names';

// Stories API removed

// Export Articles API
export { default as articlesAPI } from './articles';
export {
  getLatestArticles,
  getAllArticles,
  getAllCategories,
  getArticlesByCategory,
  getArticleBySlug,
  searchArticles,
  countArticles,
} from './articles';

// Export Search API
export { default as searchAPI } from './search';
export {
  globalSearch,
  quickSearch,
  advancedSearch,
  getPopularSearches,
  getSearchSuggestions,
} from './search';

// Convenience object with all APIs
export const API = {
  names: namesAPI,
  articles: articlesAPI,
  search: searchAPI,
};

export default API;
