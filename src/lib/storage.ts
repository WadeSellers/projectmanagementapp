import { BoardData } from '@/types'
import { STORAGE_KEY, DEFAULT_COLUMNS } from './constants'

interface StorageData {
  version: number
  data: {
    columns: Array<{
      id: string
      title: string
      order: number
      cards: Array<{
        id: string
        title: string
        description: string
        columnId: string
        order: number
        createdAt: string
        updatedAt: string
      }>
    }>
    lastModified: string
  }
  timestamp: string
}

export function saveBoardData(data: BoardData): void {
  try {
    const serialized: StorageData = {
      version: 1,
      data: {
        columns: data.columns.map(col => ({
          id: col.id,
          title: col.title,
          order: col.order,
          cards: col.cards.map(card => ({
            id: card.id,
            title: card.title,
            description: card.description,
            columnId: card.columnId,
            order: card.order,
            createdAt: card.createdAt.toISOString(),
            updatedAt: card.updatedAt.toISOString(),
          })),
        })),
        lastModified: data.lastModified.toISOString(),
      },
      timestamp: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(serialized))
  } catch (error) {
    console.error('Failed to save board data:', error)
  }
}

export function loadBoardData(): BoardData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return null

    const parsed: StorageData = JSON.parse(stored)
    if (!parsed.data || !parsed.data.columns) return null

    return {
      columns: parsed.data.columns.map(col => ({
        id: col.id,
        title: col.title,
        order: col.order,
        cards: col.cards.map(card => ({
          id: card.id,
          title: card.title,
          description: card.description,
          columnId: card.columnId,
          order: card.order,
          createdAt: new Date(card.createdAt),
          updatedAt: new Date(card.updatedAt),
        })),
      })),
      lastModified: new Date(parsed.data.lastModified),
    }
  } catch (error) {
    console.error('Failed to load board data:', error)
    return null
  }
}

export function resetBoardData(): BoardData {
  return {
    columns: JSON.parse(JSON.stringify(DEFAULT_COLUMNS)),
    lastModified: new Date(),
  }
}
