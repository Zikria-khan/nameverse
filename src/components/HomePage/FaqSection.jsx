const faqs = [
  {
    question: 'How can I choose the best baby name for our family?',
    answer: 'Start with the meaning and origin, then compare names by faith, gender, and popularity. NameVerse lets you filter names by meaning, religion, and origin so you can choose a name that feels right.'
  },
  {
    question: 'Are Islamic, Hindu, and Christian names verified on NameVerse?',
    answer: 'Yes. Each name is reviewed for meaning and cultural authenticity so you can trust the religious context and linguistic accuracy.'
  },
  {
    question: 'Can I search names by meaning or origin?',
    answer: 'Absolutely. Use NameVerse search to find baby names by meaning, origin, region, or scripture, with clear results for both boys and girls.'
  },
  {
    question: 'Does this site include popular and unique baby names?',
    answer: 'Yes. We show both trending names and rare gems, so you can discover modern favorites and meaningful, less-common choices.'
  },
  {
    question: 'Is NameVerse free to use?',
    answer: 'Yes. All name search tools, meanings, and name lists are free for parents and families.'
  }
];

const FaqSection = () => {
  return (
    <section className="py-12 sm:py-16" id="homepage-faq">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-[color:var(--nv-border)] bg-white/65 px-4 py-2 text-xs font-semibold tracking-wide text-[color:var(--nv-ink)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-[color:var(--nv-accent)]" />
              Quick answers
            </div>
            <h2 className="nv-display mt-5 text-3xl font-semibold leading-tight text-[color:var(--nv-ink)] sm:text-4xl">
              FAQ for parents choosing a name.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--nv-muted)] sm:text-lg">
              The most common questions about meanings, origins, and faith-based name selection — answered clearly.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details key={index} className="nv-surface rounded-[26px] p-5">
                <summary className="cursor-pointer list-none text-sm font-semibold text-[color:var(--nv-ink)]">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-[color:var(--nv-muted)]">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
