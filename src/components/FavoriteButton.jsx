"use client";

import { Heart } from 'lucide-react';
import { useFavorites } from '@/hooks/useFavorites';

/**
 * FavoriteButton component - Add/remove names from favorites
 */
export function FavoriteButton({ nameData, size = 'default', className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites();

  const isFav = isFavorite(nameData.slug || nameData.name, nameData.religion);

  const handleClick = (e) => {
    e.preventDefault(); // Prevent navigation if inside a Link
    e.stopPropagation(); // Prevent event bubbling
    toggleFavorite(nameData);
  };

  const iconSize = size === 'small' ? 'w-4 h-4' : size === 'large' ? 'w-6 h-6' : 'w-5 h-5';

  return (
    <button
      onClick={handleClick}
      className={`inline-flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-full ${
        isFav
          ? 'text-red-500 hover:text-red-600'
          : 'text-gray-400 hover:text-red-500'
      } ${className}`}
      aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
      title={isFav ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Heart
        className={`${iconSize} ${
          isFav ? 'fill-current' : ''
        } transition-all duration-200`}
      />
    </button>
  );
}

export default FavoriteButton;