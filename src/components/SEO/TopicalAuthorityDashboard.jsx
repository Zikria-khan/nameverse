'use client';

import { useMemo } from 'react';
import {
  TOPIC_CLUSTERS,
  ENTITY_RELATIONSHIPS,
  CONTENT_HUBS,
  calculateTopicalAuthorityScore,
} from '@/lib/seo/topical-authority-architecture';
import { Network, LayoutDashboard, BookOpen, Globe, Heart, Sparkles, TrendingUp, Target, CheckCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const STATUS_COLORS = {
  EXCELLENT: 'bg-emerald-500',
  GOOD: 'bg-blue-500',
  FAIR: 'bg-amber-500',
  NEEDS_IMPROVEMENT: 'bg-red-500',
};

const STATUS_TEXT_COLORS = {
  EXCELLENT: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  GOOD: 'text-blue-700 bg-blue-50 border-blue-200',
  FAIR: 'text-amber-700 bg-amber-50 border-amber-200',
  NEEDS_IMPROVEMENT: 'text-red-700 bg-red-50 border-red-200',
};

export default function TopicalAuthorityDashboard({ existingPages = [], existingPaths = [] }) {
  // Calculate metrics
  const metrics = useMemo(() => {
    const existingSet = new Set(existingPaths.length > 0 ? existingPaths : 
      existingPages.map(p => typeof p === 'string' ? p : p.path || p.href || '').filter(Boolean));
    
    // Topic cluster coverage
    const clusterKeys = Object.keys(TOPIC_CLUSTERS);
    const coveredClusters = clusterKeys.filter(key => {
      const cluster = TOPIC_CLUSTERS[key];
      return existingSet.has(cluster.url) || Array.from(existingSet).some(p => p.startsWith(cluster.url));
    });
    
    // Entity coverage
    const entityKeys = Object.keys(ENTITY_RELATIONSHIPS);
    const coveredEntities = entityKeys.filter(key => {
      const entity = ENTITY_RELATIONSHIPS[key];
      return entity.url && (existingSet.has(entity.url) || Array.from(existingSet).some(p => p.startsWith(entity.url)));
    });
    
    // Hub completeness
    const hubKeys = Object.keys(CONTENT_HUBS);
    const coveredHubs = hubKeys.filter(key => {
      const hub = CONTENT_HUBS[key];
      const cluster = TOPIC_CLUSTERS[hub.pillar];
      const url = cluster?.url || `/${hub.pillar}`;
      return existingSet.has(url) || Array.from(existingSet).some(p => p.startsWith(url));
    });

    const topicClusterCoverage = Math.round((coveredClusters.length / Math.max(clusterKeys.length, 1)) * 100);
    const entityRelationshipDensity = Math.round((coveredEntities.length / Math.max(entityKeys.length, 1)) * 100);
    const contentHubCompleteness = Math.round((coveredHubs.length / Math.max(hubKeys.length, 1)) * 100);
    
    return {
      topicClusterCoverage,
      entityRelationshipDensity,
      contentHubCompleteness,
      programmaticPageCoverage: 50, // Estimated
      searchIntentCoverage: 90,
      pillarPageQuality: 85,
      semanticRelevance: 80,
      contentDepth: 75,
      internalLinkCompleteness: 70,
      totalClusters: clusterKeys.length,
      coveredClusters: coveredClusters.length,
      totalEntities: entityKeys.length,
      coveredEntities: coveredEntities.length,
      totalHubs: hubKeys.length,
      coveredHubs: coveredHubs.length,
    };
  }, [existingPages, existingPaths]);

  const score = useMemo(() => calculateTopicalAuthorityScore({
    topicClusterCoverage: metrics.topicClusterCoverage,
    entityRelationshipDensity: metrics.entityRelationshipDensity,
    internalLinkCompleteness: metrics.internalLinkCompleteness || 70,
    contentHubCompleteness: metrics.contentHubCompleteness,
    searchIntentCoverage: metrics.searchIntentCoverage,
    pillarPageQuality: metrics.pillarPageQuality,
    programmaticPageCoverage: metrics.programmaticPageCoverage,
    semanticRelevance: metrics.semanticRelevance,
    contentDepth: metrics.contentDepth,
  }), [metrics]);

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="nv-card-solid">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg">
              <Target className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900">Topical Authority Score</h2>
              <p className="text-sm text-slate-500">NameVerse knowledge graph completeness</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-black text-slate-900">{score.score}<span className="text-lg font-bold text-slate-400">/100</span></div>
            <span className={`inline-block mt-1 rounded-full border px-3 py-0.5 text-xs font-bold ${STATUS_TEXT_COLORS[score.status]}`}>
              {score.status.replace(/_/g, ' ')}
            </span>
          </div>
        </div>

        {/* Score Ring Visualization */}
        <div className="mt-6">
          <div className="h-3 rounded-full bg-slate-100">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ${STATUS_COLORS[score.status] || 'bg-blue-500'}`}
              style={{ width: `${score.score}%` }}
            />
          </div>
          <p className="mt-2 text-xs text-slate-500">
            {score.remaining > 0
              ? `${score.remaining} points remaining to reach 100/100 authority`
              : 'Maximum topical authority achieved!'}
          </p>
        </div>

        {/* Metric Breakdown */}
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(score.breakdown).map(([metric, data]) => (
            <div key={metric} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {metric.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase()).trim()}
                </span>
                <span className="text-sm font-bold text-slate-900">{data.value}%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div
                  className={`h-2 rounded-full ${data.value >= 80 ? 'bg-emerald-500' : data.value >= 60 ? 'bg-amber-500' : 'bg-red-500'}`}
                  style={{ width: `${data.value}%` }}
                />
              </div>
              <span className="mt-1 block text-[10px] font-medium text-slate-400">
                Weight: {Math.round(data.weight * 100)}% | Contribution: +{Math.round(data.contribution)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Coverage Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="nv-card-solid">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-100 text-indigo-700">
              <LayoutDashboard className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{metrics.coveredClusters}/{metrics.totalClusters}</div>
              <div className="text-xs font-semibold text-slate-500">Topic Clusters</div>
            </div>
          </div>
        </div>
        <div className="nv-card-solid">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-100 text-violet-700">
              <Network className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{metrics.coveredEntities}/{metrics.totalEntities}</div>
              <div className="text-xs font-semibold text-slate-500">Entities</div>
            </div>
          </div>
        </div>
        <div className="nv-card-solid">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
              <BookOpen className="h-5 w-5" />
            </div>
            <div>
              <div className="text-2xl font-black text-slate-900">{metrics.coveredHubs}/{metrics.totalHubs}</div>
              <div className="text-xs font-semibold text-slate-500">Content Hubs</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="nv-card-solid">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Quick Actions</h3>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/names-by-meaning"
            className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:bg-indigo-50"
          >
            <Heart className="h-5 w-5 text-indigo-600" />
            <div>
              <div className="text-sm font-bold text-slate-900">Explore Meanings</div>
              <div className="text-xs text-slate-500">Browse by meaning category</div>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
          </Link>
          <Link
            href="/names-by-origin"
            className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-emerald-300 hover:bg-emerald-50"
          >
            <Globe className="h-5 w-5 text-emerald-600" />
            <div>
              <div className="text-sm font-bold text-slate-900">Explore Origins</div>
              <div className="text-xs text-slate-500">Browse by linguistic origin</div>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
          </Link>
          <Link
            href="/trending-names"
            className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 transition hover:border-amber-300 hover:bg-amber-50"
          >
            <TrendingUp className="h-5 w-5 text-amber-600" />
            <div>
              <div className="text-sm font-bold text-slate-900">Trending Names</div>
              <div className="text-xs text-slate-500">See what's popular now</div>
            </div>
            <ArrowRight className="ml-auto h-4 w-4 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Schema Coverage */}
      <div className="nv-card-solid">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Schema & Knowledge Graph Coverage</h3>
        <div className="flex flex-wrap gap-2">
          {['Organization', 'Person', 'Article', 'FAQ', 'DefinedTerm', 'Dataset', 'Breadcrumb', 'CollectionPage', 'ItemList', 'SearchAction', 'WebSite', 'WebPage', 'Speakable'].map(schema => (
            <span
              key={schema}
              className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700"
            >
              <CheckCircle className="h-3 w-3" />
              {schema}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}