import type {
  Guest, Voyage, PortStop, ItineraryDay, Product,
  ShipDeck, AnalyticsData, QuickAction, Recommendation,
  ContentItem, NotificationDraft, JourneyAnalyticsData,
  CheckInStep, CompanionProfile,
} from '../types'

// ── Guest Profile ─────────────────────────────────────────────────────────────

export const guest: Guest = {
  firstName: 'Sarah',
  lastName: 'Mitchell',
  initials: 'SM',
  medallionTier: 'Gold',
  medallionPoints: 2450,
  cabinNumber: 'D412',
  cabinDeck: 'Dolphin Deck 9',
}

// ── Voyage ────────────────────────────────────────────────────────────────────

export const voyage: Voyage = {
  shipName: 'Caribbean Princess',
  region: 'Eastern Caribbean',
  nights: 7,
  departureDate: 'Apr 7',
  returnDate: 'Apr 14',
  daysUntilDeparture: 14,
  currentDay: null,
}

// ── Port Stops ────────────────────────────────────────────────────────────────

export const portStops: PortStop[] = [
  { day: 1, port: 'Fort Lauderdale, FL', date: 'Apr 7', type: 'Embarkation', icon: '🚢', departureTime: '4:00 PM' },
  { day: 2, port: 'At Sea', date: 'Apr 8', type: 'Sea Day', icon: '🌊' },
  { day: 3, port: 'Princess Cays, Bahamas', date: 'Apr 9', type: 'Private Island', icon: '🏖️', arrivalTime: '8:00 AM', departureTime: '5:00 PM' },
  { day: 4, port: 'San Juan, Puerto Rico', date: 'Apr 10', type: 'Port Day', icon: '🏛️', arrivalTime: '7:00 AM', departureTime: '6:00 PM' },
  { day: 5, port: 'St. Thomas, USVI', date: 'Apr 11', type: 'Port Day', icon: '🌴', arrivalTime: '8:00 AM', departureTime: '5:00 PM' },
  { day: 6, port: 'At Sea', date: 'Apr 12', type: 'Sea Day', icon: '🌊' },
  { day: 7, port: 'At Sea', date: 'Apr 13', type: 'Sea Day', icon: '🌊' },
  { day: 8, port: 'Fort Lauderdale, FL', date: 'Apr 14', type: 'Disembarkation', icon: '🏠', arrivalTime: '6:00 AM' },
]

// ── Itinerary Days ────────────────────────────────────────────────────────────

export const itineraryDays: ItineraryDay[] = [
  {
    day: 1, date: 'Apr 7', port: 'Fort Lauderdale', isSeaDay: false,
    weather: { temp: 82, condition: 'Sunny', icon: '☀️' },
    activities: [
      { id: 'a1', time: '12:00 PM', title: 'Embarkation & Welcome', location: 'Terminal', category: 'social', aiRecommended: false, medallionPersonalized: false },
      { id: 'a2', time: '3:00 PM', title: 'Muster Drill', location: 'Muster Station B', category: 'social', aiRecommended: false, medallionPersonalized: false },
      { id: 'a3', time: '4:00 PM', title: 'Sail Away Party', location: 'Lido Deck', category: 'entertainment', aiRecommended: true, medallionPersonalized: false, description: 'Live DJ and complimentary cocktails' },
      { id: 'a4', time: '6:30 PM', title: 'Welcome Dinner', location: 'Allegro Dining Room', category: 'dining', aiRecommended: true, medallionPersonalized: true, description: 'Based on your preference for Italian cuisine' },
      { id: 'a5', time: '9:00 PM', title: 'Broadway Show: Rock Opera', location: 'Princess Theater', category: 'entertainment', aiRecommended: false, medallionPersonalized: false },
    ],
  },
  {
    day: 2, date: 'Apr 8', port: 'At Sea', isSeaDay: true,
    weather: { temp: 84, condition: 'Partly Cloudy', icon: '⛅' },
    activities: [
      { id: 'b1', time: '7:00 AM', title: 'Sunrise Yoga', location: 'Sun Deck', category: 'wellness', aiRecommended: true, medallionPersonalized: true, description: 'Recommended based on your wellness profile' },
      { id: 'b2', time: '9:00 AM', title: 'Breakfast Buffet', location: 'Horizon Court', category: 'dining', aiRecommended: false, medallionPersonalized: false },
      { id: 'b3', time: '11:00 AM', title: 'Mixology Masterclass', location: 'Crooners Bar', category: 'entertainment', aiRecommended: true, medallionPersonalized: false },
      { id: 'b4', time: '1:00 PM', title: 'Lotus Spa Treatment', location: 'Lotus Spa, Deck 15', category: 'wellness', aiRecommended: true, medallionPersonalized: true, description: 'Gold members: complimentary upgrade to hot stones' },
      { id: 'b5', time: '5:00 PM', title: 'Chef\'s Table Experience', location: 'Chef\'s Table, Deck 6', category: 'dining', aiRecommended: true, medallionPersonalized: true, description: 'Exclusive 8-course tasting menu' },
      { id: 'b6', time: '8:30 PM', title: 'Comedy Night', location: 'Princess Theater', category: 'entertainment', aiRecommended: false, medallionPersonalized: false },
    ],
  },
  {
    day: 3, date: 'Apr 9', port: 'Princess Cays, Bahamas', isSeaDay: false,
    weather: { temp: 86, condition: 'Sunny', icon: '☀️' },
    activities: [
      { id: 'c1', time: '8:00 AM', title: 'Tender to Princess Cays', location: 'Deck 3 Tender Platform', category: 'excursion', aiRecommended: false, medallionPersonalized: false },
      { id: 'c2', time: '9:30 AM', title: 'Snorkeling Adventure', location: 'Princess Cays Beach', category: 'excursion', aiRecommended: true, medallionPersonalized: false, description: 'Top-rated excursion — 4.8 stars' },
      { id: 'c3', time: '12:00 PM', title: 'Beach BBQ Lunch', location: 'Beachside Grill', category: 'dining', aiRecommended: false, medallionPersonalized: false },
      { id: 'c4', time: '2:00 PM', title: 'Kayak Tour', location: 'Water Sports Center', category: 'excursion', aiRecommended: true, medallionPersonalized: true, description: 'Based on your love of water activities' },
      { id: 'c5', time: '5:00 PM', title: 'Return to Ship', location: 'Tender Platform', category: 'social', aiRecommended: false, medallionPersonalized: false },
    ],
  },
  {
    day: 4, date: 'Apr 10', port: 'San Juan, Puerto Rico', isSeaDay: false,
    weather: { temp: 88, condition: 'Sunny', icon: '☀️' },
    activities: [
      { id: 'd1', time: '7:30 AM', title: 'Old San Juan Walking Tour', location: 'Pier Gate', category: 'excursion', aiRecommended: true, medallionPersonalized: false, description: 'UNESCO World Heritage site — rated 4.6 stars' },
      { id: 'd2', time: '10:00 AM', title: 'El Morro Fortress Visit', location: 'Castillo San Felipe del Morro', category: 'excursion', aiRecommended: true, medallionPersonalized: true, description: 'Recommended based on your interest in history' },
      { id: 'd3', time: '12:30 PM', title: 'Local Cuisine Lunch', location: 'La Mallorca, Old San Juan', category: 'dining', aiRecommended: true, medallionPersonalized: false, description: 'Award-winning Puerto Rican cuisine' },
      { id: 'd4', time: '3:00 PM', title: 'Condado Beach Relax', location: 'Condado Beach', category: 'wellness', aiRecommended: false, medallionPersonalized: false },
      { id: 'd5', time: '5:30 PM', title: 'Return to Ship & Sail Away', location: 'Pier 4, San Juan', category: 'social', aiRecommended: false, medallionPersonalized: false },
    ],
  },
  {
    day: 5, date: 'Apr 11', port: 'St. Thomas, USVI', isSeaDay: false,
    weather: { temp: 85, condition: 'Partly Cloudy', icon: '⛅' },
    activities: [
      { id: 'e1', time: '8:00 AM', title: 'Coral World Ocean Park', location: 'Coral World, Estate Caret Bay', category: 'excursion', aiRecommended: false, medallionPersonalized: false },
      { id: 'e2', time: '9:30 AM', title: 'Trunk Bay Snorkel Tour', location: 'Trunk Bay, St. John', category: 'excursion', aiRecommended: true, medallionPersonalized: true, description: 'One of the top 10 beaches in the world' },
      { id: 'e3', time: '12:00 PM', title: 'Charlotte Amalie Shopping', location: 'Main Street, Charlotte Amalie', category: 'social', aiRecommended: false, medallionPersonalized: false, description: 'Duty-free jewelry, electronics and rum' },
      { id: 'e4', time: '2:30 PM', title: 'Magens Bay Beach Afternoon', location: 'Magens Bay', category: 'wellness', aiRecommended: true, medallionPersonalized: false, description: 'Pristine white sand beach — top-rated by guests' },
      { id: 'e5', time: '4:30 PM', title: 'Return to Ship', location: 'Crown Bay Pier', category: 'social', aiRecommended: false, medallionPersonalized: false },
    ],
  },
  {
    day: 6, date: 'Apr 12', port: 'At Sea', isSeaDay: true,
    weather: { temp: 83, condition: 'Sunny', icon: '☀️' },
    activities: [
      { id: 'f1', time: '7:00 AM', title: 'Morning Stretch & Yoga', location: 'Sun Deck', category: 'wellness', aiRecommended: true, medallionPersonalized: true, description: 'Recommended based on your wellness profile' },
      { id: 'f2', time: '10:00 AM', title: 'Trivia Challenge', location: 'Wheelhouse Bar', category: 'entertainment', aiRecommended: false, medallionPersonalized: false },
      { id: 'f3', time: '12:00 PM', title: 'Pool Deck Lunch', location: 'Trident Grill, Lido Deck', category: 'dining', aiRecommended: false, medallionPersonalized: false },
      { id: 'f4', time: '2:00 PM', title: 'Afternoon Spa Treatment', location: 'Lotus Spa, Deck 15', category: 'wellness', aiRecommended: true, medallionPersonalized: true, description: 'Gold members: complimentary aromatherapy add-on' },
      { id: 'f5', time: '8:30 PM', title: 'Farewell Variety Show', location: 'Princess Theater', category: 'entertainment', aiRecommended: false, medallionPersonalized: false },
    ],
  },
  {
    day: 7, date: 'Apr 13', port: 'At Sea', isSeaDay: true,
    weather: { temp: 81, condition: 'Partly Cloudy', icon: '⛅' },
    activities: [
      { id: 'g1', time: '8:00 AM', title: 'Captain\'s Farewell Breakfast', location: 'Allegro Dining Room', category: 'dining', aiRecommended: true, medallionPersonalized: true, description: 'Exclusive breakfast with the Captain for Gold members' },
      { id: 'g2', time: '10:30 AM', title: 'Art Auction Preview', location: 'Grand Atrium, Deck 6', category: 'entertainment', aiRecommended: false, medallionPersonalized: false },
      { id: 'g3', time: '1:00 PM', title: 'Poolside BBQ', location: 'Sky Pool Deck', category: 'dining', aiRecommended: false, medallionPersonalized: false },
      { id: 'g4', time: '3:00 PM', title: 'Packing & Disembarkation Prep', location: 'Cabin D412', category: 'social', aiRecommended: false, medallionPersonalized: false, description: 'Luggage must be outside cabin by 11 PM' },
      { id: 'g5', time: '7:00 PM', title: 'Farewell Dinner', location: 'Sabatini\'s Italian Trattoria', category: 'dining', aiRecommended: true, medallionPersonalized: true, description: 'Based on your preference for Italian cuisine' },
    ],
  },
  {
    day: 8, date: 'Apr 14', port: 'Fort Lauderdale, FL', isSeaDay: false,
    weather: { temp: 80, condition: 'Sunny', icon: '☀️' },
    activities: [
      { id: 'h1', time: '6:30 AM', title: 'Early Disembarkation Breakfast', location: 'Horizon Court', category: 'dining', aiRecommended: false, medallionPersonalized: false },
      { id: 'h2', time: '7:30 AM', title: 'Self-Assist Disembarkation', location: 'Deck 3 Exit', category: 'social', aiRecommended: false, medallionPersonalized: false, description: 'Carry your own luggage for earliest departure' },
      { id: 'h3', time: '9:00 AM', title: 'Standard Disembarkation', location: 'Terminal 2', category: 'social', aiRecommended: false, medallionPersonalized: false },
    ],
  },
]

// ── Products ──────────────────────────────────────────────────────────────────

export const products: Product[] = [
  { id: 'p1', name: 'Sabatini\'s Italian Trattoria', category: 'dining', price: 29, description: 'Authentic Italian cuisine with handmade pasta', image: '🍝', medallionDiscount: true, rating: 4.8, reviewCount: 342 },
  { id: 'p2', name: 'Crown Grill Steakhouse', category: 'dining', price: 39, description: 'Premium steaks and fresh seafood', image: '🥩', medallionDiscount: false, rating: 4.7, reviewCount: 287 },
  { id: 'p3', name: 'Deep Tissue Massage', category: 'spa', price: 119, originalPrice: 149, description: '50-min therapeutic massage at Lotus Spa', image: '💆', medallionDiscount: true, rating: 4.9, reviewCount: 156 },
  { id: 'p4', name: 'Couples Spa Retreat', category: 'spa', price: 199, originalPrice: 249, description: 'Side-by-side treatments with champagne', image: '🧖', medallionDiscount: true, rating: 4.9, reviewCount: 89 },
  { id: 'p5', name: 'Snorkeling at Princess Cays', category: 'excursion', price: 79, description: 'Guided reef tour with equipment included', image: '🤿', medallionDiscount: false, rating: 4.8, reviewCount: 412 },
  { id: 'p6', name: 'San Juan Old City Walking Tour', category: 'excursion', price: 59, description: 'Historic walking tour with local guide', image: '🏛️', medallionDiscount: false, rating: 4.6, reviewCount: 234 },
  { id: 'p7', name: 'Premium Beverage Package', category: 'beverage', price: 69, originalPrice: 89, description: 'Unlimited cocktails, wine & beer daily', image: '🍸', medallionDiscount: true, rating: 4.5, reviewCount: 1023 },
  { id: 'p8', name: 'Photo Package — Unlimited', category: 'retail', price: 179, originalPrice: 229, description: 'All professional photos from your voyage', image: '📸', medallionDiscount: true, rating: 4.4, reviewCount: 567 },
]

// ── Ship Decks ────────────────────────────────────────────────────────────────

export const shipDecks: ShipDeck[] = [
  {
    deckNumber: 17, name: 'Sun Deck', icon: '☀️',
    pointsOfInterest: [
      { name: 'The Sanctuary', icon: '🧘', category: 'wellness' },
      { name: 'Sports Court', icon: '🏀', category: 'recreation' },
      { name: 'Jogging Track', icon: '🏃', category: 'recreation' },
    ],
  },
  {
    deckNumber: 16, name: 'Sky Deck', icon: '🌤️',
    pointsOfInterest: [
      { name: 'Sky Pool', icon: '🏊', category: 'recreation' },
      { name: 'Hot Tubs', icon: '♨️', category: 'recreation' },
      { name: 'Outrigger Bar', icon: '🍹', category: 'dining' },
      { name: 'Movies Under the Stars', icon: '🎬', category: 'entertainment' },
    ],
  },
  {
    deckNumber: 15, name: 'Lido Deck', icon: '🏊',
    pointsOfInterest: [
      { name: 'Horizon Court Buffet', icon: '🍽️', category: 'dining' },
      { name: 'Trident Grill', icon: '🍔', category: 'dining' },
      { name: 'Lotus Spa', icon: '💆', category: 'wellness' },
      { name: 'Fitness Center', icon: '💪', category: 'wellness' },
    ],
  },
  {
    deckNumber: 7, name: 'Promenade Deck', icon: '🚶',
    pointsOfInterest: [
      { name: 'Allegro Dining Room', icon: '🍷', category: 'dining' },
      { name: 'Princess Casino', icon: '🎰', category: 'entertainment' },
      { name: 'Boutique Shops', icon: '🛍️', category: 'services' },
      { name: 'Photo Gallery', icon: '📸', category: 'services' },
      { name: 'Wheelhouse Bar', icon: '🍺', category: 'dining' },
    ],
  },
  {
    deckNumber: 6, name: 'Plaza Deck', icon: '🏛️',
    pointsOfInterest: [
      { name: 'Grand Atrium', icon: '✨', category: 'services' },
      { name: 'Guest Services', icon: '🛎️', category: 'services' },
      { name: 'Princess Theater', icon: '🎭', category: 'entertainment' },
      { name: 'Chef\'s Table', icon: '👨‍🍳', category: 'dining' },
      { name: 'Crooners Bar', icon: '🎵', category: 'entertainment' },
    ],
  },
]

// ── Quick Actions (Home) ──────────────────────────────────────────────────────

export const quickActions: QuickAction[] = [
  { icon: '🍽️', label: 'Reserve Dining', badge: '3 available', route: '/commerce' },
  { icon: '🛳️', label: 'Shore Excursions', badge: '5 ports', route: '/itinerary' },
  { icon: '💆', label: 'Spa & Wellness', badge: '20% off', route: '/commerce' },
  { icon: '📋', label: 'Check-in', badge: 'Complete', route: '/checkin' },
]

// ── Recommendations (Home) ───────────────────────────────────────────────────

export const recommendations: Recommendation[] = [
  {
    id: 'r1', title: 'Chef\'s Table Experience', subtitle: '$89/person · Deck 6',
    image: '👨‍🍳', category: 'dining',
    aiReason: 'Based on your love of Italian cuisine',
    route: '/commerce',
  },
  {
    id: 'r2', title: 'Snorkeling at Princess Cays', subtitle: '$79/person · Day 3',
    image: '🤿', category: 'excursion',
    aiReason: 'Top-rated for adventurous travelers',
    route: '/itinerary',
  },
  {
    id: 'r3', title: 'Couples Spa Retreat', subtitle: '$199/couple · Lotus Spa',
    image: '🧖', category: 'wellness',
    aiReason: 'Gold members save $50',
    route: '/commerce',
  },
]

// ── Analytics ─────────────────────────────────────────────────────────────────

export const analyticsData7d: AnalyticsData = {
  kpis: [
    { label: 'NPS Score', value: '72', previousValue: '65', trend: 10.8, target: '75', icon: '⭐', unit: 'pts' },
    { label: 'App Rating', value: '4.6', previousValue: '4.3', trend: 7.0, target: '4.7', icon: '📱', unit: '/5' },
    { label: 'Booking Conv.', value: '34%', previousValue: '28%', trend: 21.4, target: '35%', icon: '💳' },
    { label: 'Rev/Guest', value: '$847', previousValue: '$720', trend: 17.6, target: '$900', icon: '💰' },
  ],
  engagementFunnel: [
    { stage: 'App Downloads', count: 125000, percentage: 100 },
    { stage: 'Registrations', count: 98000, percentage: 78 },
    { stage: 'Active Users', count: 72000, percentage: 58 },
    { stage: 'Pre-Cruise Bookers', count: 45000, percentage: 36 },
    { stage: 'Repeat Bookers', count: 18000, percentage: 14 },
  ],
  spendBreakdown: [
    { category: 'Dining', amount: 356, percentage: 42, color: 'bg-pcl-navy' },
    { category: 'Spa & Wellness', amount: 237, percentage: 28, color: 'bg-pcl-gold' },
    { category: 'Excursions', amount: 169, percentage: 20, color: 'bg-blue-400' },
    { category: 'Retail & Photo', amount: 85, percentage: 10, color: 'bg-gray-400' },
  ],
  dailyRevenue: [
    { date: 'Mon', value: 42000 },
    { date: 'Tue', value: 48000 },
    { date: 'Wed', value: 51000 },
    { date: 'Thu', value: 55000 },
    { date: 'Fri', value: 62000 },
    { date: 'Sat', value: 71000 },
    { date: 'Sun', value: 68000 },
  ],
  alerts: [
    { id: 'al1', message: 'NPS trending above target — +7 points this week', severity: 'success', time: '2 min ago' },
    { id: 'al2', message: 'Spa booking surge on Deck 15 — consider adding slots', severity: 'info', time: '15 min ago' },
    { id: 'al3', message: 'Check-in wait time approaching 8 min threshold', severity: 'warning', time: '1 hr ago' },
  ],
}

export const analyticsData30d: AnalyticsData = {
  kpis: [
    { label: 'NPS Score', value: '74', previousValue: '68', trend: 8.8, target: '75', icon: '⭐', unit: 'pts' },
    { label: 'App Rating', value: '4.7', previousValue: '4.4', trend: 6.8, target: '4.8', icon: '📱', unit: '/5' },
    { label: 'Booking Conv.', value: '38%', previousValue: '31%', trend: 22.6, target: '40%', icon: '💳' },
    { label: 'Rev/Guest', value: '$1,124', previousValue: '$940', trend: 19.6, target: '$1,200', icon: '💰' },
  ],
  engagementFunnel: [
    { stage: 'App Downloads', count: 520000, percentage: 100 },
    { stage: 'Registrations', count: 412000, percentage: 79 },
    { stage: 'Active Users', count: 308000, percentage: 59 },
    { stage: 'Pre-Cruise Bookers', count: 195000, percentage: 38 },
    { stage: 'Repeat Bookers', count: 82000, percentage: 16 },
  ],
  spendBreakdown: [
    { category: 'Dining', amount: 478, percentage: 43, color: 'bg-pcl-navy' },
    { category: 'Spa & Wellness', amount: 312, percentage: 28, color: 'bg-pcl-gold' },
    { category: 'Excursions', amount: 223, percentage: 20, color: 'bg-blue-400' },
    { category: 'Retail & Photo', amount: 111, percentage: 10, color: 'bg-gray-400' },
  ],
  dailyRevenue: [
    { date: 'W1', value: 168000 },
    { date: 'W2', value: 185000 },
    { date: 'W3', value: 201000 },
    { date: 'W4', value: 224000 },
  ],
  alerts: [
    { id: 'al4', message: 'Monthly NPS record broken — 74 pts, highest in 2 years', severity: 'success', time: '1 hr ago' },
    { id: 'al5', message: 'Excursion bookings up 31% vs prior 30-day period', severity: 'info', time: '3 hrs ago' },
    { id: 'al6', message: 'Post-cruise survey completion below 20% — review CTA', severity: 'warning', time: '6 hrs ago' },
  ],
}

/** Backwards-compatible alias — resolves to the 7-day dataset. */
export const analyticsData = analyticsData7d

export function getAnalyticsData(period: '7d' | '30d'): AnalyticsData {
  return period === '30d' ? analyticsData30d : analyticsData7d
}

// ── CMS Content Items ─────────────────────────────────────────────────────────

export const contentItems: ContentItem[] = [
  { id: 'c1', title: 'Lido Deck Lunch Menu — Week 2', type: 'menu', status: 'published', lastUpdated: '2 hours ago', aemSynced: true },
  { id: 'c2', title: 'Princess Cays Shore Guide', type: 'deck-info', status: 'published', lastUpdated: '1 day ago', aemSynced: true },
  { id: 'c3', title: 'Spa Early Bird Promotion', type: 'promotion', status: 'scheduled', lastUpdated: '3 hours ago', aemSynced: false },
  { id: 'c4', title: 'Evening Entertainment Schedule', type: 'activity', status: 'draft', lastUpdated: '30 min ago', aemSynced: false },
  { id: 'c5', title: 'Muster Drill Safety Brief', type: 'safety', status: 'published', lastUpdated: '5 days ago', aemSynced: true },
  { id: 'c6', title: 'Captain\'s Circle Loyalty Rewards', type: 'promotion', status: 'draft', lastUpdated: '1 hour ago', aemSynced: false },
]

export const notificationDrafts: NotificationDraft[] = [
  { id: 'n1', title: 'Port Arrival', message: 'We arrive at Princess Cays at 8:00 AM. Tenders begin at 8:30 AM from Deck 3.', audience: 'all', status: 'scheduled', scheduledFor: 'Apr 9 · 7:30 AM' },
  { id: 'n2', title: 'Spa Flash Sale', message: '20% off all afternoon treatments today. Book now in the app!', audience: 'loyalty-tier', audienceDetail: 'Gold & above', status: 'draft' },
  { id: 'n3', title: 'Pool Deck Event', message: 'Live music at the Sky Pool starting at 4 PM. Don\'t miss it!', audience: 'deck', audienceDetail: 'Decks 14-17', status: 'sent' },
]

// ── Guest Journey Analytics ───────────────────────────────────────────────────

export const journeyAnalytics: JourneyAnalyticsData = {
  funnel: [
    { stage: 'App Open', count: 125000, dropOff: 0, isHighlighted: false },
    { stage: 'Voyage Discovery', count: 98000, dropOff: 21.6, isHighlighted: false },
    { stage: 'Itinerary View', count: 82000, dropOff: 16.3, isHighlighted: false },
    { stage: 'Pre-Cruise Purchase', count: 45000, dropOff: 45.1, isHighlighted: true },
    { stage: 'Check-In Complete', count: 38000, dropOff: 15.6, isHighlighted: false },
    { stage: 'Onboard Engagement', count: 34000, dropOff: 10.5, isHighlighted: false },
    { stage: 'Post-Cruise Survey', count: 12000, dropOff: 64.7, isHighlighted: true },
  ],
  npsTrend: [
    { date: 'Mon', value: 62 },
    { date: 'Tue', value: 65 },
    { date: 'Wed', value: 64 },
    { date: 'Thu', value: 68 },
    { date: 'Fri', value: 70 },
    { date: 'Sat', value: 72 },
    { date: 'Sun', value: 72 },
  ],
  conversionDrivers: [
    { driver: 'AI-personalized recommendations', impact: '+8.2% conversion', direction: 'up' },
    { driver: 'Medallion-tiered pricing', impact: '+12% Gold member spend', direction: 'up' },
    { driver: 'OceanReady check-in friction', impact: '-15.6% completion', direction: 'down' },
    { driver: 'Post-cruise survey length', impact: '-64.7% response rate', direction: 'down' },
  ],
}

// ── OceanReady Check-In ───────────────────────────────────────────────────────

export const checkInSteps: CheckInStep[] = [
  { id: 's1', label: 'Personal Information', status: 'complete', aiAssisted: true, detail: 'Auto-filled from Medallion profile' },
  { id: 's2', label: 'Travel Documents', status: 'complete', aiAssisted: true, detail: 'Passport verified via OCR scan' },
  { id: 's3', label: 'Health Screening', status: 'complete', aiAssisted: false, detail: 'Completed Mar 20' },
  { id: 's4', label: 'Emergency Contact', status: 'in-progress', aiAssisted: false, detail: 'Requires manual entry' },
  { id: 's5', label: 'Payment Method', status: 'pending', aiAssisted: true, detail: 'Medallion wallet auto-link available' },
]

export const companions: CompanionProfile[] = [
  { name: 'James Mitchell', initials: 'JM', relation: 'Spouse', completionPct: 80, currentStep: 'Emergency Contact' },
  { name: 'Emma Mitchell', initials: 'EM', relation: 'Child (14)', completionPct: 40, currentStep: 'Health Screening' },
]
