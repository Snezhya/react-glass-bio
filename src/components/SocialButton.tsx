import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { SocialLink } from '../data/profileConfig'
import { useDeviceDetect } from '../hooks/useDeviceDetect'

interface SocialButtonProps {
  link: SocialLink
  index: number
}

export const SocialButton: React.FC<SocialButtonProps> = ({ link, index }) => {
  const { isTouch } = useDeviceDetect()
  
  // Custom brand icon rendering engine
  const renderIcon = () => {
    if (typeof link.icon === 'string') {
      const brand = link.icon.toLowerCase()
      
      const svgClass = "text-white group-hover:scale-110 transition-transform duration-300 w-[18px] h-[18px]"

      switch (brand) {
        case 'github':
          return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={svgClass}>
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
          )
        case 'linkedin':
          return (
            <svg viewBox="0 0 24 24" fill="currentColor" className={svgClass}>
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          )
        case 'twitter':
          return (
            <svg viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:scale-110 transition-transform duration-300 w-[15px] h-[15px]">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
          )
        case 'instagram':
          return (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className={svgClass}>
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          )
        default:
          return null
      }
    } else {
      // Standard Lucide React icon element
      const IconComponent = link.icon
      return IconComponent ? <IconComponent size={18} className="text-white group-hover:scale-110 transition-transform duration-300" /> : null
    }
  }

  return (
    <motion.a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        type: 'spring', 
        stiffness: 100, 
        damping: 15,
        delay: index * 0.08 + 0.2
      }}
      whileHover={isTouch ? {} : { 
        y: -3, 
        borderColor: 'rgba(255, 255, 255, 0.2)',
        boxShadow: `0 8px 24px -4px ${link.glowColor}, inset 0 1px 1px rgba(255,255,255,0.15)`
      }}
      whileTap={{ scale: 0.97 }}
      className={`light-sweep-container w-full h-[52px] md:h-[56px] px-5 rounded-2xl border border-white/5 bg-gradient-to-r ${link.color} flex items-center justify-between group transition-all duration-300 tap-active gpu-accel`}
      style={{
        boxShadow: 'inset 0 1px 1px rgba(255,255,255,0.06), 0 4px 15px rgba(0,0,0,0.15)',
      }}
    >
      <span className="light-sweep" />

      <div className="flex items-center gap-4">
        {/* Glowing Icon Frame */}
        <div 
          className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 flex items-center justify-center"
          style={{
            boxShadow: `0 0 10px ${link.glowColor}`,
          }}
        >
          {renderIcon()}
        </div>

        {/* Text Details */}
        <span className="text-xs md:text-sm font-semibold tracking-wide text-white font-sans group-hover:text-cyan-200 transition-colors">
          {link.label}
        </span>
      </div>

      {/* Arrow Indicator */}
      <div className="text-white/40 group-hover:text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
        <ArrowUpRight size={16} />
      </div>
    </motion.a>
  )
}
