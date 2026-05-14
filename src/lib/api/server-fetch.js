/**
 * Server-Side Data Fetcher (SSR/ISR)
 *
 * Uses native fetch() with next.revalidate to enable ISR caching.
 * CRITICAL: Axios-based fetches (apiClient.get) make routes dynamic,
 * but native fetch() with next.revalidate enables full ISR.
 *
 * All these functions must be used in Server Components only.
 */

const API_BASE = (process.env.NEXT_PUBLIC_API_BASE || 'https://name-meaning-site-backend.vercel.app').replace(/\/+$/, '');
const ISR_TTL = 2592000; // 30 days

const VALID_RELIGIONS = ['islamic', 'christian', 'hindu'];

function normalizeReligion(val) {
  if (!val) return 'islamic';
  const n = String(val).toLowerCase();
  if (n === 'muslim' || n === 'islam') return 'islamic';
  if (n === 'christianity') return 'christian';
  if (n === 'hinduism') return 'hindu';
  return VALID_RELIGIONS.includes(n) ? n : 'islamic';
}

/**
 * Fetch names by letter with full ISR support
 */
export async function serverFetchNamesByLetter(letter, options = {}) {
  if (!letter) return { data: [], pagination: { totalPages: 1, totalCount: 0 }, success: false };

  const { religion = 'islamic', limit = 50, page = 1, sort = 'asc' } = options;
  const normalizedReligion = normalizeReligion(religion);

  try {
    const params = new URLSearchParams();
    params.set('alphabet', String(letter).toLowerCase());
    params.set('limit', String(limit));
    params.set('page', String(page));
    params.set('sort', sort);

    const res = await fetch(
      `${API_BASE}/api/v1/names/${normalizedReligion}?${params.toString()}`,
      { next: { revalidate: ISR_TTL } }
    );

    if (!res.ok) {
      return { data: [], pagination: { totalPages: 1, totalCount: 0 }, success: false };
    }

    const data = await res.json();
    const names = data.data || data.names || [];
    const pagination = data.pagination || {};

    return {
      data: names,
      pagination: {
        totalPages: pagination.pages || data.totalPages || Math.ceil((pagination.total || names.length) / limit),
        totalCount: pagination.total || data.totalCount || names.length,
        page,
        limit,
      },
      success: true,
    };
  } catch {
    return { data: [], pagination: { totalPages: 1, totalCount: 0 }, success: false };
  }
}

/**
 * Fetch names with advanced filters + ISR
 */
export async function serverFetchNamesWithAdvancedFilters(options = {}) {
  const {
    religion,
    page = 1,
    limit = 50,
    sort = 'asc',
    gender,
    origin,
    category,
    alphabet,
  } = options;

  const normalizedReligion = normalizeReligion(religion);
  if (!normalizedReligion) {
    return { data: [], pagination: { totalPages: 1, totalCount: 0 }, success: false };
  }

  try {
    const params = new URLSearchParams();
    params.set('page', String(page));
    params.set('limit', String(limit));
    params.set('sort', sort);
    if (gender) params.set('gender', gender);
    if (origin) params.set('origin', origin);
    if (category) params.set('category', category);
    if (alphabet) params.set('startsWith', String(alphabet).toLowerCase());

    const res = await fetch(
      `${API_BASE}/api/v1/names/${normalizedReligion}?${params.toString()}`,
      { next: { revalidate: ISR_TTL } }
    );

    if (!res.ok) {
      return { data: [], pagination: { totalPages: 1, totalCount: 0 }, success: false };
    }

    const data = await res.json();
    const names = data.data || data.names || [];
    const pagination = data.pagination || {};

    return {
      data: names,
      pagination: {
        totalPages: pagination.pages || data.totalPages || Math.ceil((pagination.total || names.length) / limit),
        totalCount: pagination.total || data.totalCount || names.length,
        page,
        limit,
      },
      success: true,
    };
  } catch {
    return { data: [], pagination: { totalPages: 1, totalCount: 0 }, success: false };
  }
}