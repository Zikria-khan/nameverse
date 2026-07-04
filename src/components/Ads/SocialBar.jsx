'use client';

import { useEffect } from 'react';

/**
 * SocialBar — Social Sharing Bar
 *
 * Loads the Revolthem social bar script globally.
 * This is the ONLY remaining social feature from the old ad system.
 * All popunder and iframe banner code has been removed.
 */
export default function SocialBar() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // ✅ Social bar — keep as-is, do not modify
    if (!document.getElementById('revolthem-social-bar')) {
      const script = document.createElement('script');
      script.id = 'revolthem-social-bar';
      script.async = true;
      script.setAttribute('data-cfasync', 'false');
      script.src = 'https://revolthem.com/1b/54/37/1b543736c10a38ea4ca3f6f7bc8a7a9b.js';
      document.body.appendChild(script);
    }
  }, []);

  return null;
}