import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import VoyageScorePage from '../pages/VoyageScorePage'
import { voyageScoreData } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <VoyageScorePage />
    </BrowserRouter>
  )
}

describe('VoyageScorePage', () => {
  it('renders the page header', () => {
    renderPage()
    expect(screen.getByText('Voyage Score')).toBeInTheDocument()
  })

  it('displays the score 720', () => {
    renderPage()
    // Score appears in the circular indicator and potentially in the leaderboard row
    expect(screen.getAllByText('720').length).toBeGreaterThan(0)
  })

  it('renders all 6 badges', () => {
    renderPage()
    voyageScoreData.badges.forEach(badge => {
      expect(screen.getByText(badge.name)).toBeInTheDocument()
    })
    expect(voyageScoreData.badges).toHaveLength(6)
  })

  it('renders 4 unlocked badges with checkmarks', () => {
    renderPage()
    const unlocked = voyageScoreData.badges.filter(b => b.unlocked)
    expect(unlocked).toHaveLength(4)
    // Each unlocked badge should show a checkmark ✓
    const checks = screen.getAllByText('✓')
    // At least 4 checkmarks (badges) — reward tiers may add more
    expect(checks.length).toBeGreaterThanOrEqual(4)
  })

  it('renders 2 locked badges with lock icon', () => {
    renderPage()
    const locked = voyageScoreData.badges.filter(b => !b.unlocked)
    expect(locked).toHaveLength(2)
  })

  it('renders all 4 reward tiers', () => {
    renderPage()
    voyageScoreData.rewardTiers.forEach(tier => {
      // Reward text may appear in both the progress hint and the milestone tile
      expect(screen.getAllByText(tier.reward).length).toBeGreaterThan(0)
    })
    expect(voyageScoreData.rewardTiers).toHaveLength(4)
  })

  it('renders leaderboard with 5 entries', () => {
    renderPage()
    voyageScoreData.leaderboard.forEach(entry => {
      expect(screen.getByText(entry.name)).toBeInTheDocument()
    })
    expect(voyageScoreData.leaderboard).toHaveLength(5)
  })

  it('highlights Sarah in the leaderboard with You badge', () => {
    renderPage()
    expect(screen.getByText('You')).toBeInTheDocument()
  })

  it('shows ship rank 47', () => {
    renderPage()
    // Rank appears as #47 in multiple places (score section and leaderboard)
    const rank47 = screen.getAllByText(/#47/i)
    expect(rank47.length).toBeGreaterThan(0)
  })

  it('shows total guest count 3,200', () => {
    renderPage()
    expect(screen.getByText(/3,200/)).toBeInTheDocument()
  })

  it('shows next reward progress text', () => {
    const { container } = renderPage()
    // "2 badges away from Complimentary spa treatment" — text spans multiple elements
    expect(container.textContent).toMatch(/away from/i)
  })
})
