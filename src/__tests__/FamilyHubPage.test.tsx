import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import FamilyHubPage from '../pages/FamilyHubPage'
import { ToastProvider } from '../contexts/ToastContext'

// Mock useToast so we can capture showToast calls
const mockShowToast = vi.fn()
vi.mock('../contexts/ToastContext', async (importOriginal) => {
  const actual = await importOriginal<typeof import('../contexts/ToastContext')>()
  return {
    ...actual,
    useToast: () => ({ showToast: mockShowToast, toasts: [], removeToast: vi.fn() }),
  }
})

function renderPage() {
  return render(
    <BrowserRouter>
      <ToastProvider>
        <FamilyHubPage />
      </ToastProvider>
    </BrowserRouter>
  )
}

describe('FamilyHubPage', () => {
  // ── Members ────────────────────────────────────────────────────────────────

  it('renders all 4 family member names', () => {
    renderPage()
    expect(screen.getAllByText('Sarah').length).toBeGreaterThan(0)
    expect(screen.getAllByText('James').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Emma').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Margaret').length).toBeGreaterThan(0)
  })

  it('shows (You) badge on Sarah\'s card', () => {
    renderPage()
    expect(screen.getByText('(You)')).toBeInTheDocument()
  })

  it('shows deck and location info for each member', () => {
    renderPage()
    expect(screen.getByText(/Deck 7.*Stateroom B420/)).toBeInTheDocument()
    expect(screen.getByText(/Deck 15.*Main Pool/)).toBeInTheDocument()
    expect(screen.getByText(/Deck 12.*Adventure Ocean/)).toBeInTheDocument()
    expect(screen.getByText(/Deck 6.*Crown Grill/)).toBeInTheDocument()
  })

  it('shows member activities', () => {
    renderPage()
    expect(screen.getByText('In cabin')).toBeInTheDocument()
    expect(screen.getByText('Swimming')).toBeInTheDocument()
    expect(screen.getByText('Kids Club (supervised)')).toBeInTheDocument()
    expect(screen.getByText('Dining')).toBeInTheDocument()
  })

  it('Find button triggers walking directions toast', () => {
    renderPage()
    // James has a Find button
    const findButtons = screen.getAllByRole('button', { name: /Find/i })
    expect(findButtons.length).toBeGreaterThan(0)
    fireEvent.click(findButtons[0])
    expect(mockShowToast).toHaveBeenCalledWith('Walking directions sent to your Medallion', 'info')
  })

  it('Sarah (You) does not have a Find button', () => {
    renderPage()
    // There should be 3 Find buttons (James, Emma, Margaret) — not 4
    const findButtons = screen.getAllByRole('button', { name: /Find/i })
    expect(findButtons.length).toBe(3)
  })

  // ── Activities ─────────────────────────────────────────────────────────────

  it('renders 2 activity cards', () => {
    renderPage()
    expect(screen.getByText('Dinner at Crown Grill')).toBeInTheDocument()
    expect(screen.getByText('Snorkeling at Cozumel')).toBeInTheDocument()
  })

  it('shows confirmed members for dinner activity', () => {
    renderPage()
    // Sarah, James, Margaret are confirmed for Crown Grill dinner
    const confirmedSarah = screen.getAllByText('Sarah')
    expect(confirmedSarah.length).toBeGreaterThan(0)
    const confirmedJames = screen.getAllByText('James')
    expect(confirmedJames.length).toBeGreaterThan(0)
  })

  it('shows pending members with Nudge buttons', () => {
    renderPage()
    const nudgeButtons = screen.getAllByRole('button', { name: /Nudge/i })
    expect(nudgeButtons.length).toBeGreaterThan(0)
  })

  it('Nudge button triggers reminder toast with member name', () => {
    mockShowToast.mockClear()
    renderPage()
    // Emma is pending in multiple activities — click the first Nudge Emma button
    const nudgeEmmaButtons = screen.getAllByRole('button', { name: /Nudge Emma/i })
    expect(nudgeEmmaButtons.length).toBeGreaterThan(0)
    fireEvent.click(nudgeEmmaButtons[0])
    expect(mockShowToast).toHaveBeenCalledWith('Reminder sent to Emma!', 'info')
  })

  // ── Spending ───────────────────────────────────────────────────────────────

  it('shows spend totals for each member', () => {
    renderPage()
    expect(screen.getByText('$342')).toBeInTheDocument()
    expect(screen.getByText('$156')).toBeInTheDocument()
    expect(screen.getByText('$28')).toBeInTheDocument()
    expect(screen.getByText('$215')).toBeInTheDocument()
  })

  it('displays family total and daily average', () => {
    renderPage()
    expect(screen.getByText(/\$741 total/)).toBeInTheDocument()
    expect(screen.getByText(/\$185\/day avg/)).toBeInTheDocument()
  })

  it('shows "On track" status in family total card', () => {
    renderPage()
    expect(screen.getByText(/On track/)).toBeInTheDocument()
  })

  // ── Header ─────────────────────────────────────────────────────────────────

  it('renders the Family Hub header with privacy badge', () => {
    renderPage()
    expect(screen.getByText('Family Hub')).toBeInTheDocument()
    expect(screen.getByText(/Location sharing: ON/)).toBeInTheDocument()
  })
})
