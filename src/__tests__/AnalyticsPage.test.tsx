import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import AnalyticsPage from '../pages/AnalyticsPage'
import { analyticsData } from '../data/mock'

function renderPage() {
  return render(
    <BrowserRouter>
      <AnalyticsPage />
    </BrowserRouter>
  )
}

describe('AnalyticsPage', () => {
  it('renders the analytics heading', () => {
    renderPage()
    expect(screen.getByRole('heading', { name: /analytics/i })).toBeInTheDocument()
  })

  it('shows all 4 KPI cards', () => {
    renderPage()
    analyticsData.kpis.forEach((kpi) => {
      expect(screen.getByText(kpi.label)).toBeInTheDocument()
      expect(screen.getByText(kpi.value)).toBeInTheDocument()
    })
  })

  it('displays trend indicators for each KPI', () => {
    renderPage()
    analyticsData.kpis.forEach((kpi) => {
      const trendText = `${Math.abs(kpi.trend).toFixed(1)}%`
      expect(screen.getByText(trendText)).toBeInTheDocument()
    })
  })

  it('shows target values for each KPI', () => {
    renderPage()
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
    const user = userEvent.setup()
    renderPage()
    const thirtyDay = screen.getByText('Last 30 Days')
    await user.click(thirtyDay)
    // Verify it's now active (has gold background)
    expect(thirtyDay.className).toContain('bg-pcl-gold')
  })

  it('renders the revenue bar chart', () => {
    renderPage()
    expect(screen.getByLabelText(/daily revenue chart/i)).toBeInTheDocument()
  })
})
