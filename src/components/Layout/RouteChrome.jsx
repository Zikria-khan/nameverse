'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

export default function RouteChrome({ children, className }) {
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (isHome) return children;

  return (
    <div className={cn('nv-route-chrome', className)}>
      <div aria-hidden="true" className="nv-route-ornament" />
      <div className="nv-route-content">{children}</div>
    </div>
  );
}

