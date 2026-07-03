'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ENTITY_RELATIONSHIPS, ENTITY_TYPES } from '@/lib/seo/topical-authority-architecture';
import { Network, ArrowRight } from 'lucide-react';

export default function EntityRelationshipPanel({ data, religion }) {
  // For a given entity key, find related entities with their details
  const entityConnections = useMemo(() => {
    const connections = [];
    const seen = new Set();

    // Map the name's religion to an entity key
    const religionEntityMap = {
      'islamic': 'islam',
      'christian': 'christianity',
      'hindu': 'hinduism',
    };

    const primaryEntityKey = religionEntityMap[religion] || null;
    
    if (primaryEntityKey && ENTITY_RELATIONSHIPS[primaryEntityKey]) {
      const entity = ENTITY_RELATIONSHIPS[primaryEntityKey];
      seen.add(primaryEntityKey);

      // Get related entities
      if (entity.relatedEntities) {
        entity.relatedEntities.forEach(relKey => {
          if (ENTITY_RELATIONSHIPS[relKey] && !seen.has(relKey)) {
            seen.add(relKey);
            connections.push({
              relationship: 'Related',
              entity: ENTITY_RELATIONSHIPS[relKey],
            });
          }
        });
      }
    }

    // Also check origin-based connections
    if (data.origin) {
      const originKey = data.origin.toLowerCase().replace(/\s+/g, '-');
      if (ENTITY_RELATIONSHIPS[originKey] && !seen.has(originKey)) {
        const entity = ENTITY_RELATIONSHIPS[originKey];
        seen.add(originKey);
        if (entity.relatedEntities) {
          entity.relatedEntities.forEach(relKey => {
            if (ENTITY_RELATIONSHIPS[relKey] && !seen.has(relKey)) {
              seen.add(relKey);
              connections.push({
                relationship: 'Related',
                entity: ENTITY_RELATIONSHIPS[relKey],
              });
            }
          });
        }
      }
    }

    return connections.slice(0, 10);
  }, [data, religion]);

  if (entityConnections.length === 0) return null;

  return (
    <section className="nv-card-solid">
      <div className="flex items-center gap-3 mb-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-100 text-cyan-700">
          <Network className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Entity Relationships</h2>
          <p className="text-sm text-slate-500">Semantic connections in the name knowledge graph</p>
        </div>
      </div>

      <div className="space-y-3">
        {entityConnections.map((conn, index) => (
          <div
            key={`${conn.entity.label}-${index}`}
            className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white p-3 transition hover:border-cyan-300 hover:shadow-sm"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-50 text-cyan-600">
              <Network className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-cyan-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-cyan-700">
                  {conn.relationship}
                </span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  {conn.entity.type}
                </span>
              </div>
              {conn.entity.url ? (
                <Link
                  href={conn.entity.url}
                  className="mt-1 block text-sm font-semibold text-slate-900 hover:text-cyan-700"
                >
                  {conn.entity.label}
                  <ArrowRight className="ml-1 inline h-3 w-3" />
                </Link>
              ) : (
                <span className="mt-1 block text-sm font-semibold text-slate-900">
                  {conn.entity.label}
                </span>
              )}
              <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">
                {conn.entity.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200">
        <Link
          href="/names-by-meaning"
          className="inline-flex items-center gap-2 text-sm font-medium text-cyan-600 hover:text-cyan-700"
        >
          <Network className="h-4 w-4" />
          View complete entity relationship map
        </Link>
      </div>
    </section>
  );
}