import React from 'react'
import { motion } from 'framer-motion'
import { Moon, Sparkles } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useTheme()

  return (
    <div 
      className="glass-panel p-[3px] rounded-full flex items-center relative z-50 select-none bg-[#0a0a14]/60 border border-white/5 shadow-lg max-w-[130px] mx-auto scale-95"
      role="radiogroup"
      aria-label="Theme Selection Protocol"
    >
      {/* Dark Modern Option */}
      <button
        onClick={() => setTheme('dark-modern')}
        className={`relative z-10 px-3 py-1.5 rounded-full flex items-center justify-center gap-1 cursor-pointer transition-colors duration-300 tap-active ${
          theme === 'dark-modern' ? 'text-white' : 'text-gray-500 hover:text-gray-400'
        }`}
        aria-checked={theme === 'dark-modern'}
        role="radio"
      >
        <Moon size={11} />
        <span className="text-[9px] font-mono font-bold tracking-wider uppercase">Dark</span>
      </button>

      {/* Glass Blur Option */}
      <button
        onClick={() => setTheme('glass-futuristic')}
        className={`relative z-10 px-3 py-1.5 rounded-full flex items-center justify-center gap-1 cursor-pointer transition-colors duration-300 tap-active ${
          theme === 'glass-futuristic' ? 'text-white' : 'text-gray-500 hover:text-gray-400'
        }`}
        aria-checked={theme === 'glass-futuristic'}
        role="radio"
      >
        <Sparkles size={11} />
        <span className="text-[9px] font-mono font-bold tracking-wider uppercase">Glass</span>
      </button>

      {/* Shared Layout Slider */}
      {theme && (
        <motion.div
          layoutId="themeSlider"
          className="absolute inset-y-[3px] rounded-full bg-gradient-to-r from-purple-600/40 via-pink-500/25 to-cyan-400/25 border border-cyan-400/20 shadow-[0_0_8px_rgba(0,255,204,0.15)] pointer-events-none"
          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
          style={{
            left: theme === 'dark-modern' ? '3px' : '63px',
            width: theme === 'dark-modern' ? '64px' : '64px',
            height: 'calc(100% - 6px)'
          }}
        />
      )}
    </div>
  )
}
