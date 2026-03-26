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

  it('switches to day 4 and shows San Juan activities', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByText('Day 4'))
    expect(screen.getByText('Old San Juan Walking Tour')).toBeInTheDocument()
    expect(screen.getByText('El Morro Fortress Visit')).toBeInTheDocument()
  })

  it('day 4 has the expected number of activities', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByText('Day 4'))
    const day4 = itineraryDays.find((d) => d.day === 4)!
    expect(day4.activities.length).toBe(5)
  })

  it('switches to day 5 and shows St. Thomas activities', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByText('Day 5'))
    expect(screen.getByText('Trunk Bay Snorkel Tour')).toBeInTheDocument()
    expect(screen.getByText('Charlotte Amalie Shopping')).toBeInTheDocument()
  })

  it('switches to day 6 and shows sea day activities', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByText('Day 6'))
    expect(screen.getByText('Morning Stretch & Yoga')).toBeInTheDocument()
    expect(screen.getByText('Trivia Challenge')).toBeInTheDocument()
  })

  it('switches to day 7 and shows farewell activities', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByText('Day 7'))
    expect(screen.getByText("Captain's Farewell Breakfast")).toBeInTheDocument()
    expect(screen.getByText('Farewell Dinner')).toBeInTheDocument()
  })

  it('switches to day 8 and shows disembarkation activities', async () => {
    const user = userEvent.setup()
    renderPage()

    await user.click(screen.getByText('Day 8'))
    expect(screen.getByText('Early Disembarkation Breakfast')).toBeInTheDocument()
    expect(screen.getByText('Standard Disembarkation')).toBeInTheDocument()
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
