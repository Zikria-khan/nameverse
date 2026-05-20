/**
 * Simple API Client
 * Basic axios wrapper without caching
 */

import axios from 'axios';
import { env } from '@/config/env';

class RateLimiter {
  constructor(max, windowMs) {
    this.max = max;
    this.windowMs = windowMs;
    this.count = 0;
    this.windowStart = Date.now();
  }
  async schedule() {
    const now = Date.now();
    if (now - this.windowStart >= this.windowMs) {
      this.windowStart = now;
      this.count = 0;
    }
    if (this.count >= this.max) {
      const wait = this.windowMs - (now - this.windowStart);
      await new Promise((r) => setTimeout(r, Math.max(wait, 200)));
      this.windowStart = Date.now();
      this.count = 0;
    }
    this.count++;
  }
}





const activeRequests = new Map();
const staleResponseCache = new Map();

const getRequestCacheKey = (config) => {
  if (!config) return null;
  const method = (config.method || 'get').toLowerCase();
  const url = `${config.baseURL || ''}${config.url || ''}`;
  const params = config.params ? JSON.stringify(config.params) : '';
  const data = config.data ? JSON.stringify(config.data) : '';
  return `${method}|${url}|${params}|${data}`;
};

const isCacheKeyError = (payload) => {
  const errorText =
    typeof payload === 'string'
      ? payload
      : payload?.message || payload?.error || '';
  return typeof errorText === 'string' && errorText.includes('cacheKey');
};

const getCachedResponse = (config) => {
  const cacheKey = getRequestCacheKey(config);
  if (!cacheKey) return null;
  const cached = staleResponseCache.get(cacheKey);
  if (!cached) return null;

  return {
    data: cached.data,
    status: 200,
    statusText: 'OK',
    headers: cached.headers,
    config,
    request: null,
    __isStaleCache: true,
  };
};

const storeSuccessfulResponse = (config, response) => {
  if (!config || (config.method || 'get').toLowerCase() !== 'get') return;
  const cacheKey = getRequestCacheKey(config);
  if (!cacheKey) return;

  staleResponseCache.set(cacheKey, {
    data: response.data,
    status: response.status,
    headers: response.headers,
    timestamp: Date.now(),
  });
};

/**
 * Create axios instance with optimized configuration
 */
export const apiClient = axios.create({
  baseURL: env.api.baseUrl,
  timeout: env.api.timeout,
  headers: {
    'Content-Type': 'application/json',
    // 'Accept-Encoding' is not allowed in browser environments and is handled automatically by Axios/Fetch.
  },
  // Enable compression
  decompress: true,
  // Increase max content length
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
  // Custom status validation - treat ALL status codes as valid to prevent axios from throwing
  validateStatus: () => true, // Accept all status codes
});

const rateLimiter = new RateLimiter(env.limits.maxRequestsPerWindow, env.limits.windowMs);



/**
 * Simple Request Interceptor
 * - Basic request tracking
 */
apiClient.interceptors.request.use(
  async (config) => {
    await rateLimiter.schedule();
    const requestId = `${Date.now()}-${Math.random()}`;
    config.requestId = requestId;
    config.metadata = { startTime: Date.now() };

    activeRequests.set(requestId, config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Simple Response Interceptor
 * - Basic error handling
 */
  apiClient.interceptors.response.use(
  (response) => {
    const { requestId } = response.config;
    activeRequests.delete(requestId);

    if (response.status < 400) {
      storeSuccessfulResponse(response.config, response);
      return response;
    }

    if (response.status >= 400) {
      if (isCacheKeyError(response.data)) {
        const cached = getCachedResponse(response.config);
        if (cached) {
          console.warn('[apiClient] Returning stale cache due to backend cacheKey error:', response.config.url);
          return cached;
        }
      }

      response.__isError = true;
      response.__errorMessage = response.data?.error || response.data?.message || 'Request failed';
      return response;
    }

    return response;
  },
  async (error) => {
    const { config } = error;
    const { requestId } = config || {};

    if (requestId) {
      activeRequests.delete(requestId);
    }

    const cached = getCachedResponse(config);

    if (!error.response && cached) {
      console.warn('[apiClient] Network error; returning stale cache for', config?.url);
      return Promise.resolve(cached);
    }

    if (error.response) {
      if (isCacheKeyError(error.response.data) && cached) {
        console.warn('[apiClient] Backend cacheKey error; returning stale cache for', config?.url);
        return Promise.resolve(cached);
      }

      const { status, data } = error.response;
      return Promise.reject({
        status,
        message: data?.error || data?.message || 'Request failed',
        error,
        response: error.response,
      });
    }

    return Promise.reject(error);
  }
);

/**
 * Get all active requests (useful for cancellation)
 */
export function getActiveRequests() {
  return Array.from(activeRequests.values());
}

/**
 * Cancel all active requests
 */
export function cancelAllRequests() {
  activeRequests.forEach((config) => {
    if (config.signal) {
      config.signal.abort();
    }
  });
  activeRequests.clear();
}

/**
 * Cancel specific request by ID
 */
export function cancelRequest(requestId) {
  const config = activeRequests.get(requestId);
  if (config && config.signal) {
    config.signal.abort();
    activeRequests.delete(requestId);
  }
}





export default apiClient;
