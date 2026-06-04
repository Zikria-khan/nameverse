'use client';

import React, { useRef, useEffect } from 'react';
import useAdSenseSlot from './useAdSenseSlot';

const AdSlot = ({ 
  slotId, 
  className = '', 
  minHeight = '90px', 
  ariaLabel = 'Advertisement',
  adFormat = 'auto',
  eager = false,
}) => {
  const adRef = useRef(null);
  useAdSenseSlot(slotId, adRef);

  // If caller wants the ad to load immediately, trigger a push on mount
  useEffect(() => {
    if (!eager) return;
    if (typeof window === 'undefined' || !adRef.current) return;
    if (window.adsbygoogle && typeof window.adsbygoogle.push === 'function') {
      try {
        window.adsbygoogle.push({});
      } catch (e) {
        // eslint-disable-next-line no-console
        console.warn('adsbygoogle push failed (eager):', e);
      }
    }
  }, [eager, slotId]);

  return (
    <div 
      ref={adRef}
      className={`w-full my-6 flex justify-center ${className}`} 
      aria-label={ariaLabel}
      role="region"
    >
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight }}
        data-ad-client="ca-pub-1510675468129183"
        data-ad-slot={slotId}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
    </div>
  );
};

export default AdSlot;