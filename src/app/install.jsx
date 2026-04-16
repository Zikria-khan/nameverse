"use client";
import { useEffect, useState } from "react";

export default function AppInstallPopup() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPopup(true); // show popup
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
    };
  }, []);

  const installApp = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;
    console.log("User choice:", choice);
    setShowPopup(false);
  };

  if (!showPopup) return null;

  return (
    <div
      className="fixed bottom-4 right-4 bg-white shadow-xl rounded-xl p-4 w-72 border border-gray-200 z-50 animate-slide-up"
    >
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-semibold">Install Nameverse</h3>
        <button
          onClick={() => setShowPopup(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <p className="text-sm text-gray-600 mt-1">
        Install Nameverse for fast access like a real app.
      </p>

      <button
        onClick={installApp}
        className="mt-3 w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
      >
        Install App
      </button>
    </div>
  );
}
