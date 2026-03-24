import { useEffect, useRef } from 'react'
import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { ROUTES } from '../routes'

// ── SVG Icon components (inline, no external dependency) ──────────────────────

function HomeIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 1.8}
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 12L11.204 3.045a1.125 1.125 0 011.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
      />
    </svg>
  )
}

function ItineraryIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 1.8}
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
      />
    </svg>
  )
}

function CommerceIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 1.8}
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  )
}

function NavigatorIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 1.8}
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z"
      />
    </svg>
  )
}

function AnalyticsIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 1.8}
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z"
      />
    </svg>
  )
}

function CmsIcon({ active }: { active: boolean }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={active ? 'currentColor' : 'none'}
      stroke="currentColor"
      strokeWidth={active ? 0 : 1.8}
      className="w-6 h-6"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      />
    </svg>
  )
}

// ── Nav tab config ────────────────────────────────────────────────────────────

interface NavTab {
  to: string
  label: string
  Icon: React.ComponentType<{ active: boolean }>
}

const NAV_TABS: NavTab[] = [
  { to: ROUTES.HOME, label: 'Home', Icon: HomeIcon },
  { to: ROUTES.ITINERARY, label: 'Itinerary', Icon: ItineraryIcon },
  { to: ROUTES.COMMERCE, label: 'Shop', Icon: CommerceIcon },
  { to: ROUTES.NAVIGATOR, label: 'Navigator', Icon: NavigatorIcon },
  { to: ROUTES.ANALYTICS, label: 'Insights', Icon: AnalyticsIcon },
  { to: ROUTES.CMS, label: 'Manage', Icon: CmsIcon },
]

// ── AppLayout ─────────────────────────────────────────────────────────────────

export default function AppLayout() {
  const { pathname } = useLocation()
  const mainRef = useRef<HTMLElement>(null)

  // Scroll main content to top on route change
  useEffect(() => {
    if (mainRef.current && typeof mainRef.current.scrollTo === 'function') {
      mainRef.current.scrollTo(0, 0)
    } else if (mainRef.current) {
      mainRef.current.scrollTop = 0
    }
  }, [pathname])

  return (
    /* Outer wrapper: centers the "phone frame" on desktop backgrounds */
    <div className="min-h-screen bg-gradient-to-br from-pcl-navy to-pcl-navy-light flex items-start justify-center">
      <div className="phone-frame flex flex-col">

        {/* ── Skip Navigation Link ── */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:top-2 focus:left-2 focus:px-4 focus:py-2 focus:bg-pcl-navy focus:text-white focus:rounded focus:outline-none focus:ring-2 focus:ring-pcl-gold"
        >
          Skip to main content
        </a>

        {/* ── Top Header ── */}
        <header
          className="flex items-center justify-between px-4 bg-pcl-navy text-white shrink-0"
          style={{ height: 64 }}
          role="banner"
        >
          {/* Logo / brand mark */}
          <div className="flex items-center gap-2">
            {/* Simple ship silhouette using emoji as placeholder icon */}
            <span className="text-pcl-gold text-xl" aria-hidden="true">🚢</span>
            <div>
              <p className="font-display font-semibold text-sm leading-tight tracking-wide">
                Princess Cruises
              </p>
              <p className="text-pcl-gold text-xs leading-tight font-light tracking-wider">
                COME BACK NEW
              </p>
            </div>
          </div>

          {/* Guest greeting / avatar */}
          <div className="flex items-center gap-2">
            <div className="text-right">
              <p className="text-xs text-gray-300 leading-tight">Welcome back</p>
              <p className="text-sm font-medium leading-tight text-pcl-gold">Sarah M.</p>
            </div>
            <div
              className="w-9 h-9 rounded-full bg-pcl-gold flex items-center justify-center text-pcl-navy font-bold text-sm"
              aria-label="Guest avatar"
            >
              SM
            </div>
          </div>
        </header>

        {/* ── Page Content ── */}
        <main ref={mainRef} className="screen-content flex-1" id="main-content">
          <Outlet />
        </main>

        {/* ── Bottom Tab Navigation ── */}
        <nav
          className="shrink-0 bg-white border-t border-gray-200"
          style={{ height: 64 }}
          aria-label="Main navigation"
        >
          <div className="flex h-full">
            {NAV_TABS.map(({ to, label, Icon }) => (
              <NavLink
                key={to}
                to={to}
                end={to === ROUTES.HOME}
                className={({ isActive }) =>
                  [
                    'flex flex-col items-center justify-center flex-1 gap-0.5 transition-colors duration-150',
                    isActive
                      ? 'text-pcl-navy'
                      : 'text-gray-400 hover:text-gray-600',
                  ].join(' ')
                }
                aria-label={label}
              >
                {({ isActive }) => (
                  <>
                    {/* Active indicator bar */}
                    <span
                      className={[
                        'absolute top-0 h-0.5 w-10 rounded-full transition-all duration-200',
                        isActive ? 'bg-pcl-gold' : 'bg-transparent',
                      ].join(' ')}
                      style={{ position: 'relative' }}
                      aria-hidden="true"
                    />
                    <Icon active={isActive} />
                    <span
                      className={[
                        'text-[10px] font-medium leading-none',
                        isActive ? 'text-pcl-navy' : 'text-gray-400',
                      ].join(' ')}
                    >
                      {label}
                    </span>
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </nav>

      </div>
    </div>
  )
}
