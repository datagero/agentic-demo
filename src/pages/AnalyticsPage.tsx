import { useState } from 'react'
import { analyticsData } from '../data/mock'

function TrendArrow({ trend }: { trend: number }) {
  const isPositive = trend > 0
  return (
    <span className={`inline-flex items-center gap-0.5 text-xs font-semibold ${
      isPositive ? 'text-green-600' : 'text-red-500'
    }`}>
      <span aria-hidden="true">{isPositive ? '↑' : '↓'}</span>
      {Math.abs(trend).toFixed(1)}%
    </span>
  )
}

function MiniBarChart({ data }: { data: { date: string; value: number }[] }) {
  const maxVal = Math.max(...data.map((d) => d.value))
  return (
    <div className="flex items-end gap-1.5 h-24" role="img" aria-label="Daily revenue chart">
      {data.map((d) => (
        <div key={d.date} className="flex-1 flex flex-col items-center gap-1">
          <div
            className="w-full bg-pcl-navy rounded-t-sm transition-all duration-300"
            style={{ height: `${(d.value / maxVal) * 100}%` }}
          />
          <span className="text-[9px] text-gray-400">{d.date}</span>
        </div>
      ))}
    </div>
  )
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<'7d' | '30d'>('7d')
  const { kpis, engagementFunnel, spendBreakdown, dailyRevenue, alerts } = analyticsData

  return (
    <div className="flex flex-col bg-pcl-gray min-h-full page-enter">
      {/* Header */}
      <div className="bg-pcl-navy text-white px-4 pt-6 pb-6">
        <p className="text-pcl-gold text-xs font-semibold uppercase tracking-widest mb-1">
          Stakeholder View
        </p>
        <h1 className="text-2xl font-display font-semibold">Analytics</h1>
        <p className="text-gray-300 text-sm mt-1">Real-time KPI dashboard</p>

        {/* Period toggle */}
        <div className="flex gap-2 mt-3">
          {(['7d', '30d'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                period === p
                  ? 'bg-pcl-gold text-pcl-navy'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              {p === '7d' ? 'Last 7 Days' : 'Last 30 Days'}
            </button>
          ))}
        </div>
      </div>

      {/* KPI cards */}
      <div className="px-4 mt-4">
        <p className="section-label px-0">Key Metrics</p>
        <div className="grid grid-cols-2 gap-3">
          {kpis.map((kpi) => (
            <div key={kpi.label} className="card p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xl" aria-hidden="true">{kpi.icon}</span>
                <TrendArrow trend={kpi.trend} />
              </div>
              <p className="text-xs text-gray-400 font-medium">{kpi.label}</p>
              <p className="text-xl font-bold text-pcl-navy mt-0.5">{kpi.value}</p>
              <div className="flex items-center justify-between mt-1.5">
                <span className="text-[10px] text-gray-400">Target: {kpi.target}</span>
                <span className="text-[10px] text-gray-400">Prev: {kpi.previousValue}</span>
              </div>
              {/* Progress to target */}
              <div className="h-1 bg-gray-100 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-pcl-gold rounded-full"
                  style={{
                    width: `${Math.min(
                      (parseFloat(kpi.value.replace(/[^0-9.]/g, '')) /
                        parseFloat(kpi.target.replace(/[^0-9.]/g, ''))) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue chart */}
      <div className="px-4 mt-4">
        <p className="section-label px-0">Daily Revenue (per guest avg.)</p>
        <div className="card p-4">
          <MiniBarChart data={dailyRevenue} />
        </div>
      </div>

      {/* Engagement funnel */}
      <div className="px-4 mt-4">
        <p className="section-label px-0">Guest Engagement Funnel</p>
        <div className="card p-4 space-y-2">
          {engagementFunnel.map((stage, idx) => (
            <div key={stage.stage}>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-600 font-medium">{stage.stage}</span>
                <span className="text-gray-400">
                  {(stage.count / 1000).toFixed(0)}K ({stage.percentage}%)
                </span>
              </div>
              <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    idx === 0 ? 'bg-pcl-navy' :
                    idx === 1 ? 'bg-pcl-navy-light' :
                    idx === 2 ? 'bg-blue-400' :
                    idx === 3 ? 'bg-pcl-gold' :
                    'bg-pcl-gold-dark'
                  }`}
                  style={{ width: `${stage.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Spend breakdown */}
      <div className="px-4 mt-4">
        <p className="section-label px-0">Spend Breakdown</p>
        <div className="card p-4">
          {spendBreakdown.map(({ category, amount, percentage, color }) => (
            <div key={category} className="mb-2.5 last:mb-0">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span className="font-medium">{category}</span>
                <span>${amount} ({percentage}%)</span>
              </div>
              <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                <div className={`h-full ${color} rounded-full`} style={{ width: `${percentage}%` }} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts */}
      <div className="px-4 mt-4 pb-6">
        <p className="section-label px-0">Real-time Alerts</p>
        <div className="space-y-2">
          {alerts.map((alert) => (
            <div
              key={alert.id}
              className={`card p-3 flex items-start gap-3 border-l-4 ${
                alert.severity === 'success' ? 'border-green-500' :
                alert.severity === 'warning' ? 'border-amber-500' :
                'border-blue-500'
              }`}
            >
              <span className="text-lg shrink-0" aria-hidden="true">
                {alert.severity === 'success' ? '✅' :
                 alert.severity === 'warning' ? '⚠️' : 'ℹ️'}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-pcl-text font-medium">{alert.message}</p>
                <p className="text-[10px] text-gray-400 mt-0.5">{alert.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
