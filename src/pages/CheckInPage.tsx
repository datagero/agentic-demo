import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { checkInSteps, companions, guest } from '../data/mock'
import { ROUTES } from '../routes'

const STATUS_ICON: Record<string, string> = {
  complete: '✅',
  'in-progress': '🔄',
  pending: '⏳',
}

// Pre-filled mock field data for each step
const STEP_FIELDS: Record<string, { label: string; value: string }[]> = {
  s1: [
    { label: 'Full Name', value: 'Sarah Mitchell' },
    { label: 'Date of Birth', value: 'March 14, 1985' },
    { label: 'Nationality', value: 'United States' },
  ],
  s2: [
    { label: 'Passport Number', value: 'A12345678' },
    { label: 'Expiry Date', value: 'Aug 2029' },
    { label: 'Issuing Country', value: 'United States' },
  ],
  s3: [
    { label: 'Vaccination Status', value: '✓ Up to date' },
    { label: 'Health Declaration', value: '✓ Confirmed' },
    { label: 'Completed On', value: 'Mar 20, 2026' },
  ],
  s4: [
    { label: 'Contact Name', value: 'Robert Mitchell' },
    { label: 'Phone Number', value: '+1 (555) 867-5309' },
    { label: 'Relationship', value: 'Spouse' },
  ],
  s5: [
    { label: 'Card on File', value: '****4242' },
    { label: 'Billing Address', value: '123 Ocean Blvd, Miami, FL' },
    { label: 'Medallion Wallet', value: '✓ Auto-linked' },
  ],
}

// Determine initial completed steps and active step from mock data
function getInitialState() {
  const completedIds = new Set(
    checkInSteps.filter((s) => s.status === 'complete').map((s) => s.id)
  )
  const inProgressStep = checkInSteps.find((s) => s.status === 'in-progress')
  const activeIndex = inProgressStep
    ? checkInSteps.findIndex((s) => s.id === inProgressStep.id)
    : completedIds.size < checkInSteps.length
    ? completedIds.size
    : checkInSteps.length - 1
  return { completedIds, activeIndex }
}

export default function CheckInPage() {
  const navigate = useNavigate()

  const { completedIds: initialCompleted, activeIndex: initialActive } = getInitialState()
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(initialCompleted)
  const [activeStep, setActiveStep] = useState<number>(initialActive)

  const completedCount = completedSteps.size
  const totalSteps = checkInSteps.length
  const completionPct = Math.round((completedCount / totalSteps) * 100)
  const allComplete = completedCount === totalSteps

  function handleContinue() {
    const currentStepId = checkInSteps[activeStep]?.id
    if (!currentStepId) return

    const newCompleted = new Set(completedSteps)
    newCompleted.add(currentStepId)
    setCompletedSteps(newCompleted)

    // Advance to next incomplete step
    const nextIndex = checkInSteps.findIndex(
      (s, i) => i > activeStep && !newCompleted.has(s.id)
    )
    if (nextIndex !== -1) {
      setActiveStep(nextIndex)
    }
  }

  function getStepStatus(stepId: string, index: number): 'complete' | 'in-progress' | 'pending' {
    if (completedSteps.has(stepId)) return 'complete'
    if (index === activeStep) return 'in-progress'
    return 'pending'
  }

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

      {/* Success banner */}
      {allComplete && (
        <div
          className="mx-4 mt-4 bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-3"
          role="status"
          aria-live="polite"
        >
          <span className="text-2xl" aria-hidden="true">🎉</span>
          <div>
            <p className="font-bold text-green-800 text-sm">OceanReady Complete!</p>
            <p className="text-xs text-green-600 mt-0.5">You're all set for boarding. See you on deck!</p>
          </div>
        </div>
      )}

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
          {checkInSteps.map((step, index) => {
            const status = getStepStatus(step.id, index)
            const isActive = index === activeStep && !completedSteps.has(step.id)

            return (
              <div
                key={step.id}
                className={`card p-4 flex flex-col gap-2 ${
                  isActive ? 'border-l-4 border-blue-500' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-lg shrink-0" aria-hidden="true">{STATUS_ICON[status]}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-semibold text-sm ${
                        status === 'complete' ? 'text-gray-400' : 'text-pcl-text'
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
                  {isActive && (
                    <button
                      className="text-xs font-semibold text-white bg-pcl-navy rounded-lg px-3 py-1.5 shrink-0"
                      onClick={handleContinue}
                    >
                      Continue
                    </button>
                  )}
                </div>

                {/* Expanded detail panel for active step */}
                {isActive && STEP_FIELDS[step.id] && (
                  <div className="mt-1 ml-8 bg-gray-50 rounded-lg p-3 space-y-2">
                    {STEP_FIELDS[step.id].map((field) => (
                      <div key={field.label} className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{field.label}</span>
                        <span className="text-xs font-medium text-pcl-text">{field.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )
          })}
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
