import { useNavigate } from 'react-router-dom'
import { checkInSteps, companions, guest } from '../data/mock'
import { ROUTES } from '../routes'

const STATUS_ICON: Record<string, string> = {
  complete: '✅',
  'in-progress': '🔄',
  pending: '⏳',
}

export default function CheckInPage() {
  const navigate = useNavigate()
  const completedCount = checkInSteps.filter((s) => s.status === 'complete').length
  const totalSteps = checkInSteps.length
  const completionPct = Math.round((completedCount / totalSteps) * 100)

  return (
    <div className="flex flex-col bg-pcl-gray min-h-full page-enter">
      {/* Header with back */}
      <div className="bg-pcl-navy text-white px-4 pt-6 pb-6">
        <button
          onClick={() => navigate(ROUTES.HOME)}
          className="flex items-center gap-1 text-xs text-pcl-gold mb-2"
          aria-label="Back to Home"
        >
          <span aria-hidden="true">←</span> Back to Home
        </button>
        <p className="text-pcl-gold text-xs font-semibold uppercase tracking-widest mb-1">
          Pre-Cruise
        </p>
        <h1 className="text-2xl font-display font-semibold">OceanReady</h1>
        <p className="text-gray-300 text-sm mt-1">Complete your check-in before sailing</p>

        {/* Progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1">
            <span className="text-white/70">{completedCount} of {totalSteps} steps complete</span>
            <span className="text-pcl-gold font-semibold">{completionPct}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-pcl-gold rounded-full transition-all duration-500"
              style={{ width: `${completionPct}%` }}
              role="progressbar"
              aria-valuenow={completionPct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label={`Check-in ${completionPct}% complete`}
            />
          </div>
        </div>
      </div>

      {/* Guest info */}
      <div className="px-4 mt-4">
        <div className="card p-4 flex items-center gap-3 border-l-4 border-pcl-gold">
          <div className="w-10 h-10 rounded-full bg-pcl-gold flex items-center justify-center text-pcl-navy font-bold text-sm">
            {guest.initials}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-sm text-pcl-text">
              {guest.firstName} {guest.lastName}
            </p>
            <p className="text-xs text-gray-400">{guest.medallionTier} Member · Primary Guest</p>
          </div>
          <span className="text-xs font-semibold text-pcl-navy bg-blue-50 rounded-full px-2 py-0.5">
            {completionPct}%
          </span>
        </div>
      </div>

      {/* Check-in steps */}
      <div className="px-4 mt-4">
        <p className="section-label px-0">Check-In Steps</p>
        <div className="space-y-2">
          {checkInSteps.map((step) => (
            <div
              key={step.id}
              className={`card p-4 flex items-start gap-3 ${
                step.status === 'in-progress' ? 'border-l-4 border-blue-500' : ''
              }`}
            >
              <span className="text-lg shrink-0" aria-hidden="true">{STATUS_ICON[step.status]}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-semibold text-sm ${
                    step.status === 'complete' ? 'text-gray-400' : 'text-pcl-text'
                  }`}>
                    {step.label}
                  </p>
                  {step.aiAssisted && (
                    <span className="text-[10px] bg-blue-50 text-blue-700 font-semibold rounded-full px-2 py-0.5">
                      AI Assisted
                    </span>
                  )}
                </div>
                {step.detail && (
                  <p className="text-xs text-gray-400 mt-0.5">{step.detail}</p>
                )}
              </div>
              {step.status === 'in-progress' && (
                <button className="text-xs font-semibold text-white bg-pcl-navy rounded-lg px-3 py-1.5">
                  Continue
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Companions */}
      <div className="px-4 mt-4 pb-6">
        <p className="section-label px-0">Travel Companions</p>
        <div className="space-y-2">
          {companions.map((comp) => (
            <div key={comp.name} className="card p-4 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-xs">
                {comp.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-pcl-text">{comp.name}</p>
                <p className="text-xs text-gray-400">{comp.relation} · {comp.currentStep}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-pcl-navy">{comp.completionPct}%</p>
                <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden mt-1">
                  <div
                    className="h-full bg-pcl-gold rounded-full"
                    style={{ width: `${comp.completionPct}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
