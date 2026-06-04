'use client';

import React, { useRef, useState, useEffect } from 'react';
import useAdSenseSlot from './useAdSenseSlot';

const AdSlotMultiplex = ({
  slotId,
  className = '',
  ariaLabel = 'Advertisement',
  eager = false,
}) => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  useAdSenseSlot(slotId, adRef);

  useEffect(() => {
    if (!adRef.current) return;

    const checkAdStatus = () => {
      const ins = adRef.current?.querySelector('ins.adsbygoogle');
      if (!ins) return false;

      const iframe = ins.querySelector('iframe');
      return !!(iframe && iframe.offsetHeight > 0 && ins.children.length > 0);
    };

    const interval = setInterval(() => {
      if (checkAdStatus()) {
        setAdLoaded(true);
      }
    }, 300);

    const observer = new MutationObserver(() => {
      if (checkAdStatus()) {
        setAdLoaded(true);
      }
    });

    observer.observe(adRef.current, { childList: true, subtree: true });

    return () => {
      clearInterval(interval);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!eager) return;
    if (typeof window === 'undefined' || !adRef.current) return;
    if (window.adsbygoogle && typeof window.adsbygoogle.push === 'function') {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        console.warn('adsbygoogle push failed (eager):', e);
      }
    }
  }, [eager, slotId]);

  if (!adLoaded) {
    return null;
  }

  return (
    <div
      ref={adRef}
      className={`w-full flex justify-center ${className}`}
      aria-label={ariaLabel}
      role="region"
    >
      <ins
        className="adsbygoogle"
        style={{
          display: 'block',
          width: '100%',
          maxWidth: '970px',
          minHeight: 'auto',
        }}
        data-ad-client="ca-pub-1510675468129183"
        data-ad-slot={slotId}
        data-ad-format="autorelaxed"
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSlotMultiplex;