'use client'

import Link from 'next/link'
import { cn } from '@/utils/cn'

interface Category {
  id: string
  name: string
  count: number
}

interface CategoryTabsProps {
  categories: Category[]
  activeId?: string
}

export default function CategoryTabs({ categories, activeId }: CategoryTabsProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((cat) => (
        <Link
          key={cat.id}
          href={`/category/${cat.id}`}
          className={cn(
            'whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors',
            activeId === cat.id
              ? 'bg-blue-600 text-white'
              : 'bg-gray-800 text-gray-400 hover:bg-gray-700 hover:text-white',
          )}
        >
          {cat.name}
          {cat.count > 0 && (
            <span className="ml-1 text-xs opacity-60">({cat.count})</span>
          )}
        </Link>
      ))}
    </div>
  )
}
