'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface AddColumnButtonProps {
  onAdd: (title: string) => void
  existingTitles: string[]
}

export function AddColumnButton({ onAdd, existingTitles }: AddColumnButtonProps) {
  const [isAdding, setIsAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [error, setError] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isAdding])

  const handleAdd = () => {
    const trimmedTitle = title.trim()

    if (!trimmedTitle) {
      setError('Column name is required')
      return
    }

    if (existingTitles.some(t => t.toLowerCase() === trimmedTitle.toLowerCase())) {
      setError('Column with this name already exists')
      return
    }

    onAdd(trimmedTitle)
    setTitle('')
    setError('')
    setIsAdding(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAdd()
    } else if (e.key === 'Escape') {
      setIsAdding(false)
      setTitle('')
      setError('')
    }
  }

  if (isAdding) {
    return (
      <div className="w-80 flex-shrink-0 bg-gray-50/50 backdrop-blur-sm rounded-xl p-3 shadow-sm border border-gray-100">
        <div className="space-y-2">
          <Input
            ref={inputRef}
            value={title}
            onChange={(e) => {
              setTitle(e.target.value)
              setError('')
            }}
            onBlur={handleAdd}
            onKeyDown={handleKeyDown}
            placeholder="Column name..."
            className="text-sm"
          />
          {error && (
            <p className="text-xs text-red-500">{error}</p>
          )}
          <div className="flex gap-2">
            <button
              onClick={handleAdd}
              className="flex-1 px-3 py-1.5 bg-gradient-vibe-intense text-white rounded-lg text-sm font-medium hover:shadow-vibe transition-shadow"
            >
              Create
            </button>
            <button
              onClick={() => {
                setIsAdding(false)
                setTitle('')
                setError('')
              }}
              className="flex-1 px-3 py-1.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="w-80 flex-shrink-0">
      <button
        onClick={() => setIsAdding(true)}
        className="w-full px-3 py-2 text-sm font-medium text-gray-600 hover:text-vibe-purple-600 border-2 border-dashed border-gray-300 hover:border-vibe-purple-300 rounded-lg transition-colors hover:bg-vibe-purple-50/30 bg-gray-50/50"
      >
        + Add Column
      </button>
    </div>
  )
}
