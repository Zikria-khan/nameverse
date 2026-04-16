/**
 * Performance Initialization Component
 * Sets up performance monitoring and optimization features
 */

"use client";

import { useEffect } from "react";

export default function PerformanceInit() {
  useEffect(() => {
    // Performance monitoring
    if (process.env.NODE_ENV === 'development') {
      // Log performance metrics in development
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log('Performance Entry:', entry.name, entry.entryType, entry.startTime, entry.duration);
        }
      });
      
      observer.observe({ entryTypes: ['navigation', 'paint', 'largest-contentful-paint', 'first-input'] });
      
      return () => observer.disconnect();
    }
  }, []);

  return null;
}