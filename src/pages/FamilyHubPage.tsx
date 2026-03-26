import { useToast } from '../contexts/ToastContext'
import { familyHubData } from '../data/mock'
import type { FamilyMember, FamilyActivity, FamilySpend } from '../types'

// ── Sub-components ────────────────────────────────────────────────────────────

function MemberCard({ member, onFind }: { member: FamilyMember; onFind: (name: string) => void }) {
  const isYou = member.relation === 'You'
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start gap-3">
        {/* Avatar */}
        <div className={`w-12 h-12 rounded-full ${member.avatarColor} flex items-center justify-center flex-shrink-0`}>
          <span className="text-white font-bold text-lg">{member.initials}</span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-semibold text-gray-900">{member.name}</span>
            {isYou && (
              <span className="text-xs bg-pcl-navy text-white px-2 py-0.5 rounded-full">(You)</span>
            )}
            <span className="text-xs text-gray-500">{member.relation}</span>
          </div>
          <p className="text-sm text-gray-600 mt-0.5">
            Deck {member.deck} · {member.location}
          </p>
          <p className="text-sm text-gray-700 mt-0.5">{member.activity}</p>
          <p className="text-xs text-gray-400 mt-0.5">📍 {member.lastSeen}</p>
        </div>

        {/* Find button (not shown for self) */}
        {!isYou && (
          <button
            onClick={() => onFind(member.name)}
            className="text-xs bg-pcl-navy text-white px-3 py-1.5 rounded-lg hover:bg-blue-900 transition-colors flex-shrink-0"
            aria-label={`Find ${member.name}`}
          >
            Find
          </button>
        )}
      </div>
    </div>
  )
}

function ActivityCard({ activity, onNudge }: { activity: FamilyActivity; onNudge: (name: string) => void }) {
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900">{activity.name}</p>
          <p className="text-sm text-gray-600">{activity.time} · {activity.location}</p>
        </div>
      </div>

      <div className="mt-3 space-y-1.5">
        {/* Confirmed */}
        {activity.confirmed.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500 w-16 flex-shrink-0">Confirmed:</span>
            {activity.confirmed.map((name) => (
              <span key={name} className="flex items-center gap-1 text-xs text-green-700 bg-green-50 px-2 py-0.5 rounded-full">
                <span>✓</span>
                <span>{name}</span>
              </span>
            ))}
          </div>
        )}

        {/* Pending */}
        {activity.pending.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-gray-500 w-16 flex-shrink-0">Pending:</span>
            {activity.pending.map((name) => (
              <span key={name} className="flex items-center gap-2 text-xs text-orange-700 bg-orange-50 px-2 py-0.5 rounded-full">
                <span>🕐</span>
                <span>{name}</span>
                <button
                  onClick={() => onNudge(name)}
                  className="ml-1 underline hover:no-underline font-medium"
                  aria-label={`Nudge ${name}`}
                >
                  Nudge
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function SpendBar({ spend, maxTotal }: { spend: FamilySpend; maxTotal: number }) {
  const pct = maxTotal > 0 ? Math.round((spend.total / maxTotal) * 100) : 0
  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-2">
        <span className="font-medium text-gray-900">{spend.name}</span>
        <span className="font-semibold text-gray-900">${spend.total}</span>
      </div>
      {/* Bar */}
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden mb-2">
        <div
          className="h-full bg-pcl-navy rounded-full transition-all"
          style={{ width: `${pct}%` }}
          role="progressbar"
          aria-valuenow={spend.total}
          aria-valuemax={maxTotal}
          aria-label={`${spend.name} spend: $${spend.total}`}
        />
      </div>
      {/* Category breakdown */}
      <div className="flex flex-wrap gap-x-3 gap-y-0.5">
        {spend.categories.map((cat) => (
          <span key={cat.name} className="text-xs text-gray-500">
            {cat.name} ${cat.amount}
          </span>
        ))}
      </div>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function FamilyHubPage() {
  const { showToast } = useToast()
  const { members, activities, spending, familyTotal, dailyBudgetAvg } = familyHubData

  const maxSpend = Math.max(...spending.map((s) => s.total))

  function handleFind(name: string) {
    showToast('Walking directions sent to your Medallion', 'info')
    void name
  }

  function handleNudge(name: string) {
    showToast(`Reminder sent to ${name}!`, 'info')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-pcl-navy text-white px-4 pt-8 pb-6">
        <h1 className="text-2xl font-bold">Family Hub</h1>
        <p className="text-blue-200 text-sm mt-1">Everyone, all together</p>
        <div className="mt-3 inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
          <span className="text-xs">📍 Location sharing: ON</span>
        </div>
      </div>

      <div className="px-4 py-6 space-y-8 max-w-lg mx-auto">
        {/* Family Members */}
        <section aria-labelledby="members-heading">
          <h2 id="members-heading" className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Family Members
          </h2>
          <div className="space-y-3">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} onFind={handleFind} />
            ))}
          </div>
        </section>

        {/* Activity Coordination */}
        <section aria-labelledby="activities-heading">
          <h2 id="activities-heading" className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Upcoming Together
          </h2>
          <div className="space-y-3">
            {activities.map((activity) => (
              <ActivityCard key={activity.id} activity={activity} onNudge={handleNudge} />
            ))}
          </div>
        </section>

        {/* Spend Summary */}
        <section aria-labelledby="spend-heading">
          <h2 id="spend-heading" className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Trip Spending
          </h2>
          <div className="space-y-3">
            {spending.map((spend) => (
              <SpendBar key={spend.memberId} spend={spend} maxTotal={maxSpend} />
            ))}
          </div>

          {/* Family Total */}
          <div className="mt-4 bg-pcl-navy text-white rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold text-lg">${familyTotal} total · ${dailyBudgetAvg}/day avg</p>
              <p className="text-blue-200 text-sm">On track ✅</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
