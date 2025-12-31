'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { generateId } from '@/lib/utils'

interface AddCardButtonProps {
  columnId: string
  onAdd: (title: string) => void
}

export function AddCardButton({ columnId, onAdd }: AddCardButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAdding])

  const handleAdd = () => {
    if (!title.trim()) return
    onAdd(title.trim())
    setTitle('')
    setIsAdding(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    } else if (e.key === 'Escape') {
      setIsAdding(false)
      setTitle('')
    }
  }

  if (isAdding) {
    return (
      <div className="space-y-2">
        <Input
          ref={inputRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleAdd}
          onKeyDown={handleKeyDown}
          placeholder="Enter card title..."
          className="text-sm"
        />
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="flex-1 px-3 py-1.5 bg-gradient-vibe-intense text-white rounded-lg text-sm font-medium hover:shadow-vibe transition-shadow"
          >
            Add
          </button>
          <button
            onClick={() => {
              setIsAdding(false)
              setTitle('')
            }}
            className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={() => setIsAdding(true)}
      className="w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-vibe-purple-600 border-2 border-dashed border-gray-300 hover:border-vibe-purple-300 rounded-lg transition-colors hover:bg-vibe-purple-50/30"
    >
      + Add Card
    </button>
  )
}
