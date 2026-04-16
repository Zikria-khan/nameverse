/**
 * useStoreSync Hook
 * Synchronize store state with server/API
 */

import { useEffect, useRef } from 'react';
import { createLogger } from '@/lib/logger';

const logger = createLogger('useStoreSync');

/**
 * Hook to sync store with server
 * @param {Object} store - Zustand store
 * @param {Function} syncFn - Function to sync with server
 * @param {Object} options - Options { interval, onSync, onError }
 */
export function useStoreSync(store, syncFn, options = {}) {
  const { interval = 60000, onSync, onError } = options;
  const intervalRef = useRef(null);
  const isSyncingRef = useRef(false);

  const sync = async () => {
    if (isSyncingRef.current) return;
    
    isSyncingRef.current = true;
    try {
      const result = await syncFn();
      if (onSync) onSync(result);
      logger.debug('Store synced successfully');
    } catch (error) {
      logger.error('Store sync failed', error);
      if (onError) onError(error);
    } finally {
      isSyncingRef.current = false;
    }
  };

  useEffect(() => {
    // Initial sync
    sync();

    // Set up interval sync
    if (interval > 0) {
      intervalRef.current = setInterval(sync, interval);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]);

  return { sync, isSyncing: isSyncingRef.current };
}
