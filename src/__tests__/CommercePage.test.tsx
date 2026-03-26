import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import CommercePage from '../pages/CommercePage'
import { CartProvider } from '../contexts/CartContext'
import { ToastProvider } from '../contexts/ToastContext'
import { products } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <CartProvider>
        <ToastProvider>
          <CommercePage />
        </ToastProvider>
      </CartProvider>
    </BrowserRouter>
  )
}

async function advancePastLoading() {
  await act(async () => {
    vi.runAllTimers()
  })
}

describe('CommercePage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the commerce heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /shop & book/i })).toBeInTheDocument()
  })

  it('shows skeleton placeholders while loading', () => {
    renderPage()
    expect(screen.queryByText(products[0].name)).not.toBeInTheDocument()
    expect(screen.getByText(/loading/i)).toBeInTheDocument()
  })

  it('displays all product cards after loading', async () => {
    renderPage()
    await advancePastLoading()
    products.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument()
    })
  })

  it('shows category filter buttons', () => {
    renderPage()
    expect(screen.getByText('All')).toBeInTheDocument()
    expect(screen.getByText('Dining')).toBeInTheDocument()
    expect(screen.getByText('Spa')).toBeInTheDocument()
    expect(screen.getByText('Excursions')).toBeInTheDocument()
  })

  it('filters products by category', async () => {
    renderPage()
    await advancePastLoading()
    vi.useRealTimers()
    const user = userEvent.setup()

    await user.click(screen.getByText('Dining'))
    const diningProducts = products.filter((p) => p.category === 'dining')
    diningProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument()
    })
    const nonDining = products.filter((p) => p.category !== 'dining')
    nonDining.forEach((product) => {
      expect(screen.queryByText(product.name)).not.toBeInTheDocument()
    })
  })

  it('shows Medallion discount badges after loading', async () => {
    renderPage()
    await advancePastLoading()
    const discountedCount = products.filter((p) => p.medallionDiscount).length
    const badges = screen.getAllByText('Gold −15%')
    expect(badges.length).toBe(discountedCount)
  })

  it('shows the promo banner', () => {
    renderPage()
    expect(screen.getByText(/early bird special/i)).toBeInTheDocument()
  })

  it('shows the cart button with item count starting at 0', () => {
    renderPage()
    expect(screen.getByLabelText(/view cart/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/view cart with 0 items/i)).toBeInTheDocument()
  })

  it('has Add to cart buttons for each product after loading', async () => {
    renderPage()
    await advancePastLoading()
    const addButtons = screen.getAllByText('Add')
    expect(addButtons.length).toBe(products.length)
  })

  it('shows product ratings after loading', async () => {
    renderPage()
    await advancePastLoading()
    const uniqueRatings = [...new Set(products.map((p) => String(p.rating)))]
    uniqueRatings.forEach((rating) => {
      expect(screen.getAllByText(rating).length).toBeGreaterThan(0)
    })
  })

  it('adds item to cart and updates cart count', async () => {
    renderPage()
    await advancePastLoading()
    vi.useRealTimers()
    const user = userEvent.setup()

    expect(screen.getByLabelText(/view cart with 0 items/i)).toBeInTheDocument()
    const addButtons = screen.getAllByText('Add')
    await user.click(addButtons[0])
    expect(screen.getByLabelText(/view cart with 1 items/i)).toBeInTheDocument()
  })

  it('increments cart count for each added item', async () => {
    renderPage()
    await advancePastLoading()
    vi.useRealTimers()
    const user = userEvent.setup()

    const addButtons = screen.getAllByText('Add')
    await user.click(addButtons[0])
    await user.click(addButtons[1])
    expect(screen.getByLabelText(/view cart with 2 items/i)).toBeInTheDocument()
  })

  it('opens the cart drawer when cart button is clicked', async () => {
    renderPage()
    await advancePastLoading()
    vi.useRealTimers()
    const user = userEvent.setup()

    const cartButton = screen.getByLabelText(/view cart/i)
    await user.click(cartButton)
    expect(screen.getByRole('dialog', { name: /shopping cart/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /your cart/i })).toBeInTheDocument()
  })

  it('closes the cart drawer when close button is clicked', async () => {
    renderPage()
    await advancePastLoading()
    vi.useRealTimers()
    const user = userEvent.setup()

    await user.click(screen.getByLabelText(/view cart/i))
    expect(screen.getByRole('dialog', { name: /shopping cart/i })).toBeInTheDocument()
    await user.click(screen.getByLabelText(/close cart/i))
    const dialog = screen.getByRole('dialog', { name: /shopping cart/i })
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveClass('translate-y-full')
  })

  it('shows cart items in drawer after adding product', async () => {
    renderPage()
    await advancePastLoading()
    vi.useRealTimers()
    const user = userEvent.setup()

    const addButtons = screen.getAllByText('Add')
    await user.click(addButtons[0])
    await user.click(screen.getByLabelText(/view cart with 1 items/i))
    expect(screen.getAllByText(products[0].name).length).toBeGreaterThan(0)
  })

  it('removes item from cart via drawer remove button', async () => {
    renderPage()
    await advancePastLoading()
    vi.useRealTimers()
    const user = userEvent.setup()

    const addButtons = screen.getAllByText('Add')
    await user.click(addButtons[0])
    await user.click(screen.getByLabelText(/view cart with 1 items/i))
    await user.click(screen.getByLabelText(`Remove ${products[0].name} from cart`))
    expect(screen.getByLabelText(/view cart with 0 items/i)).toBeInTheDocument()
  })
})
