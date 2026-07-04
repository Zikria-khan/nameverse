'use client';

import { useEffect } from 'react';

/**
 * NativeAdScript — Loads the Revolthem invoke.js script once globally
 *
 * This script tag is loaded once at the layout level and enables
 * the native ads to render inside any container-* divs on the page.
 *
 * Code:
 *   <script async="async" data-cfasync="false"
 *     src="https://revolthem.com/1606e7870f004d67136f85f2b1698cd3/invoke.js">
 *   </script>
 */
export default function NativeAdScript() {
  useEffect(function () {
    if (typeof window === 'undefined') return;

    var scriptId = 'revolthem-native-invoke';

    // Only load once
    if (document.getElementById(scriptId)) return;

    var script = document.createElement('script');
    script.id = scriptId;
    script.async = true;
    script.setAttribute('data-cfasync', 'false');
    script.src = 'https://revolthem.com/1606e7870f004d67136f85f2b1698cd3/invoke.js';
    document.head.appendChild(script);
  }, []);

  return null;
}