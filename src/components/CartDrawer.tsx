import { useCart } from '../contexts/CartContext'

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { items, totalPrice, totalCount, removeItem, clearCart } = useCart()

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          aria-hidden="true"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        aria-modal="true"
        className={`fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl transition-transform duration-300 ${
          isOpen ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        {/* Handle bar */}
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-gray-300" aria-hidden="true" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <span aria-hidden="true">🛒</span>
            <h2 className="font-display font-semibold text-pcl-navy text-lg">
              Your Cart
            </h2>
            {totalCount > 0 && (
              <span className="bg-pcl-gold text-pcl-navy text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {totalCount}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1"
            aria-label="Close cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="px-4 py-2 max-h-[60vh] overflow-y-auto">
          {items.length === 0 ? (
            <div className="py-10 text-center text-gray-400">
              <span className="text-4xl block mb-2" aria-hidden="true">🛍️</span>
              <p className="text-sm">Your cart is empty</p>
              <p className="text-xs mt-1">Add items to get started</p>
            </div>
          ) : (
            <ul className="space-y-3 py-2" aria-label="Cart items">
              {items.map((item) => (
                <li
                  key={item.product.id}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl"
                >
                  <span className="text-2xl shrink-0" aria-hidden="true">
                    {item.product.image}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-pcl-navy leading-tight truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      ${item.product.price} × {item.quantity}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="font-bold text-sm text-pcl-navy">
                      ${item.product.price * item.quantity}
                    </span>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                      aria-label={`Remove ${item.product.name} from cart`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-4 pb-6 pt-3 border-t border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-pcl-navy">Total</span>
              <span className="font-bold text-xl text-pcl-navy">${totalPrice}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={clearCart}
                className="flex-1 border border-gray-300 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition-colors"
                aria-label="Clear cart"
              >
                Clear
              </button>
              <button
                className="flex-[2] btn-primary"
                aria-label={`Checkout — total $${totalPrice}`}
              >
                Checkout · ${totalPrice}
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
