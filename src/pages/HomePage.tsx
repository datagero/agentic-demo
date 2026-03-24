import { guest, voyage, quickActions, recommendations } from '../data/mock'

export default function HomePage() {
  return (
    <div className="flex flex-col bg-pcl-gray min-h-full">
      {/* Hero section */}
      <div className="bg-pcl-navy text-white px-4 pt-6 pb-8">
        <p className="text-pcl-gold text-xs font-semibold uppercase tracking-widest mb-1">
          Your Voyage
        </p>
        <h1 className="text-2xl font-display font-semibold leading-tight mb-1">
          {voyage.shipName}
        </h1>
        <p className="text-gray-300 text-sm">{voyage.region} · {voyage.nights} nights</p>

        {/* Countdown pill */}
        <div className="mt-4 inline-flex items-center gap-2 bg-pcl-gold text-pcl-navy rounded-full px-4 py-1.5">
          <span className="font-bold text-lg leading-none">{voyage.daysUntilDeparture}</span>
          <span className="text-xs font-semibold leading-none">days until departure</span>
        </div>
      </div>

      {/* Medallion status */}
      <div className="px-4 -mt-4">
        <div className="card p-4 flex items-center gap-3 border-l-4 border-pcl-gold">
          <span className="text-2xl" aria-hidden="true">🏅</span>
          <div className="flex-1">
            <p className="font-semibold text-sm text-pcl-text">
              {guest.medallionTier} Medallion Member
            </p>
            <p className="text-xs text-gray-400">
              {guest.medallionPoints.toLocaleString()} points · Exclusive perks unlocked
            </p>
          </div>
          <div className="text-pcl-gold font-bold text-sm">{guest.medallionTier}</div>
        </div>
      </div>

      {/* Quick actions */}
      <div className="px-4 mt-4">
        <p className="section-label px-0">Quick Actions</p>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map(({ icon, label, badge }) => (
            <button
              key={label}
              className="card p-3 flex items-center gap-3 text-left hover:shadow-md transition-shadow"
              aria-label={label}
            >
              <span className="text-xl shrink-0" aria-hidden="true">{icon}</span>
              <div className="min-w-0">
                <span className="text-sm font-medium text-pcl-text block">{label}</span>
                {badge && (
                  <span className="text-xs text-pcl-gold font-medium">{badge}</span>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* AI Recommendations */}
      <div className="px-4 mt-4">
        <div className="flex items-center gap-2 mb-2">
          <p className="section-label px-0 mb-0">Recommended for You</p>
          <span className="text-xs bg-blue-50 text-pcl-navy font-semibold rounded-full px-2 py-0.5">
            AI
          </span>
        </div>
        <div className="space-y-3">
          {recommendations.map((rec) => (
            <button key={rec.id} className="card w-full p-4 flex items-start gap-3 text-left hover:shadow-md transition-shadow">
              <span className="text-3xl shrink-0" aria-hidden="true">{rec.image}</span>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-pcl-text">{rec.title}</p>
                <p className="text-xs text-gray-400 mt-0.5">{rec.subtitle}</p>
                <p className="text-xs text-blue-600 mt-1 flex items-center gap-1">
                  <span aria-hidden="true">✨</span> {rec.aiReason}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Voyage summary */}
      <div className="px-4 mt-4 pb-6">
        <p className="section-label px-0">Voyage Details</p>
        <div className="card p-4">
          <div className="flex justify-between items-center mb-3">
            <div>
              <p className="text-xs text-gray-400">Departing</p>
              <p className="font-semibold text-sm text-pcl-navy">{voyage.departureDate}</p>
            </div>
            <div className="flex-1 mx-4 border-t-2 border-dashed border-gray-200 relative">
              <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-1 text-gray-300 text-xs">
                🚢
              </span>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-400">Returning</p>
              <p className="font-semibold text-sm text-pcl-navy">{voyage.returnDate}</p>
            </div>
          </div>
          <p className="text-xs text-gray-500">{voyage.region} · {voyage.nights} nights · Cabin {guest.cabinNumber}</p>
        </div>
      </div>
    </div>
  )
}
