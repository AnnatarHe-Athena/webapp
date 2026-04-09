'use client'

import { useState } from 'react'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import { Trash2, Edit, Star } from 'lucide-react'

interface VenusItem {
  id: number
  uid: string
  source: string
  name: string
  avatar: string
  bio: string
  initLoaded: boolean
  rawData: string
  remarks: string
  priority: number
}

interface VenusListProps {
  items: VenusItem[]
  loading: boolean
  onAdd: (data: { uid: string; source: string; name?: string }) => void
  onRemove: (id: number) => void
  onUpdate: (id: number, data: Partial<VenusItem>) => void
  onLoadMore: () => void
}

export default function VenusList({
  items,
  loading,
  onAdd,
  onRemove,
  onUpdate,
  onLoadMore,
}: VenusListProps) {
  const [newUid, setNewUid] = useState('')
  const [newSource, setNewSource] = useState('weibo')

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <Input
          value={newUid}
          onChange={(e) => setNewUid(e.target.value)}
          placeholder="UID"
          className="flex-1"
        />
        <select
          value={newSource}
          onChange={(e) => setNewSource(e.target.value)}
          className="rounded-lg bg-gray-800 px-3 py-2 text-gray-100 border border-gray-700"
        >
          <option value="weibo">Weibo</option>
          <option value="red">Xiaohongshu</option>
          <option value="zhihu">Zhihu</option>
          <option value="douban">Douban</option>
          <option value="instgream">Instagram</option>
        </select>
        <Button onClick={() => { onAdd({ uid: newUid, source: newSource }); setNewUid('') }}>
          Add
        </Button>
      </div>

      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between rounded-lg bg-gray-800 p-3">
            <div className="flex items-center gap-3">
              {item.avatar ? (
                <img src={item.avatar} alt={item.name} className="h-10 w-10 rounded-full" />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-700 text-sm">
                  {item.uid.slice(0, 2)}
                </div>
              )}
              <div>
                <p className="font-medium text-white">{item.name || item.uid}</p>
                <p className="text-xs text-gray-500">{item.source} &middot; Priority: {item.priority}</p>
              </div>
              {item.priority >= 100 && <Star className="h-4 w-4 text-yellow-500" fill="currentColor" />}
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => onUpdate(item.id, { priority: item.priority + 10 })}
                className="rounded p-1 text-gray-400 hover:text-blue-400"
              >
                <Edit className="h-4 w-4" />
              </button>
              <button
                onClick={() => onRemove(item.id)}
                className="rounded p-1 text-gray-400 hover:text-red-400"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {items.length > 0 && (
        <Button variant="ghost" onClick={onLoadMore} loading={loading} className="w-full">
          Load More
        </Button>
      )}
    </div>
  )
}
