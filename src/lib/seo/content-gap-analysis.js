/**
 * CONTENT GAP ANALYSIS SYSTEM
 * 
 * Analyzes the existing site structure against the complete topical authority
 * architecture to identify gaps, missing pages, and improvement opportunities.
 * 
 * Features:
 * - Topic cluster coverage analysis
 * - Entity relationship coverage
 * - Internal link completeness
 * - Content hub completeness
 * - Programmatic page coverage
 * - Missing page detection
 * - Improvement recommendations
 */

import {
  TOPIC_CLUSTERS,
  ENTITY_RELATIONSHIPS,
  LINKING_RULES,
  CONTENT_HUBS,
  PROGRAMMATIC_PAGES,
} from './topical-authority-architecture';

/**
 * Analyze topic cluster coverage
 */
export function analyzeTopicClusterCoverage(existingPaths) {
  const existingSet = new Set(existingPaths.map(p => {
    if (typeof p === 'string') return p;
    return p.path || p.href || p.url || '';
  }).filter(Boolean));

  const clusters = Object.values(TOPIC_CLUSTERS);
  const covered = [];
  const missing = [];
  const partial = [];

  clusters.forEach(cluster => {
    const clusterUrl = cluster.url || '';
    const isCovered = existingSet.has(clusterUrl) || 
      existingSet.has(clusterUrl.replace(/\/\d+$/, '')) ||
      Array.from(existingSet).some(p => p.startsWith(clusterUrl));

    if (isCovered) {
      covered.push(cluster);
    } else {
      // Check if partially covered
      const hasAnyChild = cluster.children.some(childId => {
        const child = TOPIC_CLUSTERS[childId];
        return child && (existingSet.has(child.url) || 
          Array.from(existingSet).some(p => p.startsWith(child.url)));
      });

      if (hasAnyChild) {
        partial.push(cluster);
      } else {
        missing.push(cluster);
      }
    }
  });

  const total = clusters.length;
  const score = Math.round(((covered.length + partial.length * 0.5) / total) * 100);

  return {
    score,
    covered: covered.map(c => ({ id: c.id, title: c.title, url: c.url })),
    partial: partial.map(c => ({ id: c.id, title: c.title, url: c.url })),
    missing: missing.map(c => ({ id: c.id, title: c.title, url: c.url })),
    summary: {
      total,
      covered: covered.length,
      partial: partial.length,
      missing: missing.length,
    },
    recommendations: missing.slice(0, 10).map(c => 
      `Create page for topic cluster "${c.title}" at ${c.url || `/${c.id}`}`
    ),
  };
}

/**
 * Analyze entity relationship coverage
 */
export function analyzeEntityCoverage(existingPaths) {
  const existingSet = new Set(existingPaths.map(p => {
    if (typeof p === 'string') return p;
    return p.path || p.href || p.url || '';
  }).filter(Boolean));

  const entities = Object.entries(ENTITY_RELATIONSHIPS);
  const covered = [];
  const missing = [];

  entities.forEach(([key, entity]) => {
    const isCovered = entity.url && (
      existingSet.has(entity.url) ||
      Array.from(existingSet).some(p => p.startsWith(entity.url))
    );

    if (isCovered) {
      covered.push({ key, label: entity.label, url: entity.url });
    } else {
      missing.push({ key, label: entity.label, url: entity.url, type: entity.type });
    }
  });

  const total = entities.length;
  const score = Math.round((covered.length / total) * 100);

  return {
    score,
    covered,
    missing,
    summary: { total, covered: covered.length, missing: missing.length },
    recommendations: missing.slice(0, 10).map(e => 
      `Create entity page for "${e.label}" (${e.type}) at ${e.url}`
    ),
  };
}

/**
 * Analyze content hub completeness
 */
export function analyzeHubCompleteness(existingPaths) {
  const existingSet = new Set(existingPaths.map(p => {
    if (typeof p === 'string') return p;
    return p.path || p.href || p.url || '';
  }).filter(Boolean));

  const hubs = Object.values(CONTENT_HUBS);
  const complete = [];
  const incomplete = [];
  const missing = [];

  hubs.forEach(hub => {
    const pillarCluster = TOPIC_CLUSTERS[hub.pillar];
    const pillarUrl = pillarCluster?.url || `/${hub.pillar}`;
    const isCovered = existingSet.has(pillarUrl) ||
      Array.from(existingSet).some(p => p.startsWith(pillarUrl));

    if (isCovered) {
      // Check if all sections are covered
      const coveredSections = hub.sections.filter(section => {
        const sectionUrl = `${pillarUrl}/${section.type}`;
        return existingSet.has(sectionUrl);
      });
      
      if (coveredSections.length >= hub.sections.length * 0.7) {
        complete.push({ id: hub.id, title: hub.title });
      } else {
        incomplete.push({ 
          id: hub.id, 
          title: hub.title, 
          coveredSections: coveredSections.length,
          totalSections: hub.sections.length,
        });
      }
    } else {
      missing.push({ id: hub.id, title: hub.title, pillar: hub.pillar });
    }
  });

  const total = hubs.length;
  const score = Math.round(((complete.length + incomplete.length * 0.3) / total) * 100);

  return {
    score,
    complete,
    incomplete,
    missing,
    summary: { total, complete: complete.length, incomplete: incomplete.length, missing: missing.length },
    recommendations: [
      ...missing.map(h => `Create hub "${h.title}" at pillar "${h.pillar}"`),
      ...incomplete.map(h => `Complete missing sections for hub "${h.title}" (${h.coveredSections}/${h.totalSections} sections)`),
    ],
  };
}

/**
 * Analyze programmatic page coverage
 */
export function analyzeProgrammaticCoverage(existingPaths) {
  const existingSet = new Set(existingPaths.map(p => {
    if (typeof p === 'string') return p;
    return p.path || p.href || p.url || '';
  }).filter(Boolean));

  const results = [];

  Object.entries(PROGRAMMATIC_PAGES).forEach(([type, config]) => {
    const generated = [];
    const notGenerated = [];

    config.pages.forEach(page => {
      const expectedPath = `/${type}/${page}`;
      const isGenerated = existingSet.has(expectedPath) ||
        Array.from(existingSet).some(p => p.includes(page));

      if (isGenerated) {
        generated.push(page);
      } else {
        notGenerated.push(page);
      }
    });

    results.push({
      type: config.template,
      total: config.pages.length,
      generated: generated.length,
      notGenerated: notGenerated.length,
      missing: notGenerated.slice(0, 10),
      score: Math.round((generated.length / config.pages.length) * 100),
    });
  });

  const overallScore = results.length > 0
    ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
    : 0;

  return {
    score: overallScore,
    results,
    summary: results.map(r => `${r.type}: ${r.generated}/${r.total} pages (${r.score}%)`),
    recommendations: results
      .filter(r => r.notGenerated > 0)
      .map(r => `Generate ${r.notGenerated} missing ${r.type} pages (e.g., ${r.missing.slice(0, 3).join(', ')})`),
  };
}

/**
 * Analyze internal link completeness
 */
export function analyzeInternalLinkCompleteness(pages) {
  // This function checks if key internal linking patterns exist
  const checks = {
    hasBreadcrumbs: 0,
    hasReligionLinks: 0,
    hasOriginLinks: 0,
    hasLetterLinks: 0,
    hasMeaningLinks: 0,
    hasPopularityLinks: 0,
    hasTrendingLinks: 0,
    hasUniqueLinks: 0,
    hasSearchLinks: 0,
    hasBlogLinks: 0,
    hasGuideLinks: 0,
  };

  const totalPages = pages.length || 1;

  // Sample a subset of pages for performance
  const sampleSize = Math.min(pages.length, 100);
  const sampledPages = pages.slice(0, sampleSize);

  sampledPages.forEach(page => {
    const content = typeof page === 'string' ? page : JSON.stringify(page);
    
    if (content.includes('breadcrumb') || content.includes('Breadcrumb')) checks.hasBreadcrumbs++;
    if (content.includes('/names/religion/')) checks.hasReligionLinks++;
    if (content.includes('/names/') && content.includes('/origin/')) checks.hasOriginLinks++;
    if (content.includes('/names/') && content.includes('/letter/')) checks.hasLetterLinks++;
    if (content.includes('/names-by-meaning')) checks.hasMeaningLinks++;
    if (content.includes('/popularity')) checks.hasPopularityLinks++;
    if (content.includes('/trending-names')) checks.hasTrendingLinks++;
    if (content.includes('/unique-names')) checks.hasUniqueLinks++;
    if (content.includes('/search')) checks.hasSearchLinks++;
    if (content.includes('/blog')) checks.hasBlogLinks++;
    if (content.includes('/guides')) checks.hasGuideLinks++;
  });

  const linkScores = {};
  Object.entries(checks).forEach(([key, count]) => {
    linkScores[key] = Math.round((count / sampleSize) * 100);
  });

  const overallScore = Object.values(linkScores).reduce((sum, s) => sum + s, 0) / Object.keys(linkScores).length;

  return {
    score: Math.round(overallScore),
    linkScores,
    sampleSize,
    recommendations: Object.entries(linkScores)
      .filter(([, score]) => score < 50)
      .map(([key]) => `Improve ${key.replace(/^has/, '').replace(/([A-Z])/g, ' $1').toLowerCase().trim()} linking patterns`),
  };
}

/**
 * Run complete content gap analysis
 */
export function runFullContentGapAnalysis(existingPages, existingPaths) {
  const topicClusters = analyzeTopicClusterCoverage(existingPaths);
  const entities = analyzeEntityCoverage(existingPaths);
  const hubs = analyzeHubCompleteness(existingPaths);
  const programmatic = analyzeProgrammaticCoverage(existingPaths);
  const linking = analyzeInternalLinkCompleteness(existingPages);

  const allScores = [topicClusters.score, entities.score, hubs.score, programmatic.score, linking.score];
  const overallScore = Math.round(allScores.reduce((sum, s) => sum + s, 0) / allScores.length);

  const allRecommendations = [
    ...topicClusters.recommendations,
    ...entities.recommendations,
    ...hubs.recommendations,
    ...programmatic.recommendations,
    ...linking.recommendations,
  ];

  return {
    overall: {
      score: overallScore,
      status: overallScore >= 80 ? 'GOOD' : overallScore >= 60 ? 'NEEDS_IMPROVEMENT' : 'MAJOR_GAPS',
      totalGaps: allRecommendations.length,
    },
    categories: {
      topicClusters,
      entities,
      hubs,
      programmatic,
      linking,
    },
    summary: {
      topicClusters: topicClusters.summary,
      entities: entities.summary,
      hubs: hubs.summary,
      programmatic: programmatic.summary,
    },
    recommendations: allRecommendations.slice(0, 30),
    priorityRecommendations: allRecommendations.slice(0, 10),
  };
}

/**
 * Generate a markdown report
 */
export function generateGapReport(analysis) {
  const lines = [];
  
  lines.push('# Content Gap Analysis Report');
  lines.push(`**Date:** ${new Date().toISOString().split('T')[0]}`);
  lines.push(`**Overall Score:** ${analysis.overall.score}/100 (${analysis.overall.status})`);
  lines.push(`**Total Gaps Found:** ${analysis.overall.totalGaps}`);
  lines.push('');
  
  // Topic Clusters
  lines.push('## Topic Cluster Coverage');
  lines.push(`- Score: ${analysis.categories.topicClusters.score}/100`);
  lines.push(`- Covered: ${analysis.categories.topicClusters.summary.covered}/${analysis.categories.topicClusters.summary.total}`);
  lines.push(`- Partial: ${analysis.categories.topicClusters.summary.partial}`);
  lines.push(`- Missing: ${analysis.categories.topicClusters.summary.missing}`);
  if (analysis.categories.topicClusters.missing.length > 0) {
    lines.push('');
    lines.push('### Missing Topic Clusters');
    analysis.categories.topicClusters.missing.slice(0, 10).forEach(c => {
      lines.push(`- ${c.title} (${c.url})`);
    });
  }
  lines.push('');
  
  // Entities
  lines.push('## Entity Coverage');
  lines.push(`- Score: ${analysis.categories.entities.score}/100`);
  lines.push(`- Covered: ${analysis.categories.entities.summary.covered}/${analysis.categories.entities.summary.total}`);
  lines.push(`- Missing: ${analysis.categories.entities.summary.missing}`);
  lines.push('');
  
  // Hubs
  lines.push('## Content Hub Completeness');
  lines.push(`- Score: ${analysis.categories.hubs.score}/100`);
  lines.push(`- Complete: ${analysis.categories.hubs.summary.complete}`);
  lines.push(`- Incomplete: ${analysis.categories.hubs.summary.incomplete}`);
  lines.push(`- Missing: ${analysis.categories.hubs.summary.missing}`);
  lines.push('');
  
  // Programmatic
  lines.push('## Programmatic Page Coverage');
  lines.push(`- Score: ${analysis.categories.programmatic.score}/100`);
  lines.push('');
  analysis.categories.programmatic.summary.forEach(s => lines.push(`- ${s}`));
  lines.push('');
  
  // Top Recommendations
  lines.push('## Top Priority Recommendations');
  analysis.priorityRecommendations.forEach((rec, i) => {
    lines.push(`${i + 1}. ${rec}`);
  });
  
  lines.push('');
  lines.push('## All Recommendations');
  analysis.recommendations.forEach((rec, i) => {
    lines.push(`${i + 1}. ${rec}`);
  });
  
  return lines.join('\n');
}

const ContentGapAnalysis = {
  analyzeTopicClusterCoverage,
  analyzeEntityCoverage,
  analyzeHubCompleteness,
  analyzeProgrammaticCoverage,
  analyzeInternalLinkCompleteness,
  runFullContentGapAnalysis,
  generateGapReport,
};

export default ContentGapAnalysis;