import { ThemeColors } from '@/types/theme';

/**
 * Semantic color tokens for light mode
 * All colors are WCAG AA compliant for contrast ratios
 */
export const lightModeColors: ThemeColors = {
  background: {
    primary: 'bg-white',
    secondary: 'bg-gray-50',
    tertiary: 'bg-gray-100',
    overlay: 'bg-black/50',
  },
  text: {
    primary: 'text-gray-900',
    secondary: 'text-gray-700',
    tertiary: 'text-gray-500',
    inverse: 'text-white',
  },
  accent: {
    primary: 'bg-gradient-to-r from-vibe-pink-500 to-vibe-purple-500',
    secondary: 'bg-vibe-pink-100',
    hover: 'hover:from-vibe-pink-600 hover:to-vibe-purple-600',
    active: 'from-vibe-pink-600 to-vibe-purple-600',
  },
  border: {
    primary: 'border-gray-200',
    secondary: 'border-gray-300',
    focus: 'border-vibe-purple-500',
  },
  status: {
    success: 'bg-green-100 text-green-800 border-green-300',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    error: 'bg-red-100 text-red-800 border-red-300',
    info: 'bg-blue-100 text-blue-800 border-blue-300',
  },
};

/**
 * Semantic color tokens for dark mode
 * All colors are WCAG AA compliant for contrast ratios
 */
export const darkModeColors: ThemeColors = {
  background: {
    primary: 'dark:bg-gray-900',
    secondary: 'dark:bg-gray-800',
    tertiary: 'dark:bg-gray-750',
    overlay: 'dark:bg-black/70',
  },
  text: {
    primary: 'dark:text-gray-100',
    secondary: 'dark:text-gray-300',
    tertiary: 'dark:text-gray-400',
    inverse: 'dark:text-gray-900',
  },
  accent: {
    primary: 'dark:bg-gradient-to-r dark:from-vibe-pink-400 dark:to-vibe-purple-400',
    secondary: 'dark:bg-vibe-pink-900/30',
    hover: 'dark:hover:from-vibe-pink-300 dark:hover:to-vibe-purple-300',
    active: 'dark:from-vibe-pink-300 dark:to-vibe-purple-300',
  },
  border: {
    primary: 'dark:border-gray-700',
    secondary: 'dark:border-gray-600',
    focus: 'dark:border-vibe-purple-400',
  },
  status: {
    success: 'dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
    warning: 'dark:bg-yellow-900/30 dark:text-yellow-300 dark:border-yellow-700',
    error: 'dark:bg-red-900/30 dark:text-red-300 dark:border-red-700',
    info: 'dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
  },
};

/**
 * Theme configuration constants
 */
export const THEME_CONFIG = {
  STORAGE_KEY: 'vibe-kanban-theme',
  ATTRIBUTE: 'data-theme',
  CLASS: 'dark',
  TRANSITION_DURATION: 200, // milliseconds
} as const;
