'use client'

import { useRef, useEffect } from 'react'
import PhotoItem from './photo-item'
import Loading from '@/components/ui/loading'
import { useInViewport } from '@/hooks/useInViewport'

interface Girl {
  id: string
  img: string
  text?: string
  isCollected?: boolean
  fromURL?: string
  content?: string
}

interface PhotoGridProps {
  cells: Girl[]
  loading: boolean
  loadMore: () => void
  forceDeleteable?: boolean
  onCollect?: (id: string) => void
  onRemove?: (id: string) => void
  onPhotoClick?: (cell: Girl) => void
}

export default function PhotoGrid({
  cells,
  loading,
  loadMore,
  forceDeleteable = false,
  onCollect,
  onRemove,
  onPhotoClick,
}: PhotoGridProps) {
  const sentinelRef = useRef<HTMLDivElement>(null)
  const isInViewport = useInViewport(sentinelRef)

  useEffect(() => {
    if (isInViewport && !loading && cells.length > 0) {
      loadMore()
    }
  }, [isInViewport, loading, cells.length, loadMore])

  if (cells.length === 0 && !loading) {
    return (
      <div className="flex items-center justify-center py-20 text-gray-500">
        No photos found
      </div>
    )
  }

  return (
    <div>
      <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5">
        {cells.map((cell) => (
          <div key={cell.id} className="mb-4 break-inside-avoid">
            <PhotoItem
              id={cell.id}
              img={cell.img}
              text={cell.text}
              isCollected={cell.isCollected}
              fromURL={cell.fromURL}
              forceDeleteable={forceDeleteable}
              onCollect={onCollect}
              onRemove={onRemove}
              onClick={() => onPhotoClick?.(cell)}
            />
          </div>
        ))}
      </div>
      <div ref={sentinelRef} className="h-20" />
      {loading && <Loading />}
    </div>
  )
}
