'use client';

import { useRouter } from 'next/navigation';

export default function DynamicFilters({ currentReligion, currentFilters, availableFilters }) {
  const router = useRouter();

  const handleFilterChange = (filterKey, value) => {
    const newFilters = { ...currentFilters, [filterKey]: value };

    // Construct query params, including religion
    const query = {
      religion: currentReligion,
      ...newFilters,
    };

    // Remove empty filters
    Object.keys(query).forEach(key => {
      if (!query[key]) delete query[key];
    });

    router.push({
      pathname: router.pathname,
      query,
    });
  };

  return (
    <div className="flex flex-wrap gap-4 p-4 bg-white rounded-lg shadow-md">
      {/* Gender Select */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Gender</label>
        <select
          value={currentFilters.gender || ''}
          onChange={(e) => handleFilterChange('gender', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All</option>
          {availableFilters.genders?.map(gender => (
            <option key={gender} value={gender}>{gender}</option>
          ))}
        </select>
      </div>

      {/* Category Select */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={currentFilters.category || ''}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All</option>
          {availableFilters.categories?.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      {/* Alphabet Select */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Alphabet</label>
        <select
          value={currentFilters.alphabet || ''}
          onChange={(e) => handleFilterChange('alphabet', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All</option>
          {availableFilters.alphabets?.map(letter => (
            <option key={letter} value={letter}>{letter}</option>
          ))}
        </select>
      </div>

      {/* Page Select */}
      <div className="flex flex-col">
        <label className="text-sm font-medium text-gray-700 mb-1">Page</label>
        <select
          value={currentFilters.page || ''}
          onChange={(e) => handleFilterChange('page', e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="">All</option>
          {availableFilters.pages?.map(page => (
            <option key={page} value={page}>{page}</option>
          ))}
        </select>
      </div>
    </div>
  );
}