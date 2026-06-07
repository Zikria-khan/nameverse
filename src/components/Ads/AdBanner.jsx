'use client';

import { useEffect, useRef } from 'react';

/**
 * Ad Banner Component — Clean, Responsive, Separated from Content
 *
 * This component is designed to be placed in a dedicated sponsored zone,
 * NOT inside content blocks. It provides a clear visual separation
 * with a subtle "— Sponsored —" label so users know it's ad content.
 */
export default function AdBanner({ className = '' }) {
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    if (!containerRef.current) return;

    const script = document.createElement('script');
    script.src = 'https://revolthem.com/1606e7870f004d67136f85f2b1698cd3/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.setAttribute('type', 'text/javascript');

    script.onload = () => {
      scriptLoaded.current = true;
    };

    script.onerror = () => {
      console.warn('Ad script failed to load');
    };

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
      role="complementary"
      aria-label="Sponsored content"
      className={`
        w-full
        mx-auto
        my-8 sm:my-10 md:my-12
        px-4 sm:px-6
        overflow-hidden
        select-none
        ${className}
      `}
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Decorative separator line above */}
        <div className="absolute -top-4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Sponsored label */}
        <div className="flex items-center justify-center gap-3 mb-3 sm:mb-4">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-300 font-medium">
            — Sponsored —
          </span>
        </div>

        {/* Ad container */}
        <div
          ref={containerRef}
          className="flex items-center justify-center w-full overflow-hidden rounded-xl bg-gray-50/40 border border-gray-100/50"
        >
          <div
            id="container-1606e7870f004d67136f85f2b1698cd3"
            className="flex flex-col items-center justify-center w-full min-h-[80px] sm:min-h-[90px] md:min-h-[100px] overflow-hidden"
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}