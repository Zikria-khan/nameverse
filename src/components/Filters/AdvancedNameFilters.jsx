'use client';

import React, { useState, useEffect } from 'react';
import { Filter, X, ChevronDown, Search, Sparkles, Calendar, Palette, Gem } from 'lucide-react';
import { fetchReligionFilters } from '@/lib/api/names';

/**
 * Advanced Name Filters Component
 * Supports all filter types from API:
 * - Gender
 * - Origin
 * - Language
 * - Category
 * - Alphabet (First Letter)
 * - Lucky Day
 * - Lucky Color
 * - Lucky Stone
 */
export default function AdvancedNameFilters({ religion, onFiltersChange, initialFilters = {} }) {
  const [filters, setFilters] = useState({
    gender: initialFilters.gender || '',
    origin: initialFilters.origin || '',
    language: initialFilters.language || '',
    category: initialFilters.category || '',
    alphabet: initialFilters.alphabet || '',
    luckyDay: initialFilters.luckyDay || '',
    luckyColor: initialFilters.luckyColor || '',
    luckyStone: initialFilters.luckyStone || '',
  });

  const [availableFilters, setAvailableFilters] = useState({
    genders: [],
    origins: [],
    languages: [],
    categories: [],
    letters: [],
    luckyDays: [],
    luckyColors: [],
    luckyStones: [],
  });

  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    lucky: false,
  });

  // Fetch available filters from API
  useEffect(() => {
    const loadFilters = async () => {
      if (!religion) return;

      setLoading(true);
      try {
        const result = await fetchReligionFilters(religion);

        if (result.success && result.filters) {
          setAvailableFilters({
            genders: result.filters.genders || ['Male', 'Female'],
            origins: result.filters.origins || [],
            languages: result.filters.languages || [],
            categories: result.filters.categories || [],
            letters: result.filters.letters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
            luckyDays: result.filters.luckyDays || ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
            luckyColors: result.filters.luckyColors || ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Orange', 'Pink', 'White', 'Black'],
            luckyStones: result.filters.luckyStones || ['Diamond', 'Ruby', 'Emerald', 'Sapphire', 'Pearl', 'Topaz', 'Amethyst', 'Garnet'],
          });
        }
      } catch (error) {
        console.error('Error loading filters:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFilters();
  }, [religion]);

  // Notify parent of filter changes
  useEffect(() => {
    if (onFiltersChange) {
      const activeFilters = Object.entries(filters).reduce((acc, [key, value]) => {
        if (value) acc[key] = value;
        return acc;
      }, {});
      onFiltersChange(activeFilters);
    }
  }, [filters, onFiltersChange]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType] === value ? '' : value,
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      gender: '',
      origin: '',
      language: '',
      category: '',
      alphabet: '',
      luckyDay: '',
      luckyColor: '',
      luckyStone: '',
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const activeFilterCount = Object.values(filters).filter(v => v).length;

  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 mb-6">
        <div className="animate-pulse flex items-center gap-4">
          <div className="h-10 w-32 bg-gray-200 rounded"></div>
          <div className="h-10 flex-1 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden mb-6">
      {/* Filter Toggle Header */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="w-full flex items-center justify-between p-4 sm:p-6 hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Filter className="w-5 h-5 text-indigo-600" />
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-gray-900">Advanced Filters</h3>
            {activeFilterCount > 0 && (
              <p className="text-sm text-indigo-600">{activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active</p>
            )}
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-gray-400 transition-transform ${showFilters ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Filter Content */}
      {showFilters && (
        <div className="p-4 sm:p-6 border-t border-gray-200 space-y-6">

          {/* Clear All Filters */}
          {activeFilterCount > 0 && (
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">{activeFilterCount} active filter{activeFilterCount !== 1 ? 's' : ''}</p>
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <X size={16} />
                Clear All
              </button>
            </div>
          )}

          {/* Basic Filters Section */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('basic')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Search size={18} />
                Basic Filters
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.basic ? 'rotate-180' : ''}`}
              />
            </button>

            {expandedSections.basic && (
              <div className="space-y-4 pl-6">
                {/* Gender Filter */}
                {availableFilters.genders.length > 0 && (
                  <FilterGroup
                    label="Gender"
                    options={availableFilters.genders}
                    selected={filters.gender}
                    onChange={(value) => handleFilterChange('gender', value)}
                    colors="blue"
                  />
                )}

                {/* Origin Filter */}
                {availableFilters.origins.length > 0 && (
                  <FilterGroup
                    label="Origin"
                    options={availableFilters.origins}
                    selected={filters.origin}
                    onChange={(value) => handleFilterChange('origin', value)}
                    colors="green"
                  />
                )}

                {/* Language Filter */}
                {availableFilters.languages.length > 0 && (
                  <FilterGroup
                    label="Language"
                    options={availableFilters.languages}
                    selected={filters.language}
                    onChange={(value) => handleFilterChange('language', value)}
                    colors="purple"
                  />
                )}

                {/* Category Filter */}
                {availableFilters.categories.length > 0 && (
                  <FilterGroup
                    label="Category"
                    options={availableFilters.categories}
                    selected={filters.category}
                    onChange={(value) => handleFilterChange('category', value)}
                    colors="orange"
                  />
                )}

                {/* Alphabet Filter */}
                {availableFilters.letters.length > 0 && (
                  <AlphabetFilter
                    selected={filters.alphabet}
                    onChange={(value) => handleFilterChange('alphabet', value)}
                  />
                )}
              </div>
            )}
          </div>

          {/* Lucky Attributes Section */}
          <div className="space-y-4">
            <button
              onClick={() => toggleSection('lucky')}
              className="flex items-center justify-between w-full text-left"
            >
              <h4 className="font-semibold text-gray-900 flex items-center gap-2">
                <Sparkles size={18} className="text-yellow-500" />
                Lucky Attributes
              </h4>
              <ChevronDown
                className={`w-4 h-4 text-gray-400 transition-transform ${expandedSections.lucky ? 'rotate-180' : ''}`}
              />
            </button>

            {expandedSections.lucky && (
              <div className="space-y-4 pl-6">
                {/* Lucky Day Filter */}
                <FilterGroup
                  label="Lucky Day"
                  options={availableFilters.luckyDays}
                  selected={filters.luckyDay}
                  onChange={(value) => handleFilterChange('luckyDay', value)}
                  colors="indigo"
                  icon={<Calendar size={16} />}
                />

                {/* Lucky Color Filter */}
                <ColorFilter
                  selected={filters.luckyColor}
                  options={availableFilters.luckyColors}
                  onChange={(value) => handleFilterChange('luckyColor', value)}
                />

                {/* Lucky Stone Filter */}
                <FilterGroup
                  label="Lucky Stone"
                  options={availableFilters.luckyStones}
                  selected={filters.luckyStone}
                  onChange={(value) => handleFilterChange('luckyStone', value)}
                  colors="pink"
                  icon={<Gem size={16} />}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Filter Group Component
function FilterGroup({ label, options, selected, onChange, colors = 'gray', icon = null }) {
  const colorClasses = {
    blue: {
      bg: 'bg-blue-50 hover:bg-blue-100',
      border: 'border-blue-200',
      text: 'text-blue-700',
      selected: 'bg-blue-600 text-white border-blue-600',
    },
    green: {
      bg: 'bg-green-50 hover:bg-green-100',
      border: 'border-green-200',
      text: 'text-green-700',
      selected: 'bg-green-600 text-white border-green-600',
    },
    purple: {
      bg: 'bg-purple-50 hover:bg-purple-100',
      border: 'border-purple-200',
      text: 'text-purple-700',
      selected: 'bg-purple-600 text-white border-purple-600',
    },
    orange: {
      bg: 'bg-orange-50 hover:bg-orange-100',
      border: 'border-orange-200',
      text: 'text-orange-700',
      selected: 'bg-orange-600 text-white border-orange-600',
    },
    indigo: {
      bg: 'bg-indigo-50 hover:bg-indigo-100',
      border: 'border-indigo-200',
      text: 'text-indigo-700',
      selected: 'bg-indigo-600 text-white border-indigo-600',
    },
    pink: {
      bg: 'bg-pink-50 hover:bg-pink-100',
      border: 'border-pink-200',
      text: 'text-pink-700',
      selected: 'bg-pink-600 text-white border-pink-600',
    },
  };

  const classes = colorClasses[colors] || colorClasses.gray;

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        {icon}
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onChange(option)}
            className={`px-3 py-1.5 text-sm font-medium rounded-lg border-2 transition-all ${
              selected === option
                ? classes.selected
                : `${classes.bg} ${classes.border} ${classes.text}`
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}

// Alphabet Filter Component
function AlphabetFilter({ selected, onChange }) {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Starting Letter
      </label>
      <div className="grid grid-cols-7 sm:grid-cols-13 gap-2">
        {alphabet.map((letter) => (
          <button
            key={letter}
            onClick={() => onChange(letter)}
            className={`w-10 h-10 text-sm font-bold rounded-lg border-2 transition-all ${
              selected === letter
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'bg-gray-50 hover:bg-gray-100 border-gray-200 text-gray-700'
            }`}
          >
            {letter}
          </button>
        ))}
      </div>
    </div>
  );
}

// Color Filter Component
function ColorFilter({ selected, options, onChange }) {
  const colorMap = {
    Red: '#EF4444',
    Blue: '#3B82F6',
    Green: '#10B981',
    Yellow: '#F59E0B',
    Purple: '#A855F7',
    Orange: '#F97316',
    Pink: '#EC4899',
    White: '#FFFFFF',
    Black: '#1F2937',
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-2">
        <Palette size={16} />
        Lucky Color
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((color) => (
          <button
            key={color}
            onClick={() => onChange(color)}
            className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-lg border-2 transition-all ${
              selected === color
                ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                : 'border-gray-200 bg-gray-50 hover:bg-gray-100 text-gray-700'
            }`}
          >
            <div
              className="w-4 h-4 rounded-full border-2 border-gray-300"
              style={{ backgroundColor: colorMap[color] || color }}
            />
            {color}
          </button>
        ))}
      </div>
    </div>
  );
}
