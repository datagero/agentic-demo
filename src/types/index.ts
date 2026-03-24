// Shared types for the Princess Cruises prototype

export interface Guest {
  firstName: string
  lastName: string
  initials: string
  medallionTier: 'Gold' | 'Platinum' | 'Ruby' | 'Elite'
  medallionPoints: number
  cabinNumber: string
  cabinDeck: string
}

export interface Voyage {
  shipName: string
  region: string
  nights: number
  departureDate: string
  returnDate: string
  daysUntilDeparture: number
  currentDay: number | null // null = pre-cruise
}

export interface PortStop {
  day: number
  port: string
  date: string
  type: 'Embarkation' | 'Sea Day' | 'Port Day' | 'Private Island' | 'Disembarkation'
  icon: string
  arrivalTime?: string
  departureTime?: string
}

export interface Activity {
  id: string
  time: string
  title: string
  location: string
  category: 'dining' | 'entertainment' | 'wellness' | 'excursion' | 'social'
  aiRecommended: boolean
  medallionPersonalized: boolean
  description?: string
}

export interface ItineraryDay {
  day: number
  date: string
  port: string
  isSeaDay: boolean
  weather: { temp: number; condition: string; icon: string }
  activities: Activity[]
}

export interface Product {
  id: string
  name: string
  category: 'dining' | 'spa' | 'excursion' | 'beverage' | 'entertainment' | 'retail'
  price: number
  originalPrice?: number
  description: string
  image: string // emoji placeholder
  medallionDiscount: boolean
  rating: number
  reviewCount: number
}

export interface DeckPOI {
  name: string
  icon: string
  category: 'dining' | 'entertainment' | 'wellness' | 'services' | 'recreation'
}

export interface ShipDeck {
  deckNumber: number
  name: string
  icon: string
  pointsOfInterest: DeckPOI[]
}

export interface KPIMetric {
  label: string
  value: string
  previousValue: string
  trend: number // percentage change
  target: string
  icon: string
  unit?: string
}

export interface TimeSeriesPoint {
  date: string
  value: number
}

export interface AnalyticsData {
  kpis: KPIMetric[]
  engagementFunnel: { stage: string; count: number; percentage: number }[]
  spendBreakdown: { category: string; amount: number; percentage: number; color: string }[]
  dailyRevenue: TimeSeriesPoint[]
  alerts: { id: string; message: string; severity: 'info' | 'warning' | 'success'; time: string }[]
}

export interface QuickAction {
  icon: string
  label: string
  badge?: string
}

export interface Recommendation {
  id: string
  title: string
  subtitle: string
  image: string // emoji
  category: string
  aiReason: string
}

// ── CMS & Notifications (Screen 6) ───────────────────────────────────────────

export interface ContentItem {
  id: string
  title: string
  type: 'menu' | 'activity' | 'deck-info' | 'promotion' | 'safety'
  status: 'published' | 'draft' | 'scheduled'
  lastUpdated: string
  aemSynced: boolean
}

export interface NotificationDraft {
  id: string
  title: string
  message: string
  audience: 'all' | 'deck' | 'loyalty-tier' | 'port-day'
  audienceDetail?: string
  scheduledFor?: string
  status: 'draft' | 'sent' | 'scheduled'
}

// ── Guest Journey Analytics (Screen 7) ────────────────────────────────────────

export interface JourneyFunnelStage {
  stage: string
  count: number
  dropOff: number // percentage drop from previous stage
  isHighlighted: boolean // biggest drop-off
}

export interface JourneyAnalyticsData {
  funnel: JourneyFunnelStage[]
  npsTrend: TimeSeriesPoint[]
  conversionDrivers: { driver: string; impact: string; direction: 'up' | 'down' }[]
}

// ── OceanReady Check-In (Screen 8) ───────────────────────────────────────────

export interface CheckInStep {
  id: string
  label: string
  status: 'complete' | 'in-progress' | 'pending'
  aiAssisted: boolean
  detail?: string
}

export interface CompanionProfile {
  name: string
  initials: string
  relation: string
  completionPct: number
  currentStep: string
}
