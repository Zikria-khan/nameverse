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
    <section className="py-12 sm:py-16 bg-white" id="homepage-faq">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">FAQ — Baby name search, meaning, and religious names</h2>
          <p className="mx-auto max-w-3xl text-base text-gray-600 leading-relaxed">
            Answers to the questions parents ask most when searching for Islamic, Hindu, and Christian baby names.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-3xl border border-gray-200 bg-slate-50 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
