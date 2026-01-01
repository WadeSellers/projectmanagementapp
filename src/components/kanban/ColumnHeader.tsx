'use client'

import { useState } from 'react'
import { Column } from '@/types'
import { Input } from '@/components/ui/Input'
import { cn } from '@/lib/utils'

interface ColumnHeaderProps {
  column: Column
  onUpdate: (title: string) => void
  onDelete: () => void
}

export function ColumnHeader({ column, onUpdate, onDelete }: ColumnHeaderProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [title, setTitle] = useState(column.title)

  const handleSave = () => {
    if (title.trim() && title !== column.title) {
      onUpdate(title.trim())
    } else {
      setTitle(column.title)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSave()
    } else if (e.key === 'Escape') {
      setTitle(column.title)
      setIsEditing(false)
    }
  }

  if (isEditing) {
    return (
      <Input
        autoFocus
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onBlur={handleSave}
        onKeyDown={handleKeyDown}
        className="mb-4 font-semibold text-gray-800"
      />
    )
  }

  return (
    <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100 dark:border-gray-700">
      <div className="flex-1">
        <h2
          onDoubleClick={() => setIsEditing(true)}
          className={cn(
            'text-sm font-bold text-gray-900 dark:text-gray-100 cursor-pointer uppercase tracking-wide',
            'hover:text-vibe-purple-600 dark:hover:text-vibe-purple-400 transition-colors'
          )}
        >
          {column.title}
        </h2>
        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {column.cards.length} {column.cards.length === 1 ? 'task' : 'tasks'}
        </p>
      </div>
      <button
        onClick={onDelete}
        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors text-lg flex-shrink-0 ml-2"
        title="Delete column"
      >
        ×
      </button>
    </div>
  )
}
