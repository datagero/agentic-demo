// Central route definitions — imported by both App.tsx and AppLayout.tsx
// to avoid circular dependencies.
export const ROUTES = {
  HOME: '/',
  ITINERARY: '/itinerary',
  COMMERCE: '/commerce',
  NAVIGATOR: '/navigator',
  ANALYTICS: '/analytics',
  CMS: '/cms',
  JOURNEY: '/journey',
  CHECKIN: '/checkin',
  CHECKOUT: '/checkout',
  VOYAGE_REWIND: '/voyage-rewind',
  VOYAGE_SCORE: '/voyage-score',
  FAMILY: '/family',
} as const
