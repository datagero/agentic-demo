import { voyageRewindData } from '../data/mock'
import { useToast } from '../contexts/ToastContext'

export default function VoyageRewindPage() {
  const { showToast } = useToast()
  const { stats, dayHighlights, voyageCard, nextSailing } = voyageRewindData

  return (
    <div className="flex flex-col bg-pcl-gray min-h-full page-enter">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="bg-pcl-navy text-white px-4 pt-6 pb-8">
        <p className="text-pcl-gold text-xs font-semibold uppercase tracking-widest mb-1">
          Post-Cruise
        </p>
        <h1 className="text-2xl font-display font-semibold leading-tight mb-1">
          Your Voyage in Review
        </h1>
        <p className="text-gray-300 text-sm">{voyageCard.voyageName}</p>
        <p className="text-gray-400 text-xs mt-0.5">{voyageCard.dates}</p>
      </div>

      {/* ── Stats Card ──────────────────────────────────────────────────────── */}
      <div className="px-4 -mt-4">
        <div className="card p-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-pcl-gold mb-3">
            Voyage Highlights
          </p>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center bg-gray-50 rounded-xl p-3 border border-pcl-gold/20"
              >
                <span className="text-2xl mb-1" aria-hidden="true">{stat.icon}</span>
                <span className="text-xl font-bold text-pcl-navy leading-tight">{stat.value}</span>
                <span className="text-xs text-gray-500 text-center mt-0.5">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Day-by-Day Timeline ─────────────────────────────────────────────── */}
      <div className="px-4 mt-4">
        <p className="section-label px-0">Day-by-Day Timeline</p>
        <div className="card divide-y divide-gray-100 overflow-hidden">
          {dayHighlights.map((day, idx) => (
            <div
              key={day.day}
              className={`p-4 flex gap-3 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50/60'}`}
            >
              {/* Left: day badge + border */}
              <div className="flex flex-col items-center gap-1 pt-0.5">
                <div className="w-8 h-8 rounded-full bg-pcl-navy text-white flex items-center justify-center text-xs font-bold shrink-0">
                  {day.day}
                </div>
                {idx < dayHighlights.length - 1 && (
                  <div className="w-0.5 flex-1 bg-pcl-gold/30 min-h-[1.5rem]" />
                )}
              </div>

              {/* Right: content */}
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-pcl-navy leading-tight">{day.port}</p>
                <ul className="mt-1.5 space-y-0.5">
                  {day.highlights.map((h) => (
                    <li key={h} className="text-xs text-gray-600 flex items-start gap-1">
                      <span className="text-pcl-gold mt-0.5" aria-hidden="true">›</span>
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-xs text-blue-600 bg-blue-50 rounded px-2 py-1 inline-block">
                  🏅 {day.medallionData}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Voyage Card ─────────────────────────────────────────────────────── */}
      <div className="px-4 mt-4">
        <p className="section-label px-0">Your Voyage Card</p>
        <div className="card overflow-hidden">
          {/* Gold gradient accent bar */}
          <div className="h-2 bg-gradient-to-r from-pcl-gold via-yellow-300 to-pcl-gold" />
          <div className="p-4">
            {/* Guest name + tier */}
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="font-display font-bold text-lg text-pcl-navy leading-tight">
                  {voyageCard.guestName}
                </p>
                <p className="text-xs text-gray-500">{voyageCard.dates}</p>
              </div>
              <span className="bg-pcl-gold text-pcl-navy text-xs font-bold px-3 py-1 rounded-full">
                {voyageCard.tier}
              </span>
            </div>

            {/* Voyage name */}
            <p className="text-sm font-semibold text-pcl-text mb-1">{voyageCard.voyageName}</p>

            {/* Stats line */}
            <p className="text-xs text-gray-500 mb-2">{voyageCard.statsLine}</p>

            {/* Favorite port */}
            <div className="flex items-center gap-2 bg-pcl-gold/10 rounded-lg px-3 py-2 mb-4">
              <span className="text-lg" aria-hidden="true">🏆</span>
              <div>
                <p className="text-xs font-semibold text-pcl-navy">Favorite Port</p>
                <p className="text-xs text-gray-600">{voyageCard.favoritePort}</p>
              </div>
            </div>

            {/* Princess branding */}
            <p className="text-center text-xs text-gray-400 italic mb-3">
              ✨ Powered by Princess Cruises MedallionClass™
            </p>

            {/* Share button */}
            <button
              onClick={() => showToast('Link copied to clipboard!', 'success')}
              className="w-full btn-primary py-2.5 text-sm font-semibold rounded-xl"
            >
              Share Your Voyage
            </button>
          </div>
        </div>
      </div>

      {/* ── Rebook / Next Sailing ────────────────────────────────────────────── */}
      <div className="px-4 mt-4 mb-6">
        <p className="section-label px-0">Ready for your next adventure?</p>
        <div className="card overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-500 to-pcl-navy" />
          <div className="p-4">
            {/* Sailing name */}
            <p className="font-semibold text-pcl-navy text-sm leading-tight mb-0.5">
              {nextSailing.name}
            </p>
            <p className="text-xs text-gray-500 mb-3">{nextSailing.dates}</p>

            {/* Favorite ports */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1.5">
                Ports you'll love
              </p>
              <div className="flex flex-wrap gap-1.5">
                {nextSailing.favoritePorts.map((port) => (
                  <span
                    key={port}
                    className="text-xs bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full border border-blue-200"
                  >
                    {port}
                  </span>
                ))}
              </div>
            </div>

            {/* Cabin + pricing */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4 space-y-1.5">
              <div className="flex items-center gap-2">
                <span className="text-base" aria-hidden="true">🛏️</span>
                <p className="text-xs text-gray-600">{nextSailing.cabin}</p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base" aria-hidden="true">💰</span>
                  <p className="text-sm font-bold text-pcl-navy">{nextSailing.price}</p>
                </div>
                <span className="text-xs text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">
                  {nextSailing.discount}
                </span>
              </div>
            </div>

            {/* Reserve button */}
            <button
              onClick={() => showToast('Booking request sent! Check your email for confirmation.', 'success')}
              className="w-full btn-primary py-2.5 text-sm font-semibold rounded-xl"
            >
              Reserve Now
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}
