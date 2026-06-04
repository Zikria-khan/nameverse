'use client';

import React, { useRef, useState, useEffect } from 'react';
import useAdSenseSlot from './useAdSenseSlot';

const AdSlotResponsive = ({
  slotId,
  className = '',
  minHeight = '90px',
  maxHeight = '500px',
  ariaLabel = 'Advertisement',
  adFormat = 'auto',
  responsive = true,
  eager = false,
  collapseOnEmpty = true,
}) => {
  const adRef = useRef(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adHeight, setAdHeight] = useState(null);
  useAdSenseSlot(slotId, adRef);

  useEffect(() => {
    if (!collapseOnEmpty || !adRef.current) return;

    const checkAdStatus = () => {
      const ins = adRef.current?.querySelector('ins.adsbygoogle');
      if (!ins) return;

      const iframe = ins.querySelector('iframe');
      const hasContent = ins.children.length > 0 || (iframe && iframe.offsetHeight > 0);

      if (hasContent) {
        setAdLoaded(true);
        const currentHeight = ins.offsetHeight;
        if (currentHeight > 0) {
          setAdHeight(currentHeight);
        }
      }
    };

    checkAdStatus();
    const interval = setInterval(checkAdStatus, 500);

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target.querySelector('ins.adsbygoogle iframe')) {
          setAdLoaded(true);
          setAdHeight(entry.contentRect.height);
        }
      }
    });

    if (adRef.current) {
      resizeObserver.observe(adRef.current);
    }

    return () => {
      clearInterval(interval);
      resizeObserver.disconnect();
    };
  }, [collapseOnEmpty]);

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

  if (!collapseOnEmpty || adLoaded) {
    return (
      <div
        ref={adRef}
        className={`w-full my-6 flex justify-center ${className}`}
        aria-label={ariaLabel}
        role="region"
        style={{
          minHeight: collapseOnEmpty ? (adLoaded ? adHeight || minHeight : 0) : minHeight,
          maxHeight: collapseOnEmpty && adLoaded ? maxHeight : undefined,
        }}
      >
        <ins
          className="adsbygoogle"
          style={{
            display: 'block',
            width: '100%',
            minHeight: collapseOnEmpty && adLoaded ? 'auto' : minHeight,
          }}
          data-ad-client="ca-pub-1510675468129183"
          data-ad-slot={slotId}
          data-ad-format={adFormat}
          data-full-width-responsive={responsive ? 'true' : 'false'}
        />
      </div>
    );
  }

  return (
    <div ref={adRef} className={`w-full my-6 flex justify-center ${className}`} aria-label={ariaLabel} role="region">
      <ins
        className="adsbygoogle"
        style={{ display: 'block', width: '100%', minHeight }}
        data-ad-client="ca-pub-1510675468129183"
        data-ad-slot={slotId}
        data-ad-format={adFormat}
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSlotResponsive;