'use client';

export default function AdSlot({ slotId, className = '', minHeight = '90px', 'aria-label': ariaLabel }) {
  return (
    <div
      className={className}
      style={{ minHeight }}
      aria-label={ariaLabel}
    >
      {/* Ad placeholder — replace with actual ad network integration */}
      <ins
        className="adsbygoogle"
        style={{ display: 'block', textAlign: 'center', minHeight }}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}