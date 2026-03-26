import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import App from '../App'

/**
 * End-to-end integration test: Sarah's 8-screen journey
 *
 * Simulates the 1-minute demo walkthrough navigating all 8 screens
 * and verifying key content and interactions at each stop.
 */
describe('E2E: Sarah\'s Demo Journey', () => {
  it('walks through all 8 screens with key interactions', async () => {
    const user = userEvent.setup()
    render(<App />)

    // ── Screen 1: Home Dashboard ──────────────────────────────────────────
    // Verify personalized content is present
    expect(screen.getByText('Caribbean Princess')).toBeInTheDocument()
    expect(screen.getByText('14')).toBeInTheDocument() // countdown
    expect(screen.getByText(/Gold Medallion Member/)).toBeInTheDocument()
    expect(screen.getByText('AI')).toBeInTheDocument()

    // Verify quick action buttons are present and interactive
    const reserveDiningBtn = screen.getByRole('button', { name: /Reserve Dining/i })
    const shoreExcursionsBtn = screen.getByRole('button', { name: /Shore Excursions/i })
    expect(reserveDiningBtn).toHaveAttribute('aria-label')
    expect(shoreExcursionsBtn).toHaveAttribute('aria-label')

    // Verify recommendation cards are present (rendered as buttons)
    expect(screen.getByRole('button', { name: /Chef's Table Experience/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Snorkeling at Princess Cays/i })).toBeInTheDocument()

    // Verify recommendations are loaded
    expect(screen.getByText("Chef's Table Experience")).toBeInTheDocument()
    expect(screen.getByText('Based on your love of Italian cuisine')).toBeInTheDocument()

    // ── Screen 2: CheckIn (via OceanReady banner) ───────────────────────
    await user.click(screen.getByText('OceanReady Check-In'))

    // Verify CheckIn page content
    expect(screen.getByRole('heading', { name: /oceanready/i })).toBeInTheDocument()
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toBeInTheDocument()
    expect(progressBar).toHaveAttribute('aria-valuenow', '60')
    expect(screen.getByText(/3 of 5 steps complete/)).toBeInTheDocument()

    // Verify AI Assisted badges
    const aiBadges = screen.getAllByText('AI Assisted')
    expect(aiBadges.length).toBeGreaterThan(0)

    // Verify companion names
    expect(screen.getByText('James Mitchell')).toBeInTheDocument()
    expect(screen.getByText('Emma Mitchell')).toBeInTheDocument()

    // Verify Continue button advances to next step (60% → 80%)
    const continueBtn = screen.getByRole('button', { name: /continue/i })
    expect(continueBtn).toBeInTheDocument()
    await user.click(continueBtn)
    const updatedProgressBar = screen.getByRole('progressbar')
    expect(updatedProgressBar).toHaveAttribute('aria-valuenow', '80')

    // Navigate back to Home
    await user.click(screen.getByRole('button', { name: /back to home/i }))
    expect(screen.getByText('Caribbean Princess')).toBeInTheDocument()

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

    // ── Cart flow ─────────────────────────────────────────────────────────
    // Click the Add button for the first product (Sabatini's Italian Trattoria)
    const addBtn = screen.getByRole('button', { name: /Add Sabatini's Italian Trattoria to cart/i })
    await user.click(addBtn)

    // Cart count badge on the View Cart button should update to 1
    expect(screen.getByRole('button', { name: /View cart with 1 items/i })).toBeInTheDocument()

    // Open the cart drawer
    await user.click(screen.getByRole('button', { name: /View cart with 1 items/i }))

    // Verify CartDrawer is open with correct ARIA attributes
    const cartDialog = screen.getByRole('dialog', { name: /Shopping cart/i })
    expect(cartDialog).toBeInTheDocument()

    // Verify item name and price appear in the drawer
    within(cartDialog).getByText("Sabatini's Italian Trattoria")
    const priceInstances = within(cartDialog).getAllByText(/\$29/)
    expect(priceInstances.length).toBeGreaterThan(0)

    // Close the drawer
    await user.click(within(cartDialog).getByRole('button', { name: /Close cart/i }))

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

    // ── Screen 6: Journey (via KPI card) ────────────────────────────────
    // Click a KPI card to navigate to the Journey deep-dive
    await user.click(screen.getByLabelText(/NPS Score/))

    expect(screen.getByRole('heading', { name: /guest journey/i })).toBeInTheDocument()

    // Verify funnel stages
    expect(screen.getByText('App Open')).toBeInTheDocument()
    expect(screen.getByText('Pre-Cruise Purchase')).toBeInTheDocument()

    // Verify NPS value
    expect(screen.getByText('72')).toBeInTheDocument()

    // Verify conversion drivers
    expect(screen.getByText('AI-personalized recommendations')).toBeInTheDocument()
    expect(screen.getByText('Medallion-tiered pricing')).toBeInTheDocument()

    // Navigate back to Analytics
    await user.click(screen.getByRole('button', { name: /back to analytics/i }))
    expect(screen.getByRole('heading', { name: /analytics/i })).toBeInTheDocument()

    // ── Screen 7: CMS (via Manage tab) ──────────────────────────────────
    await user.click(screen.getByRole('link', { name: /manage/i }))

    expect(screen.getByRole('heading', { name: /content manager/i })).toBeInTheDocument()

    // Verify content items are present
    expect(screen.getByText('Lido Deck Lunch Menu — Week 2')).toBeInTheDocument()
    expect(screen.getByText('Princess Cays Shore Guide')).toBeInTheDocument()
    expect(screen.getByText('Muster Drill Safety Brief')).toBeInTheDocument()

    // Switch to Notifications tab
    await user.click(screen.getByText('Notifications'))

    // Verify notification composer elements
    expect(screen.getByLabelText(/notification title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/notification message/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/send notification/i)).toBeInTheDocument()

    // Verify recent notifications
    expect(screen.getByText('Port Arrival')).toBeInTheDocument()
    expect(screen.getByText('Spa Flash Sale')).toBeInTheDocument()

    // ── Navigate back to Home ─────────────────────────────────────────────
    await user.click(screen.getByRole('link', { name: /home/i }))
    expect(screen.getByText('Caribbean Princess')).toBeInTheDocument()

    // Full 8-screen journey complete — demo can be walked through end-to-end
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

    // CMS
    await user.click(screen.getByRole('link', { name: /manage/i }))
    checkBranding()
  })

  it('navigation tabs highlight correctly for each screen', async () => {
    const user = userEvent.setup()
    render(<App />)

    const tabNames = ['Home', 'Itinerary', 'Shop', 'Navigator', 'Insights', 'Manage']

    for (const name of tabNames) {
      const link = screen.getByRole('link', { name: new RegExp(name, 'i') })
      await user.click(link)
      // Active tab should have navy color class
      expect(link.className).toContain('text-pcl-navy')
    }
  })

  it('verifies accessibility attributes across interactive components', async () => {
    const user = userEvent.setup()
    render(<App />)

    // Ensure we start on the Home page
    await user.click(screen.getByRole('link', { name: /home/i }))

    // Home: quick action buttons have aria-label attributes
    const reserveBtn = screen.getByRole('button', { name: /Reserve Dining/i })
    const excursionsBtn = screen.getByRole('button', { name: /Shore Excursions/i })
    expect(reserveBtn).toHaveAttribute('aria-label')
    expect(excursionsBtn).toHaveAttribute('aria-label')

    // CheckIn page: progress bar has correct ARIA attributes at 60%
    await user.click(screen.getByText('OceanReady Check-In'))
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '60')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')

    // Navigate to Commerce and verify CartDrawer accessibility
    await user.click(screen.getByRole('link', { name: /shop/i }))

    // Add to cart button has aria-label
    const addBtn = screen.getByRole('button', { name: /Add Sabatini's Italian Trattoria to cart/i })
    expect(addBtn).toHaveAttribute('aria-label')

    // Open cart drawer and verify ARIA role + label
    await user.click(addBtn)
    await user.click(screen.getByRole('button', { name: /View cart with 1 items/i }))
    const cartDialog = screen.getByRole('dialog', { name: /Shopping cart/i })
    expect(cartDialog).toHaveAttribute('role', 'dialog')
    expect(cartDialog).toHaveAttribute('aria-label', 'Shopping cart')
    expect(cartDialog).toHaveAttribute('aria-modal', 'true')
  })
})
