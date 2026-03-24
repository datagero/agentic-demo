import { useState } from 'react'
import { products, guest } from '../data/mock'
import type { Product } from '../types'

const CATEGORIES = ['All', 'dining', 'spa', 'excursion', 'beverage', 'retail'] as const
const CATEGORY_LABELS: Record<string, string> = {
  All: 'All',
  dining: 'Dining',
  spa: 'Spa',
  excursion: 'Excursions',
  beverage: 'Drinks',
  retail: 'Retail',
}

function ProductCard({ product }: { product: Product }) {
  const discountedPrice = product.medallionDiscount
    ? Math.round(product.price * 0.85)
    : product.price

  return (
    <div className="card p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start gap-3">
        <span className="text-3xl shrink-0" aria-hidden="true">{product.image}</span>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-sm text-pcl-text leading-tight">{product.name}</p>
          <p className="text-xs text-gray-400 mt-0.5 line-clamp-2">{product.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-xs text-yellow-500" aria-hidden="true">★</span>
            <span className="text-xs font-medium text-gray-600">{product.rating}</span>
            <span className="text-xs text-gray-400">({product.reviewCount})</span>
          </div>

          {/* Price row */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">${product.originalPrice}</span>
              )}
              <span className="font-bold text-pcl-navy">${product.medallionDiscount ? discountedPrice : product.price}</span>
              {product.medallionDiscount && (
                <span className="text-[10px] bg-amber-50 text-amber-700 font-semibold rounded-full px-1.5 py-0.5">
                  Gold −15%
                </span>
              )}
            </div>
            <button
              className="bg-pcl-navy text-white text-xs font-semibold px-3 py-1.5 rounded-lg active:scale-95 transition-transform"
              aria-label={`Add ${product.name} to cart`}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CommercePage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [cartCount, setCartCount] = useState(2)

  const filtered = activeCategory === 'All'
    ? products
    : products.filter((p) => p.category === activeCategory)

  return (
    <div className="flex flex-col bg-pcl-gray min-h-full page-enter">
      {/* Header */}
      <div className="bg-pcl-navy text-white px-4 pt-6 pb-6">
        <p className="text-pcl-gold text-xs font-semibold uppercase tracking-widest mb-1">
          Onboard
        </p>
        <h1 className="text-2xl font-display font-semibold">Shop & Book</h1>
        <p className="text-gray-300 text-sm mt-1">Experiences, dining & more</p>
      </div>

      {/* Promo banner */}
      <div className="mx-4 -mt-3 rounded-2xl bg-gradient-to-r from-pcl-gold to-pcl-gold-light p-4 flex items-center gap-3 relative z-10">
        <span className="text-3xl" aria-hidden="true">🎉</span>
        <div className="flex-1">
          <p className="font-bold text-pcl-navy text-sm">Early Bird Special</p>
          <p className="text-pcl-navy text-xs opacity-75">Book 48hrs before departure — save 20% on dining</p>
        </div>
      </div>

      {/* Medallion savings callout */}
      <div className="mx-4 mt-3 card p-3 flex items-center gap-2 border-l-4 border-pcl-gold">
        <span className="text-lg" aria-hidden="true">🏅</span>
        <p className="text-xs text-gray-600">
          <span className="font-semibold text-pcl-navy">{guest.medallionTier} members</span> save 15% on select items
        </p>
      </div>

      {/* Category tabs */}
      <div className="px-4 mt-4">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
                activeCategory === cat
                  ? 'bg-pcl-navy text-white'
                  : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
              }`}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
        </div>
      </div>

      {/* Product list */}
      <div className="px-4 mt-3 space-y-3 pb-20" aria-live="polite">
        <p className="section-label px-0">{filtered.length} {activeCategory === 'All' ? 'Items' : CATEGORY_LABELS[activeCategory]}</p>
        {filtered.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Floating cart button */}
      <div className="sticky bottom-0 px-4 pb-4 pt-2 bg-gradient-to-t from-pcl-gray via-pcl-gray">
        <button
          onClick={() => setCartCount((c) => c + 1)}
          className="w-full btn-primary flex items-center justify-center gap-2"
          aria-label={`View cart with ${cartCount} items`}
        >
          <span aria-hidden="true">🛒</span>
          <span>View Cart</span>
          <span className="bg-pcl-gold text-pcl-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {cartCount}
          </span>
        </button>
      </div>
    </div>
  )
}
