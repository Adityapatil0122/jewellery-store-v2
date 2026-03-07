import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import FilterBar from './components/FilterBar'
import CatalogueGrid from './components/CatalogueGrid'
import { products } from './data/products'

export default function App() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')

  const handleCategoryClick = (cat) => {
    setCategory(cat)
    setTimeout(() => {
      document.getElementById('catalogue')?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const q = query.toLowerCase().trim()
  const filtered = products.filter(
    (p) =>
      (category === 'All' || p.category === category) &&
      (!q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q))
  )

  return (
    <div className="min-h-screen bg-cream font-body">
      <Navbar onCategoryClick={handleCategoryClick} />
      <Hero />

      <div id="catalogue">
        <FilterBar
          category={category}
          onCategoryChange={setCategory}
          query={query}
          onQueryChange={setQuery}
        />
        <CatalogueGrid products={filtered} />
      </div>

      <footer className="bg-white/60 backdrop-blur-sm border-t border-espresso/5 py-8 text-center">
        <p className="text-espresso/40 text-sm">
          © 2026 <span className="font-heading font-semibold text-espresso/60">Alankar by Gayatri</span> — Handcrafted with ♥
        </p>
      </footer>
    </div>
  )
}
