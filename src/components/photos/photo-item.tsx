'use client'

import { useState } from 'react'
import { Heart, X, ExternalLink } from 'lucide-react'

interface PhotoItemProps {
  id: string
  img: string
  text?: string
  isCollected?: boolean
  fromURL?: string
  forceDeleteable?: boolean
  onCollect?: (id: string) => void
  onRemove?: (id: string) => void
  onClick?: () => void
}

export default function PhotoItem({
  id,
  img,
  text,
  isCollected = false,
  fromURL,
  forceDeleteable = false,
  onCollect,
  onRemove,
  onClick,
}: PhotoItemProps) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  if (error) return null

  return (
    <div className="group relative overflow-hidden rounded-lg bg-gray-800">
      <div
        className="cursor-pointer"
        onClick={onClick}
      >
        {!loaded && (
          <div className="flex h-48 items-center justify-center bg-gray-800">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-gray-600 border-t-blue-500" />
          </div>
        )}
        <img
          src={img}
          alt={text || ''}
          className={`w-full object-cover transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          loading="lazy"
        />
      </div>
      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-gradient-to-t from-black/80 to-transparent p-3 opacity-0 transition-opacity group-hover:opacity-100">
        <div className="flex gap-2">
          {onCollect && (
            <button
              onClick={(e) => { e.stopPropagation(); onCollect(id) }}
              className={`rounded-full p-1.5 transition-colors ${isCollected ? 'text-red-500' : 'text-white hover:text-red-400'}`}
            >
              <Heart className="h-4 w-4" fill={isCollected ? 'currentColor' : 'none'} />
            </button>
          )}
          {fromURL && (
            <a
              href={fromURL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="rounded-full p-1.5 text-white hover:text-blue-400 transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
        {forceDeleteable && onRemove && (
          <button
            onClick={(e) => { e.stopPropagation(); onRemove(id) }}
            className="rounded-full p-1.5 text-white hover:text-red-400 transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  )
}
