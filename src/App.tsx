import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AccessibilityProvider } from './contexts/AccessibilityContext'
import ErrorBoundary from './components/ErrorBoundary'
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage'
import ItineraryPage from './pages/ItineraryPage'
import CommercePage from './pages/CommercePage'
import NavigatorPage from './pages/NavigatorPage'
import AnalyticsPage from './pages/AnalyticsPage'
import CmsPage from './pages/CmsPage'
import JourneyPage from './pages/JourneyPage'
import CheckInPage from './pages/CheckInPage'
import { ROUTES } from './routes'

export { ROUTES }

/** Wrap a page component in an error boundary for demo resilience */
function Screen({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary>{children}</ErrorBoundary>
}

function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path={ROUTES.HOME} element={<Screen><HomePage /></Screen>} />
            <Route path={ROUTES.ITINERARY} element={<Screen><ItineraryPage /></Screen>} />
            <Route path={ROUTES.COMMERCE} element={<Screen><CommercePage /></Screen>} />
            <Route path={ROUTES.NAVIGATOR} element={<Screen><NavigatorPage /></Screen>} />
            <Route path={ROUTES.ANALYTICS} element={<Screen><AnalyticsPage /></Screen>} />
            <Route path={ROUTES.CMS} element={<Screen><CmsPage /></Screen>} />
            <Route path={ROUTES.JOURNEY} element={<Screen><JourneyPage /></Screen>} />
            <Route path={ROUTES.CHECKIN} element={<Screen><CheckInPage /></Screen>} />
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  )
}

export default App
