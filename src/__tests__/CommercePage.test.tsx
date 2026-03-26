import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import CommercePage from '../pages/CommercePage'
import { CartProvider } from '../contexts/CartContext'
import { products } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <CartProvider>
        <CommercePage />
      </CartProvider>
    </BrowserRouter>
  )
}

describe('CommercePage', () => {
  it('renders the commerce heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /shop & book/i })).toBeInTheDocument()
  })

  it('displays all product cards', () => {
    renderPage()
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
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByText('Dining'))
    const diningProducts = products.filter((p) => p.category === 'dining')
    diningProducts.forEach((product) => {
      expect(screen.getByText(product.name)).toBeInTheDocument()
    })

    // Non-dining products should not be visible
    const nonDining = products.filter((p) => p.category !== 'dining')
    nonDining.forEach((product) => {
      expect(screen.queryByText(product.name)).not.toBeInTheDocument()
    })
  })

  it('shows Medallion discount badges', () => {
    renderPage()
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

  it('has Add to cart buttons for each product', () => {
    renderPage()
    const addButtons = screen.getAllByText('Add')
    expect(addButtons.length).toBe(products.length)
  })

  it('shows product ratings', () => {
    renderPage()
    const uniqueRatings = [...new Set(products.map((p) => String(p.rating)))]
    uniqueRatings.forEach((rating) => {
      expect(screen.getAllByText(rating).length).toBeGreaterThan(0)
    })
  })

  it('adds item to cart and updates cart count', async () => {
    const user = userEvent.setup()
    renderPage()

    // Initially 0 items
    expect(screen.getByLabelText(/view cart with 0 items/i)).toBeInTheDocument()

    // Click the first Add button
    const addButtons = screen.getAllByText('Add')
    await user.click(addButtons[0])

    // Count should now be 1
    expect(screen.getByLabelText(/view cart with 1 items/i)).toBeInTheDocument()
    expect(screen.getAllByText('1').length).toBeGreaterThan(0)
  })

  it('increments cart count for each added item', async () => {
    const user = userEvent.setup()
    renderPage()

    const addButtons = screen.getAllByText('Add')
    await user.click(addButtons[0])
    await user.click(addButtons[1])

    expect(screen.getByLabelText(/view cart with 2 items/i)).toBeInTheDocument()
  })

  it('opens the cart drawer when cart button is clicked', async () => {
    const user = userEvent.setup()
    renderPage()

    const cartButton = screen.getByLabelText(/view cart/i)
    await user.click(cartButton)

    expect(screen.getByRole('dialog', { name: /shopping cart/i })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: /your cart/i })).toBeInTheDocument()
  })

  it('closes the cart drawer when close button is clicked', async () => {
    const user = userEvent.setup()
    renderPage()

    // Open drawer
    await user.click(screen.getByLabelText(/view cart/i))
    expect(screen.getByRole('dialog', { name: /shopping cart/i })).toBeInTheDocument()

    // Close drawer
    await user.click(screen.getByLabelText(/close cart/i))

    // Dialog is still in DOM but translated off screen — check close button disappeared as proxy
    // or that empty state message is still there
    const dialog = screen.getByRole('dialog', { name: /shopping cart/i })
    expect(dialog).toBeInTheDocument()
    expect(dialog).toHaveClass('translate-y-full')
  })

  it('shows cart items in drawer after adding product', async () => {
    const user = userEvent.setup()
    renderPage()

    // Add first product to cart
    const addButtons = screen.getAllByText('Add')
    await user.click(addButtons[0])

    // Open drawer
    await user.click(screen.getByLabelText(/view cart with 1 items/i))

    // Product name should appear in drawer
    expect(screen.getAllByText(products[0].name).length).toBeGreaterThan(0)
  })

  it('removes item from cart via drawer remove button', async () => {
    const user = userEvent.setup()
    renderPage()

    // Add first product
    const addButtons = screen.getAllByText('Add')
    await user.click(addButtons[0])

    // Open drawer
    await user.click(screen.getByLabelText(/view cart with 1 items/i))

    // Remove the item
    await user.click(screen.getByLabelText(`Remove ${products[0].name} from cart`))

    // Cart count should be 0
    expect(screen.getByLabelText(/view cart with 0 items/i)).toBeInTheDocument()
  })
})
