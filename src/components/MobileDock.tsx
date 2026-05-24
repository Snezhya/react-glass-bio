import React from 'react'
import { motion } from 'framer-motion'
import { User, Link2, BarChart2, Bot } from 'lucide-react'

export type MobileTab = 'profile' | 'links' | 'diagnostics' | 'ai'

interface MobileDockProps {
  activeTab: MobileTab
  setActiveTab: (tab: MobileTab) => void
}

export const MobileDock: React.FC<MobileDockProps> = ({ activeTab, setActiveTab }) => {
  
  const navItems = [
    { id: 'profile' as MobileTab, label: 'Profile', icon: User },
    { id: 'links' as MobileTab, label: 'Links', icon: Link2 },
    { id: 'diagnostics' as MobileTab, label: 'Stats', icon: BarChart2 },
    { id: 'ai' as MobileTab, label: 'Neural', icon: Bot },
  ]

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 w-[92%] max-w-[360px] z-[99] md:hidden block gpu-accel safe-pb">
      <div 
        className="glass-panel py-2.5 px-4 rounded-full flex items-center justify-between gap-1 bg-[#090915]/85 border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)]"
        style={{
          boxShadow: 'inset 0 1.5px 1.5px rgba(255,255,255,0.12), 0 10px 30px rgba(0,0,0,0.5)',
        }}
      >
        {navItems.map((item) => {
          const isActive = activeTab === item.id
          const Icon = item.icon
          
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className="flex flex-col items-center justify-center flex-1 py-1 relative cursor-pointer tap-active select-none"
              aria-label={`Switch to ${item.label}`}
            >
              {/* Highlight background pill */}
              {isActive && (
                <motion.div
                  layoutId="activeDockPill"
                  className="absolute inset-x-1 inset-y-0 rounded-full bg-gradient-to-r from-purple-500/15 via-pink-500/10 to-cyan-400/10 border border-cyan-400/20 shadow-[0_0_8px_rgba(0,255,204,0.15)] pointer-events-none -z-10"
                  transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                />
              )}

              {/* Icon */}
              <Icon 
                size={18} 
                className={`transition-colors duration-300 ${
                  isActive ? 'text-cyan-400' : 'text-gray-500 hover:text-gray-400'
                }`} 
              />
              
              {/* Label */}
              <span 
                className={`text-[8px] font-mono font-bold tracking-wider mt-1 uppercase transition-colors duration-300 ${
                  isActive ? 'text-cyan-400' : 'text-gray-500'
                }`}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
