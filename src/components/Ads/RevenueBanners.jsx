'use client';

import Script from 'next/script';

/**
 * RevenueBanners — Injects both revenue banner scripts in the center of page content.
 * Place this component inside the page content area to split content with banners.
 */
export default function RevenueBanners() {
  return (
    <>
      <Script
        id="revenue-banner-1"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(vogq){ var d = document, s = d.createElement('script'), l = d.scripts[d.scripts.length - 1]; s.settings = vogq || {}; s.src = "\\/\\/quarrelsomebitter.com\\/b\\/XoVFs-d.GSlE0wYoWvcw\\/Uelm\\/9JugZ-Uil\\/kGP\\/TUcvynMrD\\/k\\/0UMqzTM\\/tnN\\/z\\/I\\/wyOETUQszcNJwX"; s.async = true; s.referrerPolicy = 'no-referrer-when-downgrade'; l.parentNode.insertBefore(s, l); })({})`
        }}
      />
      <Script
        id="revenue-banner-2"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(zvycmy){ var d = document, s = d.createElement('script'), l = d.scripts[d.scripts.length - 1]; s.settings = zvycmy || {}; s.src = "\\/\\/quarrelsomebitter.com\\/bAXwVds.dRGSlr0bYXWnck\\/Ze\\/mO9\\/uuZpURlCkmPsTMcCy-MkDZkw0\\/NMDwknt-NWzfIvw\\/OpTCQv1hMmwD"; s.async = true; s.referrerPolicy = 'no-referrer-when-downgrade'; l.parentNode.insertBefore(s, l); })({})`
        }}
      />
    </>
  );
}