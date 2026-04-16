export default function PageLayout({ title, subtitle, bgColor = "bg-white", children }) {
  return (
    <div className={`${bgColor}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {title || subtitle ? (
          <div className="mb-8 sm:mb-12 text-center">
            {title ? (
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{title}</h1>
            ) : null}
            {subtitle ? (
              <p className="mt-2 text-base sm:text-lg text-gray-600">{subtitle}</p>
            ) : null}
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}

