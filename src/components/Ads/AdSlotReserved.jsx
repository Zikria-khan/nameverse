'use client';

import React, { useRef, useEffect } from 'react';
import useAdSenseSlot from './useAdSenseSlot';

const AdSlotReserved = ({
  slotId,
  className = '',
  minHeight = '90px',
  ariaLabel = 'Advertisement',
  adFormat = 'auto',
  responsive = true,
}) => {
  const adRef = useRef(null);
  useAdSenseSlot(slotId, adRef);

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
        data-full-width-responsive={responsive ? 'true' : 'false'}
      />
    </div>
  );
};

export default AdSlotReserved;