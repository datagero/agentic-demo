import { render, screen, act, fireEvent } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import { ToastProvider } from '../contexts/ToastContext'
import ToastStack from '../components/Toast'
import VoyageRewindPage from '../pages/VoyageRewindPage'
import { voyageRewindData } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <ToastStack />
        <VoyageRewindPage />
      </ToastProvider>
    </BrowserRouter>
  )
}

describe('VoyageRewindPage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    act(() => { vi.runOnlyPendingTimers() })
    vi.useRealTimers()
  })

  it('renders the page header', () => {
    renderPage()
    expect(screen.getByText('Your Voyage in Review')).toBeInTheDocument()
  })

  it('Stats card renders 4 statistics with labels', () => {
    renderPage()
    // Verify all 4 stat labels are present — labels are unique
    voyageRewindData.stats.forEach((stat) => {
      expect(screen.getByText(stat.label)).toBeInTheDocument()
    })
  })

  it('Stats card renders all 4 stat values', () => {
    renderPage()
    // Values may collide with day numbers so use getAllByText and verify at least one exists per value
    voyageRewindData.stats.forEach((stat) => {
      expect(screen.getAllByText(stat.value).length).toBeGreaterThan(0)
    })
  })

  it('Timeline renders 8 days with port names', () => {
    renderPage()
    voyageRewindData.dayHighlights.forEach((day) => {
      // Port name appears in the timeline
      expect(screen.getAllByText(day.port).length).toBeGreaterThan(0)
    })
    // 8 day highlights in data
    expect(voyageRewindData.dayHighlights).toHaveLength(8)
  })

  it('Voyage Card shows guest name', () => {
    renderPage()
    expect(screen.getByText(voyageRewindData.voyageCard.guestName)).toBeInTheDocument()
  })

  it('Voyage Card shows tier badge', () => {
    renderPage()
    const tiers = screen.getAllByText(voyageRewindData.voyageCard.tier)
    expect(tiers.length).toBeGreaterThan(0)
  })

  it('Voyage Card shows favorite port', () => {
    renderPage()
    // Favorite port appears in voyage card and possibly in timeline
    expect(screen.getAllByText(voyageRewindData.voyageCard.favoritePort).length).toBeGreaterThan(0)
  })

  it('Rebook section shows next sailing name', () => {
    renderPage()
    expect(screen.getByText(voyageRewindData.nextSailing.name)).toBeInTheDocument()
  })

  it('Rebook section shows next sailing dates', () => {
    renderPage()
    expect(screen.getByText(voyageRewindData.nextSailing.dates)).toBeInTheDocument()
  })

  it('Rebook section shows all favorite ports', () => {
    renderPage()
    voyageRewindData.nextSailing.favoritePorts.forEach((port) => {
      expect(screen.getByText(port)).toBeInTheDocument()
    })
  })

  it('Share Your Voyage button is present', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /share your voyage/i })).toBeInTheDocument()
  })

  it('Reserve Now button is present', () => {
    renderPage()
    expect(screen.getByRole('button', { name: /reserve now/i })).toBeInTheDocument()
  })

  it('Share Your Voyage button triggers a success toast', () => {
    renderPage()
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /share your voyage/i }))
    })
    expect(screen.getByText(/copied to clipboard/i)).toBeInTheDocument()
  })

  it('Reserve Now button triggers a success toast', () => {
    renderPage()
    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /reserve now/i }))
    })
    expect(screen.getByText(/booking request sent/i)).toBeInTheDocument()
  })
})
