'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';

/**
 * AdUnit Component
 * 
 * Features:
 * ✅ CLS-safe: Reserved min-height prevents layout shifts during loading.
 * ✅ Async Loading: Uses next/script for non-blocking execution.
 * ✅ Error Handling: Gracefully handles script load failures.
 * ✅ Placeholder: Displays a subtle skeleton/placeholder with smooth transition.
 * ✅ Mobile Responsive: Adjusts sizing based on container width.
 * ✅ Lazy-load support: next/script 'lazyOnload' option can be enabled.
 */
const AdUnit = ({ adId = '1606e7870f004d67136f85f2b1698cd3', className = "" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  // ID for the ad container
  const containerId = `container-${adId}`;

  return (
    <div className={`w-full my-6 md:my-10 flex flex-col items-center px-4 sm:px-0 ${className}`}>
      <div className="w-full max-w-4xl mx-auto">
        {/* Label for transparency - subtle and professional */}
        <div className="flex items-center justify-center gap-4 mb-3">
          <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
          <span className="text-[10px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] font-semibold whitespace-nowrap">
            Advertisement
          </span>
          <div className="h-px bg-gray-200 dark:bg-gray-800 flex-1" />
        </div>

        <div 
          className="relative w-full overflow-hidden rounded-2xl transition-all duration-700 ease-in-out bg-white dark:bg-gray-900 shadow-sm border border-gray-100 dark:border-gray-800"
          style={{ 
            // CLS protection: reserve height but allow it to be responsive
            minHeight: isLoaded ? 'auto' : '100px',
            maxHeight: isLoaded ? 'none' : '280px',
          }}
        >
          {/* Ad Container for the external script to inject into */}
          <div 
            id={containerId}
            className={`w-full min-h-[50px] flex justify-center items-center transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          />

          {/* Elegant Placeholder / Skeleton */}
          {!isLoaded && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 animate-pulse">
              <div className="w-16 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mb-2" />
              <div className="w-24 h-1 bg-gray-100 dark:bg-gray-800 rounded-full" />
            </div>
          )}

          {/* Error State - Subtle */}
          {hasError && (
            <div className="h-[100px] flex items-center justify-center text-gray-300 dark:text-gray-600 text-[10px] italic">
              Support NameVerse by allowing ads
            </div>
          )}
        </div>
      </div>

      {/* Optimized Script Loading */}
      <Script
        src={`https://pl29092372.profitablecpmratenetwork.com/${adId}/invoke.js`}
        strategy="lazyOnload" // Lower priority for better UX/Content priority
        onLoad={() => {
          // Add a slight delay for the transition effect
          setTimeout(() => setIsLoaded(true), 800);
        }}
        onError={() => {
          setHasError(true);
          setIsLoaded(false);
        }}
      />
    </div>
  );
};

export default AdUnit;
