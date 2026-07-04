'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * NativeBanner — Renders the native ad container div
 *
 * This component renders the container div that the globally-loaded
 * Revolthem invoke.js script targets. The script is loaded once
 * by NativeAdScript in the layout, and this component renders
 * the container div at each placement location.
 *
 * The container div uses the exact ID from the ad network:
 *   container-1606e7870f004d67136f85f2b1698cd3
 */

const NATIVE_AD_ID = '1606e7870f004d67136f85f2b1698cd3';
const CONTAINER_ID = 'container-' + NATIVE_AD_ID;

// Check if current page should avoid ads
function isAdFreePage() {
  if (typeof window === 'undefined') return false;
  var pathname = window.location.pathname.toLowerCase();
  var adFreePaths = ['/privacy', '/terms', '/login', '/signup', '/dashboard', '/admin'];
  return adFreePaths.some(function (path) { return pathname.startsWith(path); });
}

/**
 * @param {Object} props
 * @param {string} [props.className]
 * @param {string} [props.minHeight]
 */
export default function NativeBanner(props) {
  var className = props.className || '';
  var minHeight = props.minHeight || '90px';

  var containerRef = useRef(null);
  var inViewState = useState(false);
  var inView = inViewState[0];
  var setInView = inViewState[1];

  // Skip on ad-free pages
  var canRenderState = useState(false);
  var canRender = canRenderState[0];
  var setCanRender = canRenderState[1];

  useEffect(function () {
    setCanRender(!isAdFreePage());
  }, []);

  // IntersectionObserver for lazy loading
  useEffect(function () {
    if (!canRender) return;

    var el = containerRef.current;
    if (!el) return;

    var observer = new IntersectionObserver(
      function (entries) {
        if (entries[0].isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '200px 0px',
        threshold: 0.01,
      }
    );

    observer.observe(el);
    return function () { observer.disconnect(); };
  }, [canRender]);

  // Don't render anything on ad-free pages
  if (!canRender) return null;

  return (
    <div
      ref={containerRef}
      className={
        'w-full mx-auto px-2 sm:px-4 overflow-hidden select-none ' + className
      }
      style={{ minHeight: inView ? minHeight : '0px' }}
    >
      {inView && (
        <div
          id={CONTAINER_ID}
          style={{
            width: '100%',
            maxWidth: '100%',
            overflow: 'hidden',
            marginTop: '16px',
            marginBottom: '24px',
          }}
        />
      )}
    </div>
  );
}