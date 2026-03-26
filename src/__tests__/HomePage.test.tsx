import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import { guest, voyage, recommendations, quickActions } from '../data/mock'

function renderPage(initialPath = '/') {
  const Sentinel = ({ label }: { label: string }) => <div data-testid={`route-${label}`}>{label}</div>

  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/checkin" element={<Sentinel label="checkin" />} />
        <Route path="/commerce" element={<Sentinel label="commerce" />} />
        <Route path="/itinerary" element={<Sentinel label="itinerary" />} />
        <Route path="/navigator" element={<Sentinel label="navigator" />} />
      </Routes>
    </MemoryRouter>
  )
}

describe('HomePage', () => {
  it('renders the ship name and region', () => {
    renderPage()
    expect(screen.getByText(voyage.shipName)).toBeInTheDocument()
    expect(screen.getAllByText(new RegExp(voyage.region)).length).toBeGreaterThan(0)
  })

  it('shows the countdown to departure', () => {
    renderPage()
    expect(screen.getByText(String(voyage.daysUntilDeparture))).toBeInTheDocument()
    expect(screen.getByText(/days until departure/i)).toBeInTheDocument()
  })

  it('displays Medallion tier status', () => {
    renderPage()
    expect(screen.getByText(new RegExp(`${guest.medallionTier} Medallion Member`))).toBeInTheDocument()
    expect(screen.getByText(new RegExp(guest.medallionPoints.toLocaleString()))).toBeInTheDocument()
  })

  it('renders all quick action buttons', () => {
    renderPage()
    quickActions.forEach((action) => {
      expect(screen.getByLabelText(action.label)).toBeInTheDocument()
    })
  })

  it('shows AI recommendations with reasons', () => {
    renderPage()
    recommendations.forEach((rec) => {
      expect(screen.getByText(rec.title)).toBeInTheDocument()
      expect(screen.getByText(rec.aiReason)).toBeInTheDocument()
    })
  })

  it('displays voyage departure and return dates', () => {
    renderPage()
    expect(screen.getByText(voyage.departureDate)).toBeInTheDocument()
    expect(screen.getByText(voyage.returnDate)).toBeInTheDocument()
  })

  it('shows the AI badge', () => {
    renderPage()
    expect(screen.getByText('AI')).toBeInTheDocument()
  })

  it('quick action Check-in navigates to /checkin', async () => {
    renderPage()
    await userEvent.click(screen.getByLabelText('Check-in'))
    expect(screen.getByTestId('route-checkin')).toBeInTheDocument()
  })

  it('quick action Reserve Dining navigates to /commerce', async () => {
    renderPage()
    await userEvent.click(screen.getByLabelText('Reserve Dining'))
    expect(screen.getByTestId('route-commerce')).toBeInTheDocument()
  })

  it('quick action Shore Excursions navigates to /itinerary', async () => {
    renderPage()
    await userEvent.click(screen.getByLabelText('Shore Excursions'))
    expect(screen.getByTestId('route-itinerary')).toBeInTheDocument()
  })

  it('quick action Spa & Wellness navigates to /commerce', async () => {
    renderPage()
    await userEvent.click(screen.getByLabelText('Spa & Wellness'))
    expect(screen.getByTestId('route-commerce')).toBeInTheDocument()
  })

  it('recommendation Chef\'s Table navigates to /commerce', async () => {
    renderPage()
    await userEvent.click(screen.getByLabelText("Chef's Table Experience"))
    expect(screen.getByTestId('route-commerce')).toBeInTheDocument()
  })

  it('recommendation Snorkeling navigates to /itinerary', async () => {
    renderPage()
    await userEvent.click(screen.getByLabelText('Snorkeling at Princess Cays'))
    expect(screen.getByTestId('route-itinerary')).toBeInTheDocument()
  })

  it('recommendation Couples Spa Retreat navigates to /commerce', async () => {
    renderPage()
    await userEvent.click(screen.getByLabelText('Couples Spa Retreat'))
    expect(screen.getByTestId('route-commerce')).toBeInTheDocument()
  })
})
