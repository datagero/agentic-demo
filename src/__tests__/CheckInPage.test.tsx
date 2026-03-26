import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import CheckInPage from '../pages/CheckInPage'
import { checkInSteps, companions, guest } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <CheckInPage />
    </BrowserRouter>
  )
}

describe('CheckInPage', () => {
  it('renders the heading "OceanReady"', () => {
    renderPage()
    expect(screen.getByText('OceanReady')).toBeInTheDocument()
  })

  it('renders a back button labelled "Back to Home"', () => {
    renderPage()
    expect(screen.getByLabelText('Back to Home')).toBeInTheDocument()
    expect(screen.getByText('Back to Home')).toBeInTheDocument()
  })

  it('shows "3 of 5 steps complete" progress text', () => {
    renderPage()
    expect(screen.getByText('3 of 5 steps complete')).toBeInTheDocument()
  })

  it('renders a progress bar at 60%', () => {
    renderPage()
    const progressBar = screen.getByRole('progressbar')
    expect(progressBar).toHaveAttribute('aria-valuenow', '60')
    expect(progressBar).toHaveAttribute('aria-valuemin', '0')
    expect(progressBar).toHaveAttribute('aria-valuemax', '100')
    expect(progressBar).toHaveAttribute('aria-label', 'Check-in 60% complete')
  })

  it('renders all 5 check-in steps with their labels', () => {
    renderPage()
    checkInSteps.forEach((step) => {
      expect(screen.getByText(step.label)).toBeInTheDocument()
    })
  })

  it('shows step details', () => {
    renderPage()
    checkInSteps.forEach((step) => {
      if (step.detail) {
        expect(screen.getByText(step.detail)).toBeInTheDocument()
      }
    })
  })

  it('displays AI Assisted badges on steps with aiAssisted flag', () => {
    renderPage()
    const aiSteps = checkInSteps.filter((s) => s.aiAssisted)
    const aiBadges = screen.getAllByText('AI Assisted')
    expect(aiBadges).toHaveLength(aiSteps.length)
  })

  it('shows a Continue button for the active in-progress step', () => {
    renderPage()
    const continueButtons = screen.getAllByText('Continue')
    expect(continueButtons).toHaveLength(1)
  })

  it('renders the guest name and tier', () => {
    renderPage()
    expect(screen.getByText(`${guest.firstName} ${guest.lastName}`)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(`${guest.medallionTier} Member`))).toBeInTheDocument()
  })

  it('renders 2 companion profiles with completion percentages', () => {
    renderPage()
    companions.forEach((comp) => {
      expect(screen.getByText(comp.name)).toBeInTheDocument()
      // Use exact: false to handle text split across elements; use getAllByText since
      // "Spouse" may appear both in companion card and in the pre-filled fields panel
      const escapedRelation = comp.relation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      expect(screen.getAllByText(new RegExp(escapedRelation)).length).toBeGreaterThan(0)
    })
    // Check completion percentages are present
    expect(screen.getByText('80%')).toBeInTheDocument()
    expect(screen.getByText('40%')).toBeInTheDocument()
  })

  it('shows the Travel Companions section label', () => {
    renderPage()
    expect(screen.getByText('Travel Companions')).toBeInTheDocument()
  })

  it('shows the Check-In Steps section label', () => {
    renderPage()
    expect(screen.getByText('Check-In Steps')).toBeInTheDocument()
  })

  it('shows pre-filled fields for the active step', () => {
    renderPage()
    // Emergency Contact (s4) is the active in-progress step
    expect(screen.getByText('Contact Name')).toBeInTheDocument()
    expect(screen.getByText('Robert Mitchell')).toBeInTheDocument()
    expect(screen.getByText('Phone Number')).toBeInTheDocument()
    expect(screen.getByText('Relationship')).toBeInTheDocument()
  })

  it('Continue button advances the active step to complete and moves to next', async () => {
    const user = userEvent.setup()
    renderPage()

    // Initially 3 of 5 complete
    expect(screen.getByText('3 of 5 steps complete')).toBeInTheDocument()

    // Click Continue on Emergency Contact step
    const continueBtn = screen.getByText('Continue')
    await user.click(continueBtn)

    // Now 4 of 5 complete
    expect(screen.getByText('4 of 5 steps complete')).toBeInTheDocument()
  })

  it('progress bar updates after Continue is clicked', async () => {
    const user = userEvent.setup()
    renderPage()

    // Initial 60%
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '60')

    const continueBtn = screen.getByText('Continue')
    await user.click(continueBtn)

    // After advancing one step: 4/5 = 80%
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '80')
  })

  it('shows success banner when all steps are complete', async () => {
    const user = userEvent.setup()
    renderPage()

    // Click Continue twice to complete remaining steps (s4 and s5)
    const continueBtn1 = screen.getByText('Continue')
    await user.click(continueBtn1)

    const continueBtn2 = screen.getByText('Continue')
    await user.click(continueBtn2)

    // All 5 complete - success banner appears
    expect(screen.getByText('OceanReady Complete!')).toBeInTheDocument()
    expect(screen.getByText('5 of 5 steps complete')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '100')
  })
})
