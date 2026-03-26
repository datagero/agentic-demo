import { render, screen } from '@testing-library/react'
import { useRef } from 'react'
import { describe, it, expect, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import CheckoutPage from '../pages/CheckoutPage'
import { CartProvider } from '../contexts/CartContext'
import { useCart } from '../contexts/CartContext'
import { products, guest } from '../data/mock'

// Helper to render CheckoutPage with an empty cart
function renderPage() {
  return render(
    <BrowserRouter>
      <CartProvider>
        <CheckoutPage />
      </CartProvider>
    </BrowserRouter>
  )
}

// Helper: wrapper component that pre-loads cart with items before rendering CheckoutPage
function CheckoutWithItems({ itemIds }: { itemIds: string[] }) {
  const { addItem } = useCart()
  const hasAdded = useRef(false)
  if (!hasAdded.current) {
    hasAdded.current = true
    itemIds.forEach((id) => {
      const product = products.find((p) => p.id === id)
      if (product) addItem(product)
    })
  }
  return <CheckoutPage />
}

function renderPageWithItems(itemIds: string[]) {
  return render(
    <BrowserRouter>
      <CartProvider>
        <CheckoutWithItems itemIds={itemIds} />
      </CartProvider>
    </BrowserRouter>
  )
}

// Mock navigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual<typeof import('react-router-dom')>('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

describe('CheckoutPage', () => {
  it('renders the checkout heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /checkout/i })).toBeInTheDocument()
  })

  it('renders order summary with cart items', () => {
    renderPageWithItems(['p1', 'p3'])
    const p1 = products.find((p) => p.id === 'p1')!
    const p3 = products.find((p) => p.id === 'p3')!

    expect(screen.getByText(p1.name)).toBeInTheDocument()
    expect(screen.getByText(p3.name)).toBeInTheDocument()
  })

  it('shows item quantity and price', () => {
    renderPageWithItems(['p1'])
    const p1 = products.find((p) => p.id === 'p1')!
    // Qty: 1 × $29
    expect(screen.getByText(`Qty: 1 × $${p1.price}`)).toBeInTheDocument()
  })

  it('shows subtotal', () => {
    renderPageWithItems(['p1'])
    const p1 = products.find((p) => p.id === 'p1')!
    expect(screen.getByText(`$${p1.price.toFixed(2)}`)).toBeInTheDocument()
  })

  it('shows Medallion discount for Gold member', () => {
    renderPageWithItems(['p1'])
    const p1 = products.find((p) => p.id === 'p1')!
    const discount = p1.price * 0.15

    // Guest is Gold tier per mock data
    expect(guest.medallionTier).toBe('Gold')
    expect(screen.getByText(/gold medallion discount/i)).toBeInTheDocument()
    expect(screen.getByTestId('discount-amount')).toHaveTextContent(`−$${discount.toFixed(2)}`)
  })

  it('shows final total after Medallion discount', () => {
    renderPageWithItems(['p1'])
    const p1 = products.find((p) => p.id === 'p1')!
    const discount = p1.price * 0.15
    const finalTotal = p1.price - discount

    expect(screen.getByTestId('final-total')).toHaveTextContent(`$${finalTotal.toFixed(2)}`)
  })

  it('Place Order button shows success confirmation', async () => {
    const user = userEvent.setup()
    renderPageWithItems(['p1'])

    const placeOrderBtn = screen.getByRole('button', { name: /place order/i })
    await user.click(placeOrderBtn)

    expect(screen.getByRole('status')).toBeInTheDocument()
    expect(screen.getByText(/order confirmed/i)).toBeInTheDocument()
    expect(screen.getByTestId('order-number')).toBeInTheDocument()
  })

  it('success confirmation includes guest first name', async () => {
    const user = userEvent.setup()
    renderPageWithItems(['p1'])

    await user.click(screen.getByRole('button', { name: /place order/i }))

    expect(screen.getByText(new RegExp(guest.firstName, 'i'))).toBeInTheDocument()
  })

  it('Return to Shopping navigates to /commerce', async () => {
    const user = userEvent.setup()
    mockNavigate.mockClear()
    renderPageWithItems(['p1'])

    // Place order first to reach success state
    await user.click(screen.getByRole('button', { name: /place order/i }))

    // Click Return to Shopping
    const returnBtn = screen.getByRole('button', { name: /return to shopping/i })
    await user.click(returnBtn)

    expect(mockNavigate).toHaveBeenCalledWith('/commerce')
  })

  it('Place Order button is disabled when cart is empty', () => {
    renderPage()
    const placeOrderBtn = screen.getByRole('button', { name: /place order/i })
    expect(placeOrderBtn).toBeDisabled()
  })

  it('displays guest name and Medallion tier in header', () => {
    renderPage()
    expect(
      screen.getByText(new RegExp(`${guest.firstName}.*${guest.medallionTier}`, 'i'))
    ).toBeInTheDocument()
  })
})
