import { useNavigate } from 'react-router-dom'
import { journeyAnalytics } from '../data/mock'
import { ROUTES } from '../routes'

function NpsMiniChart({ data }: { data: { date: string; value: number }[] }) {
  const maxVal = Math.max(...data.map((d) => d.value))
  const minVal = Math.min(...data.map((d) => d.value))
  const range = maxVal - minVal || 1
  return (
    <div className="flex items-end gap-1.5 h-16" role="img" aria-label="NPS trend chart">
      {data.map((d) => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-pcl-gold rounded-t-sm transition-all duration-300"
            style={{ height: `${((d.value - minVal) / range) * 100}%`, minHeight: '4px' }}
          />
          <span className="text-[9px] text-gray-400">{d.date}</span>
        </div>
      ))}
    </div>
  )
}

export default function JourneyPage() {
  const navigate = useNavigate()
  const { funnel, npsTrend, conversionDrivers } = journeyAnalytics

  const maxCount = funnel[0].count

  return (
    <div className="flex flex-col bg-pcl-gray min-h-full page-enter">
      {/* Header with back button */}
      <div className="bg-pcl-navy text-white px-4 pt-6 pb-6">
        <button
          onClick={() => navigate(ROUTES.ANALYTICS)}
          className="flex items-center gap-1 text-xs text-pcl-gold mb-2"
          aria-label="Back to Analytics"
        >
          <span aria-hidden="true">←</span> Back to Dashboard
        </button>
        <p className="text-pcl-gold text-xs font-semibold uppercase tracking-widest mb-1">
          Deep Dive
        </p>
        <h1 className="text-2xl font-display font-semibold">Guest Journey</h1>
        <p className="text-gray-300 text-sm mt-1">Funnel analysis &amp; conversion drivers</p>
      </div>

      {/* Journey funnel */}
      <div className="px-4 mt-4">
        <p className="section-label px-0">Conversion Funnel</p>
        <div className="card p-4 space-y-2">
          {funnel.map((stage, idx) => (
            <div key={stage.stage}>
              <div className="flex justify-between text-xs mb-1">
                <span className={`font-medium ${stage.isHighlighted ? 'text-amber-600' : 'text-gray-600'}`}>
                  {stage.stage}
                </span>
                <span className="text-gray-400">
                  {(stage.count / 1000).toFixed(0)}K
                  {idx > 0 && (
                    <span className={stage.isHighlighted ? 'text-amber-600 font-semibold ml-1' : 'text-gray-400 ml-1'}>
                      ↓{stage.dropOff}%
                    </span>
                  )}
                </span>
              </div>
              <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    stage.isHighlighted ? 'bg-amber-500' : 'bg-pcl-navy'
                  }`}
                  style={{ width: `${(stage.count / maxCount) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NPS trend */}
      <div className="px-4 mt-4">
        <p className="section-label px-0">NPS Trend (7-Day)</p>
        <div className="card p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-2xl font-bold text-pcl-navy">72</p>
              <p className="text-xs text-gray-400">Current NPS</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-semibold text-green-600">↑ 10 pts</p>
              <p className="text-xs text-gray-400">vs. last week</p>
            </div>
          </div>
          <NpsMiniChart data={npsTrend} />
        </div>
      </div>

      {/* Conversion drivers */}
      <div className="px-4 mt-4 pb-6">
        <p className="section-label px-0">Conversion Drivers &amp; Blockers</p>
        <div className="space-y-2">
          {conversionDrivers.map((driver) => (
            <div
              key={driver.driver}
              className={`card p-3 flex items-start gap-3 border-l-4 ${
                driver.direction === 'up' ? 'border-green-500' : 'border-amber-500'
              }`}
            >
              <span className="text-lg shrink-0" aria-hidden="true">
                {driver.direction === 'up' ? '📈' : '📉'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-pcl-text">{driver.driver}</p>
                <p className={`text-xs mt-0.5 font-semibold ${
                  driver.direction === 'up' ? 'text-green-600' : 'text-amber-600'
                }`}>
                  {driver.impact}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
