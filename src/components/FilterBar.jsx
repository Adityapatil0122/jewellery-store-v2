import { CATEGORIES } from '../data/products'

export default function FilterBar({
  category,
  onCategoryChange,
  query,
  onQueryChange,
}) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 mt-12 mb-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        {/* Search */}
        <div className="relative flex-shrink-0">
          <svg
            className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-espresso/40"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            id="search-input"
            type="search"
            placeholder="Search jewellery..."
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            className="pl-10 pr-4 py-2.5 rounded-full border border-espresso/10 bg-white text-sm text-espresso placeholder:text-espresso/40 focus:outline-none focus:ring-2 focus:ring-gold/40 focus:border-gold/40 w-64 transition-all duration-200"
          />
        </div>

        {/* Category pills */}
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              id={`filter-${cat.toLowerCase()}`}
              onClick={() => onCategoryChange(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer ${
                category === cat
                  ? 'bg-gold text-white shadow-md shadow-gold/25'
                  : 'bg-white text-espresso/60 border border-espresso/10 hover:border-gold/40 hover:text-gold'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
