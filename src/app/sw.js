// components/SWRegister.jsx
"use client";
import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.getRegistrations()
        .then((registrations) => {
          registrations.forEach((registration) => {
            registration.unregister().catch((error) => {
              console.error('Failed to unregister service worker:', error);
            });
          });
        })
        .catch((error) => {
          console.error('Error fetching service worker registrations:', error);
        });
    }

    if (typeof window !== 'undefined' && 'caches' in window) {
      caches.keys()
        .then((cacheNames) => Promise.all(cacheNames.map((cacheName) => caches.delete(cacheName))))
        .catch((error) => {
          console.error('Failed to clear caches:', error);
        });
    }
  }, []);

  return null;
}
