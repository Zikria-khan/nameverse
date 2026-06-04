'use client';

import { useEffect, useState, useRef } from 'react';

export function useAdDetection(targetRef, collapseOnEmpty = true) {
  const [adVisible, setAdVisible] = useState(!collapseOnEmpty);
  const observerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!targetRef?.current || !collapseOnEmpty) return;

    const checkAdFilled = () => {
      const ins = targetRef.current?.querySelector('ins.adsbygoogle');
      if (!ins) return false;

      const iframe = ins.querySelector('iframe');
      return !!(iframe && iframe.offsetHeight > 0);
    };

    const updateVisibility = () => {
      if (checkAdFilled()) {
        setAdVisible(true);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }
    };

    updateVisibility();

    intervalRef.current = setInterval(updateVisibility, 300);

    if ('ResizeObserver' in window) {
      observerRef.current = new ResizeObserver(() => {
        updateVisibility();
      });
      observerRef.current.observe(targetRef.current);
    }

    if ('MutationObserver' in window) {
      const mutationObserver = new MutationObserver(() => {
        updateVisibility();
      });
      mutationObserver.observe(targetRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [targetRef, collapseOnEmpty]);

  return adVisible;
}