import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import NavigatorPage from '../pages/NavigatorPage'
import { guest, shipDecks } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <NavigatorPage />
    </BrowserRouter>
  )
}

describe('NavigatorPage', () => {
  it('renders the navigator heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /navigator/i })).toBeInTheDocument()
  })

  it('shows the "You are here" indicator with cabin info', () => {
    renderPage()
    expect(screen.getByText(/you are here/i)).toBeInTheDocument()
    expect(screen.getByText(new RegExp(guest.cabinNumber))).toBeInTheDocument()
  })

  it('displays deck selector buttons', () => {
    renderPage()
    shipDecks.forEach((deck) => {
      expect(screen.getByText(String(deck.deckNumber))).toBeInTheDocument()
    })
  })

  it('shows points of interest for selected deck', () => {
    renderPage()
    // Default deck is 15 (Lido)
    const lidoDeck = shipDecks.find((d) => d.deckNumber === 15)!
    lidoDeck.pointsOfInterest.forEach((poi) => {
      expect(screen.getAllByText(poi.name).length).toBeGreaterThan(0)
    })
  })

  it('has a search input', () => {
    renderPage()
    expect(screen.getByLabelText(/search for locations/i)).toBeInTheDocument()
  })

  it('filters POIs by search query', async () => {
    const user = userEvent.setup()
    renderPage()
    const searchInput = screen.getByLabelText(/search for locations/i)
    await user.type(searchInput, 'Spa')
    expect(screen.getByText('Search Results')).toBeInTheDocument()
  })

  it('has an accessibility toggle button', () => {
    renderPage()
    expect(screen.getByLabelText(/accessibility mode/i)).toBeInTheDocument()
  })

  it('toggles accessibility mode', async () => {
    const user = userEvent.setup()
    renderPage()
    const toggle = screen.getByLabelText(/enable accessibility mode/i)
    await user.click(toggle)
    expect(screen.getByLabelText(/disable accessibility mode/i)).toBeInTheDocument()
    expect(screen.getByText('ON')).toBeInTheDocument()
  })

  it('shows Medallion status as active', () => {
    renderPage()
    expect(screen.getByText('Active')).toBeInTheDocument()
  })

  it('switches decks when deck button is clicked', async () => {
    const user = userEvent.setup()
    renderPage()

    // Click on Promenade Deck (7)
    await user.click(screen.getByText('7'))
    const promenade = shipDecks.find((d) => d.deckNumber === 7)!
    expect(screen.getByText(promenade.name)).toBeInTheDocument()
  })
})
