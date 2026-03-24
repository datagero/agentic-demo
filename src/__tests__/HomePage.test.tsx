import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import { guest, voyage, recommendations, quickActions } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <HomePage />
    </BrowserRouter>
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
})
