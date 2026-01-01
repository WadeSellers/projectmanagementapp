'use client';

import React, { useEffect, useState } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Theme } from '@/types/theme';

/**
 * ThemeToggle component for switching between light, dark, and system themes
 * Features:
 * - Accessible button with ARIA labels
 * - Smooth icon transitions
 * - Keyboard navigation support
 * - Visual feedback on hover and focus
 * - Cycles through: light → dark → system
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const cycleTheme = () => {
    const themeOrder: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  const getThemeIcon = () => {
    if (!mounted) {
      return <SunIcon />;
    }

    if (theme === 'system') {
      return <SystemIcon />;
    }

    return resolvedTheme === 'dark' ? <MoonIcon /> : <SunIcon />;
  };

  const getThemeLabel = () => {
    if (!mounted) return 'Toggle theme';

    const labels = {
      light: 'Light mode',
      dark: 'Dark mode',
      system: 'System theme',
    };

    return labels[theme];
  };

  if (!mounted) {
    return (
      <button
        className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white transition-all hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-vibe-purple-500 focus:ring-offset-2"
        aria-label="Toggle theme"
        disabled
      >
        <SunIcon />
      </button>
    );
  }

  return (
    <button
      onClick={cycleTheme}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 bg-white transition-all hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-vibe-purple-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-750 dark:hover:border-gray-600 dark:focus:ring-vibe-purple-400"
      aria-label={`Current theme: ${getThemeLabel()}. Click to cycle themes.`}
      title={getThemeLabel()}
    >
      <span className="transition-transform duration-200 hover:scale-110">
        {getThemeIcon()}
      </span>
    </button>
  );
}

// Icon components with WCAG compliant contrast

function SunIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-amber-500 dark:text-amber-400"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-indigo-600 dark:text-indigo-400"
      aria-hidden="true"
    >
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  );
}

function SystemIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5 text-gray-600 dark:text-gray-400"
      aria-hidden="true"
    >
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </svg>
  );
}
