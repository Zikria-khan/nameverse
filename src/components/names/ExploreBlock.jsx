import React from 'react'
import Link from 'next/link'

function Card({ href, title, description, colorClass = 'bg-white' }) {
  return (
    <Link href={href} className={`block p-4 rounded-lg shadow-sm hover:shadow-md transition-colors ${colorClass} focus:outline-none focus:ring-2 focus:ring-offset-2`}>
      <div className="flex flex-col h-full">
        <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">{title}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{description}</p>
        <div className="mt-auto pt-4">
          <span className="inline-flex items-center text-sm font-semibold text-indigo-600">
            Explore
            <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </span>
        </div>
      </div>
    </Link>
  )
}

export default function ExploreBlock() {
  return (
    <section aria-labelledby="explore-heading" className="bg-white dark:bg-gray-900 rounded-lg shadow-md p-6 my-8">
      <div className="max-w-6xl mx-auto">
        <h2 id="explore-heading" className="text-2xl font-semibold text-gray-900 dark:text-gray-100">Explore by Collection</h2>
        <p className="mt-2 text-gray-600 dark:text-gray-300">Jump to curated collections, gendered lists, and editorial guides. These quick-entry cards link to curated landing pages and filters for faster discovery.</p>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card href="/islamic/boy-names" title="Islamic Boy Names" description="Curated Quranic and traditional boy names with meanings and pronunciation." colorClass="bg-gradient-to-tr from-indigo-50 to-white" />
          <Card href="/islamic/girl-names" title="Islamic Girl Names" description="Popular and meaningful Islamic girl names, with origin notes and usage." colorClass="bg-gradient-to-tr from-pink-50 to-white" />
          <Card href="/christian/boy-names" title="Christian Boy Names" description="Traditional and modern Christian boy names, including biblical names and variants." colorClass="bg-gradient-to-tr from-green-50 to-white" />
          <Card href="/christian/girl-names" title="Christian Girl Names" description="Handpicked Christian girl names with meanings and cultural context." colorClass="bg-gradient-to-tr from-emerald-50 to-white" />
          <Card href="/hindu/boy-names" title="Hindu Boy Names" description="Regional and pan-Indian boy names with Sanskrit roots and meanings." colorClass="bg-gradient-to-tr from-yellow-50 to-white" />
          <Card href="/hindu/girl-names" title="Hindu Girl Names" description="Beautiful Hindu girl names with meanings, variants, and usage notes." colorClass="bg-gradient-to-tr from-amber-50 to-white" />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="/names/religion/islamic/1" className="text-sm px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200" aria-label="All Islamic Names">All Islamic Names</Link>
          <Link href="/names/religion/christian/1" className="text-sm px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200" aria-label="All Christian Names">All Christian Names</Link>
          <Link href="/names/religion/hindu/1" className="text-sm px-3 py-2 bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gray-200" aria-label="All Hindu Names">All Hindu Names</Link>
          <Link href="/blog" className="text-sm px-3 py-2 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100" aria-label="Blog">Blog</Link>
        </div>

        <p className="mt-6 text-gray-600 dark:text-gray-300">Quick tips: try "Quranic" or "Biblical" in search for religiously-specific lists; use A–Z to browse by initial; open a detail page for pronunciation and sourcing. Each detail page includes editorial notes and citations when available.</p>
      </div>
    </section>
  )
}
