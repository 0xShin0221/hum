'use client'

import { useCallback, useEffect, useState } from 'react'

const LS_KEY = 'hum.theme'

export type Theme = 'dark' | 'light'

export function useTheme() {
  const [theme, setThemeState] = useState<Theme>('dark')

  useEffect(() => {
    try {
      const saved = localStorage.getItem(LS_KEY) as Theme | null
      if (saved === 'dark' || saved === 'light') {
        setThemeState(saved)
        document.documentElement.setAttribute('data-theme', saved)
      }
    } catch {}
  }, [])

  const setTheme = useCallback((next: Theme, instant = true) => {
    const root = document.documentElement
    if (instant) {
      root.classList.add('theme-switching')
    }
    root.setAttribute('data-theme', next)
    try { localStorage.setItem(LS_KEY, next) } catch {}
    setThemeState(next)
    if (instant) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          root.classList.remove('theme-switching')
        })
      })
    }
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark', true)
  }, [theme, setTheme])

  return { theme, setTheme, toggleTheme }
}
