import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../contexts/CartContext'
import { guest } from '../data/mock'
import { ROUTES } from '../routes'

const MEDALLION_DISCOUNT_RATE = 0.15

function generateOrderNumber(): string {
  return 'PCL-' + Math.floor(100000 + Math.random() * 900000)
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const [orderPlaced, setOrderPlaced] = useState(false)
  const [orderNumber] = useState(() => generateOrderNumber())

  const isGoldMember = guest.medallionTier === 'Gold'
  const discount = isGoldMember ? totalPrice * MEDALLION_DISCOUNT_RATE : 0
  const finalTotal = totalPrice - discount

  function handlePlaceOrder() {
    setOrderPlaced(true)
    clearCart()
  }

  function handleReturnToShopping() {
    navigate(ROUTES.COMMERCE)
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <div
          className="w-full max-w-md bg-green-50 border border-green-200 rounded-2xl p-8 text-center"
          role="status"
          aria-live="polite"
        >
          <span className="text-5xl block mb-4" aria-hidden="true">✅</span>
          <h1 className="font-display font-bold text-2xl text-green-800 mb-2">
            Order Confirmed!
          </h1>
          <p className="text-green-700 text-sm mb-1">
            Thank you, {guest.firstName}!
          </p>
          <p className="text-green-700 text-sm font-semibold mb-6">
            Order number: <span data-testid="order-number">{orderNumber}</span>
          </p>
          <p className="text-green-600 text-xs mb-8">
            Your items have been added to your Medallion account. You will receive
            a confirmation in the Princess app.
          </p>
          <button
            onClick={handleReturnToShopping}
            className="btn-primary w-full"
            aria-label="Return to shopping"
          >
            Return to Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl text-pcl-navy">
            Checkout
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            {guest.firstName} {guest.lastName} · {guest.medallionTier} Medallion
          </p>
        </div>

        {/* Order Summary */}
        <section aria-labelledby="order-summary-heading" className="bg-white rounded-2xl shadow-sm p-4 mb-4">
          <h2
            id="order-summary-heading"
            className="font-semibold text-pcl-navy text-base mb-3"
          >
            Order Summary
          </h2>

          {items.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-4">
              Your cart is empty.
            </p>
          ) : (
            <ul className="space-y-3" aria-label="Order items">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex items-center gap-3"
                >
                  <span className="text-2xl shrink-0" aria-hidden="true">
                    {item.product.image}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-pcl-navy leading-tight">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Qty: {item.quantity} × ${item.product.price}
                    </p>
                  </div>
                  <span className="font-bold text-sm text-pcl-navy shrink-0">
                    ${item.product.price * item.quantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        {/* Price Breakdown */}
        <section aria-labelledby="price-breakdown-heading" className="bg-white rounded-2xl shadow-sm p-4 mb-6">
          <h2
            id="price-breakdown-heading"
            className="font-semibold text-pcl-navy text-base mb-3"
          >
            Price Breakdown
          </h2>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold text-pcl-navy">${totalPrice.toFixed(2)}</span>
            </div>

            {isGoldMember && (
              <div className="flex justify-between text-green-700">
                <span aria-label="Gold Medallion discount 15%">
                  Gold Medallion Discount (15%)
                </span>
                <span className="font-semibold" data-testid="discount-amount">
                  −${discount.toFixed(2)}
                </span>
              </div>
            )}

            <div className="flex justify-between border-t border-gray-100 pt-2 text-base">
              <span className="font-bold text-pcl-navy">Total</span>
              <span className="font-bold text-pcl-navy" data-testid="final-total">
                ${finalTotal.toFixed(2)}
              </span>
            </div>
          </div>
        </section>

        {/* Place Order */}
        <button
          onClick={handlePlaceOrder}
          disabled={items.length === 0}
          className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label={`Place order for $${finalTotal.toFixed(2)}`}
        >
          Place Order · ${finalTotal.toFixed(2)}
        </button>
      </div>
    </div>
  )
}
