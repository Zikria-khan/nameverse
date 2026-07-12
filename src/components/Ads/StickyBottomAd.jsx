'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function StickyBottomAd() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const loadAd = () => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const script = document.createElement('script');
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://revolthem.com/1606e7870f004d67136f85f2b1698cd3/invoke.js';
    container.appendChild(script);
  };

  useEffect(() => {
    const dismissed = sessionStorage.getItem('sticky-bottom-dismissed');
    if (dismissed) return;

    const timer = setTimeout(() => {
      setVisible(true);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (visible) loadAd();
  }, [visible]);

  useEffect(() => {
    if (visible) loadAd();
  }, [pathname]);

  useEffect(() => {
    if (!visible) return;

    const interval = setInterval(() => {
      loadAd();
    }, 60000);

    return () => clearInterval(interval);
  }, [visible, pathname]);

  const handleClose = () => {
    setVisible(false);
    sessionStorage.setItem('sticky-bottom-dismissed', '1');
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: '#ffffff',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.15)',
        padding: '6px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <button
        onClick={handleClose}
        aria-label="Close ad"
        style={{
          position: 'absolute',
          top: '-14px',
          right: '2px',
          background: '#222',
          color: '#fff',
          border: 'none',
          borderRadius: '50%',
          width: '22px',
          height: '22px',
          fontSize: '11px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 10000,
        }}
      >
        ✕
      </button>

      <div
        ref={containerRef}
        id="container-sticky-bottom"
        style={{ width: '300px', height: '250px', overflow: 'hidden' }}
      />
    </div>
  );
}