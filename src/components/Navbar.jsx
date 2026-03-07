import { useState, useEffect } from 'react'

const navLinks = ['Rings', 'Necklaces', 'Earrings', 'Bracelets']

export default function Navbar({ onCategoryClick }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-cream/80 backdrop-blur-md shadow-sm'
          : 'bg-cream'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
        <a
          href="#"
          className="flex items-center gap-3"
        >
          <img
            src="/assets/logo.ico"
            alt="Alankar by Gayatri logo"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-gold/30"
          />
          <span className="font-heading text-2xl font-bold text-espresso tracking-wide">
            Alankar{' '}
            <span className="text-gold">by Gayatri</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => onCategoryClick(link)}
              className="text-sm font-medium text-espresso/70 hover:text-gold transition-colors duration-200"
            >
              {link}
            </button>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-espresso/60"
          onClick={() => {
            const el = document.getElementById('catalogue')
            el?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </nav>
  )
}
