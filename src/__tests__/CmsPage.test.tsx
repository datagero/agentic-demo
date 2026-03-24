import { render, screen, within } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import CmsPage from '../pages/CmsPage'
import { contentItems, notificationDrafts } from '../data/mock'

function renderCmsPage() {
  return render(
    <BrowserRouter>
      <CmsPage />
    </BrowserRouter>
  )
}

describe('CmsPage', () => {
  it('renders the "Content Manager" heading', () => {
    renderCmsPage()
    expect(screen.getByRole('heading', { name: /content manager/i })).toBeInTheDocument()
  })

  it('renders Content and Notifications tab buttons', () => {
    renderCmsPage()
    expect(screen.getByRole('button', { name: /^content$/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /^notifications$/i })).toBeInTheDocument()
  })

  it('shows the content tab by default with AEM sync status', () => {
    renderCmsPage()
    expect(screen.getByText(/aem sync/i)).toBeInTheDocument()
    expect(screen.getByText(/last synced/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /sync now/i })).toBeInTheDocument()
  })

  it('displays all 6 content items with titles', () => {
    renderCmsPage()
    for (const item of contentItems) {
      expect(screen.getByText(item.title)).toBeInTheDocument()
    }
  })

  it('shows status badges for content items', () => {
    renderCmsPage()
    const publishedBadges = screen.getAllByText('published')
    const draftBadges = screen.getAllByText('draft')
    const scheduledBadges = screen.getAllByText('scheduled')

    expect(publishedBadges.length).toBe(contentItems.filter((i) => i.status === 'published').length)
    expect(draftBadges.length).toBe(contentItems.filter((i) => i.status === 'draft').length)
    expect(scheduledBadges.length).toBe(contentItems.filter((i) => i.status === 'scheduled').length)
  })

  it('shows AEM synced indicators for synced items', () => {
    renderCmsPage()
    const syncedCount = contentItems.filter((i) => i.aemSynced).length
    const aemIndicators = screen.getAllByText(/AEM ✓/)
    expect(aemIndicators.length).toBe(syncedCount)
  })

  it('switches to notifications tab when clicked', async () => {
    const user = userEvent.setup()
    renderCmsPage()

    const notificationsTab = screen.getByRole('button', { name: /^notifications$/i })
    await user.click(notificationsTab)

    // Content items should no longer be visible
    expect(screen.queryByText('AEM Sync')).not.toBeInTheDocument()

    // Notification composer should be visible
    expect(screen.getByText(/new notification/i)).toBeInTheDocument()
  })

  it('shows notification composer elements on notifications tab', async () => {
    const user = userEvent.setup()
    renderCmsPage()

    await user.click(screen.getByRole('button', { name: /^notifications$/i }))

    expect(screen.getByLabelText(/notification title/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/notification message/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /all guests/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /by deck/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /by tier/i })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /send notification/i })).toBeInTheDocument()
  })

  it('displays 3 recent notifications on notifications tab', async () => {
    const user = userEvent.setup()
    renderCmsPage()

    await user.click(screen.getByRole('button', { name: /^notifications$/i }))

    for (const notif of notificationDrafts) {
      expect(screen.getByText(notif.title)).toBeInTheDocument()
      expect(screen.getByText(notif.message)).toBeInTheDocument()
    }
  })

  it('switches back to content tab from notifications', async () => {
    const user = userEvent.setup()
    renderCmsPage()

    await user.click(screen.getByRole('button', { name: /^notifications$/i }))
    expect(screen.queryByText(contentItems[0].title)).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /^content$/i }))
    expect(screen.getByText(contentItems[0].title)).toBeInTheDocument()
  })
})
