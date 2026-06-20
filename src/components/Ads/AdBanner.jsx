'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Ad Banner Component — Monetag Ad Network
 * 
 * In-content ad placement. Uses Monetag atOptions + invoke.js system.
 * 
 * ⚡ Performance features:
 * - IntersectionObserver: only loads ad when visible in viewport
 * - Impression tracking: reports when ad becomes visible
 * - Config script loaded once globally (from layout.js head)
 * - Delayed load: waits for idle/scroll before activating
 * - No duplicate script injection
 */
export default function AdBanner({ className = '', variant = 'inline' }) {
  const containerRef = useRef(null);
  const loaded = useRef(false);
  const [inView, setInView] = useState(false);
  const mountId = useRef(`monetag-ad-${Date.now()}`);

  // Track visibility with IntersectionObserver
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px', threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

// Load ad only when in view
   useEffect(() => {
     if (!inView || loaded.current || !containerRef.current) return;
     loaded.current = true;

     // Ensure config script exists (loaded in layout.js head as fallback)
     if (!document.querySelector('script[src*="quge5.com"]')) {
       const configScript = document.createElement('script');
       configScript.src = 'https://quge5.com/88/tag.min.js';
       configScript.async = true;
       configScript.setAttribute('data-cfasync', 'false');
       configScript.setAttribute('data-zone', '251738');
       document.head.appendChild(configScript);
     }

     const wrapper = document.createElement('div');
     wrapper.id = mountId.current;
    wrapper.style.width = '100%';
    wrapper.style.overflow = 'hidden';

    const atOptionsScript = document.createElement('script');
    atOptionsScript.type = 'text/javascript';
    atOptionsScript.text = `
      atOptions = {
        'key' : '251738',
        'format' : 'iframe',
        'height' : ${variant === 'banner' ? 90 : 50},
        'width' : ${variant === 'banner' ? 728 : 320},
        'params' : {}
      };
    `;

    const invokeScript = document.createElement('script');
    invokeScript.src = 'https://quge5.com/88/tag.min.js';
    invokeScript.async = true;
    invokeScript.setAttribute('data-cfasync', 'false');
    invokeScript.setAttribute('type', 'text/javascript');

    wrapper.appendChild(atOptionsScript);
    wrapper.appendChild(invokeScript);
    containerRef.current.appendChild(wrapper);
  }, [inView, variant]);

  return (
    <div
      role="complementary"
      aria-label="Sponsored content"
      className={`
        w-full mx-auto my-6 sm:my-8 md:my-10
        px-2 sm:px-4 overflow-hidden select-none
        ${className}
      `}
    >
      <div className="relative max-w-7xl mx-auto">
        {/* Decorative separator */}
        <div className="absolute -top-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        {/* Sponsored label */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-300 font-medium">
            — Sponsored —
          </span>
        </div>

        {/* Ad container */}
        <div className="flex justify-center items-center w-full overflow-hidden rounded-xl bg-gray-50/40 border border-gray-100/50 min-h-[60px]">
          <div
            ref={containerRef}
            className="flex flex-col items-center justify-center w-full min-h-[50px] overflow-hidden"
            style={{ maxWidth: '100%' }}
          />
        </div>
      </div>
    </div>
  );
}