import { useState } from 'react'

export default function ProductCard({ product }) {
  const { name, price, desc, category, img, id } = product
  const [copied, setCopied] = useState(false)

  const productUrl = `${window.location.origin}${window.location.pathname}#${id}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(
    `${name} - ₹${price} ${productUrl}`
  )}`

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      /* fallback: do nothing */
    }
  }

  return (
    <article
      id={id}
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 border border-espresso/5"
    >
      {/* Image area */}
      <div className="bg-cream/60 p-6 flex items-center justify-center overflow-hidden">
        <img
          src={img}
          alt={name}
          className="w-full h-44 object-cover rounded-xl group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card body */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="font-heading text-lg font-semibold text-espresso leading-snug">
            {name}
          </h3>
          <span className="text-gold font-bold text-lg whitespace-nowrap">
            ₹{price.toLocaleString('en-IN')}
          </span>
        </div>

        <p className="text-espresso/50 text-sm mb-3 leading-relaxed">{desc}</p>

        <span className="inline-block text-xs font-semibold text-gold/80 bg-gold/10 px-3 py-1 rounded-full mb-4">
          {category}
        </span>

        {/* Share buttons */}
        <div className="flex gap-2 flex-wrap">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-green-50 text-green-700 hover:bg-green-100 transition-colors duration-200"
          >
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              <path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.611.611l4.458-1.495A11.952 11.952 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.37 0-4.567-.804-6.317-2.155l-.44-.347-3.262 1.094 1.094-3.262-.347-.44A9.96 9.96 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z" />
            </svg>
            WhatsApp
          </a>

          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-cream text-espresso/60 hover:bg-gold/10 hover:text-gold transition-colors duration-200 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              />
            </svg>
            {copied ? 'Copied!' : 'Copy Link'}
          </button>
        </div>
      </div>
    </article>
  )
}
