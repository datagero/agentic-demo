import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import JourneyPage from '../pages/JourneyPage'
import { journeyAnalytics } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <JourneyPage />
    </BrowserRouter>
  )
}

describe('JourneyPage', () => {
  it('renders the heading "Guest Journey"', () => {
    renderPage()
    expect(screen.getByText('Guest Journey')).toBeInTheDocument()
  })

  it('renders a back button labelled "Back to Dashboard"', () => {
    renderPage()
    expect(screen.getByLabelText('Back to Analytics')).toBeInTheDocument()
    expect(screen.getByText('Back to Dashboard')).toBeInTheDocument()
  })

  it('renders all 7 funnel stages', () => {
    renderPage()
    journeyAnalytics.funnel.forEach((stage) => {
      expect(screen.getByText(stage.stage)).toBeInTheDocument()
    })
  })

  it('shows drop-off percentages for non-first stages', () => {
    renderPage()
    journeyAnalytics.funnel.forEach((stage) => {
      if (stage.dropOff > 0) {
        expect(screen.getByText(`↓${stage.dropOff}%`)).toBeInTheDocument()
      }
    })
  })

  it('highlights biggest drop-off stages in amber', () => {
    renderPage()
    const highlightedStages = journeyAnalytics.funnel.filter((s) => s.isHighlighted)
    expect(highlightedStages.length).toBeGreaterThan(0)
    highlightedStages.forEach((stage) => {
      const el = screen.getByText(stage.stage)
      expect(el.className).toContain('text-amber-600')
    })
  })

  it('renders the NPS trend chart', () => {
    renderPage()
    expect(screen.getByRole('img', { name: 'NPS trend chart' })).toBeInTheDocument()
  })

  it('displays the current NPS of 72', () => {
    renderPage()
    expect(screen.getByText('72')).toBeInTheDocument()
    expect(screen.getByText('Current NPS')).toBeInTheDocument()
  })

  it('renders all conversion drivers and blockers', () => {
    renderPage()
    journeyAnalytics.conversionDrivers.forEach((driver) => {
      expect(screen.getByText(driver.driver)).toBeInTheDocument()
      expect(screen.getByText(driver.impact)).toBeInTheDocument()
    })
  })

  it('shows the section labels', () => {
    renderPage()
    expect(screen.getByText('Conversion Funnel')).toBeInTheDocument()
    expect(screen.getByText('NPS Trend (7-Day)')).toBeInTheDocument()
    expect(screen.getByText(/Conversion Drivers/)).toBeInTheDocument()
  })
})
