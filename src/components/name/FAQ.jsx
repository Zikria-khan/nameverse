'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ({ faqData = [], name }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const faqs = faqData.length > 0 ? faqData : [
    {
      q: `What does ${name} mean?`,
      a: `${name} is a meaningful name that carries a positive origin and cultural significance.`,
    },
  ];

  return (
    <section className="nv-card-solid">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-50 text-amber-700">
          <ChevronDown className="h-5 w-5" />
        </div>
        <h2 className="text-xl font-semibold text-slate-900">Frequently Asked Questions</h2>
      </div>

      <div className="space-y-4">
        {faqs.map((item, idx) => (
          <div key={idx} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <button
              type="button"
              onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
              className="flex w-full items-start justify-between gap-4 text-left text-sm font-semibold text-slate-900"
            >
              <span>{item.q}</span>
              {activeIndex === idx ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </button>
            <div className={`${activeIndex === idx ? 'mt-3 block' : 'hidden'} text-sm leading-6 text-slate-700`}>
              {item.a}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
