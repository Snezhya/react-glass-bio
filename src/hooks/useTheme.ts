import { useEffect, useState } from 'react'

export type Theme = 'dark-modern' | 'glass-futuristic'

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme-protocol')
    if (saved === 'glass-futuristic' || saved === 'dark-modern') {
      return saved as Theme
    }
    return 'dark-modern' // Default premium dark modern
  })

  useEffect(() => {
    const root = window.document.documentElement
    
    // Clear existing theme classes
    root.classList.remove('theme-dark-modern', 'theme-glass-futuristic')
    
    // Add current theme class
    if (theme === 'dark-modern') {
      root.classList.add('theme-dark-modern')
    } else if (theme === 'glass-futuristic') {
      root.classList.add('theme-glass-futuristic')
    }
    
    localStorage.setItem('theme-protocol', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark-modern' ? 'glass-futuristic' : 'dark-modern'))
  }

  return { theme, setTheme, toggleTheme }
}
