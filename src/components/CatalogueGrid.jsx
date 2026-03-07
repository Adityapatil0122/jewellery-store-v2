import ProductCard from './ProductCard'

export default function CatalogueGrid({ products }) {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
      <p className="text-espresso/40 text-sm mb-6">
        Showing {products.length} {products.length === 1 ? 'product' : 'products'}
      </p>

      {products.length === 0 ? (
        <div className="text-center py-20">
          <p className="font-heading text-2xl text-espresso/20 mb-2">
            Nothing here yet
          </p>
          <p className="text-espresso/30 text-sm">
            Try a different search or category
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  )
}
