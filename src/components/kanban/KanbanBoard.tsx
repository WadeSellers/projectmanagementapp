'use client'

import { useState, useCallback } from 'react'
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  closestCorners,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable'
import { BoardData, Card as CardType, Column as ColumnType } from '@/types'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { useHydration } from '@/hooks/useHydration'
import { DEFAULT_COLUMNS } from '@/lib/constants'
import { generateId } from '@/lib/utils'
import { Column } from './Column'
import { AddColumnButton } from './AddColumnButton'
import { Card } from './Card'
import { CardModal } from '@/components/modals/CardModal'

export function KanbanBoard() {
  const [boardData, setBoardData] = useLocalStorage({
    columns: DEFAULT_COLUMNS,
    lastModified: new Date(),
  })

  const isHydrated = useHydration()
  const [activeCard, setActiveCard] = useState<CardType | null>(null)
  const [selectedCard, setSelectedCard] = useState<CardType | null>(null)
  const [isCardModalOpen, setIsCardModalOpen] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const card = findCardById(active.id.toString())
    setActiveCard(card)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event
    setActiveCard(null)

    if (!over) return

    const activeId = active.id.toString()
    const overId = over.id.toString()

    if (activeId === overId) return

    const activeCard = findCardById(activeId)
    if (!activeCard) return

    // Find target column
    let targetColumnId: string | null = null
    let targetOrder = 0

    // Check if dropping on a column
    const targetColumn = boardData.columns.find(col => col.id === overId)
    if (targetColumn) {
      targetColumnId = overId
      targetOrder = targetColumn.cards.length
    } else {
      // Check if dropping on a card
      const targetCard = findCardById(overId)
      if (targetCard) {
        targetColumnId = targetCard.columnId
        const columnCards = boardData.columns
          .find(col => col.id === targetColumnId)
          ?.cards.sort((a, b) => a.order - b.order) || []
        targetOrder = targetCard.order
      }
    }

    if (!targetColumnId) return

    // Update board data
    const newBoardData = { ...boardData }

    // Remove card from old column
    const sourceColumn = newBoardData.columns.find(col => col.id === activeCard.columnId)
    if (sourceColumn) {
      sourceColumn.cards = sourceColumn.cards.filter(c => c.id !== activeCard.id)
    }

    // Add card to new column
    const targetCol = newBoardData.columns.find(col => col.id === targetColumnId)
    if (targetCol) {
      const updatedCard = {
        ...activeCard,
        columnId: targetColumnId,
        order: targetOrder,
        updatedAt: new Date(),
      }

      // Insert at the correct position
      const cardsAtOrder = targetCol.cards.filter(c => c.order >= targetOrder)
      cardsAtOrder.forEach(c => {
        c.order += 1
      })
      targetCol.cards.push(updatedCard)
    }

    newBoardData.lastModified = new Date()
    setBoardData(newBoardData)
  }

  const findCardById = useCallback((id: string): CardType | undefined => {
    for (const column of boardData.columns) {
      const card = column.cards.find(c => c.id === id)
      if (card) return card
    }
    return undefined
  }, [boardData.columns])

  const findColumnById = useCallback((id: string): ColumnType | undefined => {
    return boardData.columns.find(col => col.id === id)
  }, [boardData.columns])

  const handleAddCard = useCallback((columnId: string, title: string) => {
    const newCard: CardType = {
      id: generateId(),
      title,
      description: '',
      columnId,
      order: findColumnById(columnId)?.cards.length || 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const newBoardData = {
      ...boardData,
      columns: boardData.columns.map(col =>
        col.id === columnId ? { ...col, cards: [...col.cards, newCard] } : col
      ),
      lastModified: new Date(),
    }
    setBoardData(newBoardData)
  }, [boardData, findColumnById, setBoardData])

  const handleUpdateCard = useCallback((cardId: string) => {
    const card = findCardById(cardId)
    if (card) {
      setSelectedCard(card)
      setIsCardModalOpen(true)
    }
  }, [findCardById])

  const handleSaveCard = useCallback((updatedCard: CardType) => {
    const newBoardData = {
      ...boardData,
      columns: boardData.columns.map(col => ({
        ...col,
        cards: col.cards.map(c => (c.id === updatedCard.id ? updatedCard : c)),
      })),
      lastModified: new Date(),
    }
    setBoardData(newBoardData)
  }, [boardData, setBoardData])

  const handleDeleteCard = useCallback((cardId: string) => {
    const newBoardData = {
      ...boardData,
      columns: boardData.columns.map(col => ({
        ...col,
        cards: col.cards.filter(c => c.id !== cardId),
      })),
      lastModified: new Date(),
    }
    setBoardData(newBoardData)
  }, [boardData, setBoardData])

  const handleAddColumn = useCallback((title: string) => {
    const newColumn: ColumnType = {
      id: generateId(),
      title,
      order: boardData.columns.length,
      cards: [],
    }

    const newBoardData = {
      ...boardData,
      columns: [...boardData.columns, newColumn],
      lastModified: new Date(),
    }
    setBoardData(newBoardData)
  }, [boardData, setBoardData])

  const handleUpdateColumn = useCallback((columnId: string, title: string) => {
    const newBoardData = {
      ...boardData,
      columns: boardData.columns.map(col =>
        col.id === columnId ? { ...col, title } : col
      ),
      lastModified: new Date(),
    }
    setBoardData(newBoardData)
  }, [boardData, setBoardData])

  const handleDeleteColumn = useCallback((columnId: string) => {
    const column = findColumnById(columnId)
    if (!column) return

    if (column.cards.length > 0) {
      setDeleteConfirm(columnId)
      return
    }

    const newBoardData = {
      ...boardData,
      columns: boardData.columns.filter(col => col.id !== columnId),
      lastModified: new Date(),
    }
    setBoardData(newBoardData)
  }, [boardData, findColumnById, setBoardData])

  const confirmDeleteColumn = useCallback(() => {
    if (!deleteConfirm) return

    const newBoardData = {
      ...boardData,
      columns: boardData.columns.filter(col => col.id !== deleteConfirm),
      lastModified: new Date(),
    }
    setBoardData(newBoardData)
    setDeleteConfirm(null)
  }, [boardData, deleteConfirm, setBoardData])

  if (!isHydrated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse text-gray-600">Loading...</div>
      </div>
    )
  }

  return (
    <>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-6 overflow-x-auto p-8 custom-scrollbar">
          {boardData.columns.map((column) => (
            <Column
              key={column.id}
              column={column}
              onAddCard={(title) => handleAddCard(column.id, title)}
              onUpdateCard={handleUpdateCard}
              onDeleteCard={handleDeleteCard}
              onUpdateColumn={(title) => handleUpdateColumn(column.id, title)}
              onDeleteColumn={() => handleDeleteColumn(column.id)}
            />
          ))}
          <AddColumnButton
            onAdd={handleAddColumn}
            existingTitles={boardData.columns.map(col => col.title)}
          />
        </div>

        <DragOverlay>
          {activeCard ? <Card card={activeCard} isDragging /> : null}
        </DragOverlay>
      </DndContext>

      <CardModal
        card={selectedCard}
        isOpen={isCardModalOpen}
        onClose={() => {
          setIsCardModalOpen(false)
          setSelectedCard(null)
        }}
        onSave={handleSaveCard}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setDeleteConfirm(null)}
          />
          <div className="relative z-10 w-full max-w-sm mx-4 bg-white rounded-2xl shadow-2xl p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Delete Column?</h2>
            <p className="text-gray-600 mb-6">
              This column has cards. Are you sure you want to delete it? All cards will be moved to trash.
            </p>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDeleteColumn}
                className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
