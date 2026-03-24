import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AccessibilityProvider } from './contexts/AccessibilityContext'
import AppLayout from './layouts/AppLayout'
import HomePage from './pages/HomePage'
import ItineraryPage from './pages/ItineraryPage'
import CommercePage from './pages/CommercePage'
import NavigatorPage from './pages/NavigatorPage'
import AnalyticsPage from './pages/AnalyticsPage'
import { ROUTES } from './routes'

export { ROUTES }

function App() {
  return (
    <AccessibilityProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path={ROUTES.HOME} element={<HomePage />} />
            <Route path={ROUTES.ITINERARY} element={<ItineraryPage />} />
            <Route path={ROUTES.COMMERCE} element={<CommercePage />} />
            <Route path={ROUTES.NAVIGATOR} element={<NavigatorPage />} />
            <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
            {/* Catch-all redirect to home */}
            <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AccessibilityProvider>
  )
}

export default App
