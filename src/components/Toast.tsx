import { useToast, type ToastType } from '../contexts/ToastContext'

// ── Icon helpers ──────────────────────────────────────────────────────────────

function toastIcon(type: ToastType): string {
  switch (type) {
    case 'success': return '✓'
    case 'warning': return '⚠'
    case 'info':
    default:        return 'ℹ'
  }
}

// Tailwind classes per type
function toastClasses(type: ToastType): string {
  switch (type) {
    case 'success':
      return 'bg-green-600 text-white'
    case 'warning':
      return 'bg-amber-500 text-white'
    case 'info':
    default:
      return 'bg-blue-600 text-white'
  }
}

// ── Toast stack ───────────────────────────────────────────────────────────────

export default function ToastStack() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex flex-col gap-2 items-center"
      aria-live="polite"
      aria-label="Notifications"
      role="status"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          role="alert"
          className={[
            'flex items-center gap-2 px-4 py-2.5 rounded-full shadow-lg',
            'animate-slide-in-top max-w-xs w-max',
            toastClasses(toast.type),
          ].join(' ')}
          data-testid="toast"
        >
          <span className="text-sm font-bold shrink-0" aria-hidden="true">
            {toastIcon(toast.type)}
          </span>
          <span className="text-sm font-medium leading-snug">{toast.message}</span>
          <button
            onClick={() => removeToast(toast.id)}
            className="ml-1 shrink-0 opacity-80 hover:opacity-100 transition-opacity"
            aria-label="Close notification"
          >
            <span aria-hidden="true" className="text-base leading-none">×</span>
          </button>
        </div>
      ))}
    </div>
  )
}
