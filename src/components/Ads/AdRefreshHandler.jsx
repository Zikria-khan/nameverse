'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function AdRefreshHandler() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    if (window.adsbygoogle && Array.isArray(window.adsbygoogle)) {
      try {
        window.adsbygoogle.push({});
      } catch (error) {
        console.warn('Ad refresh failed:', error);
      }
    }
  }, [pathname]);

  return null;
}