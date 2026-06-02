'use client';

import { useEffect } from 'react';

const DEFAULT_ROOT_MARGIN = '400px';
const MAX_RETRY_COUNT = 12;
const RETRY_DELAY_MS = 250;

export default function useAdSenseSlot(slotId, targetRef) {
  useEffect(() => {
    if (typeof window === 'undefined' || !targetRef?.current) {
      return;
    }

    let observer = null;
    let retryCount = 0;
    let timeoutId = null;
    let destroyed = false;

    const canPush = () =>
      window.adsbygoogle && typeof window.adsbygoogle.push === 'function';

    const pushAd = () => {
      if (destroyed) return false;
      if (!canPush()) return false;

      try {
        window.adsbygoogle.push({});
        return true;
      } catch (error) {
        console.warn(`AdSense push failed for slot ${slotId}:`, error);
        return false;
      }
    };

    const scheduleRetry = () => {
      if (destroyed || retryCount >= MAX_RETRY_COUNT) return;
      retryCount += 1;

      timeoutId = window.setTimeout(() => {
        if (destroyed || !targetRef.current) return;
        const rect = targetRef.current.getBoundingClientRect();
        if (rect.width <= 0) {
          scheduleRetry();
          return;
        }

        if (!pushAd()) {
          scheduleRetry();
        }
      }, RETRY_DELAY_MS);
    };

    const attemptLoad = () => {
      if (destroyed || !targetRef.current) return;
      const rect = targetRef.current.getBoundingClientRect();
      if (rect.width <= 0) {
        scheduleRetry();
        return;
      }

      if (!pushAd()) {
        scheduleRetry();
      }
    };

    const disconnect = () => {
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
        timeoutId = null;
      }
    };

    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(
        (entries) => {
          if (destroyed) return;
          for (const entry of entries) {
            if (entry.isIntersecting || entry.intersectionRatio > 0) {
              attemptLoad();
              return;
            }
          }
        },
        { rootMargin: DEFAULT_ROOT_MARGIN }
      );

      observer.observe(targetRef.current);
    }

    attemptLoad();

    return () => {
      destroyed = true;
      disconnect();
    };
  }, [slotId, targetRef]);
}
