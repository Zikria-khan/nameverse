'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { TOPIC_CLUSTERS } from '@/lib/seo/topical-authority-architecture';
import { ChevronRight, ArrowLeft, ArrowRight, LayoutDashboard } from 'lucide-react';

function getClusterBreadcrumbs(clusterId) {
  const breadcrumbs = [];
  let current = TOPIC_CLUSTERS[clusterId];
  
  while (current) {
    breadcrumbs.unshift(current);
    current = current.parent ? TOPIC_CLUSTERS[current.parent] : null;
  }
  
  return breadcrumbs;
}

function getSiblingClusters(clusterId) {
  const cluster = TOPIC_CLUSTERS[clusterId];
  if (!cluster || !cluster.parent) return [];
  
  const parent = TOPIC_CLUSTERS[cluster.parent];
  if (!parent) return [];
  
  return parent.children
    .filter(id => id !== clusterId)
    .map(id => TOPIC_CLUSTERS[id])
    .filter(Boolean);
}

function getChildClusters(clusterId) {
  const cluster = TOPIC_CLUSTERS[clusterId];
  if (!cluster) return [];
  
  return cluster.children
    .map(id => TOPIC_CLUSTERS[id])
    .filter(Boolean);
}

function getParentCluster(clusterId) {
  const cluster = TOPIC_CLUSTERS[clusterId];
  if (!cluster || !cluster.parent) return null;
  return TOPIC_CLUSTERS[cluster.parent] || null;
}

export default function TopicClusterNav({ clusterId, currentName, currentReligion }) {
  const parent = useMemo(() => getParentCluster(clusterId), [clusterId]);
  const siblings = useMemo(() => getSiblingClusters(clusterId), [clusterId]);
  const children = useMemo(() => getChildClusters(clusterId), [clusterId]);
  const breadcrumbs = useMemo(() => getClusterBreadcrumbs(clusterId), [clusterId]);

  // For name pages, show enhanced context
  const isNamePage = Boolean(currentName);

  if (isNamePage) {
    return (
      <div className="space-y-4">
        {/* Parent topic link */}
        {parent && (
          <Link
            href={parent.url || '#'}
            className="group inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
          >
            <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
            Back to {parent.title}
          </Link>
        )}

        {/* Topic cluster breadcrumbs */}
        <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <LayoutDashboard className="h-4 w-4" />
          {breadcrumbs.map((cluster, index) => (
            <span key={cluster.id} className="flex items-center gap-2">
              {index > 0 && <ChevronRight className="h-3 w-3" />}
              {index < breadcrumbs.length - 1 ? (
                <Link href={cluster.url || '#'} className="font-medium text-slate-700 hover:text-indigo-600">
                  {cluster.title}
                </Link>
              ) : (
                <span className="font-medium text-slate-900">{cluster.title}</span>
              )}
            </span>
          ))}
          {currentName && (
            <>
              <ChevronRight className="h-3 w-3" />
              <span className="font-semibold text-indigo-600">{currentName}</span>
            </>
          )}
        </div>

        {/* Sibling clusters */}
        {siblings.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Explore Related Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {siblings.slice(0, 8).map((sibling) => (
                <Link
                  key={sibling.id}
                  href={sibling.url || '#'}
                  className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-indigo-50 hover:text-indigo-700 hover:ring-indigo-300"
                >
                  {sibling.title}
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Child sub-topics */}
        {children.length > 0 && (
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
              Sub-Topics
            </h3>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {children.slice(0, 6).map((child) => (
                <Link
                  key={child.id}
                  href={child.url || '#'}
                  className="rounded-lg bg-white p-2.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-indigo-50 hover:text-indigo-700 hover:ring-indigo-300"
                >
                  {child.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // For hub/collection pages
  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <div className="flex flex-wrap items-center gap-2 text-sm text-slate-500">
        <LayoutDashboard className="h-4 w-4" />
        {breadcrumbs.map((cluster, index) => (
          <span key={cluster.id} className="flex items-center gap-2">
            {index > 0 && <ChevronRight className="h-3 w-3" />}
            {index < breadcrumbs.length - 1 ? (
              <Link href={cluster.url || '#'} className="font-medium text-slate-700 hover:text-indigo-600">
                {cluster.title}
              </Link>
            ) : (
              <span className="font-bold text-slate-900">{cluster.title}</span>
            )}
          </span>
        ))}
      </div>

      {/* Parent hub link */}
      {parent && (
        <Link
          href={parent.url || '#'}
          className="group inline-flex items-center gap-2 text-sm font-medium text-indigo-600 hover:text-indigo-700"
        >
          <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-1" />
          Back to {parent.title}
        </Link>
      )}

      {/* Child clusters grid */}
      {children.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {children.map((child) => (
            <Link
              key={child.id}
              href={child.url || '#'}
              className="group rounded-xl border border-slate-200 bg-white p-4 transition hover:border-indigo-300 hover:shadow-md"
            >
              <h3 className="text-sm font-bold text-slate-900 group-hover:text-indigo-700">
                {child.title}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-500 line-clamp-2">
                {child.description}
              </p>
              <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-indigo-600 opacity-0 transition group-hover:opacity-100">
                Explore <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Sibling clusters */}
      {siblings.length > 0 && (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
            Related Topics
          </h3>
          <div className="flex flex-wrap gap-2">
            {siblings.slice(0, 10).map((sibling) => (
              <Link
                key={sibling.id}
                href={sibling.url || '#'}
                className="rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition hover:bg-indigo-50 hover:text-indigo-700 hover:ring-indigo-300"
              >
                {sibling.title}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}