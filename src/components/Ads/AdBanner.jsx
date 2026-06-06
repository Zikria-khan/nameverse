'use client';

import { useEffect, useRef } from 'react';

/**
 * Ad Banner Component
 * Loads ad script and renders the ad container.
 * Optimized for all screen sizes — responsive width, minimal height.
 */
export default function AdBanner({ className = '' }) {
  const containerRef = useRef(null);
  const scriptLoaded = useRef(false);

  useEffect(() => {
    if (scriptLoaded.current) return;
    if (!containerRef.current) return;

    // Load the ad script
    const script = document.createElement('script');
    script.src = 'https://pl29092372.effectivecpmnetwork.com/1606e7870f004d67136f85f2b1698cd3/invoke.js';
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    
    script.onload = () => {
      scriptLoaded.current = true;
    };

    containerRef.current.appendChild(script);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`w-full flex justify-center py-2 ${className}`}
      style={{ minHeight: 'auto' }}
    >
      <div
        id="container-1606e7870f004d67136f85f2b1698cd3"
        className="w-full max-w-[728px] mx-auto"
        style={{
          minHeight: '90px',
        }}
      />
    </div>
  );
}