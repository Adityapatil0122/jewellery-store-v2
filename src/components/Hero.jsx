export default function Hero() {
  return (
    <section className="relative mt-16 mx-4 sm:mx-6 lg:mx-auto max-w-6xl rounded-3xl overflow-hidden">
      <div className="bg-gradient-to-br from-espresso via-espresso/90 to-gold/80 px-8 sm:px-16 py-20 sm:py-28">
        <p className="text-gold/90 text-sm font-semibold tracking-[0.3em] uppercase mb-4 animate-fade-in">
          ✦ New Collection
        </p>
        <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl text-cream font-bold leading-tight mb-6 animate-slide-up">
          Modern Jewellery,
          <br />
          <span className="text-gold">Simple Experience</span>
        </h1>
        <p className="text-cream/70 text-lg max-w-lg animate-slide-up-delay font-light">
          Explore rings, necklaces, earrings and bracelets with transparent
          prices and quick sharing.
        </p>
      </div>

      {/* Decorative accents */}
      <div className="absolute top-8 right-8 w-24 h-24 rounded-full bg-gold/10 blur-2xl" />
      <div className="absolute bottom-12 right-24 w-16 h-16 rounded-full bg-blush/20 blur-xl" />
    </section>
  )
}
