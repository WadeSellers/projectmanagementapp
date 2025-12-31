'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonProps) {
  const baseStyles = 'font-medium rounded-lg transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

  const variantStyles = {
    primary: 'bg-gradient-vibe-intense text-white shadow-vibe hover:shadow-vibe-lg active:scale-95',
    secondary: 'bg-white/80 text-gray-800 border border-gray-200 hover:bg-white shadow-vibe',
    outline: 'border-2 border-dashed border-vibe-pink-300 text-gray-700 hover:border-vibe-purple-400 hover:text-gray-900 transition-colors',
  }

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <button
      className={cn(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
}
