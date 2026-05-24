import React, { useState, useEffect } from 'react'
import { MessageSquare, Sparkles, AlertCircle } from 'lucide-react'
import { profileConfig } from '../data/profileConfig'
import type { AIResponse } from '../data/profileConfig'

export const VoiceAssistant: React.FC = () => {
  const [activeQuery, setActiveQuery] = useState<AIResponse | null>(null)
  const [displayedText, setDisplayedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [pulseWave, setPulseWave] = useState(false)

  const handleSelectQuery = (query: AIResponse) => {
    if (isTyping) return // Prevent clicking during active prints
    
    setActiveQuery(query)
    setDisplayedText('')
    setIsTyping(true)
    setPulseWave(true)
  }

  useEffect(() => {
    if (!activeQuery) return
    
    let index = 0
    let textBuffer = ''
    const fullText = activeQuery.response

    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        textBuffer += fullText[index]
        setDisplayedText(textBuffer)
        index++
      } else {
        clearInterval(typingInterval)
        setIsTyping(false)
        setPulseWave(false)
      }
    }, 15) // Fast futuristic readout

    return () => clearInterval(typingInterval)
  }, [activeQuery])

  // Select the first greeting by default when mounting
  useEffect(() => {
    if (profileConfig.aiVoiceResponses.length > 0) {
      handleSelectQuery(profileConfig.aiVoiceResponses[0])
    }
  }, [])

  return (
    <div className="flex flex-col gap-4 select-none">
      
      {/* 1. Terminal Voice Interface Wave Header */}
      <div className="flex items-center justify-between border-b border-white/5 pb-3">
        <div className="flex items-center gap-2 text-cyan-400">
          <Sparkles size={16} className={pulseWave ? "animate-spin duration-[3s]" : ""} />
          <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">NEURAL REPRESENTATIVE</span>
        </div>
        
        {/* Dynamic Glowing Equalizer Waves */}
        <div className="flex gap-[3px] items-end h-[16px] px-2">
          {[1, 2, 3, 4, 5, 6, 7].map((bar) => (
            <div
              key={bar}
              className={`w-[2px] bg-cyan-400 rounded-full transition-all duration-300 ${
                pulseWave 
                  ? 'h-4 scale-y-100 animate-pulse' 
                  : 'h-1 scale-y-75 opacity-30'
              }`}
              style={{
                animationDuration: `${0.4 + bar * 0.15}s`,
                animationDelay: `${bar * 0.05}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* 2. Interactive Dialog Dialogue Output Panel */}
      <div className="min-h-[110px] md:min-h-[90px] border border-cyan-400/10 bg-[#05050a]/40 rounded-2xl p-4 font-mono text-[10px] md:text-xs text-gray-300 leading-relaxed relative overflow-hidden flex items-start gap-3">
        <MessageSquare size={16} className="text-cyan-400/50 mt-0.5 shrink-0" />
        <div className="flex-1">
          {activeQuery ? (
            <div>
              <div className="text-[8px] text-cyan-400/40 mb-1 tracking-widest font-semibold">
                QUERY: PROTOCOL_{activeQuery.keyword.toUpperCase()}
              </div>
              <p className="tracking-wide">
                {displayedText}
                {isTyping && <span className="typewriter-cursor" />}
              </p>
            </div>
          ) : (
            <div className="text-gray-500 flex items-center gap-2 py-4">
              <AlertCircle size={14} />
              <span>Select query protocol below to begin communication...</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Action Buttons Grid */}
      <div className="grid grid-cols-2 gap-2">
        {profileConfig.aiVoiceResponses.map((q) => {
          const isActive = activeQuery?.keyword === q.keyword
          return (
            <button
              key={q.keyword}
              disabled={isTyping}
              onClick={() => handleSelectQuery(q)}
              className={`h-[40px] px-3 rounded-xl border font-mono text-[9px] md:text-[10px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 cursor-pointer tap-active ${
                isActive
                  ? 'bg-cyan-500/10 border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(0,255,204,0.15)] font-bold'
                  : 'bg-white/[0.02] border-white/5 text-gray-400 hover:text-white hover:bg-white/[0.04] hover:border-white/10'
              } disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              <span className={`w-1 h-1 rounded-full ${isActive ? 'bg-cyan-400 animate-ping' : 'bg-gray-600'}`} />
              <span className="truncate">{q.buttonLabel}</span>
            </button>
          )
        })}
      </div>

    </div>
  )
}
