'use client';

import { useEffect, useRef } from 'react';

/**
 * Ad Banner Component — Fully Responsive, CLS-Safe, Content-Embedded
 *
 * - Expands naturally within its content container
 * - No fixed heights that break on different viewports
 * - Responsive width: fills parent container
 * - Responsive padding & sizing based on viewport
 * - Clean separation with minimal visual footprint
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
      ref={containerRef}
      role="complementary"
      aria-label="Sponsored content"
      className={`
        w-full
        mx-auto
        my-6 sm:my-8 md:my-10
        px-0
        overflow-hidden
        ${className}
      `}
    >
      <div
        id="container-1606e7870f004d67136f85f2b1698cd3"
        className="
          flex
          flex-col
          items-center
          justify-center
          w-full
          min-h-[80px] sm:min-h-[90px] md:min-h-[100px]
          overflow-hidden
          rounded-lg
          bg-gray-50/30
        "
        style={{
          maxWidth: '100%',
        }}
      />
    </div>
  );
}