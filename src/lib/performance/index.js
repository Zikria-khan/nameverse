function reportWebVitals(metric) {
  if (typeof window !== 'undefined') {
    console.log('[WebVitals]', metric.name, metric.value, metric.id, metric.delta);
  }
}

async function sendToAnalytics(metric) {
  if (process.env.NEXT_PUBLIC_ANALYTICS_ID) {
    const body = JSON.stringify(metric);
    if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', body);
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        body,
        keepalive: true,
      });
    }
  } else {
    console.info('[Analytics]', metric);
  }
}

export { reportWebVitals, sendToAnalytics };
