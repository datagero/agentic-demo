import { voyageScoreData } from '../data/mock'
import type { VoyageBadge, RewardTier, LeaderboardEntry } from '../types'

// ── Badge Card ────────────────────────────────────────────────────────────────

function BadgeCard({ badge }: { badge: VoyageBadge }) {
  return (
    <div
      className={`flex flex-col items-center p-3 rounded-xl border text-center ${
        badge.unlocked
          ? 'bg-white border-yellow-300 shadow-sm'
          : 'bg-gray-50 border-gray-200 opacity-60'
      }`}
    >
      <span className={`text-3xl mb-1 ${badge.unlocked ? '' : 'grayscale'}`} role="img" aria-label={badge.name}>
        {badge.icon}
      </span>
      <p className="text-xs font-semibold text-gray-800 leading-tight">{badge.name}</p>
      <p className="text-[10px] text-gray-500 mt-0.5 leading-tight">{badge.description}</p>
      {badge.unlocked ? (
        <span className="mt-1 text-green-600 text-xs font-bold">✓</span>
      ) : (
        <span className="mt-1 text-gray-400 text-xs">
          🔒{badge.progress ? ` ${badge.progress}` : ''}
        </span>
      )}
    </div>
  )
}

// ── Reward Tier Row ───────────────────────────────────────────────────────────

function RewardTierItem({ tier, isCurrent }: { tier: RewardTier; isCurrent: boolean }) {
  return (
    <div
      className={`flex flex-col items-center text-center px-2 py-3 rounded-lg min-w-0 flex-1 ${
        tier.unlocked
          ? 'bg-yellow-50 border border-yellow-300'
          : 'bg-gray-50 border border-gray-200'
      } ${isCurrent ? 'ring-2 ring-blue-400' : ''}`}
    >
      <span className="text-2xl mb-1" role="img" aria-label={tier.reward}>{tier.icon}</span>
      <p className={`text-[10px] font-bold ${tier.unlocked ? 'text-yellow-700' : 'text-gray-400'}`}>
        {tier.points} pts
      </p>
      <p className={`text-[10px] leading-tight mt-0.5 ${tier.unlocked ? 'text-gray-700' : 'text-gray-400'}`}>
        {tier.reward}
      </p>
      {tier.unlocked && <span className="mt-1 text-yellow-600 text-xs font-bold">✓</span>}
    </div>
  )
}

// ── Leaderboard Row ───────────────────────────────────────────────────────────

function LeaderboardRow({ entry }: { entry: LeaderboardEntry }) {
  return (
    <div
      className={`flex items-center justify-between px-4 py-3 rounded-xl ${
        entry.isYou ? 'bg-yellow-50 border border-yellow-300' : 'bg-white border border-gray-100'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className={`text-sm font-bold w-8 text-center ${entry.isYou ? 'text-yellow-700' : 'text-gray-500'}`}>
          #{entry.rank}
        </span>
        <span className={`text-sm font-medium ${entry.isYou ? 'text-yellow-800' : 'text-gray-800'}`}>
          {entry.name}
          {entry.isYou && <span className="ml-2 text-xs font-semibold text-yellow-600 bg-yellow-100 px-1.5 py-0.5 rounded-full">You</span>}
        </span>
      </div>
      <span className={`text-sm font-bold ${entry.isYou ? 'text-yellow-700' : 'text-gray-600'}`}>
        {entry.score.toLocaleString()}
      </span>
    </div>
  )
}

// ── Main Page ─────────────────────────────────────────────────────────────────

export default function VoyageScorePage() {
  const { score, maxScore, badges, rewardTiers, leaderboard, shipRank, totalGuests } = voyageScoreData
  const progressPct = Math.round((score / maxScore) * 100)

  // Find next locked reward tier
  const nextTier = rewardTiers.find(t => !t.unlocked)
  const badgesAwayFromNextReward = nextTier
    ? badges.filter(b => !b.unlocked).length
    : 0

  // Determine which reward tier the current score sits between
  const currentTierIndex = rewardTiers.filter(t => t.unlocked).length - 1

  const unlockedCount = badges.filter(b => b.unlocked).length
  const lockedCount = badges.filter(b => !b.unlocked).length

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-[#1B2B5E] text-white px-4 pt-8 pb-6">
        <h1 className="text-2xl font-bold">Voyage Score</h1>
        <p className="text-blue-200 text-sm mt-1">Explore more, earn more</p>
      </div>

      <div className="px-4 py-4 space-y-5">
        {/* Score Section */}
        <div className="bg-white rounded-2xl shadow-sm p-5 text-center">
          {/* Circular score indicator */}
          <div className="relative inline-flex items-center justify-center w-32 h-32 mb-3">
            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 120 120">
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke="#E5E7EB"
                strokeWidth="12"
              />
              <circle
                cx="60" cy="60" r="52"
                fill="none"
                stroke="#EAB308"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 52}`}
                strokeDashoffset={`${2 * Math.PI * 52 * (1 - progressPct / 100)}`}
                className="transition-all duration-700"
              />
            </svg>
            <div className="flex flex-col items-center">
              <span className="text-3xl font-bold text-gray-900">{score}</span>
              <span className="text-xs text-gray-500">/ {maxScore.toLocaleString()}</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-100 rounded-full h-2 mb-3">
            <div
              className="bg-yellow-400 h-2 rounded-full transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
          </div>

          {nextTier && badgesAwayFromNextReward > 0 && (
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-semibold text-blue-700">{badgesAwayFromNextReward} badge{badgesAwayFromNextReward !== 1 ? 's' : ''}</span> away from{' '}
              <span className="font-semibold">{nextTier.reward}</span>
            </p>
          )}

          {/* Ship rank */}
          <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-full px-4 py-1.5">
            <span className="text-blue-600 text-sm">🏅</span>
            <span className="text-sm font-semibold text-blue-800">
              #{shipRank} of {totalGuests.toLocaleString()} guests
            </span>
          </div>
        </div>

        {/* Badge Grid */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">Your Badges</h2>
            <span className="text-xs text-gray-500">
              {unlockedCount} unlocked · {lockedCount} locked
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {badges.map(badge => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <h2 className="text-base font-bold text-gray-900 mb-3">Reward Milestones</h2>

          {/* Progress bar between tiers */}
          <div className="relative mb-4">
            <div className="absolute top-3 left-0 right-0 h-1.5 bg-gray-200 rounded-full z-0" />
            <div
              className="absolute top-3 left-0 h-1.5 bg-yellow-400 rounded-full z-0 transition-all duration-700"
              style={{ width: `${progressPct}%` }}
            />
            {/* Marker dots at tier positions */}
            {rewardTiers.map((tier, i) => {
              const pct = (tier.points / maxScore) * 100
              return (
                <div
                  key={tier.points}
                  className={`absolute top-1.5 w-3 h-3 rounded-full border-2 z-10 -translate-x-1/2 ${
                    tier.unlocked ? 'bg-yellow-400 border-yellow-500' : 'bg-gray-200 border-gray-300'
                  }`}
                  style={{ left: `${pct}%` }}
                  aria-hidden="true"
                />
              )
            })}
            {/* Current score marker */}
            <div
              className="absolute top-0.5 w-4 h-4 rounded-full bg-blue-500 border-2 border-white z-20 -translate-x-1/2 shadow"
              style={{ left: `${progressPct}%` }}
              title={`Your score: ${score}`}
            />
          </div>

          <div className="flex gap-2 mt-6">
            {rewardTiers.map((tier, i) => (
              <RewardTierItem
                key={tier.points}
                tier={tier}
                isCurrent={i === currentTierIndex}
              />
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">Ship Leaderboard</h2>
            <span className="text-xs text-gray-500">Top guests nearby</span>
          </div>
          <div className="space-y-2">
            {leaderboard.map(entry => (
              <LeaderboardRow key={entry.rank} entry={entry} />
            ))}
          </div>
        </div>

        {/* Bottom padding for nav */}
        <div className="h-4" />
      </div>
    </div>
  )
}
