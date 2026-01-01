'use client'

import { useState } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Card as CardType } from '@/types'
import { cn } from '@/lib/utils'

interface CardProps {
  card: CardType
  isDragging?: boolean
  onClick?: () => void
  onDelete?: () => void
}

export const Card = ({ card, isDragging = false, onClick, onDelete }: CardProps) => {
  const [isHovering, setIsHovering] = useState(false)

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({
    id: card.id,
    data: { type: 'card', card },
  })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 200ms ease',
    opacity: isSortableDragging ? 0.5 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      className={cn(
        'bg-gradient-to-br from-amber-50 to-yellow-50',
        'dark:from-gray-700 dark:to-gray-750',
        'rounded-lg p-3 shadow-md cursor-grab active:cursor-grabbing',
        'hover:shadow-lg transition-all duration-200',
        'border-2 border-amber-200 dark:border-gray-600',
        'hover:scale-[1.02] group',
        isDragging && 'rotate-2 scale-105 shadow-lg ring-2 ring-vibe-purple-400 border-amber-300 dark:ring-vibe-purple-500',
        isSortableDragging && 'opacity-50'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0" onClick={onClick}>
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm leading-tight break-words">
            {card.title}
          </h3>
          {card.description && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1.5 line-clamp-2">
              {card.description}
            </p>
          )}
        </div>

        {/* Icons container - visible on hover */}
        <div className={cn(
          'flex items-center gap-1 flex-shrink-0 transition-opacity duration-200',
          isHovering ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        )}>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onClick?.()
            }}
            className="p-1 text-gray-400 hover:text-vibe-purple-600 hover:bg-vibe-purple-50 dark:hover:bg-vibe-purple-900/30 dark:hover:text-vibe-purple-400 rounded transition-colors"
            title="Edit card"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.()
            }}
            className="p-1 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 dark:hover:text-red-400 rounded transition-colors"
            title="Delete card"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}
