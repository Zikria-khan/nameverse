'use client';

import { useEffect, useRef, useState } from 'react';

export default function StickyBottomAd() {
  const containerRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    const checkAdStatus = () => {
      const ins = containerRef.current?.querySelector('ins.adsbygoogle');
      if (!ins) return false;
      const iframe = ins.querySelector('iframe');
      if (iframe && iframe.offsetHeight > 0) {
        setAdLoaded(true);
        return true;
      }
      return false;
    };

    const interval = setInterval(checkAdStatus, 500);

    if (typeof window !== 'undefined' && window.adsbygoogle && typeof window.adsbygoogle.push === 'function') {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.warn('adsbygoogle push failed', e);
      }
    }

    return () => clearInterval(interval);
  }, []);

  if (!adLoaded) return null;

  return (
    <div ref={containerRef} className="flex justify-center w-full">
      <ins
        className="adsbygoogle"
        style={{ display: 'inline-block', width: '728px', height: '59px', maxWidth: '100%' }}
        data-ad-client="ca-pub-1510675468129183"
        data-ad-slot="9605048966"
      />
    </div>
  );
}
