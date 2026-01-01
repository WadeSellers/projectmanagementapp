'use client'

import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable'
import { useDroppable } from '@dnd-kit/core'
import { Column as ColumnType } from '@/types'
import { Card } from './Card'
import { ColumnHeader } from './ColumnHeader'
import { AddCardButton } from './AddCardButton'

interface ColumnProps {
  column: ColumnType
  onAddCard: (title: string) => void
  onUpdateCard: (cardId: string) => void
  onDeleteCard: (cardId: string) => void
  onUpdateColumn: (title: string) => void
  onDeleteColumn: () => void
}

export function Column({
  column,
  onAddCard,
  onUpdateCard,
  onDeleteCard,
  onUpdateColumn,
  onDeleteColumn,
}: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
    data: { type: 'Column', column },
  })

  // Sort cards by order
  const sortedCards = [...column.cards].sort((a, b) => a.order - b.order)

  return (
    <div
      ref={setNodeRef}
      className="w-80 flex-shrink-0 bg-white/90 backdrop-blur-sm rounded-xl p-3 shadow-md border-2 border-gray-200 h-fit max-h-[calc(100vh-120px)] flex flex-col custom-scrollbar dark:bg-gray-800/90 dark:border-gray-700"
    >
      <ColumnHeader
        column={column}
        onUpdate={onUpdateColumn}
        onDelete={onDeleteColumn}
      />

      <SortableContext
        items={sortedCards.map(c => c.id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="flex-1 space-y-2 overflow-y-auto custom-scrollbar pb-2">
          {sortedCards.map((card) => (
            <Card
              key={card.id}
              card={card}
              onClick={() => onUpdateCard(card.id)}
              onDelete={() => onDeleteCard(card.id)}
            />
          ))}
        </div>
      </SortableContext>

      <div className="mt-2 pt-2 border-t border-gray-100 dark:border-gray-700">
        <AddCardButton
          columnId={column.id}
          onAdd={(title) => onAddCard(title)}
        />
      </div>
    </div>
  )
}
