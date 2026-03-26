import { createContext, useContext, useReducer, type ReactNode } from 'react'
import type { Product } from '../types'

// ── Types ─────────────────────────────────────────────────────────────────────

export interface CartItem {
  product: Product
  quantity: number
}

interface CartState {
  items: CartItem[]
  totalCount: number
  totalPrice: number
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: string }
  | { type: 'CLEAR_CART' }

interface CartContextValue extends CartState {
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  clearCart: () => void
}

// ── Reducer ───────────────────────────────────────────────────────────────────

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id)
      const items = existing
        ? state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.items, { product: action.product, quantity: 1 }]
      return deriveState(items)
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter((i) => i.product.id !== action.productId)
      return deriveState(items)
    }
    case 'CLEAR_CART':
      return { items: [], totalCount: 0, totalPrice: 0 }
    default:
      return state
  }
}

function deriveState(items: CartItem[]): CartState {
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0)
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  return { items, totalCount, totalPrice }
}

const initialState: CartState = { items: [], totalCount: 0, totalPrice: 0 }

// ── Context ───────────────────────────────────────────────────────────────────

const CartContext = createContext<CartContextValue>({
  ...initialState,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
})

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  return (
    <CartContext.Provider
      value={{
        ...state,
        addItem: (product) => dispatch({ type: 'ADD_ITEM', product }),
        removeItem: (productId) => dispatch({ type: 'REMOVE_ITEM', productId }),
        clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
