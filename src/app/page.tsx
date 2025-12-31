import { KanbanBoard } from '@/components/kanban/KanbanBoard'

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-vibe">
      <div className="container mx-auto max-w-full">
        <header className="px-8 py-6">
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-vibe-pink-600 to-vibe-purple-600">
            Vibe Kanban
          </h1>
          <p className="text-gray-600 mt-2">Organize your projects with beautiful drag-and-drop</p>
        </header>
        <KanbanBoard />
      </div>
    </main>
  )
}
