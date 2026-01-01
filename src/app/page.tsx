'use client';

import { KanbanBoard } from '@/components/kanban/KanbanBoard'
import { ThemeToggle } from '@/components/ui/ThemeToggle'

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="container mx-auto max-w-full">
        <header className="px-8 py-6 flex items-start justify-between">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vibe-pink-600 to-vibe-purple-600 dark:from-vibe-pink-400 dark:to-vibe-purple-400">
              Vibe Kanban
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Organize your projects with beautiful drag-and-drop</p>
          </div>
          <div className="ml-4">
            <ThemeToggle />
          </div>
        </header>
        <KanbanBoard />
      </div>
    </main>
  )
}
