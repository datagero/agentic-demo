interface SkeletonLoaderProps {
  lines?: number
  width?: string
  height?: string
}

export function SkeletonLoader({ lines = 1, width = '100%', height = '1rem' }: SkeletonLoaderProps) {
  return (
    <div className="animate-pulse space-y-2" aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="bg-gray-200 rounded"
          style={{ width, height }}
        />
      ))}
    </div>
  )
}

export function SkeletonCard() {
  return (
    <div className="card p-4 animate-pulse" aria-hidden="true">
      <div className="flex items-start gap-3">
        {/* Image placeholder */}
        <div className="w-10 h-10 bg-gray-200 rounded shrink-0" />
        <div className="flex-1 space-y-2">
          {/* Title */}
          <div className="h-3.5 bg-gray-200 rounded w-3/4" />
          {/* Description lines */}
          <div className="h-2.5 bg-gray-200 rounded w-full" />
          <div className="h-2.5 bg-gray-200 rounded w-5/6" />
          {/* Price row */}
          <div className="flex items-center justify-between pt-1">
            <div className="h-4 bg-gray-200 rounded w-16" />
            <div className="h-7 bg-gray-200 rounded w-14" />
          </div>
        </div>
      </div>
    </div>
  )
}
