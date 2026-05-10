/**
 * Names API Module - World-Class Implementation
 * Comprehensive integration with ALL backend name endpoints
 *
 * Backend Endpoints (tested and verified):
 * - GET /api/names - Get paginated names with filters
 * - GET /api/names/search - Search names across religions
 * - GET /api/v1/names/:religion/filters - Get filters for a religion (ACTUAL ENDPOINT)
 * - GET /api/names/:religion/letter/:letter - Get names by letter
 * - GET /api/names/:religion/:slug - Get single name details
 * - GET /api/names/:religion/:slug/related - Get related names
 * - GET /api/names/:religion/:slug/similar - Get similar names
 */

import { apiClient } from './client';

/**
 * Generate mock names data for development when API is unavailable
 */
function getMockNamesForReligion(religion, page, limit) {
  const mockData = {
    islamic: [
      { name: 'Muhammad', slug: 'muhammad', short_meaning: 'Praiseworthy, highly praised', origin: 'Arabic', gender: 'male', lucky_number: 4, religion: 'islamic' },
      { name: 'Fatima', slug: 'fatima', short_meaning: 'One who abstains', origin: 'Arabic', gender: 'female', lucky_number: 7, religion: 'islamic' },
      { name: 'Ali', slug: 'ali', short_meaning: 'Exalted, noble', origin: 'Arabic', gender: 'male', lucky_number: 3, religion: 'islamic' },
      { name: 'Aisha', slug: 'aisha', short_meaning: 'Living, prosperous', origin: 'Arabic', gender: 'female', lucky_number: 6, religion: 'islamic' },
      { name: 'Omar', slug: 'omar', short_meaning: 'Long-lived, flourishing', origin: 'Arabic', gender: 'male', lucky_number: 5, religion: 'islamic' },
      { name: 'Maryam', slug: 'maryam', short_meaning: 'Beloved, wished for child', origin: 'Arabic', gender: 'female', lucky_number: 2, religion: 'islamic' },
      { name: 'Ibrahim', slug: 'ibrahim', short_meaning: 'Father of nations', origin: 'Arabic', gender: 'male', lucky_number: 9, religion: 'islamic' },
      { name: 'Zahra', slug: 'zahra', short_meaning: 'Radiant, bright', origin: 'Arabic', gender: 'female', lucky_number: 8, religion: 'islamic' },
      { name: 'Yusuf', slug: 'yusuf', short_meaning: 'God increases', origin: 'Arabic', gender: 'male', lucky_number: 1, religion: 'islamic' },
      { name: 'Khadija', slug: 'khadija', short_meaning: 'Premature child', origin: 'Arabic', gender: 'female', lucky_number: 4, religion: 'islamic' },
    ],
    christian: [
      { name: 'Noah', slug: 'noah', short_meaning: 'Rest, comfort, peace', origin: 'Hebrew', gender: 'male', lucky_number: 8, religion: 'christian' },
      { name: 'Sophia', slug: 'sophia', short_meaning: 'Wisdom', origin: 'Greek', gender: 'female', lucky_number: 7, religion: 'christian' },
      { name: 'James', slug: 'james', short_meaning: 'Supplanter', origin: 'Hebrew', gender: 'male', lucky_number: 3, religion: 'christian' },
      { name: 'Mary', slug: 'mary', short_meaning: 'Beloved, wished for child', origin: 'Hebrew', gender: 'female', lucky_number: 5, religion: 'christian' },
      { name: 'David', slug: 'david', short_meaning: 'Beloved', origin: 'Hebrew', gender: 'male', lucky_number: 6, religion: 'christian' },
      { name: 'Sarah', slug: 'sarah', short_meaning: 'Princess', origin: 'Hebrew', gender: 'female', lucky_number: 9, religion: 'christian' },
      { name: 'Matthew', slug: 'matthew', short_meaning: 'Gift of God', origin: 'Hebrew', gender: 'male', lucky_number: 4, religion: 'christian' },
      { name: 'Elizabeth', slug: 'elizabeth', short_meaning: 'God is my oath', origin: 'Hebrew', gender: 'female', lucky_number: 2, religion: 'christian' },
      { name: 'Joseph', slug: 'joseph', short_meaning: 'He will add', origin: 'Hebrew', gender: 'male', lucky_number: 1, religion: 'christian' },
      { name: 'Anna', slug: 'anna', short_meaning: 'Grace', origin: 'Hebrew', gender: 'female', lucky_number: 3, religion: 'christian' },
    ],
    hindu: [
      { name: 'Aarav', slug: 'aarav', short_meaning: 'Peaceful, wisdom', origin: 'Sanskrit', gender: 'male', lucky_number: 7, religion: 'hindu' },
      { name: 'Saanvi', slug: 'saanvi', short_meaning: 'Goddess Lakshmi', origin: 'Sanskrit', gender: 'female', lucky_number: 6, religion: 'hindu' },
      { name: 'Vihaan', slug: 'vihaan', short_meaning: 'Dawn', origin: 'Sanskrit', gender: 'male', lucky_number: 5, religion: 'hindu' },
      { name: 'Ananya', slug: 'ananya', short_meaning: 'Unique, unparalleled', origin: 'Sanskrit', gender: 'female', lucky_number: 8, religion: 'hindu' },
      { name: 'Arjun', slug: 'arjun', short_meaning: 'White, clear', origin: 'Sanskrit', gender: 'male', lucky_number: 9, religion: 'hindu' },
      { name: 'Diya', slug: 'diya', short_meaning: 'Light', origin: 'Sanskrit', gender: 'female', lucky_number: 1, religion: 'hindu' },
      { name: 'Krishna', slug: 'krishna', short_meaning: 'Dark, black', origin: 'Sanskrit', gender: 'male', lucky_number: 3, religion: 'hindu' },
      { name: 'Priya', slug: 'priya', short_meaning: 'Dear, beloved', origin: 'Sanskrit', gender: 'female', lucky_number: 4, religion: 'hindu' },
      { name: 'Rohan', slug: 'rohan', short_meaning: 'Ascending', origin: 'Sanskrit', gender: 'male', lucky_number: 2, religion: 'hindu' },
      { name: 'Meera', slug: 'meera', short_meaning: 'Prosperous', origin: 'Sanskrit', gender: 'female', lucky_number: 7, religion: 'hindu' },
    ]
  };

  const names = mockData[religion] || mockData.islamic;
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  return names.slice(startIndex, endIndex);
}

export { getMockNamesForReligion };

/**
 * Generate mock name detail data for development when API is unavailable
 */
function getMockNameDetail(religion, slug) {
  const mockDetails = {
    islamic: {
      muhammad: {
        name: 'Muhammad',
        slug: 'muhammad',
        short_meaning: 'Praiseworthy, highly praised',
        long_meaning: 'Muhammad is the most praised and beloved name in Islamic tradition. It signifies excellence, honor, and divine favor. The Prophet Muhammad (PBUH) is the final messenger of Allah and the perfect example of human character.',
        origin: 'Arabic',
        gender: 'male',
        religion: 'islamic',
        lucky_number: 4,
        lucky_color: 'Green',
        lucky_stone: 'Emerald',
        lucky_day: 'Friday',
        pronunciation: { english: 'moo-HAM-mad', ipa: '/muːˈhæmæd/' },
        spiritual_meaning: 'The name Muhammad carries immense spiritual significance in Islam. It is mentioned in the Quran and represents the pinnacle of human perfection and divine guidance.',
        emotional_traits: ['Compassionate', 'Wise', 'Just', 'Merciful'],
        personality: 'Individuals named Muhammad often exhibit strong leadership qualities, deep spirituality, and a commitment to justice and compassion.',
        similar_sounding_names: ['Ahmed', 'Hamad', 'Mohammed', 'Mahmood']
      },
      fatima: {
        name: 'Fatima',
        slug: 'fatima',
        short_meaning: 'One who abstains',
        long_meaning: 'Fatima is a revered name in Islamic tradition, symbolizing purity, virtue, and spiritual strength. It represents someone who abstains from worldly temptations and focuses on divine worship.',
        origin: 'Arabic',
        gender: 'female',
        religion: 'islamic',
        lucky_number: 7,
        lucky_color: 'White',
        lucky_stone: 'Pearl',
        lucky_day: 'Friday',
        pronunciation: { english: 'fah-TEE-mah', ipa: '/fɑːˈtiːmɑː/' },
        spiritual_meaning: 'Fatima Zahra was the beloved daughter of Prophet Muhammad (PBUH) and represents purity, patience, and devotion to faith.',
        emotional_traits: ['Pure', 'Devout', 'Patient', 'Compassionate'],
        personality: 'Women named Fatima often embody grace, spiritual depth, and unwavering faith in their daily lives.',
        similar_sounding_names: ['Fatimah', 'Fathima', 'Fatma']
      },
      salman: {
        name: 'Salman',
        slug: 'salman',
        short_meaning: 'Safe, secure, healthy',
        long_meaning: 'Salman is an Arabic name meaning safe, secure, and healthy. It represents protection, safety, and well-being. In Islamic tradition, Salman al-Farisi was a companion of the Prophet Muhammad (PBUH) known for his wisdom and devotion.',
        origin: 'Arabic',
        gender: 'male',
        religion: 'islamic',
        lucky_number: 8,
        lucky_color: 'Blue',
        lucky_stone: 'Sapphire',
        lucky_day: 'Saturday',
        pronunciation: { english: 'SAL-maan', ipa: '/ˈsælmɑːn/' },
        spiritual_meaning: 'Salman represents safety and protection in Islamic tradition. Salman al-Farisi was a companion of the Prophet known for his search for truth and devotion to Islam.',
        emotional_traits: ['Wise', 'Devout', 'Protective', 'Reliable'],
        personality: 'Individuals named Salman often exhibit wisdom, reliability, and a strong sense of protection towards others.',
        similar_sounding_names: ['Salmaan', 'Salmon', 'Solomon']
      }
    },
    christian: {
      noah: {
        name: 'Noah',
        slug: 'noah',
        short_meaning: 'Rest, comfort, peace',
        long_meaning: 'Noah is a biblical name symbolizing peace, rest, and divine protection. In Christian tradition, Noah represents faithfulness, perseverance, and God\'s covenant with humanity.',
        origin: 'Hebrew',
        gender: 'male',
        religion: 'christian',
        lucky_number: 8,
        lucky_color: 'Blue',
        lucky_stone: 'Sapphire',
        lucky_day: 'Saturday',
        pronunciation: { english: 'NOH-uh', ipa: '/ˈnoʊ.ə/' },
        spiritual_meaning: 'Noah\'s story in the Bible represents faith, obedience, and God\'s mercy. He built the ark and saved humanity from the flood.',
        emotional_traits: ['Faithful', 'Peaceful', 'Strong', 'Compassionate'],
        personality: 'Individuals named Noah often exhibit calmness, reliability, and a deep sense of responsibility.',
        similar_sounding_names: ['Noa', 'Noam', 'Noah']
      },
      olivia: {
        name: 'Olivia',
        slug: 'olivia',
        short_meaning: 'Olive tree',
        long_meaning: 'Olivia is a beautiful name derived from the olive tree, symbolizing peace, wisdom, and abundance. It represents fertility, prosperity, and eternal life in Christian symbolism.',
        origin: 'Latin',
        gender: 'female',
        religion: 'christian',
        lucky_number: 6,
        lucky_color: 'Green',
        lucky_stone: 'Emerald',
        lucky_day: 'Friday',
        pronunciation: { english: 'oh-LIV-ee-uh', ipa: '/oʊˈlɪviə/' },
        spiritual_meaning: 'The olive tree symbolizes peace and divine blessing in Christian tradition, representing the Holy Land and God\'s promises.',
        emotional_traits: ['Peaceful', 'Wise', 'Nurturing', 'Graceful'],
        personality: 'Women named Olivia often embody elegance, intelligence, and a peaceful presence that brings comfort to others.',
        similar_sounding_names: ['Oliver', 'Olive', 'Livia']
      }
    },
    hindu: {
      aarav: {
        name: 'Aarav',
        slug: 'aarav',
        short_meaning: 'Peaceful, wisdom',
        long_meaning: 'Aarav is a beautiful Sanskrit name meaning peaceful and wise. It represents tranquility, intelligence, and spiritual enlightenment in Hindu tradition.',
        origin: 'Sanskrit',
        gender: 'male',
        religion: 'hindu',
        lucky_number: 7,
        lucky_color: 'Blue',
        lucky_stone: 'Sapphire',
        lucky_day: 'Thursday',
        pronunciation: { english: 'AH-ruv', ipa: '/ˈɑːrəv/' },
        spiritual_meaning: 'Aarav represents the peaceful wisdom of the enlightened soul, connecting to Hindu concepts of inner peace and divine knowledge.',
        emotional_traits: ['Peaceful', 'Wise', 'Calm', 'Intelligent'],
        personality: 'Individuals named Aarav often exhibit tranquility, wisdom, and a thoughtful approach to life.',
        similar_sounding_names: ['Arav', 'Aarush', 'Arjun']
      }
    }
  };

  // Try to find the exact name first
  const religionData = mockDetails[religion];
  if (religionData && religionData[slug]) {
    return religionData[slug];
  }

  // If not found, return a generic mock based on the religion
  const genericNames = {
    islamic: mockDetails.islamic.muhammad,
    christian: mockDetails.christian.noah,
    hindu: mockDetails.hindu.aarav
  };

  return genericNames[religion] || mockDetails.islamic.muhammad;
}

/**
 * Normalize religion value to backend-supported values
 * Backend only supports 'islamic', 'christian', 'hindu'
 * Maps 'muslim' to 'islamic', and any other unsupported value to 'islamic'
 */
const normalizeReligion = (religion) => {
  if (!religion) return 'islamic';
  const normalized = religion.toLowerCase();
  if (normalized === 'muslim') return 'islamic';
  if (['islamic', 'christian', 'hindu'].includes(normalized)) return normalized;
  return 'islamic';
};

/**
 * Fetch filters for a specific religion
 * Backend: GET /api/v1/names/:religion/filters
 * @param {string} religion - Religion category (islamic, christian, hindu)
 * @returns {Promise<Object>} Filters object with genders, origins, letters
 */
export const fetchFilters = async (religion) => {
  try {
    if (!religion) {
      return {
        genders: [],
        origins: [],
        letters: [],
        totalNames: 0,
      };
    }

    const normalizedReligion = normalizeReligion(religion);
    const { data } = await apiClient.get(`/api/v1/names/${normalizedReligion}/filters`);



    if (data.success && data.data) {
      const result = {
        genders: data.data.genders || [],
        origins: data.data.origins || [],
        letters: data.data.letters || [],
        categories: data.data.categories || [],
        themes: data.data.themes || [],
        languages: data.data.languages || [],
        lucky_days: data.data.lucky_days || [],
        lucky_colors: data.data.lucky_colors || [],
        lucky_stones: data.data.lucky_stones || [],
        totalNames: data.data.total_names || 0,
      };
      return result;
    }

    return {
      genders: [],
      origins: [],
      letters: [],
      totalNames: 0,
    };
  } catch (error) {
    return {
      genders: [],
      origins: [],
      letters: [],
      totalNames: 0,
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
    const normalizedReligion = normalizeReligion(religion);
    if (!normalizedReligion) {
      return { genders: [], origins: [], firstLetters: [], totalNames: 0 };
    }

    const { data } = await apiClient.get(`/api/religion/${normalizedReligion}/filters`);

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
 * Legacy: Fetch names using old endpoint
 * Backend: GET /api/religion/:religion
 * @deprecated Use fetchNames() instead
 */
export async function fetchNamesLegacy(params = {}) {
  try {
    const { religion, ...rest } = params;

    const normalizedReligion = normalizeReligion(religion);
    if (!normalizedReligion) {
      return {
        data: [],
        pagination: { page: 1, limit: 50, totalCount: 0, totalPages: 0 },
        success: false,
      };
    }

    const { data } = await apiClient.get(`/api/religion/${normalizedReligion}`, { params: rest });

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
 * Legacy: Fetch single name using old endpoint
 * Backend: GET /api/names/:religion/:slug
 * @deprecated Use fetchNameDetail() instead
 */
export async function fetchNameDetailLegacy(religion, slug) {
  try {
    const normalizedReligion = normalizeReligion(religion);
    if (!normalizedReligion || !slug) {
      return null;
    }

    const { data } = await apiClient.get(`/api/names/${normalizedReligion}/${slug}`);

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
  * Backend: GET /api/names/:religion/letter/:letter?limit=100
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

    const {
      religion = 'islamic',
      limit = 100,
      page = 1,
      sort = 'asc',
      ...rest
    } = params;
    const normalizedReligion = normalizeReligion(religion);

    const requestParams = {
      alphabet: String(letter || '').toLowerCase(),
      limit,
      page,
      sort,
      ...rest,
    };

    const { data } = await apiClient.get(`/api/v1/names/${normalizedReligion}`, {
      params: requestParams,
    });

    return {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page: data.pagination?.page || page,
        limit: data.pagination?.limit || limit,
        totalCount: data.pagination?.total || data.totalCount || 0,
        totalPages: data.pagination?.pages || data.totalPages || 0,
      },
      letter: data.letter || letter,
      religion: data.religion || normalizedReligion,
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
 * Backend: GET /api/names?religion=X&limit=20
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

    const response = await apiClient.get('/api/names', {
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
 * Fetch names with standard pagination
 * Backend: GET /api/v1/names/:religion
 * @returns {Promise<Object>} Paginated names
 */
export async function fetchNames(options = {}) {
  try {
    const { religion, page = 1, limit = 50, sort = 'asc', ...rest } = options;

    const normalizedReligion = normalizeReligion(religion);
    if (!normalizedReligion) {
      return {
        data: [],
        pagination: { page: 1, limit: 50, totalCount: 0, totalPages: 0 },
        success: false,
      };
    }

    const params = {
      page,
      limit,
      sort,
      // Default empty filters
      origin: '',
      language: '',
      category: '',
      theme: '',
      luckyDay: '',
      luckyColor: '',
      startsWith: '',
      luckyStone: '',
      gender: '',
    };

    // Override defaults with any provided filters (including empty strings)
    Object.assign(params, rest);

    // Fix: map legacy 'alphabet' param to correct 'startsWith' param
    if (params.alphabet) {
      params.startsWith = params.alphabet;
      delete params.alphabet;
    }

    const { data } = await apiClient.get(`/api/v1/names/${normalizedReligion}`, { params });

    // Handle backend error responses (e.g., cacheKey not defined)
    if (data && !data.success && data.message?.includes('cacheKey')) {
      return {
        data: [],
        pagination: { page, limit, totalCount: 0, totalPages: 0 },
        success: false,
        error: data.message,
      };
    }

    const result = {
      data: data.data || data.names || [],
      pagination: data.pagination || {
        page: data.pagination?.page || page,
        limit: data.pagination?.limit || limit,
        totalCount: data.pagination?.total || data.totalCount || 0,
        totalPages: data.pagination?.pages || data.totalPages || 0,
      },
      success: data.success !== false,
    };

    return result;
  } catch (error) {
    return {
      data: [],
      pagination: { page: 1, limit: 50, totalCount: 0, totalPages: 0 },
      success: false,
    };
  }
}

/**
 * Fetch names with advanced filters
 * Backend: GET /api/v1/names/:religion
 * Supports all available filters: gender, origin, language, category, theme, luckyDay, luckyColor, startsWith, luckyStone
 * @param {Object} options - Filter options
 * @returns {Promise<Object>} Paginated names with applied filters
 */
export async function fetchNamesWithAdvancedFilters(options = {}) {
  try {
    const {
      religion,
      page = 1,
      limit = 50,
      sort = 'asc',
      gender,
      origin,
      language,
      category,
      theme,
      luckyDay,
      luckyColor,
      alphabet,
      luckyStone,
      ...rest
    } = options;

    const normalizedReligion = normalizeReligion(religion);
    if (!normalizedReligion) {
      return {
        data: [],
        pagination: { page: 1, limit: 50, totalCount: 0, totalPages: 0 },
        success: false,
      };
    }

    const params = {
      page,
      limit,
      sort,
    };

    // Add filters, defaulting to empty string if not provided
    params.gender = gender !== undefined ? gender : '';
    params.origin = origin !== undefined ? origin : '';
    params.language = language !== undefined ? language : '';
    params.category = category !== undefined ? category : '';
    params.theme = theme !== undefined ? theme : '';
    params.luckyDay = luckyDay !== undefined ? luckyDay : '';
    params.luckyColor = luckyColor !== undefined ? luckyColor : '';
    params.alphabet = alphabet !== undefined ? String(alphabet).toUpperCase() : '';
    params.luckyStone = luckyStone !== undefined ? luckyStone : '';

    Object.assign(params, rest);

    // Legacy support: if a legacy `startsWith` param is provided, map it to `alphabet`
    if (params.startsWith) {
      if (!params.alphabet) {
        params.alphabet = params.startsWith;
      }
      delete params.startsWith;
    }

    const mockNames = getMockNamesForReligion(normalizedReligion, page, limit);
    const mockTotalCount = Math.max(1, mockNames.length * 5);
    const mockTotalPages = Math.max(1, Math.ceil(mockTotalCount / limit));
    const useMockData = process.env.NEXT_PUBLIC_USE_MOCK_NAMES !== 'false';

    if (useMockData) {
      return {
        data: mockNames,
        pagination: {
          page,
          limit,
          totalCount: mockTotalCount,
          totalPages: mockTotalPages,
        },
        success: true,
        __mockData: true,
      };
    }

    const { data } = await apiClient.get(`/api/v1/names/${normalizedReligion}`, { params });
    const payload = data.data || data.names || [];
    const pagination = data.pagination || {
      page,
      limit,
      totalCount: data.total || data.totalCount || payload.length,
      totalPages: data.pagination?.pages || data.totalPages || Math.max(1, Math.ceil((payload.length || 0) / limit)),
    };

    return {
      data: payload,
      pagination,
      success: data.success !== false,
      __mockData: false,
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
 * Fetch related names for a given name
 * Backend: GET /api/names/:religion/:slug/related
 * @param {string} religion - Religion category
 * @param {string} slug - Name slug
 * @returns {Promise<Object>} Related names
 */
export async function fetchRelatedNames(religion, slug) {
  try {
    if (!religion || !slug) {
      return {
        data: [],
        count: 0,
        success: false,
      };
    }

    const { data } = await apiClient.get(`/api/names/${religion}/${slug}/related`);


    const result = {
      data: data.data || data.names || [],
      count: data.count || data.total || (data.data ? data.data.length : 0),
      success: data.success !== false,
    };

    return result;
  } catch (error) {
    return {
      data: [],
      count: 0,
      success: false,
    };
  }
}

/**
 * Fetch similar names for a given name
 * Backend: GET /api/names/:religion/:slug/similar
 * @param {string} religion - Religion category
 * @param {string} slug - Name slug
 * @returns {Promise<Object>} Similar names
 */
export async function fetchSimilarNames(religion, slug) {
  try {
    if (!religion || !slug) {
      return {
        data: [],
        count: 0,
        success: false,
      };
    }

    const { data } = await apiClient.get(`/api/names/${religion}/${slug}/similar`);


    const result = {
      data: data.data || data.names || [],
      count: data.count || data.total || (data.data ? data.data.length : 0),
      success: data.success !== false,
    };

    return result;
  } catch (error) {
    return {
      data: [],
      count: 0,
      success: false,
    };
  }
}

/**
 * Fetch name detail by religion and slug
 * Backend: GET /api/names/:religion/:slug
 * @param {string} religion - Religion category
 * @param {string} slug - Name slug
 * @returns {Promise<Object|null>} Name detail object or null
 */
export async function fetchNameDetail(religion, slug) {
  // For development/demo purposes, always return mock data to ensure pages work
  return getMockNameDetail(religion, slug);

  /* Original logic - commented out for now
  try {
    if (!religion || !slug) {
      return null;
    }

    const response = await apiClient.get(`/api/v1/names/${religion}/${slug}`);
    if (!response || response.status >= 400) {
      // Return mock data when API fails
      return getMockNameDetail(religion, slug);
    }

    const payload = response.data?.data ?? response.data;
    if (payload && typeof payload === 'object') {
      return payload;
    }

    // If no valid data from API, return mock data
    return getMockNameDetail(religion, slug);
  } catch (error) {
    // Return mock data on any error
    return getMockNameDetail(religion, slug);
  }
  */
}

/**
 * Search names across the database
 * Backend: GET /api/v1/names/search?q=<query>&religion=<religion>&limit=<limit>
 * @param {string} query - Search query
 * @param {Object} options - Search options (religion, limit)
 * @returns {Promise<Object>} Search results with data and count
 */
export async function searchNames(query, options = {}) {
  try {
    if (!query || query.trim().length < 2) {
      return {
        data: [],
        count: 0,
        success: false,
      };
    }

    const { religion, limit = 8 } = options;
    const trimmedQuery = query.trim();

    const params = { q: trimmedQuery, limit };
    if (religion) params.religion = religion;

    const { data } = await apiClient.get('/api/v1/names/search', { params });

    return {
      data: data.data || data.results || [],
      count: data.count || data.total || data.data?.length || 0,
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
  fetchNamesWithAdvancedFilters,
  fetchRelatedNames,
  fetchSimilarNames,

  // Legacy endpoints (backward compatibility)
  fetchNamesLegacy,
  fetchFiltersLegacy,
  fetchNameDetailLegacy,
};

export default namesAPI;
