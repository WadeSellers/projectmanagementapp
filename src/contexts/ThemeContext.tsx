'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { Theme, ResolvedTheme, ThemeContextValue } from '@/types/theme';
import { THEME_CONFIG } from '@/lib/theme';

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

/**
 * ThemeProvider component that manages theme state and persistence
 * Features:
 * - System preference detection
 * - localStorage persistence
 * - Smooth theme transitions
 * - SSR-safe hydration
 */
export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = THEME_CONFIG.STORAGE_KEY,
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light');
  const [mounted, setMounted] = useState(false);

  /**
   * Get the resolved theme based on current theme setting
   */
  const getResolvedTheme = (currentTheme: Theme): ResolvedTheme => {
    if (currentTheme !== 'system') {
      return currentTheme;
    }

    // Check system preference
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    }

    return 'light';
  };

  /**
   * Apply theme to document
   */
  const applyTheme = (newResolvedTheme: ResolvedTheme) => {
    const root = document.documentElement;

    // Remove existing theme class
    root.classList.remove('light', 'dark');

    // Add new theme class
    root.classList.add(newResolvedTheme);

    // Set data attribute for additional styling hooks
    root.setAttribute(THEME_CONFIG.ATTRIBUTE, newResolvedTheme);

    // Update meta theme-color for browser UI
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        'content',
        newResolvedTheme === 'dark' ? '#111827' : '#ffffff'
      );
    }
  };

  /**
   * Set theme and persist to localStorage
   */
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);

    try {
      localStorage.setItem(storageKey, newTheme);
    } catch (error) {
      console.warn('Failed to save theme preference:', error);
    }

    const newResolvedTheme = getResolvedTheme(newTheme);
    setResolvedTheme(newResolvedTheme);

    if (mounted) {
      applyTheme(newResolvedTheme);
    }
  };

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey) as Theme | null;
      const initialTheme = stored || defaultTheme;
      const initialResolvedTheme = getResolvedTheme(initialTheme);

      setThemeState(initialTheme);
      setResolvedTheme(initialResolvedTheme);
      applyTheme(initialResolvedTheme);
    } catch (error) {
      console.warn('Failed to load theme preference:', error);
    }

    setMounted(true);
  }, []);

  // Listen for system theme changes when theme is set to 'system'
  useEffect(() => {
    if (theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const handleChange = (e: MediaQueryListEvent) => {
      const newResolvedTheme = e.matches ? 'dark' : 'light';
      setResolvedTheme(newResolvedTheme);
      applyTheme(newResolvedTheme);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Fallback for older browsers
    else {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [theme]);

  const value: ThemeContextValue = {
    theme,
    resolvedTheme,
    setTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook to access theme context
 * Must be used within a ThemeProvider
 */
export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}
