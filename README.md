# Vibe Kanban - Beautiful Project Management Board

A stunning kanban board application built with Next.js 14, Tailwind CSS v3, and dnd-kit. Features beautiful drag-and-drop interactions with a pink/purple gradient aesthetic.

## Features

- **Drag & Drop**: Smooth, performant card dragging between columns
- **Customizable Columns**: Create, edit, and delete columns
- **Task Cards**: Add cards with title and notes
- **Local Storage**: All data persists in your browser
- **Beautiful UI**: Pink/purple gradient design with smooth animations
- **Responsive**: Works on desktop and mobile devices
- **Keyboard Accessible**: Full keyboard navigation support

## Tech Stack

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS v3** - Utility-first styling
- **dnd-kit** - Modern, accessible drag-and-drop
- **Local Storage** - Browser-based persistence

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Navigate to the project directory:
```bash
cd /Users/sheldon/Development/vibe-kanban
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Creating a Card
1. Click "+ Add Card" at the bottom of any column
2. Type the card title and press Enter
3. Click on the card to add notes/description

### Editing a Card
1. Click on any card to open the edit modal
2. Update the title and notes
3. Click "Save Changes" or press Ctrl+Enter

### Moving Cards
- Drag cards between columns with your mouse
- Use keyboard arrow keys to navigate (Tab to focus, Enter to drag)

### Managing Columns
1. Click "+ Add Column" to create a new column
2. Double-click a column title to rename it
3. Click the × button to delete a column

### Data Persistence
All changes are automatically saved to your browser's local storage. Your board will persist even after closing the browser.

## Keyboard Shortcuts

- **Tab** - Navigate between elements
- **Enter** - Select/confirm
- **Escape** - Cancel/close
- **Ctrl+Enter** - Save card from edit modal
- **Double-click** - Edit column title

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
├── components/
│   ├── kanban/                  # Kanban board components
│   │   ├── KanbanBoard.tsx      # Main board with dnd-kit
│   │   ├── Column.tsx           # Column component
│   │   ├── Card.tsx             # Card component
│   │   ├── ColumnHeader.tsx     # Column header
│   │   ├── AddCardButton.tsx    # Add card input
│   │   └── AddColumnButton.tsx  # Add column input
│   ├── modals/                  # Modal components
│   │   ├── Modal.tsx            # Base modal
│   │   └── CardModal.tsx        # Card edit modal
│   └── ui/                      # Base UI components
│       ├── Button.tsx           # Button component
│       ├── Input.tsx            # Input component
│       └── TextArea.tsx         # TextArea component
├── hooks/
│   ├── useHydration.ts          # SSR hydration hook
│   └── useLocalStorage.ts       # Local storage hook
├── lib/
│   ├── storage.ts               # Storage utilities
│   ├── constants.ts             # App constants
│   └── utils.ts                 # Utility functions
└── types/
    └── index.ts                 # TypeScript definitions
```

## Customization

### Colors

Edit `tailwind.config.ts` to customize the pink/purple color scheme:

```typescript
colors: {
  'vibe-pink': { /* custom pink shades */ },
  'vibe-purple': { /* custom purple shades */ },
}
```

### Animations

Modify animation speeds in `tailwind.config.ts`:

```typescript
keyframes: {
  fadeIn: { /* fade animation */ },
  slideUp: { /* slide animation */ },
  scaleIn: { /* scale animation */ },
}
```

## Performance

- **React.memo** used on Card and Column components to prevent unnecessary re-renders
- **dnd-kit** uses transform for GPU-accelerated dragging
- **Tailwind CSS** purges unused styles for optimal bundle size

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- [ ] Search and filter cards
- [ ] Tags/labels with colors
- [ ] Due dates and reminders
- [ ] Markdown support in descriptions
- [ ] Multiple boards
- [ ] Export/import (JSON, CSV)
- [ ] Dark mode
- [ ] Undo/redo functionality
- [ ] Real-time collaboration
- [ ] Cloud sync

## Troubleshooting

### Cards not persisting after refresh?
- Check if local storage is enabled in your browser
- Clear browser cache and try again
- Open DevTools → Application → Local Storage to verify data

### Drag and drop not working?
- Ensure JavaScript is enabled
- Try a different browser
- Check browser console for errors

### Styling looks off?
- Clear your `.next` folder: `rm -rf .next`
- Rebuild: `npm run build`
- Restart dev server: `npm run dev`

## License

MIT - Feel free to use this project for personal or commercial purposes

## Contributing

This is a personal project, but feel free to fork and customize it for your needs!
