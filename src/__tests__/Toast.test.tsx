import { render, screen, act, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import userEvent from '@testing-library/user-event'
import { ToastProvider, useToast } from '../contexts/ToastContext'
import ToastStack from '../components/Toast'

// ── Helper: wraps ToastStack + a trigger button in one provider ───────────────

function ToastTrigger({ message, type }: { message: string; type?: 'success' | 'info' | 'warning' }) {
  const { showToast } = useToast()
  return (
    <button onClick={() => showToast(message, type)}>
      Show Toast
    </button>
  )
}

function renderWithToasts(ui: React.ReactNode) {
  return render(
    <ToastProvider>
      <ToastStack />
      {ui}
    </ToastProvider>
  )
}

// ── Tests ─────────────────────────────────────────────────────────────────────

describe('Toast notification system', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    act(() => {
      vi.runOnlyPendingTimers()
    })
    vi.useRealTimers()
  })

  it('showToast renders a toast message', () => {
    renderWithToasts(<ToastTrigger message="Hello toast!" type="success" />)

    act(() => {
      fireEvent.click(screen.getByText('Show Toast'))
    })

    expect(screen.getByText('Hello toast!')).toBeInTheDocument()
    expect(screen.getByTestId('toast')).toBeInTheDocument()
  })

  it('toast auto-dismisses after 3 seconds', () => {
    renderWithToasts(<ToastTrigger message="Auto-dismiss me" type="info" />)

    act(() => {
      fireEvent.click(screen.getByText('Show Toast'))
    })

    expect(screen.getByText('Auto-dismiss me')).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(3000)
    })

    expect(screen.queryByText('Auto-dismiss me')).not.toBeInTheDocument()
  })

  it('multiple toasts stack', () => {
    function MultiTrigger() {
      const { showToast } = useToast()
      return (
        <>
          <button onClick={() => showToast('Toast 1', 'success')}>T1</button>
          <button onClick={() => showToast('Toast 2', 'info')}>T2</button>
          <button onClick={() => showToast('Toast 3', 'warning')}>T3</button>
        </>
      )
    }

    render(
      <ToastProvider>
        <ToastStack />
        <MultiTrigger />
      </ToastProvider>
    )

    act(() => {
      fireEvent.click(screen.getByText('T1'))
      fireEvent.click(screen.getByText('T2'))
      fireEvent.click(screen.getByText('T3'))
    })

    expect(screen.getByText('Toast 1')).toBeInTheDocument()
    expect(screen.getByText('Toast 2')).toBeInTheDocument()
    expect(screen.getByText('Toast 3')).toBeInTheDocument()

    const toasts = screen.getAllByTestId('toast')
    expect(toasts).toHaveLength(3)
  })

  it('close button removes toast', () => {
    renderWithToasts(<ToastTrigger message="Close me" type="success" />)

    act(() => {
      fireEvent.click(screen.getByText('Show Toast'))
    })

    expect(screen.getByText('Close me')).toBeInTheDocument()

    act(() => {
      fireEvent.click(screen.getByRole('button', { name: /close notification/i }))
    })

    expect(screen.queryByText('Close me')).not.toBeInTheDocument()
  })

  it('enforces maximum of 3 visible toasts', () => {
    function FourTrigger() {
      const { showToast } = useToast()
      return (
        <>
          {(['A', 'B', 'C', 'D'] as const).map((label) => (
            <button key={label} onClick={() => showToast(`Toast ${label}`, 'info')}>
              {label}
            </button>
          ))}
        </>
      )
    }

    render(
      <ToastProvider>
        <ToastStack />
        <FourTrigger />
      </ToastProvider>
    )

    act(() => {
      fireEvent.click(screen.getByText('A'))
      fireEvent.click(screen.getByText('B'))
      fireEvent.click(screen.getByText('C'))
      fireEvent.click(screen.getByText('D'))
    })

    const toasts = screen.getAllByTestId('toast')
    expect(toasts).toHaveLength(3)
    // The oldest toast (A) should have been evicted
    expect(screen.queryByText('Toast A')).not.toBeInTheDocument()
    expect(screen.getByText('Toast D')).toBeInTheDocument()
  })

  it('renders toast with correct accessible alert role', () => {
    renderWithToasts(<ToastTrigger message="Success!" type="success" />)

    act(() => {
      fireEvent.click(screen.getByText('Show Toast'))
    })

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })
})
