"use client";

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'nameverse_favorites';

/**
 * Custom hook for managing favorite names with localStorage persistence
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(parsed);
        }
      }
    } catch (error) {
      console.warn('Failed to load favorites from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    } catch (error) {
      console.warn('Failed to save favorites to localStorage:', error);
    }
  }, [favorites]);

  // Add a name to favorites
  const addToFavorites = useCallback((nameData) => {
    setFavorites(prev => {
      // Check if already exists (by slug or name)
      const exists = prev.some(fav =>
        fav.slug === nameData.slug ||
        (fav.name === nameData.name && fav.religion === nameData.religion)
      );

      if (exists) return prev;

      return [...prev, {
        ...nameData,
        addedAt: new Date().toISOString()
      }];
    });
  }, []);

  // Remove a name from favorites
  const removeFromFavorites = useCallback((slugOrName, religion) => {
    setFavorites(prev =>
      prev.filter(fav =>
        !(fav.slug === slugOrName || fav.name === slugOrName) ||
        fav.religion !== religion
      )
    );
  }, []);

  // Check if a name is in favorites
  const isFavorite = useCallback((slugOrName, religion) => {
    return favorites.some(fav =>
      (fav.slug === slugOrName || fav.name === slugOrName) &&
      fav.religion === religion
    );
  }, [favorites]);

  // Toggle favorite status
  const toggleFavorite = useCallback((nameData) => {
    const isFav = isFavorite(nameData.slug || nameData.name, nameData.religion);
    if (isFav) {
      removeFromFavorites(nameData.slug || nameData.name, nameData.religion);
    } else {
      addToFavorites(nameData);
    }
  }, [isFavorite, addToFavorites, removeFromFavorites]);

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
    clearFavorites,
    favoritesCount: favorites.length
  };
}