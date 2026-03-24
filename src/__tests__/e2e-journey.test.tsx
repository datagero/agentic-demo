import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import App from '../App'

/**
 * End-to-end integration test: Sarah's 5-screen journey
 *
 * Simulates the 1-minute demo walkthrough navigating all 5 screens
 * and verifying key content and interactions at each stop.
 */
describe('E2E: Sarah\'s Demo Journey', () => {
  it('walks through all 5 screens with key interactions', async () => {
    const user = userEvent.setup()
    render(<App />)

    // ── Screen 1: Home Dashboard ──────────────────────────────────────────
    // Verify personalized content is present
    expect(screen.getByText('Caribbean Princess')).toBeInTheDocument()
    expect(screen.getByText('14')).toBeInTheDocument() // countdown
    expect(screen.getByText(/Gold Medallion Member/)).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()

    // Verify recommendations are loaded
    expect(screen.getByText("Chef's Table Experience")).toBeInTheDocument()
    expect(screen.getByText('Based on your love of Italian cuisine')).toBeInTheDocument()

    // ── Navigate to Itinerary ─────────────────────────────────────────────
    await user.click(screen.getByRole('link', { name: /itinerary/i }))

    // Verify itinerary timeline loaded with Day 1
    expect(screen.getByRole('heading', { name: /itinerary/i })).toBeInTheDocument()
    expect(screen.getByText('Sail Away Party')).toBeInTheDocument()
    expect(screen.getByText('Welcome Dinner')).toBeInTheDocument()

    // Check AI badges are present
    const aiPicks = screen.getAllByText('AI Pick')
    expect(aiPicks.length).toBeGreaterThan(0)

    // Switch to ports view and back
    await user.click(screen.getByText('All Ports'))
    expect(screen.getAllByText('Fort Lauderdale, FL').length).toBeGreaterThan(0)
    expect(screen.getByText('Princess Cays, Bahamas')).toBeInTheDocument()
    await user.click(screen.getByText('Daily Plan'))

    // ── Navigate to Commerce ──────────────────────────────────────────────
    await user.click(screen.getByRole('link', { name: /shop/i }))

    expect(screen.getByRole('heading', { name: /shop & book/i })).toBeInTheDocument()
    expect(screen.getByText(/early bird special/i)).toBeInTheDocument()

    // Filter by dining
    await user.click(screen.getByText('Dining'))
    expect(screen.getByText("Sabatini's Italian Trattoria")).toBeInTheDocument()
    expect(screen.getByText('Crown Grill Steakhouse')).toBeInTheDocument()

    // Verify Medallion pricing
    const discountBadges = screen.getAllByText('Gold −15%')
    expect(discountBadges.length).toBeGreaterThan(0)

    // Go back to all products
    await user.click(screen.getByText('All'))

    // ── Navigate to Navigator ─────────────────────────────────────────────
    await user.click(screen.getByRole('link', { name: /navigator/i }))

    expect(screen.getByRole('heading', { name: /navigator/i })).toBeInTheDocument()
    expect(screen.getByText(/you are here/i)).toBeInTheDocument()
    expect(screen.getByText('Active')).toBeInTheDocument()

    // Search for spa
    const searchInput = screen.getByLabelText(/search for locations/i)
    await user.type(searchInput, 'Spa')
    expect(screen.getByText('Search Results')).toBeInTheDocument()
    await user.clear(searchInput)

    // Toggle accessibility
    const a11yToggle = screen.getByLabelText(/enable accessibility mode/i)
    await user.click(a11yToggle)
    expect(screen.getByText('ON')).toBeInTheDocument()

    // Turn off accessibility for consistency
    await user.click(screen.getByLabelText(/disable accessibility mode/i))

    // ── Navigate to Analytics ─────────────────────────────────────────────
    await user.click(screen.getByRole('link', { name: /insights/i }))

    expect(screen.getByRole('heading', { name: /analytics/i })).toBeInTheDocument()
    expect(screen.getByText('Stakeholder View')).toBeInTheDocument()

    // Verify all 4 KPIs
    expect(screen.getByText('NPS Score')).toBeInTheDocument()
    expect(screen.getByText('72')).toBeInTheDocument()
    expect(screen.getByText('App Rating')).toBeInTheDocument()
    expect(screen.getByText('Booking Conv.')).toBeInTheDocument()
    expect(screen.getByText('Rev/Guest')).toBeInTheDocument()
    expect(screen.getByText('$847')).toBeInTheDocument()

    // Verify engagement funnel
    expect(screen.getByText('App Downloads')).toBeInTheDocument()
    expect(screen.getByText('Repeat Bookers')).toBeInTheDocument()

    // Verify alerts
    expect(screen.getByText(/NPS trending above target/)).toBeInTheDocument()

    // Toggle to 30-day view
    await user.click(screen.getByText('Last 30 Days'))

    // ── Navigate back to Home ─────────────────────────────────────────────
    await user.click(screen.getByRole('link', { name: /home/i }))
    expect(screen.getByText('Caribbean Princess')).toBeInTheDocument()

    // Full journey complete — demo can be walked through end-to-end
  })

  it('maintains consistent branding across all screens', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Verify header is consistent on all screens
    const checkBranding = () => {
      expect(screen.getByRole('banner')).toBeInTheDocument()
      expect(screen.getByText('Princess Cruises')).toBeInTheDocument()
      expect(screen.getByText('Sarah M.')).toBeInTheDocument()
    }

    // Home
    checkBranding()

    // Itinerary
    await user.click(screen.getByRole('link', { name: /itinerary/i }))
    checkBranding()

    // Commerce
    await user.click(screen.getByRole('link', { name: /shop/i }))
    checkBranding()

    // Navigator
    await user.click(screen.getByRole('link', { name: /navigator/i }))
    checkBranding()

    // Analytics
    await user.click(screen.getByRole('link', { name: /insights/i }))
    checkBranding()
  })

  it('navigation tabs highlight correctly for each screen', async () => {
    const user = userEvent.setup()
    render(<App />)

    const tabNames = ['Home', 'Itinerary', 'Shop', 'Navigator', 'Insights']

    for (const name of tabNames) {
      const link = screen.getByRole('link', { name: new RegExp(name, 'i') })
      await user.click(link)
      // Active tab should have navy color class
      expect(link.className).toContain('text-pcl-navy')
    }
  })
})
