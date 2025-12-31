import { Column } from '@/types'

export const DEFAULT_COLUMNS: Column[] = [
  {
    id: 'col-1',
    title: 'TODO',
    order: 0,
    cards: []
  },
  {
    id: 'col-2',
    title: 'In Progress',
    order: 1,
    cards: []
  },
  {
    id: 'col-3',
    title: 'Completed',
    order: 2,
    cards: []
  }
]

export const STORAGE_KEY = 'vibe-kanban-board'
export const ANIMATION_DURATION = 200
