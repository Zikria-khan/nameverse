'use client';

import React, { useEffect } from 'react';

const AdUnit = ({ slotId = '9605048966', className = '', minHeight = '90px', ariaLabel = 'Advertisement' }) => {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.warn('AdSense init failed:', error);
    }
  }, [slotId]);

  return (
    <div className={`w-full my-6 flex justify-center ${className}`} aria-label={ariaLabel} role="region">
      <div className="w-full max-w-4xl" style={{ minHeight, width: '100%' }}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-1510675468129183"
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};

export default AdUnit;
