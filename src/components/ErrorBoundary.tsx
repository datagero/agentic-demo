import { Component, type ReactNode, type ErrorInfo } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Screen error:', error, info.componentStack)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-pcl-gray">
          <div className="card p-6 max-w-xs">
            <span className="text-4xl block mb-3" aria-hidden="true">⚠️</span>
            <h2 className="text-lg font-semibold text-pcl-navy mb-2">Something went wrong</h2>
            <p className="text-sm text-gray-500 mb-4">
              This screen encountered an error. Please try navigating to another tab.
            </p>
            <button
              onClick={() => this.setState({ hasError: false, error: null })}
              className="btn-primary text-sm"
            >
              Try Again
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
