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

    // For error status codes, mark as error but return response
    if (response.status >= 400) {
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

    // Simple error handling without caching
    if (!error.response) {
      return Promise.reject({
        status: 0,
        message: 'Network error. Please check your internet connection.',
        error,
      });
    }

    if (error.response) {
      const { status, data } = error.response;
      return Promise.reject({
        status,
        message: data?.error || data?.message || 'Request failed',
        error,
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
