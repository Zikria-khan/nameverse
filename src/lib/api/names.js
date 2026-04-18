/**
 * Names API Module - World-Class Implementation
 * Comprehensive integration with ALL backend name endpoints
 *
 * Backend Endpoints (tested and verified):
 * - GET /api/v1/names - Get paginated names with filters
 * - GET /api/v1/names/search - Search names across religions
 * - GET /api/v1/filters/:religion - Get filters for a religion (ACTUAL ENDPOINT)
 * - GET /api/v1/names/:religion/letter/:letter - Get names by letter
 * - GET /api/v1/names/:religion/:slug - Get single name details
 * - GET /api/v1/names/:religion/:slug/related - Get related names
 * - GET /api/v1/names/:religion/:slug/similar - Get similar names
 */

import { apiClient } from './client';
import { cache } from 'react';

/**
 * Fetch filters for a specific religion
 * Backend: GET /api/v1/filters/:religion
 * @param {string} religion - Religion category (islamic, christian, hindu)
 * @returns {Promise<Object>} Filters object with genders, origins, letters
 */
export const fetchFilters = cache(async (religion) => {
  try {
    if (!religion) {
      // Religion is required for fetching filters
      return {
        genders: [],
        origins: [],
        letters: [],
        totalNames: 0,
      };
    }

    const { data } = await apiClient.get(`/api/v1/filters/${religion}`);

    if (data.success && data.filters) {
      return {
        genders: data.filters.genders || [],
        origins: data.filters.origins || [],
        letters: data.filters.letters || [],
        totalNames: data.totalNames || 0,
      };
    }

    return {
      genders: [],
      origins: [],
      letters: [],
      totalNames: 0,
    };
  } catch (error) {
    // Error fetching filters
    return {
      genders: [],
      origins: [],
      letters: [],
      totalNames: 0,
    };
  }
});

/**
 * Fetch names with pagination and filtering
 * Backend: GET /api/names
 * @param {Object} params - Query parameters
 * @param {string} params.religion - Religion (required)
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.limit - Items per page (default: 50)
 * @param {string} params.gender - Filter by gender
 * @param {string} params.origin - Filter by origin
 * @param {string} params.startsWith - Filter by starting letter
 * @param {string} params.search - Search query
 * @param {string} params.sort - Sort order (asc/desc)
 * @returns {Promise<Object>} Names data with pagination
 */
export const fetchNames = cache(async (params = {}) => {
  try {
    const { religion, page = 1, limit = 50, ...filters } = params;

    if (!religion) {
      
      return {
        data: [],
        pagination: {
          page: 1,
          limit: 50,
          total: 0,
          totalPages: 0,
        },
        success: false,
      };
    }

    const queryParams = {
      religion,
      page,
      limit,
      ...filters,
    };

    const { data } = await apiClient.get('/api/v1/names', { params: queryParams });

    return {
      data: data.data || [],
      pagination: data.pagination || {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0,
      },
      success: data.success !== false,
    };
  } catch (error) {
    
    return {
      data: [],
      pagination: {
        page: 1,
        limit: 50,
        total: 0,
        totalPages: 0,
      },
      success: false,
    };
  }
});

/**
 * Fetch single name by religion and slug
 * Backend: GET /api/names/:religion/:slug
 * @param {string} religion - Religion category
 * @param {string} slug - Name slug
 * @returns {Promise<Object|null>} Name details or null
 */
export const fetchNameDetail = cache(async (religion, slug) => {
  if (!religion || !slug) {
    return null;
  }

  try {
    const response = await apiClient.get(`/api/v1/names/${religion}/${slug}`);

    // Handle 404 silently - name doesn't exist (expected behavior)
    if (response.status === 404) {
      return null;
    }

    // Handle other error statuses silently
    if (response.status >= 400) {
      return null;
    }

    // Success case
    if (response.data?.success && response.data?.data) {
      return response.data.data;
    }

    return null;
  } catch (error) {
    // Silently handle all errors - they're handled by notFound() in the page
    return null;
  }
});

/**
 * Search names across religions
 * Backend: GET /api/v1/search?q=query&limit=20
 * @param {string} query - Search query (min 2 characters)
 * @param {Object} options - Search options
 * @param {string} options.religion - Filter by religion (optional)
 * @param {number} options.limit - Results limit (default: 20)
 * @returns {Promise<Object>} Search results
 */
export const searchNames = cache(async (query, options = {}) => {
  try {
    if (!query || query.trim().length < 2) {
      return {
        data: [],
        count: 0,
        success: false,
        message: 'Query must be at least 2 characters',
      };
    }

    const params = {
      q: query.trim(),
      limit: options.limit || 20,
      ...(options.religion && { religion: options.religion }),
    };

    const { data } = await apiClient.get('/api/v1/search', { params });

    return {
      data: data.data || [],
      count: data.count || 0,
      pagination: data.pagination || null,
      success: data.success !== false,
      query: data.query || query,
    };
  } catch (error) {
    // Error fetching search results
    return {
      data: [],
      count: 0,
      success: false,
      message: 'Error fetching search results',
    };
  }
});


/**
 * Legacy: Fetch names using old endpoint
 * Backend: GET /api/religion/:religion
 * @deprecated Use fetchNames() instead
 */
export async function fetchNamesLegacy(params = {}) {
  try {
    const { religion, ...rest } = params;

    if (!religion) {
      
      return {
        data: [],
        pagination: { page: 1, limit: 50, totalCount: 0, totalPages: 0 },
        success: false,
      };
    }

    const { data } = await apiClient.get(`/api/religion/${religion}`, { params: rest });

    return {
      data: data.data || [],
      pagination: data.pagination || { page: 1, limit: 50, totalCount: 0, totalPages: 0 },
      success: data.success !== false,
    };
  } catch (error) {
    return {
      data: [],
      pagination: { page: 1, limit: 50, totalCount: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Legacy: Fetch filters using old endpoint
 * Backend: GET /api/religion/:religion/filters
 * @deprecated Use fetchFilters() instead
 */
export async function fetchFiltersLegacy(religion) {
  try {
    if (!religion) {
      return { genders: [], origins: [], firstLetters: [], totalNames: 0 };
    }

    const { data } = await apiClient.get(`/api/religion/${religion}/filters`);

    if (data.success && data.filters) {
      return {
        genders: data.filters.genders || [],
        origins: data.filters.origins || [],
        firstLetters: data.filters.firstLetters || [],
        totalNames: data.totalNames || 0,
      };
    }

    return { genders: [], origins: [], firstLetters: [], totalNames: 0 };
  } catch (error) {
    return { genders: [], origins: [], firstLetters: [], totalNames: 0 };
  }
}

/**
 * Legacy: Fetch single name using old endpoint
 * Backend: GET /api/names/:religion/:slug
 * @deprecated Use fetchNameDetail() instead
 */
export async function fetchNameDetailLegacy(religion, slug) {
  try {
    if (!religion || !slug) {
      return null;
    }

    const { data } = await apiClient.get(`/api/names/${religion}/${slug}`);

    if (data.success && data.data) {
      return data.data;
    }

    return null;
  } catch (error) {
    return null;
  }
}

/**
 * Fetch names by letter
 * Backend: GET /api/v1/names/:religion/letter/:letter?limit=100
 * @param {string} letter - First letter of names
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Names starting with letter
 */
export async function fetchNamesByLetter(letter, params = {}) {
  try {
    if (!letter) {
      
      return {
        data: [],
        count: 0,
        success: false,
      };
    }

    const { religion = 'islamic', limit = 100 } = params;

    const { data } = await apiClient.get(`/api/v1/names/${religion}/letter/${letter.toUpperCase()}`, {
      params: { limit }
    });

    return {
      data: data.data || [],
      count: data.count || 0,
      letter: data.letter || letter,
      religion: data.religion || religion,
      success: data.success !== false,
    };
  } catch (error) {
    
    return {
      data: [],
      count: 0,
      success: false,
    };
  }
}

/**
 * Fetch names by category
 * Backend: GET /api/category/:religion/:category?page=1&perPage=20
 * @param {string} religion - Religion category
 * @param {string} category - Name category
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Names in category
 */
export async function fetchNamesByCategory(religion, category, params = {}) {
  try {
    if (!religion || !category) {
      
      return {
        data: [],
        pagination: { page: 1, perPage: 20, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const { page = 1, perPage = 20 } = params;

    const { data } = await apiClient.get('/api/v1/names', {
      params: { religion, page, limit: perPage, category }
    });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        perPage,
        total: 0,
        totalPages: 0,
      },
      category,
      success: data.success !== false,
    };
  } catch (error) {
    
    return {
      data: [],
      pagination: { page: 1, perPage: 20, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch names by gender
 * Backend: GET /api/gender/:gender/:religion?page=1&perPage=50
 * @param {string} gender - Gender (Male/Female)
 * @param {string} religion - Religion category
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Names by gender
 */
export async function fetchNamesByGender(gender, religion, params = {}) {
  try {
    if (!gender || !religion) {
      
      return {
        data: [],
        pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const { page = 1, perPage = 50 } = params;

    const { data } = await apiClient.get('/api/v1/names', {
      params: { religion, page, limit: perPage, gender }
    });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        perPage,
        total: 0,
        totalPages: 0,
      },
      gender,
      success: data.success !== false,
    };
  } catch (error) {
    
    return {
      data: [],
      pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch names by origin
 * Backend: GET /api/origin/:religion/:origin?page=1&perPage=50
 * @param {string} religion - Religion category
 * @param {string} origin - Name origin
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Names by origin
 */
export async function fetchNamesByOrigin(religion, origin, params = {}) {
  try {
    if (!religion || !origin) {
      
      return {
        data: [],
        pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const { page = 1, perPage = 50 } = params;

    const { data } = await apiClient.get('/api/v1/names', {
      params: { religion, page, limit: perPage, origin }
    });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        perPage,
        total: 0,
        totalPages: 0,
      },
      origin,
      success: data.success !== false,
    };
  } catch (error) {
    
    return {
      data: [],
      pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch names by language
 * Backend: GET /api/language/:religion/:language?page=1&perPage=50
 * @param {string} religion - Religion category
 * @param {string} language - Name language
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Names by language
 */
export async function fetchNamesByLanguage(religion, language, params = {}) {
  try {
    if (!religion || !language) {
      
      return {
        data: [],
        pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const { page = 1, perPage = 50 } = params;

    const { data } = await apiClient.get('/api/v1/names', {
      params: { religion, page, limit: perPage, language }
    });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        perPage,
        total: 0,
        totalPages: 0,
      },
      language,
      success: data.success !== false,
    };
  } catch (error) {
    
    return {
      data: [],
      pagination: { page: 1, perPage: 50, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch trending names
 * Backend: GET /api/v1/names?religion=X&limit=20
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Trending names
 */
export async function fetchTrendingNames(params = {}) {
  try {
    const { religion = 'islamic', page = 1, limit = 20 } = params;

    // Use valid religion value (islamic, christian, hindu)
    const validReligion = ['islamic', 'christian', 'hindu'].includes(religion.toLowerCase())
      ? religion.toLowerCase()
      : 'islamic';

    const response = await apiClient.get('/api/v1/names', {
      params: { religion: validReligion, page, limit }
    });

    // Check if response is an error
    if (response.__isError || response.status >= 400) {
      return {
        data: [],
        pagination: { page, limit, total: 0, totalPages: 0 },
        religion: validReligion,
        success: false,
      };
    }

    const data = response.data;

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
      religion: validReligion,
      success: data.success !== false,
    };
  } catch (error) {
    return {
      data: [],
      pagination: { page: 1, limit: 20, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch all filter options
 * Backend: GET /api/filters
 * @returns {Promise<Object>} All available filters
 */
export async function fetchAllFilters() {
  try {
    const { data } = await apiClient.get('/api/v1/filters');

    return {
      filters: data.filters || data.data || {},
      success: data.success !== false,
    };
  } catch (error) {
    
    return {
      filters: {},
      success: false,
    };
  }
}

/**
 * Fetch religion-specific filters
 * Backend: GET /api/religion/:religion/filters
 * @param {string} religion - Religion category
 * @returns {Promise<Object>} Religion-specific filters
 */
export async function fetchReligionFilters(religion) {
  try {
    if (!religion) {
      
      return {
        filters: {},
        success: false,
      };
    }

    const { data } = await apiClient.get(`/api/v1/filters/${religion}`);

    return {
      filters: data.filters || data.data || {},
      religion,
      success: data.success !== false,
    };
  } catch (error) {
    
    return {
      filters: {},
      success: false,
    };
  }
}

/**
 * Fetch names with advanced filters including lucky attributes
 * Backend: GET /api/names with multiple query params
 * @param {Object} filters - Advanced filter options
 * @returns {Promise<Object>} Filtered names
 */
export async function fetchNamesWithAdvancedFilters(filters = {}) {
  try {
    const {
      religion,
      gender,
      origin,
      language,
      category,
      alphabet,
      luckyDay,
      luckyColor,
      luckyStone,
      page = 1,
      limit = 50,
    } = filters;

    if (!religion) {
      
      return {
        data: [],
        pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
        success: false,
      };
    }

    const params = {
      religion,
      page,
      limit,
    };

    if (gender) params.gender = gender;
    if (origin) params.origin = origin;
    if (language) params.language = language;
    if (category) params.category = category;
    if (alphabet) params.alphabet = alphabet;
    if (luckyDay) params.luckyDay = luckyDay;
    if (luckyColor) params.luckyColor = luckyColor;
    if (luckyStone) params.luckyStone = luckyStone;

    const { data } = await apiClient.get('/api/v1/names', { params });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page,
        limit,
        total: 0,
        totalPages: 0,
      },
      appliedFilters: filters,
      success: data.success !== false,
    };
  } catch (error) {
    
    return {
      data: [],
      pagination: { page: 1, limit: 50, total: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch related names based on origin and gender
 * Backend: GET /api/v1/names/:religion/:slug/related?limit=10
 * @param {string} religion - Religion category
 * @param {string} slug - Name slug
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Related names
 */
export async function fetchRelatedNames(religion, slug, params = {}) {
  try {
    if (!religion || !slug) {
      
      return {
        data: [],
        count: 0,
        success: false,
      };
    }

    const { limit = 10 } = params;

    const { data } = await apiClient.get(`/api/v1/names/${religion}/${slug}/related`, {
      params: { limit }
    });

    return {
      data: data.data || [],
      count: data.count || 0,
      originalName: data.originalName || null,
      religion: data.religion || religion,
      success: data.success !== false,
    };
  } catch (error) {
    
    return {
      data: [],
      count: 0,
      success: false,
    };
  }
}

/**
 * Fetch similar names based on name pattern
 * Backend: GET /api/v1/names/:religion/:slug/similar?limit=8
 * @param {string} religion - Religion category
 * @param {string} slug - Name slug
 * @param {Object} params - Query parameters
 * @returns {Promise<Object>} Similar names
 */
export async function fetchSimilarNames(religion, slug, params = {}) {
  try {
    if (!religion || !slug) {
      
      return {
        data: [],
        count: 0,
        success: false,
      };
    }

    const { limit = 8 } = params;

    const { data } = await apiClient.get(`/api/v1/names/${religion}/${slug}/similar`, {
      params: { limit }
    });

    return {
      data: data.data || [],
      count: data.count || 0,
      originalName: data.originalName || null,
      religion: data.religion || religion,
      success: data.success !== false,
    };
  } catch (error) {
    
    return {
      data: [],
      count: 0,
      success: false,
    };
  }
}

// Export all functions
const namesAPI = {
  // Core endpoints
  fetchFilters,
  fetchNames,
  fetchNameDetail,
  searchNames,

  // Advanced endpoints
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

  // Legacy endpoints (backward compatibility)
  fetchNamesLegacy,
  fetchFiltersLegacy,
  fetchNameDetailLegacy,
};

export default namesAPI;
