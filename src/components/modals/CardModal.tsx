'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/types'
import { Modal } from './Modal'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { TextArea } from '@/components/ui/TextArea'

interface CardModalProps {
  card: Card | null
  isOpen: boolean
  onClose: () => void
  onSave: (card: Card) => void
}

export function CardModal({ card, isOpen, onClose, onSave }: CardModalProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (card) {
      setTitle(card.title)
      setDescription(card.description)
    }
  }, [card, isOpen])

  const handleSave = () => {
    if (!card || !title.trim()) return

    onSave({
      ...card,
      title: title.trim(),
      description: description.trim(),
      updatedAt: new Date(),
    })

    onClose()
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSave()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Edit Card">
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <Input
            autoFocus
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Card title..."
            onKeyDown={handleKeyDown}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Notes
          </label>
          <TextArea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add notes... (Ctrl+Enter to save)"
            rows={4}
            onKeyDown={handleKeyDown}
          />
        </div>

        <div className="flex gap-2 justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Changes
          </Button>
        </div>
      </div>
    </Modal>
  )
}
