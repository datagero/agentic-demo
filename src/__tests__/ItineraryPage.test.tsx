import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import ItineraryPage from '../pages/ItineraryPage'
import { itineraryDays, portStops } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <ItineraryPage />
    </BrowserRouter>
  )
}

describe('ItineraryPage', () => {
  it('renders the itinerary heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /itinerary/i })).toBeInTheDocument()
  })

  it('shows day selector tabs for all port stops', () => {
    renderPage()
    portStops.forEach((stop) => {
      expect(screen.getByText(`Day ${stop.day}`)).toBeInTheDocument()
    })
  })

  it('displays activities for selected day', () => {
    renderPage()
    const day1 = itineraryDays[0]
    day1.activities.forEach((act) => {
      expect(screen.getByText(act.title)).toBeInTheDocument()
    })
  })

  it('shows AI Pick badges on AI-recommended activities', () => {
    renderPage()
    const aiCount = itineraryDays[0].activities.filter((a) => a.aiRecommended).length
    const badges = screen.getAllByText('AI Pick')
    expect(badges.length).toBe(aiCount)
  })

  it('shows For You badges on Medallion-personalized activities', () => {
    renderPage()
    const personalizedCount = itineraryDays[0].activities.filter((a) => a.medallionPersonalized).length
    const badges = screen.getAllByText('For You')
    expect(badges.length).toBe(personalizedCount)
  })

  it('switches to ports view when toggle is clicked', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByText('All Ports'))
    // All unique port names should appear
    const uniquePorts = [...new Set(portStops.map((s) => s.port))]
    uniquePorts.forEach((port) => {
      expect(screen.getAllByText(port).length).toBeGreaterThan(0)
    })
  })

  it('shows weather information for the selected day', () => {
    renderPage()
    const day1 = itineraryDays[0]
    expect(screen.getByText(new RegExp(`${day1.weather.temp}°F`))).toBeInTheDocument()
  })

  it('switches between Daily Plan and All Ports views', async () => {
    const user = userEvent.setup()
    renderPage()

    // Switch to ports
    await user.click(screen.getByText('All Ports'))
    // Fort Lauderdale appears twice in ports view (Day 1 and Day 8)
    const fortLauderdaleItems = screen.getAllByText('Fort Lauderdale, FL')
    expect(fortLauderdaleItems.length).toBeGreaterThan(0)

    // Switch back
    await user.click(screen.getByText('Daily Plan'))
    expect(screen.getByText('Activities')).toBeInTheDocument()
  })

  it('shows empty state when selecting a day with no activities', async () => {
    const user = userEvent.setup()
    renderPage()

    // Day 4 (San Juan) has no itinerary data in mock — should show fallback
    await user.click(screen.getByText('Day 4'))
    expect(screen.getByText(/select a day to view your personalized schedule/i)).toBeInTheDocument()
  })

  it('switches to day 2 and shows day 2 activities', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByText('Day 2'))
    // Day 2 has "Sunrise Yoga" and "Mixology Masterclass"
    expect(screen.getByText('Sunrise Yoga')).toBeInTheDocument()
    expect(screen.getByText('Mixology Masterclass')).toBeInTheDocument()
  })

  it('clicking a port in ports view switches to daily plan for that day', async () => {
    const user = userEvent.setup()
    renderPage()

    // Go to ports view
    await user.click(screen.getByText('All Ports'))

    // Click on Princess Cays (Day 3)
    await user.click(screen.getByText('Princess Cays, Bahamas'))

    // Should switch to daily plan showing Day 3 activities
    expect(screen.getByText('Snorkeling Adventure')).toBeInTheDocument()
  })

  it('shows activity descriptions when present', () => {
    renderPage()
    // Day 1 "Sail Away Party" has a description
    expect(screen.getByText('Live DJ and complimentary cocktails')).toBeInTheDocument()
  })
})
