'use client';

import { useEffect, useRef, useState } from 'react';

'use client';

import { useEffect, useRef, useState } from 'react';

export default function AdBanner({ className = '', variant = 'inline' }) {
  const containerRef = useRef(null);
  const loaded = useRef(false);
  const [inView, setInView] = useState(false);

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

  useEffect(() => {
    if (!inView || loaded.current || !containerRef.current) return;
    loaded.current = true;

    if (!document.getElementById('revolthem-banner-script')) {
      const atOptions = {
        key: 'f0e3fe0e0c4dc5a8ddc1d06d28e8997e',
        format: 'iframe',
        height: 50,
        width: 320,
        params: {},
      };
      const atScript = document.createElement('script');
      atScript.id = 'revolthem-banner-script';
      atScript.type = 'text/javascript';
      atScript.async = true;
      atScript.setAttribute('data-cfasync', 'false');
      atScript.text = 'atOptions = ' + JSON.stringify(atOptions).replace(/"/g, "'") + ';';
      document.head.appendChild(atScript);

      const invoke = document.createElement('script');
      invoke.id = 'revolthem-banner-invoke';
      invoke.type = 'text/javascript';
      invoke.async = true;
      invoke.setAttribute('data-cfasync', 'false');
      invoke.src = 'https://revolthem.com/f0e3fe0e0c4dc5a8ddc1d06d28e8997e/invoke.js';
      document.head.appendChild(invoke);
    }

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.overflow = 'hidden';
    wrapper.style.minHeight = '50px';

    const adScript = document.createElement('script');
    adScript.async = true;
    adScript.setAttribute('data-cfasync', 'false');
    adScript.onerror = () => {
      console.warn('Revolthem ad script failed to load');
    };

    wrapper.appendChild(adScript);
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
        <div className="absolute -top-3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
        <div className="flex items-center justify-center gap-3 mb-2">
          <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-gray-300 font-medium">
            — Sponsored —
          </span>
        </div>
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

 * 

 * 
 * 




 */
export default function AdBanner({ className = '', variant = 'inline' }) {
  const containerRef = useRef(null);
  const loaded = useRef(false);
  const [inView, setInView] = useState(false);

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

    if (!document.getElementById('revolthem-banner-script')) {

      const adScript = document.createElement('script');



      

    }

    const wrapper = document.createElement('div');
    wrapper.style.width = '100%';
    wrapper.style.overflow = 'hidden';
    wrapper.style.minHeight = '50px';

    const adScript = document.createElement('script');

    adScript.async = true;
    adScript.setAttribute('data-cfasync', 'false');
    adScript.onerror = () => {
      console.warn('Revolthem ad script failed to load');
    };

    wrapper.appendChild(adScript);
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