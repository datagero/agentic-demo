import { useState, useEffect, useRef } from 'react'
import { contentItems, notificationDrafts } from '../data/mock'

const STATUS_STYLES: Record<string, string> = {
  published: 'bg-green-100 text-green-700',
  draft: 'bg-gray-100 text-gray-600',
  scheduled: 'bg-blue-100 text-blue-700',
  sent: 'bg-green-100 text-green-700',
}

const TYPE_ICONS: Record<string, string> = {
  menu: '🍽️',
  activity: '🎭',
  'deck-info': '🗺️',
  promotion: '🎉',
  safety: '⚠️',
}

const AUDIENCE_ICONS: Record<string, string> = {
  all: '👥',
  deck: '🏢',
  'loyalty-tier': '🏅',
  'port-day': '⚓',
}

type SyncState = 'idle' | 'syncing' | 'synced'
type SendState = 'idle' | 'sending' | 'sent'

export default function CmsPage() {
  const [tab, setTab] = useState<'content' | 'notifications'>('content')
  const [syncState, setSyncState] = useState<SyncState>('idle')
  const [sendState, setSendState] = useState<SendState>('idle')
  const syncTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const sendTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (syncTimerRef.current) clearTimeout(syncTimerRef.current)
      if (sendTimerRef.current) clearTimeout(sendTimerRef.current)
    }
  }, [])

  function handleSyncNow() {
    if (syncState !== 'idle') return
    setSyncState('syncing')
    syncTimerRef.current = setTimeout(() => {
      setSyncState('synced')
      syncTimerRef.current = setTimeout(() => {
        setSyncState('idle')
      }, 2000)
    }, 1500)
  }

  function handleSendNotification() {
    if (sendState !== 'idle') return
    setSendState('sending')
    sendTimerRef.current = setTimeout(() => {
      setSendState('sent')
      sendTimerRef.current = setTimeout(() => {
        setSendState('idle')
      }, 2000)
    }, 1000)
  }

  return (
    <div className="flex flex-col bg-pcl-gray min-h-full page-enter">
      {/* ARIA live region for sync feedback */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {syncState === 'syncing' && 'Syncing content...'}
        {syncState === 'synced' && 'Content synced successfully'}
        {sendState === 'sending' && 'Sending notification...'}
        {sendState === 'sent' && 'Notification sent successfully'}
      </div>

      {/* Header */}
      <div className="bg-pcl-navy text-white px-4 pt-6 pb-4">
        <p className="text-pcl-gold text-xs font-semibold uppercase tracking-widest mb-1">
          Operations
        </p>
        <h1 className="text-2xl font-display font-semibold">Content Manager</h1>
        <p className="text-gray-300 text-sm mt-1">AEM-powered content &amp; messaging</p>

        {/* Tab toggle */}
        <div className="flex gap-2 mt-3">
          <button
            onClick={() => setTab('content')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              tab === 'content'
                ? 'bg-pcl-gold text-pcl-navy'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Content
          </button>
          <button
            onClick={() => setTab('notifications')}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
              tab === 'notifications'
                ? 'bg-pcl-gold text-pcl-navy'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            Notifications
          </button>
        </div>
      </div>

      {tab === 'content' ? (
        <div className="px-4 py-4">
          {/* AEM Sync status */}
          <div className="card p-3 flex items-center gap-3 border-l-4 border-green-500 mb-4">
            <span className="text-lg" aria-hidden="true">🔄</span>
            <div className="flex-1">
              <p className="font-semibold text-sm text-pcl-text">AEM Sync</p>
              <p className="text-xs text-gray-400">Last synced 2 hours ago · 4 of 6 items synced</p>
            </div>
            <div className="flex items-center gap-2">
              {syncState === 'synced' && (
                <span
                  className="text-xs font-semibold text-green-700 bg-green-100 rounded-full px-2 py-0.5"
                  data-testid="synced-badge"
                >
                  Synced ✓
                </span>
              )}
              <button
                onClick={handleSyncNow}
                disabled={syncState !== 'idle'}
                aria-label={syncState === 'syncing' ? 'Syncing...' : 'Sync Now'}
                className={`text-xs font-semibold rounded-full px-3 py-1 transition-colors ${
                  syncState === 'syncing'
                    ? 'text-gray-400 bg-gray-100 cursor-not-allowed'
                    : 'text-pcl-navy bg-blue-50 hover:bg-blue-100'
                }`}
              >
                {syncState === 'syncing' ? 'Syncing...' : 'Sync Now'}
              </button>
            </div>
          </div>

          <p className="section-label px-0">Content Items</p>
          <div className="space-y-2">
            {contentItems.map((item) => (
              <div key={item.id} className="card p-4 flex items-start gap-3">
                <span className="text-xl shrink-0" aria-hidden="true">{TYPE_ICONS[item.type] ?? '📄'}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-pcl-text truncate">{item.title}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${STATUS_STYLES[item.status]}`}>
                      {item.status}
                    </span>
                    {item.aemSynced && (
                      <span className="text-[10px] text-green-600 font-medium">AEM ✓</span>
                    )}
                    <span className="text-[10px] text-gray-400">{item.lastUpdated}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-4 py-4">
          {/* Notification composer */}
          <div className="card p-4 mb-4">
            <p className="font-semibold text-sm text-pcl-text mb-3">New Notification</p>
            <input
              type="text"
              placeholder="Notification title..."
              className="w-full bg-pcl-gray rounded-lg px-3 py-2 text-sm mb-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pcl-navy"
              aria-label="Notification title"
            />
            <textarea
              placeholder="Message body..."
              rows={2}
              className="w-full bg-pcl-gray rounded-lg px-3 py-2 text-sm mb-2 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-pcl-navy resize-none"
              aria-label="Notification message"
            />
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs text-gray-400">Audience:</span>
              {(['all', 'deck', 'loyalty-tier'] as const).map((aud) => (
                <button
                  key={aud}
                  className="text-[10px] font-semibold bg-blue-50 text-pcl-navy rounded-full px-2 py-0.5"
                >
                  {AUDIENCE_ICONS[aud]} {aud === 'all' ? 'All Guests' : aud === 'deck' ? 'By Deck' : 'By Tier'}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-2">
              {sendState === 'sent' && (
                <span
                  className="text-xs font-semibold text-green-700 bg-green-100 rounded-full px-2 py-0.5"
                  data-testid="sent-badge"
                >
                  Sent!
                </span>
              )}
              <button
                onClick={handleSendNotification}
                disabled={sendState !== 'idle'}
                aria-label={sendState === 'sending' ? 'Sending...' : 'Send notification'}
                className={`btn-primary flex-1 text-sm transition-opacity ${
                  sendState === 'sending' ? 'opacity-60 cursor-not-allowed' : ''
                }`}
              >
                {sendState === 'sending' ? 'Sending...' : 'Send Notification'}
              </button>
            </div>
          </div>

          <p className="section-label px-0">Recent Notifications</p>
          <div className="space-y-2">
            {notificationDrafts.map((notif) => (
              <div key={notif.id} className="card p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm text-pcl-text">{notif.title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{notif.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className={`text-[10px] font-semibold rounded-full px-2 py-0.5 ${STATUS_STYLES[notif.status]}`}>
                        {notif.status}
                      </span>
                      <span className="text-[10px] text-gray-400">
                        {AUDIENCE_ICONS[notif.audience]} {notif.audienceDetail ?? 'All guests'}
                      </span>
                      {notif.scheduledFor && (
                        <span className="text-[10px] text-gray-400">{notif.scheduledFor}</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
