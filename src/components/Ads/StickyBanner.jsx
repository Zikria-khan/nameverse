'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function StickyBanner() {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  const loadAd = () => {
    const container = containerRef.current;
    if (!container) return;

    container.innerHTML = '';

    const optScript = document.createElement('script');
    optScript.text = `
      window.atOptions = {
        'key': 'fc169bf57d005797a92705dd75442526',
        'format': 'iframe',
        'height': 250,
        'width': 300,
        'params': {}
      };
    `;
    container.appendChild(optScript);

    const invScript = document.createElement('script');
    invScript.src = 'https://revolthem.com/fc169bf57d005797a92705dd75442526/invoke.js';
    invScript.async = true;
    invScript.defer = true;
    container.appendChild(invScript);
  };

  useEffect(() => {
    const dismissed = sessionStorage.getItem('sticky-dismissed');
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
    sessionStorage.setItem('sticky-dismissed', '1');
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 9999,
        backgroundColor: '#ffffff',
        boxShadow: '0 -2px 12px rgba(0,0,0,0.15)',
        padding: '6px',
        width: '312px',
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
        style={{ width: '300px', height: '250px', overflow: 'hidden' }}
      />
    </div>
  );
}
