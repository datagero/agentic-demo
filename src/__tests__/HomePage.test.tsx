import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import HomePage from '../pages/HomePage'
import { guest, voyage, recommendations, quickActions, medallionMoments } from '../data/mock'
import { ToastProvider } from '../contexts/ToastContext'
import ToastStack from '../components/Toast'

function renderPage(initialPath = '/') {
  const Sentinel = ({ label }: { label: string }) => <div data-testid={`route-${label}`}>{label}</div>

  return render(
    <ToastProvider>
      <ToastStack />
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkin" element={<Sentinel label="checkin" />} />
          <Route path="/commerce" element={<Sentinel label="commerce" />} />
          <Route path="/itinerary" element={<Sentinel label="itinerary" />} />
          <Route path="/navigator" element={<Sentinel label="navigator" />} />
        </Routes>
      </MemoryRouter>
    </ToastProvider>
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

// ── Medallion Moments (#53 + #54) ─────────────────────────────────────────────

// Derive the top 3 moments by priority to keep tests in sync with component logic
const priorityOrder: Record<string, number> = { high: 0, medium: 1, low: 2 }
const top3Moments = [...medallionMoments]
  .sort((a, b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  .slice(0, 3)

describe('HomePage — Medallion Moments', () => {
  it('renders the "For You Right Now" section heading', () => {
    renderPage()
    expect(screen.getByText('For You Right Now')).toBeInTheDocument()
  })

  it('shows exactly 3 moment cards', () => {
    renderPage()
    // Each card renders a "Why this?" button — use that as a proxy count
    const whyButtons = screen.getAllByText('Why this?')
    expect(whyButtons).toHaveLength(3)
  })

  it('renders the title and detail of each top moment', () => {
    renderPage()
    top3Moments.forEach((moment) => {
      expect(screen.getByText(moment.title)).toBeInTheDocument()
      expect(screen.getByText(moment.detail)).toBeInTheDocument()
    })
  })

  it('dismissing a moment removes it from the list', async () => {
    renderPage()
    const firstMoment = top3Moments[0]
    const dismissBtn = screen.getByLabelText(`Dismiss ${firstMoment.title}`)
    await userEvent.click(dismissBtn)
    expect(screen.queryByText(firstMoment.title)).not.toBeInTheDocument()
  })

  it('CTA button triggers a toast notification', async () => {
    renderPage()
    const firstMoment = top3Moments[0]
    const ctaBtn = screen.getByText(firstMoment.cta.label)
    await userEvent.click(ctaBtn)
    // Toast should appear with some non-empty message
    const toasts = screen.getAllByRole('status')
    expect(toasts.length).toBeGreaterThan(0)
  })

  it('"Why this?" button toggles the reason panel', async () => {
    renderPage()
    const firstMoment = top3Moments[0]
    // Reason panel should not be visible initially
    expect(screen.queryByText(firstMoment.reason)).not.toBeInTheDocument()

    // Click "Why this?" for first moment
    const whyBtns = screen.getAllByText('Why this?')
    await userEvent.click(whyBtns[0])

    // Reason panel should now be visible
    expect(screen.getByText(firstMoment.reason)).toBeInTheDocument()
  })

  it('"Why this?" button has correct aria-expanded state', async () => {
    renderPage()
    const whyBtns = screen.getAllByText('Why this?')
    const firstBtn = whyBtns[0]

    expect(firstBtn).toHaveAttribute('aria-expanded', 'false')
    await userEvent.click(firstBtn)
    expect(firstBtn).toHaveAttribute('aria-expanded', 'true')
  })

  it('reason text matches mock data', async () => {
    renderPage()
    const whyBtns = screen.getAllByText('Why this?')

    for (let i = 0; i < whyBtns.length; i++) {
      await userEvent.click(whyBtns[i])
      expect(screen.getByText(top3Moments[i].reason)).toBeInTheDocument()
    }
  })

  it('closing reason panel hides the reason text', async () => {
    renderPage()
    const firstMoment = top3Moments[0]
    const whyBtns = screen.getAllByText('Why this?')

    // Open
    await userEvent.click(whyBtns[0])
    expect(screen.getByText(firstMoment.reason)).toBeInTheDocument()

    // Close
    await userEvent.click(whyBtns[0])
    expect(screen.queryByText(firstMoment.reason)).not.toBeInTheDocument()
  })
})
