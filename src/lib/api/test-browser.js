/**
 * Browser API Testing Utility
 * Run tests directly in the browser console or React component
 * Usage: import { testAllEndpoints } from '@/lib/api/test-browser';
 */

import namesAPI from './names';
import { apiClient, getCacheStats, clearCache } from './client';

/**
 * Test all API endpoints
 * @param {Object} options - Test options
 * @param {boolean} options.verbose - Log detailed results
 * @returns {Promise<Object>} Test results
 */
export async function testAllEndpoints(options = { verbose: true }) {
  const { verbose } = options;
  const results = {
    passed: [],
    failed: [],
    total: 0,
  };

  const log = verbose ? console.log.bind(console) : () => {};
  const error = verbose ? console.error.bind(console) : () => {};

  log('🧪 Starting API Tests...\n');

  // Test helper
  const runTest = async (name, testFn) => {
    results.total++;
    try {
      await testFn();
      results.passed.push(name);
      log(`✅ ${name}`);
      return true;
    } catch (err) {
      results.failed.push({ name, error: err.message });
      error(`❌ ${name}:`, err.message);
      return false;
    }
  };

  // Clear cache before tests
  clearCache();
  log('🗑️  Cache cleared\n');

  // 1. Health Check
  log('📡 Testing Health Endpoint...');
  await runTest('Health Check', async () => {
    const { data } = await apiClient.get('/health');
    if (data.status !== 'healthy') throw new Error('Server not healthy');
  });

  // 2. Filters
  log('\n📊 Testing Filters Endpoint...');
  await runTest('Islamic Filters', async () => {
    const filters = await namesAPI.fetchFilters('islamic');
    if (!Array.isArray(filters.genders)) throw new Error('Invalid filters response');
    if (filters.totalNames === 0) throw new Error('No names found');
  });

  await runTest('Christian Filters', async () => {
    const filters = await namesAPI.fetchFilters('christian');
    if (!Array.isArray(filters.genders)) throw new Error('Invalid filters response');
  });

  await runTest('Hindu Filters', async () => {
    const filters = await namesAPI.fetchFilters('hindu');
    if (!Array.isArray(filters.genders)) throw new Error('Invalid filters response');
  });

  // 3. Names List
  log('\n📚 Testing Names List Endpoint...');
  await runTest('Fetch Islamic Names', async () => {
    const result = await namesAPI.fetchNames({ religion: 'islamic', limit: 10 });
    if (!result.success) throw new Error('Failed to fetch names');
    if (!Array.isArray(result.data)) throw new Error('Invalid data format');
    if (result.data.length === 0) throw new Error('No names returned');
  });

  await runTest('Fetch with Gender Filter', async () => {
    const result = await namesAPI.fetchNames({
      religion: 'islamic',
      gender: 'male',
      limit: 5,
    });
    if (!result.success) throw new Error('Failed to fetch filtered names');
    if (result.data.length === 0) throw new Error('No filtered results');
  });

  await runTest('Fetch with StartsWith Filter', async () => {
    const result = await namesAPI.fetchNames({
      religion: 'islamic',
      startsWith: 'A',
      limit: 5,
    });
    if (!result.success) throw new Error('Failed to fetch names starting with A');
    if (!result.data[0].name.toUpperCase().startsWith('A')) {
      throw new Error('Name does not start with A');
    }
  });

  // 4. Single Name Detail
  log('\n📖 Testing Name Detail Endpoint...');
  await runTest('Fetch Single Name (ahmad)', async () => {
    const name = await namesAPI.fetchNameDetail('islamic', 'ahmad');
    if (!name) throw new Error('Name not found');
    if (!name.slug) throw new Error('Invalid name structure');
  });

  // 5. Search
  log('\n🔍 Testing Search Endpoint...');
  await runTest('Search Names (ali)', async () => {
    const result = await namesAPI.searchNames('ali');
    if (!result.success) throw new Error('Search failed');
    if (!Array.isArray(result.data)) throw new Error('Invalid search results');
  });

  await runTest('Search with Religion Filter', async () => {
    const result = await namesAPI.searchNames('ali', { religion: 'islamic' });
    if (!result.success) throw new Error('Filtered search failed');
  });

  // 6. Pagination
  log('\n📄 Testing Pagination...');
  await runTest('Page 1', async () => {
    const result = await namesAPI.fetchNames({
      religion: 'islamic',
      page: 1,
      limit: 5,
    });
    if (result.pagination.page !== 1) throw new Error('Wrong page number');
  });

  await runTest('Page 2', async () => {
    const result = await namesAPI.fetchNames({
      religion: 'islamic',
      page: 2,
      limit: 5,
    });
    if (result.pagination.page !== 2) throw new Error('Wrong page number');
  });

  // 7. Caching
  log('\n💾 Testing Cache...');
  const cacheStatsBefore = getCacheStats();
  await runTest('Cache Functionality', async () => {
    // First request
    await namesAPI.fetchNames({ religion: 'islamic', limit: 5 });
    // Second request (should be cached)
    await namesAPI.fetchNames({ religion: 'islamic', limit: 5 });
    const cacheStatsAfter = getCacheStats();
    if (cacheStatsAfter.size <= cacheStatsBefore.size) {
      throw new Error('Cache not working');
    }
  });

  // Print summary
  log('\n' + '='.repeat(50));
  log('📊 Test Summary');
  log('='.repeat(50));
  log(`Total Tests: ${results.total}`);
  log(`✅ Passed: ${results.passed.length}`);
  log(`❌ Failed: ${results.failed.length}`);
  log(`Success Rate: ${((results.passed.length / results.total) * 100).toFixed(2)}%`);

  if (results.failed.length > 0) {
    log('\n❌ Failed Tests:');
    results.failed.forEach(({ name, error }) => {
      log(`  - ${name}: ${error}`);
    });
  }

  return results;
}

/**
 * Quick test - Test core functionality
 * @returns {Promise<boolean>} Success status
 */
export async function quickTest() {
  console.log('🚀 Running quick API test...\n');

  try {
    // Test 1: Health
    const { data: health } = await apiClient.get('/health');
    

    // Test 2: Filters
    const filters = await namesAPI.fetchFilters('islamic');
    

    // Test 3: Names
    const names = await namesAPI.fetchNames({ religion: 'islamic', limit: 5 });
    

    // Test 4: Search
    const search = await namesAPI.searchNames('ali');
    

    
    return true;
  } catch (error) {
    
    return false;
  }
}

/**
 * Test specific endpoint
 * @param {string} endpoint - Endpoint name
 * @param {Object} params - Parameters
 * @returns {Promise<Object>} Test result
 */
export async function testEndpoint(endpoint, params = {}) {
  console.log(`🧪 Testing ${endpoint}...`);

  const tests = {
    health: async () => {
      const { data } = await apiClient.get('/health');
      return { success: data.status === 'healthy', data };
    },
    filters: async () => {
      const data = await namesAPI.fetchFilters(params.religion || 'islamic');
      return { success: data.totalNames > 0, data };
    },
    names: async () => {
      const data = await namesAPI.fetchNames({
        religion: params.religion || 'islamic',
        ...params,
      });
      return { success: data.success && data.data.length > 0, data };
    },
    nameDetail: async () => {
      const data = await namesAPI.fetchNameDetail(
        params.religion || 'islamic',
        params.slug || 'ahmad'
      );
      return { success: data !== null, data };
    },
    search: async () => {
      const data = await namesAPI.searchNames(params.query || 'ali', params);
      return { success: data.success, data };
    },
  };

  try {
    const result = await tests[endpoint]();
    
    return result;
  } catch (error) {
    
    return { success: false, error: error.message };
  }
}

// Export for window (browser console)
if (typeof window !== 'undefined') {
  window.testAPI = {
    testAll: testAllEndpoints,
    quick: quickTest,
    test: testEndpoint,
    clearCache,
    getCacheStats,
  };
  console.log('💡 API Testing utilities loaded. Use window.testAPI.quick() to run a quick test.');
}

const testAPI = {
  testAllEndpoints,
  quickTest,
  testEndpoint,
};

export default testAPI;
