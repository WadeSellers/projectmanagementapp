'use client'

import { cn } from '@/lib/utils'

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <textarea
      className={cn(
        'w-full px-4 py-2 rounded-lg border-2 border-gray-200',
        'bg-white/80 text-gray-800 placeholder-gray-400',
        'focus:outline-none focus:border-vibe-purple-400 focus:ring-2 focus:ring-vibe-purple-100',
        'dark:bg-gray-800/80 dark:text-gray-200 dark:border-gray-700 dark:placeholder-gray-500',
        'dark:focus:border-vibe-purple-500 dark:focus:ring-vibe-purple-900',
        'transition-colors duration-200 resize-none',
        className
      )}
      {...props}
    />
  )
}
