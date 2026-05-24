import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Terminal } from 'lucide-react'

interface LoadingScreenProps {
  onComplete: () => void
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0)
  const [logIndex, setLogIndex] = useState(0)
  const [isDone, setIsDone] = useState(false)

  const bootLogs = [
    "NEURALINK BOOT PROCESS V2.6.4...",
    "[OK] CORE // Initializing React 19 Client...",
    "[OK] SYSTEM // Mounting Glassmorphism Engine...",
    "[OK] SHADERS // Generating Ambient Shifting Mesh...",
    "[OK] SYNC // Opening real-time local state channel...",
    "[OK] AI // Calibrating Voice Representative...",
    "[SUCCESS] SECURE CHANNEL ACTIVE // Verification Approved."
  ]

  useEffect(() => {
    // Progress counter animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          setTimeout(() => {
            setIsDone(true)
            setTimeout(onComplete, 800) // Complete fade transition
          }, 400)
          return 100
        }
        // Organic increment speed
        const rand = Math.floor(Math.random() * 8) + 3
        return Math.min(prev + rand, 100)
      })
    }, 80)

    return () => clearInterval(progressInterval)
  }, [onComplete])

  useEffect(() => {
    // Output logs incrementally relative to progress
    const logInterval = setInterval(() => {
      setLogIndex((prev) => {
        if (prev < bootLogs.length - 1) {
          return prev + 1
        }
        clearInterval(logInterval)
        return prev
      })
    }, 280)

    return () => clearInterval(logInterval)
  }, [])

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 w-full h-full bg-[#05050a] z-[10000] flex flex-col justify-between p-6 md:p-12 font-mono select-none"
        >
          {/* Header Cyber Details */}
          <div className="flex justify-between items-start text-[10px] text-cyan-400/40 tracking-wider">
            <div>
              <p>SYS.LOC // IP_SNEZHYA_REACTIVE</p>
              <p>HOST // PORT-8080.SECURE</p>
            </div>
            <div className="text-right">
              <p>MODEL // GEMINI_3.5_FLASH</p>
              <p>FPS_LIMIT // 60HZ_ACCEL</p>
            </div>
          </div>

          {/* Center Boot Terminal Logs */}
          <div className="max-w-xl w-full mx-auto flex flex-col justify-center flex-1">
            <div className="flex items-center gap-2 mb-6 text-cyan-400">
              <Terminal size={20} className="animate-pulse" />
              <span className="text-xs font-semibold tracking-widest uppercase">Booting Neural Overlay</span>
            </div>

            <div className="space-y-2 h-[220px] overflow-hidden flex flex-col justify-end text-[11px] md:text-xs">
              {bootLogs.slice(0, logIndex + 1).map((log, index) => {
                const isSuccess = log.includes("[SUCCESS]")
                const isHeader = log.includes("BOOT PROCESS")
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.2 }}
                    className={
                      isSuccess 
                        ? "text-emerald-400 font-bold" 
                        : isHeader 
                          ? "text-purple-400 tracking-widest font-semibold"
                          : "text-gray-400"
                    }
                  >
                    {log}
                  </motion.div>
                )
              })}
            </div>

            {/* Glowing Cyber Progress Bar */}
            <div className="mt-8 relative">
              <div className="h-[2px] w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-cyan-400 rounded-full shadow-[0_0_8px_rgba(0,255,204,0.5)]"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-500 mt-2 font-mono tracking-widest">
                <span>SYSTEM SYNCHRONIZATION</span>
                <span className="text-cyan-400 font-bold">{progress}%</span>
              </div>
            </div>
          </div>

          {/* Footer minimal signature */}
          <div className="text-center text-[10px] text-gray-600 tracking-widest font-mono">
            SNEZHYA // MULTI-SYSTEM BIO ARCHITECTURE CO-2026
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
