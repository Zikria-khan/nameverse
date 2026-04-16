'use client';

import { useState, useEffect } from 'react';
import LoadingAnimation from './LoadingAnimation';

export default function LoadingWrapper({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const [shouldShowAnimation, setShouldShowAnimation] = useState(false);

  useEffect(() => {
    // Check if it's the first visit or PWA launch
    const hasSeenAnimation = sessionStorage.getItem('hasSeenAnimation');
    const isPWA = window.matchMedia('(display-mode: standalone)').matches ||
                  window.navigator.standalone === true;

    // Show animation if: first visit in session OR launching as PWA
    if (!hasSeenAnimation || isPWA) {
      setShouldShowAnimation(true);
      sessionStorage.setItem('hasSeenAnimation', 'true');
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleAnimationComplete = () => {
    setIsLoading(false);
  };

  if (isLoading && shouldShowAnimation) {
    return <LoadingAnimation onComplete={handleAnimationComplete} />;
  }

  return <>{children}</>;
}
