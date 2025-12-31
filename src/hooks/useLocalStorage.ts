'use client'

import { useEffect, useState } from 'react'
import { useHydration } from './useHydration'
import { loadBoardData, saveBoardData } from '@/lib/storage'
import { BoardData } from '@/types'

export function useLocalStorage(
  initialValue: BoardData
): [BoardData, (value: BoardData | ((val: BoardData) => BoardData)) => void] {
  const [storedValue, setStoredValue] = useState<BoardData>(initialValue)
  const isHydrated = useHydration()

  // Load from localStorage on mount
  useEffect(() => {
    if (isHydrated) {
      const loaded = loadBoardData()
      if (loaded) {
        setStoredValue(loaded)
      }
    }
  }, [isHydrated])

  // Save to localStorage on change
  const setValue = (value: BoardData | ((val: BoardData) => BoardData)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      saveBoardData(valueToStore)
    } catch (error) {
      console.error('Failed to set value in localStorage:', error)
    }
  }

  return [storedValue, setValue]
}
