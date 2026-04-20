// components/SWRegister.jsx
"use client";
import { useEffect } from "react";

export default function SWRegister() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("SW registered:", reg);
          if (reg.waiting) {
            reg.waiting.postMessage('SKIP_WAITING');
          }
          reg.addEventListener('updatefound', () => {
            const newWorker = reg.installing;
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  newWorker.postMessage('SKIP_WAITING');
                }
              });
            }
          });
        })
        .catch((err) => console.error("SW registration failed:", err));

      navigator.serviceWorker.ready.then((reg) => {
        if (reg) {
          reg.update();
        }
      });
    }
  }, []);

  return null;
}
