import { useState } from 'react'
import { shipDecks, guest } from '../data/mock'
import { useAccessibility } from '../contexts/AccessibilityContext'

/** Deterministic walk time based on POI name — consistent across renders */
function walkTime(name: string): number {
  let hash = 0
  for (let i = 0; i < name.length; i++) hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0
  return (Math.abs(hash) % 4) + 1
}

export default function NavigatorPage() {
  const [selectedDeck, setSelectedDeck] = useState(15)
  const [searchQuery, setSearchQuery] = useState('')
  const { highContrast: accessibilityMode, toggleHighContrast } = useAccessibility()

  const currentDeck = shipDecks.find((d) => d.deckNumber === selectedDeck)

  // Filter POIs by search
  const filteredPOIs = currentDeck?.pointsOfInterest.filter((poi) =>
    searchQuery === '' || poi.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) ?? []

  // All POIs across all decks for search
  const allSearchResults = searchQuery
    ? shipDecks.flatMap((deck) =>
        deck.pointsOfInterest
          .filter((poi) => poi.name.toLowerCase().includes(searchQuery.toLowerCase()))
          .map((poi) => ({ ...poi, deckNumber: deck.deckNumber, deckName: deck.name }))
      )
    : []

  return (
    <div className={`flex flex-col bg-pcl-gray min-h-full page-enter ${accessibilityMode ? 'text-lg' : ''}`}>
      {/* Header */}
      <div className="bg-pcl-navy text-white px-4 pt-6 pb-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-pcl-gold text-xs font-semibold uppercase tracking-widest mb-1">
              Ship Map
            </p>
            <h1 className="text-2xl font-display font-semibold">Navigator</h1>
            <p className="text-gray-300 text-sm mt-1">Caribbean Princess · Deck Guide</p>
          </div>

          {/* Accessibility toggle */}
          <button
            onClick={toggleHighContrast}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
              accessibilityMode
                ? 'bg-pcl-gold text-pcl-navy'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
            aria-label={`${accessibilityMode ? 'Disable' : 'Enable'} accessibility mode`}
            aria-pressed={accessibilityMode}
          >
            <span aria-hidden="true">♿</span>
            <span>{accessibilityMode ? 'ON' : 'A11y'}</span>
          </button>
        </div>

        {/* Search bar */}
        <div className="mt-3 relative">
          <input
            type="search"
            placeholder="Find on ship..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`w-full bg-white/10 text-white placeholder-white/50 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-pcl-gold ${
              accessibilityMode ? 'text-base py-3' : ''
            }`}
            aria-label="Search for locations on the ship"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50" aria-hidden="true">🔍</span>
        </div>
      </div>

      {/* Your location indicator */}
      <div className={`mx-4 mt-4 card flex items-center gap-3 border-l-4 border-pcl-gold ${
        accessibilityMode ? 'p-5' : 'p-4'
      }`}>
        <span className={accessibilityMode ? 'text-3xl' : 'text-2xl'} aria-hidden="true">📍</span>
        <div>
          <p className={`font-semibold text-pcl-text ${accessibilityMode ? 'text-base' : 'text-sm'}`}>
            You are here
          </p>
          <p className={`text-gray-400 ${accessibilityMode ? 'text-sm' : 'text-xs'}`}>
            Cabin {guest.cabinNumber} · {guest.cabinDeck}
          </p>
        </div>
        <div className="ml-auto text-right">
          <p className={`text-pcl-navy font-semibold ${accessibilityMode ? 'text-sm' : 'text-xs'}`}>
            Medallion
          </p>
          <p className={`text-green-600 ${accessibilityMode ? 'text-sm' : 'text-xs'}`}>Active</p>
        </div>
      </div>

      {/* Search results (when searching) */}
      {searchQuery && allSearchResults.length > 0 && (
        <div className="px-4 mt-3">
          <p className="section-label px-0">Search Results</p>
          <div className="space-y-2">
            {allSearchResults.map((result) => (
              <button
                key={`${result.deckNumber}-${result.name}`}
                onClick={() => { setSelectedDeck(result.deckNumber); setSearchQuery('') }}
                className={`card w-full flex items-center gap-3 text-left hover:shadow-md transition-shadow ${
                  accessibilityMode ? 'p-5' : 'p-3'
                }`}
              >
                <span className={accessibilityMode ? 'text-2xl' : 'text-xl'} aria-hidden="true">{result.icon}</span>
                <div className="flex-1">
                  <p className={`font-semibold text-pcl-text ${accessibilityMode ? 'text-base' : 'text-sm'}`}>{result.name}</p>
                  <p className={`text-gray-400 ${accessibilityMode ? 'text-sm' : 'text-xs'}`}>
                    {result.deckName} · Deck {result.deckNumber}
                  </p>
                </div>
                <span className={`text-gray-400 ${accessibilityMode ? 'text-sm' : 'text-xs'}`}>
                  ~{walkTime(result.name)} min walk
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Deck selector */}
      {!searchQuery && (
        <>
          <div className="px-4 mt-4">
            <p className="section-label px-0">Select Deck</p>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {shipDecks.map((deck) => (
                <button
                  key={deck.deckNumber}
                  onClick={() => setSelectedDeck(deck.deckNumber)}
                  className={`shrink-0 flex flex-col items-center px-3 py-2 rounded-xl transition-colors ${
                    selectedDeck === deck.deckNumber
                      ? 'bg-pcl-navy text-white'
                      : 'bg-white text-gray-500 hover:bg-gray-50 border border-gray-200'
                  } ${accessibilityMode ? 'px-4 py-3' : ''}`}
                >
                  <span className={accessibilityMode ? 'text-xl' : 'text-lg'} aria-hidden="true">{deck.icon}</span>
                  <span className={`font-bold ${accessibilityMode ? 'text-sm' : 'text-xs'}`}>{deck.deckNumber}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Deck detail */}
          {currentDeck && (
            <div className="px-4 mt-3 pb-6">
              <div className="flex items-center justify-between mb-2">
                <p className="section-label px-0 mb-0">{currentDeck.name}</p>
                <span className={`font-bold text-pcl-navy bg-blue-50 rounded-full px-2 py-0.5 ${
                  accessibilityMode ? 'text-sm' : 'text-xs'
                }`}>
                  Deck {currentDeck.deckNumber}
                </span>
              </div>

              {/* Simplified deck map visual */}
              <div className={`card bg-gradient-to-b from-blue-50 to-white mb-3 ${
                accessibilityMode ? 'p-5' : 'p-4'
              }`}>
                <div className="rounded-xl border-2 border-dashed border-pcl-navy/20 p-4 flex flex-wrap gap-3 justify-center">
                  {filteredPOIs.map((poi) => (
                    <div
                      key={poi.name}
                      className={`flex flex-col items-center gap-1 bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow ${
                        accessibilityMode ? 'p-4 min-w-[100px]' : 'p-3 min-w-[80px]'
                      }`}
                    >
                      <span className={accessibilityMode ? 'text-2xl' : 'text-xl'} aria-hidden="true">{poi.icon}</span>
                      <span className={`text-center font-medium text-pcl-text leading-tight ${
                        accessibilityMode ? 'text-sm' : 'text-[10px]'
                      }`}>
                        {poi.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Walking time indicators */}
              <div className="space-y-2">
                {filteredPOIs.slice(0, 3).map((poi) => (
                  <div
                    key={poi.name}
                    className={`card flex items-center gap-3 ${
                      accessibilityMode ? 'p-4' : 'p-3'
                    }`}
                  >
                    <span className={accessibilityMode ? 'text-xl' : 'text-lg'} aria-hidden="true">{poi.icon}</span>
                    <div className="flex-1">
                      <p className={`font-medium text-pcl-text ${accessibilityMode ? 'text-base' : 'text-sm'}`}>
                        {poi.name}
                      </p>
                    </div>
                    <span className={`text-pcl-navy font-semibold ${accessibilityMode ? 'text-sm' : 'text-xs'}`}>
                      {walkTime(poi.name)} min walk
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}
