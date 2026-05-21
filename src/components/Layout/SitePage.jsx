import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function SitePage({
  title,
  subtitle,
  breadcrumbs,
  actions,
  className,
  containerClassName,
  headerClassName,
  children,
}) {
  return (
    <main className={cn('nv-page min-h-screen', className)}>
      <div className={cn('nv-container nv-section', containerClassName)}>
        {Array.isArray(breadcrumbs) && breadcrumbs.length > 0 ? (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
              {breadcrumbs.map((item, idx) => {
                const isLast = idx === breadcrumbs.length - 1;
                return (
                  <li key={`${item.href || item.label}-${idx}`} className="flex items-center gap-2">
                    {item.href && !isLast ? (
                      <Link
                        href={item.href}
                        className="font-medium text-slate-600 transition-colors hover:text-slate-900"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <span className={cn('font-medium', isLast ? 'text-slate-900' : 'text-slate-600')}>
                        {item.label}
                      </span>
                    )}
                    {isLast ? null : <span className="text-slate-300">/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        ) : null}

        {title || subtitle || actions ? (
          <header className={cn('mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between', headerClassName)}>
            <div className="max-w-3xl">
              {title ? <h1 className="nv-h1">{title}</h1> : null}
              {subtitle ? <p className="nv-lead mt-3">{subtitle}</p> : null}
            </div>
            {actions ? <div className="shrink-0">{actions}</div> : null}
          </header>
        ) : null}

        {children}
      </div>
    </main>
  );
}

