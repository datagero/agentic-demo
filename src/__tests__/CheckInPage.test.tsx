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

  it('shows a Continue button for in-progress steps', () => {
    renderPage()
    const inProgressSteps = checkInSteps.filter((s) => s.status === 'in-progress')
    const continueButtons = screen.getAllByText('Continue')
    expect(continueButtons).toHaveLength(inProgressSteps.length)
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
      // Use exact: false to handle text split across elements
      const escapedRelation = comp.relation.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      expect(screen.getByText(new RegExp(escapedRelation))).toBeInTheDocument()
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
})
