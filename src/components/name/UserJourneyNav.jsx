'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { USER_JOURNEYS } from '@/lib/seo/topical-authority-architecture';
import { Compass, ArrowRight, ArrowLeft, Search, BookOpen, Heart, Share2, Sparkles, TrendingUp, Globe } from 'lucide-react';

const stageIcons = {
  discovery: Compass,
  research: Search,
  compare: ArrowRight,
  decision: Heart,
  share: Share2,
  explore: Sparkles,
  'choose-religion': BookOpen,
  'browse-gender': Globe,
  'browse-collections': BookOpen,
  'view-name': Heart,
  'explore-related': Sparkles,
  'browse-meanings': Search,
  'filter-meaning': Search,
  'view-names': BookOpen,
  'explore-more': Sparkles,
};

const stageColors = {
  discovery: 'bg-blue-50 text-blue-700 border-blue-200',
  research: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  compare: 'bg-amber-50 text-amber-700 border-amber-200',
  decision: 'bg-rose-50 text-rose-700 border-rose-200',
  share: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  explore: 'bg-purple-50 text-purple-700 border-purple-200',
};

function getJourneyForPage(pathname) {
  // Find which journey stage contains this path
  for (const [journeyId, journey] of Object.entries(USER_JOURNEYS)) {
    for (let i = 0; i < journey.stages.length; i++) {
      const stage = journey.stages[i];
      const matches = stage.pages.some(pattern => {
        if (pattern.includes('{')) {
          // Pattern matching for dynamic routes
          const regex = new RegExp('^' + pattern.replace(/\{[^}]+\}/g, '[^/]+') + '$');
          return regex.test(pathname);
        }
        return pathname === pattern || pathname.startsWith(pattern);
      });
      if (matches) {
        return { journeyId, journey, currentStageIndex: i };
      }
    }
  }
  return null;
}

export default function UserJourneyNav({ pathname, variant = 'sidebar' }) {
  const journeyContext = useMemo(() => getJourneyForPage(pathname), [pathname]);

  if (!journeyContext) return null;

  const { journey, currentStageIndex } = journeyContext;
  const currentStage = journey.stages[currentStageIndex];
  const prevStage = currentStageIndex > 0 ? journey.stages[currentStageIndex - 1] : null;
  const nextStage = currentStageIndex < journey.stages.length - 1 ? journey.stages[currentStageIndex + 1] : null;
  const progress = ((currentStageIndex + 1) / journey.stages.length) * 100;

  if (variant === 'sidebar') {
    return (
      <div className="nv-card-solid">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <Compass className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">Your Journey</h3>
            <p className="text-xs text-slate-500">{journey.name}</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mb-4 h-2 rounded-full bg-slate-100">
          <div
            className="h-2 rounded-full bg-amber-500 transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Stage list */}
        <div className="space-y-2">
          {journey.stages.map((stage, index) => {
            const Icon = stageIcons[stage.stage] || Compass;
            const isActive = index === currentStageIndex;
            const isComplete = index < currentStageIndex;
            const colorClass = stageColors[stage.stage] || 'bg-slate-50 text-slate-600 border-slate-200';
            
            return (
              <div
                key={stage.stage}
                className={`flex items-center gap-3 rounded-xl border p-3 transition ${
                  isActive ? 'border-amber-300 bg-amber-50 ring-1 ring-amber-200' : 
                  isComplete ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-white'
                }`}
              >
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                  isActive ? 'bg-amber-100 text-amber-700' :
                  isComplete ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                }`}>
                  {isComplete ? (
                    <span className="text-sm font-bold">✓</span>
                  ) : (
                    <Icon className="h-4 w-4" />
                  )}
                </div>
                <div className="min-w-0">
                  <span className={`block text-xs font-bold uppercase tracking-wider ${
                    isActive ? 'text-amber-800' : isComplete ? 'text-emerald-700' : 'text-slate-500'
                  }`}>
                    {stage.stage.replace(/-/g, ' ')}
                  </span>
                  <span className={`block text-xs mt-0.5 ${
                    isActive ? 'text-amber-700' : 'text-slate-400'
                  }`}>
                    {isActive ? 'Current step' : isComplete ? 'Completed' : 'Upcoming'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation buttons */}
        <div className="mt-4 flex gap-2">
          {prevStage && (
            <Link
              href={prevStage.pages[0]}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <ArrowLeft className="h-3 w-3" />
              Previous
            </Link>
          )}
          {nextStage && (
            <Link
              href={nextStage.pages[0]}
              className="inline-flex items-center gap-1.5 rounded-lg bg-amber-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-amber-700"
            >
              Next Step
              <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    );
  }

  // Bottom bar variant
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white/95 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Compass className="h-4 w-4 text-amber-600" />
          <span className="text-xs font-semibold text-slate-600">
            Step {currentStageIndex + 1} of {journey.stages.length}: {currentStage.stage.replace(/-/g, ' ')}
          </span>
        </div>
        <div className="flex items-center gap-2">
          {prevStage && (
            <Link
              href={prevStage.pages[0]}
              className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"
            >
              <ArrowLeft className="h-3 w-3" /> Back
            </Link>
          )}
          {nextStage && (
            <Link
              href={nextStage.pages[0]}
              className="inline-flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-700"
            >
              Next <ArrowRight className="h-3 w-3" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}