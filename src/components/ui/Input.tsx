'use client'

import { cn } from '@/lib/utils'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...props }: InputProps) {
  return (
    <input
      className={cn(
        'w-full px-4 py-2 rounded-lg border-2 border-gray-200',
        'bg-white/80 text-gray-800 placeholder-gray-400',
        'focus:outline-none focus:border-vibe-purple-400 focus:ring-2 focus:ring-vibe-purple-100',
        'transition-colors duration-200',
        className
      )}
      {...props}
    />
  )
}
