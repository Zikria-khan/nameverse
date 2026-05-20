export default function FAQAccordion({ faqs }) {
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <details
          key={i}
          className="group bg-gray-50 dark:bg-gray-700/30 rounded-xl border border-gray-100 dark:border-gray-700 overflow-hidden"
        >
          <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-left text-gray-900 dark:text-white font-semibold text-sm hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors list-none">
            <span className="pr-4">{faq.q}</span>
            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center text-emerald-600 dark:text-emerald-400 transition-transform duration-200 group-open:rotate-180">
              ▾
            </span>
          </summary>
          <div className="px-5 pb-4 text-sm text-gray-600 dark:text-gray-300 leading-relaxed border-t border-gray-100 dark:border-gray-700 pt-3">
            {faq.a}
          </div>
        </details>
      ))}
    </div>
  );
}
