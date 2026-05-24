import React, { useState, useEffect } from 'react'
import { profileConfig } from '../data/profileConfig'
import { Cpu } from 'lucide-react'

export const ProfileHeader: React.FC = () => {
  const [typedText, setTypedText] = useState('')
  const [stringIdx, setStringIdx] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  
  const currentFullString = profileConfig.typewriterStrings[stringIdx]
  
  useEffect(() => {
    let timer: any
    
    const tick = () => {
      setTypedText(prev => {
        if (!isDeleting) {
          // Typing
          if (prev.length < currentFullString.length) {
            return currentFullString.slice(0, prev.length + 1)
          } else {
            // Finished typing, pause and prepare delete
            timer = setTimeout(() => setIsDeleting(true), 2500)
            return prev
          }
        } else {
          // Deleting
          if (prev.length > 0) {
            return currentFullString.slice(0, prev.length - 1)
          } else {
            // Finished deleting, shift index
            setIsDeleting(false)
            setStringIdx(prevIdx => (prevIdx + 1) % profileConfig.typewriterStrings.length)
            return ''
          }
        }
      })
    }

    // Dynamic typing and erasing intervals
    const typingSpeed = isDeleting ? 25 : 60
    timer = setTimeout(tick, typingSpeed)

    return () => clearTimeout(timer)
  }, [typedText, isDeleting, currentFullString])

  return (
    <div className="flex flex-col items-center text-center select-none pt-4 pb-2">
      
      {/* 1. Glowing Profile Avatar Frame */}
      <div className="relative mb-5 group">
        {/* Shifting neon halo behind avatar */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-cyan-400 via-purple-500 to-pink-500 blur-xl opacity-60 group-hover:opacity-85 transition-opacity duration-500 animate-pulse pointer-events-none" />
        
        {/* Glow pulsing border container */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full p-[3px] bg-gradient-to-tr from-cyan-400 via-transparent to-pink-500 glow-active z-10 overflow-hidden">
          <img
            src={profileConfig.avatarUrl}
            alt={profileConfig.displayName}
            className="w-full h-full object-cover rounded-full select-none"
            draggable="false"
          />
        </div>

        {/* Dynamic Glowing Status Badge */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-0.5 rounded-full border border-cyan-400/30 bg-[#05050a]/90 backdrop-blur-md shadow-[0_0_10px_rgba(0,255,204,0.3)]">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="w-1.5 h-1.5 absolute left-[12px] rounded-full bg-cyan-400" />
          <span className="text-[8px] font-mono tracking-widest text-cyan-400 font-bold uppercase select-none">
            {profileConfig.status.label}
          </span>
        </div>
      </div>

      {/* 2. Display Name */}
      <h1 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-wide mb-1 leading-tight">
        {profileConfig.displayName}
      </h1>

      {/* 3. Username */}
      <span className="text-xs md:text-sm font-mono text-cyan-400/80 mb-3 tracking-widest flex items-center gap-1.5">
        <Cpu size={12} className="animate-spin duration-[4s]" />
        {profileConfig.username}
      </span>

      {/* 4. Description Tagline */}
      <p className="max-w-xs md:max-w-md text-xs md:text-sm text-gray-400 leading-relaxed px-4 mb-4">
        {profileConfig.tagline}
      </p>

      {/* 5. Cybernetic Typewriter Status Display */}
      <div className="h-6 flex items-center justify-center font-mono text-[10px] md:text-xs text-purple-400 bg-purple-500/[0.04] border border-purple-500/10 px-4 py-1.5 rounded-lg select-none max-w-[280px] md:max-w-sm truncate">
        <span className="text-cyan-400/60 mr-1.5">&gt;_</span>
        <span className="tracking-wide">{typedText}</span>
        <span className="typewriter-cursor" />
      </div>

    </div>
  )
}
