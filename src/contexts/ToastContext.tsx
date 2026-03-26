import { createContext, useContext, useState, useCallback, useEffect, useRef, type ReactNode } from 'react'

// ── Types ─────────────────────────────────────────────────────────────────────

export type ToastType = 'success' | 'info' | 'warning'

export interface Toast {
  id: string
  message: string
  type: ToastType
  timestamp: number
}

interface ToastContextValue {
  toasts: Toast[]
  showToast: (message: string, type?: ToastType) => void
  removeToast: (id: string) => void
}

// ── Context ───────────────────────────────────────────────────────────────────

const ToastContext = createContext<ToastContextValue>({
  toasts: [],
  showToast: () => {},
  removeToast: () => {},
})

const TOAST_DURATION_MS = 3000
const MAX_TOASTS = 3

// ── Provider ──────────────────────────────────────────────────────────────────

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])
  const timerRefs = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map())

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
    const timer = timerRefs.current.get(id)
    if (timer !== undefined) {
      clearTimeout(timer)
      timerRefs.current.delete(id)
    }
  }, [])

  const showToast = useCallback((message: string, type: ToastType = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
    const timestamp = Date.now()

    setToasts((prev) => {
      // Trim to max - 1 oldest toasts to make room for the new one
      const trimmed = prev.length >= MAX_TOASTS ? prev.slice(prev.length - (MAX_TOASTS - 1)) : prev
      return [...trimmed, { id, message, type, timestamp }]
    })

    const timer = setTimeout(() => {
      removeToast(id)
    }, TOAST_DURATION_MS)

    timerRefs.current.set(id, timer)
  }, [removeToast])

  // Cleanup all timers on unmount
  useEffect(() => {
    return () => {
      timerRefs.current.forEach((timer) => clearTimeout(timer))
      timerRefs.current.clear()
    }
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
    </ToastContext.Provider>
  )
}

export function useToast() {
  return useContext(ToastContext)
}
