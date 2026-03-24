import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import CommercePage from '../pages/CommercePage'
import { products } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <CommercePage />
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

  it('shows the cart button with item count', () => {
    renderPage()
    expect(screen.getByLabelText(/view cart/i)).toBeInTheDocument()
    expect(screen.getByText('2')).toBeInTheDocument()
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
})
