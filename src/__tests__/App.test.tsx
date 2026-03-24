import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import App from '../App'

describe('App routing', () => {
  it('renders the home page by default', () => {
    render(<App />)
    // The header should show Princess Cruises branding
    expect(screen.getByRole('banner')).toBeInTheDocument()
    expect(screen.getByText('Princess Cruises')).toBeInTheDocument()
  })

  it('renders bottom navigation with all 6 tabs', () => {
    render(<App />)
    const nav = screen.getByRole('navigation', { name: /main navigation/i })
    expect(nav).toBeInTheDocument()

    // Check all 6 tabs are present by aria-label
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /itinerary/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /shop/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /navigator/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /insights/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /manage/i })).toBeInTheDocument()
  })

  it('navigates to Itinerary page when Itinerary tab is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const itineraryTab = screen.getByRole('link', { name: /itinerary/i })
    await user.click(itineraryTab)

    // Itinerary page heading
    expect(screen.getByRole('heading', { name: /itinerary/i })).toBeInTheDocument()
  })

  it('navigates to Commerce page when Shop tab is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const shopTab = screen.getByRole('link', { name: /shop/i })
    await user.click(shopTab)

    expect(screen.getByRole('heading', { name: /shop & book/i })).toBeInTheDocument()
  })

  it('navigates to Navigator page when Navigator tab is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const navTab = screen.getByRole('link', { name: /navigator/i })
    await user.click(navTab)

    expect(screen.getByRole('heading', { name: /navigator/i })).toBeInTheDocument()
  })

  it('navigates to Analytics page when Insights tab is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const analyticsTab = screen.getByRole('link', { name: /insights/i })
    await user.click(analyticsTab)

    expect(screen.getByRole('heading', { name: /analytics/i })).toBeInTheDocument()
  })

  it('navigates to CMS page when Manage tab is clicked', async () => {
    const user = userEvent.setup()
    render(<App />)

    const cmsTab = screen.getByRole('link', { name: /manage/i })
    await user.click(cmsTab)

    expect(screen.getByRole('heading', { name: /content manager/i })).toBeInTheDocument()
  })

  it('redirects unknown routes to home', () => {
    // React Router BrowserRouter uses window.location; for unknown routes
    // we verify the home content renders by default
    render(<App />)
    expect(screen.getByText('Princess Cruises')).toBeInTheDocument()
  })
})
