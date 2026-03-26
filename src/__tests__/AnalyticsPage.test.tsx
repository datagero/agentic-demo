import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import AnalyticsPage from '../pages/AnalyticsPage'
import { analyticsData, analyticsData30d } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <AnalyticsPage />
    </BrowserRouter>
  )
}

async function advancePastLoading() {
  await act(async () => {
    vi.runAllTimers()
  })
}

describe('AnalyticsPage', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('renders the analytics heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /analytics/i })).toBeInTheDocument()
  })

  it('shows skeleton placeholders for KPI cards while loading', () => {
    renderPage()
    // KPI labels should not be visible during loading
    expect(screen.queryByText(analyticsData.kpis[0].label)).not.toBeInTheDocument()
    // The skeleton container should be present
    expect(screen.getByLabelText(/loading kpi metrics/i)).toBeInTheDocument()
  })

  it('shows all 4 KPI cards after loading', async () => {
    renderPage()
    await advancePastLoading()
    analyticsData.kpis.forEach((kpi) => {
      expect(screen.getByText(kpi.label)).toBeInTheDocument()
      expect(screen.getByText(kpi.value)).toBeInTheDocument()
    })
  })

  it('displays trend indicators for each KPI after loading', async () => {
    renderPage()
    await advancePastLoading()
    analyticsData.kpis.forEach((kpi) => {
      const trendText = `${Math.abs(kpi.trend).toFixed(1)}%`
      expect(screen.getByText(trendText)).toBeInTheDocument()
    })
  })

  it('shows target values for each KPI after loading', async () => {
    renderPage()
    await advancePastLoading()
    analyticsData.kpis.forEach((kpi) => {
      expect(screen.getByText(`Target: ${kpi.target}`)).toBeInTheDocument()
    })
  })

  it('renders the engagement funnel stages', () => {
    renderPage()
    analyticsData.engagementFunnel.forEach((stage) => {
      expect(screen.getByText(stage.stage)).toBeInTheDocument()
    })
  })

  it('shows spend breakdown categories', () => {
    renderPage()
    analyticsData.spendBreakdown.forEach((item) => {
      expect(screen.getByText(item.category)).toBeInTheDocument()
    })
  })

  it('renders real-time alerts', () => {
    renderPage()
    analyticsData.alerts.forEach((alert) => {
      expect(screen.getByText(alert.message)).toBeInTheDocument()
    })
  })

  it('has period toggle buttons', () => {
    renderPage()
    expect(screen.getByText('Last 7 Days')).toBeInTheDocument()
    expect(screen.getByText('Last 30 Days')).toBeInTheDocument()
  })

  it('toggles between time periods', async () => {
    renderPage()
    await advancePastLoading()

    // After loading, use real timers for user interaction
    vi.useRealTimers()
    const user = userEvent.setup()

    const thirtyDay = screen.getByText('Last 30 Days')
    await user.click(thirtyDay)
    // Verify it's now active (has gold background)
    expect(thirtyDay.className).toContain('bg-pcl-gold')
  })

  it('renders the revenue bar chart', () => {
    renderPage()
    expect(screen.getByLabelText(/daily revenue chart/i)).toBeInTheDocument()
  })

  it('shows 30d KPI values after toggling to Last 30 Days', async () => {
    const user = userEvent.setup()
    renderPage()
    await user.click(screen.getByText('Last 30 Days'))
    analyticsData30d.kpis.forEach((kpi) => {
      expect(screen.getByText(kpi.value)).toBeInTheDocument()
    })
  })

  it('shows different KPI values for 7d vs 30d', async () => {
    const user = userEvent.setup()
    renderPage()
    // Default is 7d — verify 7d value present
    expect(screen.getByText(analyticsData.kpis[3].value)).toBeInTheDocument()
    // Switch to 30d — verify 30d value present and 7d value gone
    await user.click(screen.getByText('Last 30 Days'))
    expect(screen.getByText(analyticsData30d.kpis[3].value)).toBeInTheDocument()
    expect(screen.queryByText(analyticsData.kpis[3].value)).not.toBeInTheDocument()
  })
})
