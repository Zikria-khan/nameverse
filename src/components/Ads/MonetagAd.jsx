'use client';

export default function MonetagAd() {
  // Monetag is intentionally disabled. Only Google AdSense remains.
  return null;
}

      <div
        id="monetag-container"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '1px',
          height: '1px',
          overflow: 'hidden',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: -1,
        }}
        aria-hidden="true"
      />
    </>
  );
}